import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import type {
  allStats,
  DashBoardPayload,
  InfoPayload,
  MonthlyStats,
  Stats,
  TotalStats,
  WeeklyStats,
  YearlyStats,
} from "../utils/types.js";
import {
  initializeMonthlyStats,
  initializeStats,
  initializeWeeklyStats,
  initializeYearlyStats,
  isNewWeek,
  sumStats,
} from "../utils/dashboardTime.js";
import { inMemoryStats, leaderboards } from "../utils/inMemoryStats.js";

const prisma = new PrismaClient();

type dataStat = Stats & { lastTime: number };

export const saveToDataBase = async (
  data: dataStat,
  user: User,
  newTime: number
): Promise<boolean> => {
  if (!data || !data.lastTime) {
    throw new Error("Missing lastTime data.");
  }

  const prevDate = new Date(data.lastTime);
  const currDate = new Date(newTime);
  const lastStatsTime = currDate.toISOString(); //? timestamp for next calculation

  let { weeklyStats, monthlyStats, yearlyStats, totalStats }: allStats =
    user as any;

  //? initialize stats will empty object for further operation -> for the first ever user
  if (
    Object.keys(weeklyStats).length === 0 &&
    Object.keys(monthlyStats).length === 0 &&
    Object.keys(yearlyStats).length === 0 &&
    Object.keys(totalStats).length === 0
  ) {
    ({ weeklyStats, monthlyStats, yearlyStats, totalStats } = initializeStats(
      currDate.getFullYear(),
      currDate.getMonth()
    ));
  }

  //? Convert Date to useful formats
  const dayOfWeek = prevDate
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase(); // thursday
  const dayOfMonth = prevDate.getDate(); // 16
  const monthName = prevDate.toLocaleString("en-US", { month: "short" }); // Dec
  const yearName = prevDate.getFullYear(); // 1971

  const { total, lastTime, ...langState } = data;

  let weekChanged = false,
    monthChanged = false,
    yearChanged = false;

  //? Watching if anything changed
  if (prevDate) {
    weekChanged = isNewWeek(prevDate, currDate);
    monthChanged =
      prevDate.getMonth() !== currDate.getMonth() ||
      prevDate.getFullYear() !== currDate.getFullYear();
    yearChanged = prevDate.getFullYear() !== currDate.getFullYear();
  }

  //? resetting data according to the changes + calculating if not change
  if (weekChanged) {
    weeklyStats = initializeWeeklyStats();
  } else {
    weeklyStats[dayOfWeek] = sumStats(weeklyStats[dayOfWeek], data);
    weeklyStats.sum = sumStats(weeklyStats.sum, data);
  }

  if (monthChanged) {
    monthlyStats = initializeMonthlyStats(
      currDate.getFullYear(),
      currDate.getMonth()
    );
  } else {
    monthlyStats[dayOfMonth] = sumStats(monthlyStats[dayOfMonth], data);
    monthlyStats.sum = sumStats(monthlyStats.sum, data);
  }

  if (yearChanged) {
    yearlyStats = initializeYearlyStats();
  } else {
    yearlyStats[monthName] = sumStats(yearlyStats[monthName], data);
    yearlyStats.sum = sumStats(yearlyStats.sum, data);
  }

  //? day/month wise stats
  totalStats[yearName] = totalStats[yearName]
    ? sumStats(totalStats[yearName], data)
    : { total, ...langState };

  //? total Stats
  totalStats.sum = sumStats(totalStats.sum, data);

  //? save updated stats in db :
  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      dailyStats: { total: 0, logs: [] }, // Reset daily
      weeklyStats: weeklyStats,
      monthlyStats: monthlyStats,
      yearlyStats: yearlyStats,
      totalStats: totalStats,
      lastStatsTime, // Update last recorded time
      updatedAt: new Date(),
    },
  });

  console.log("Here is the result : ", result);

  return !!result;
};

export const getDashboard = async (c: Context) => {
  const userId = c.req.param("id");

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new HTTPException(404, { message: "User not found" });

    //? other info's :
    const { lastTime, ...currentStats } = inMemoryStats[userId]
      ?.todaysStats || {
      total: 0,
    };
    const currDate = new Date(lastTime);

    const dailyTotal = inMemoryStats[userId]?.dailyStats.total || 0;
    const weeklyTotal = inMemoryStats[userId]?.weeklyStats.total || 0;
    const monthlyTotal = inMemoryStats[userId]?.monthlyStats.total || 0;

    const dailyRank = leaderboards.daily.findIndex(
      (entry) => entry.userId === userId
    );
    const weeklyRank = leaderboards.weekly.findIndex(
      (entry) => entry.userId === userId
    );
    const monthlyRank = leaderboards.monthly.findIndex(
      (entry) => entry.userId === userId
    );

    //? Add current data in week :
    const newWeekStats = user.weeklyStats as WeeklyStats;
    const dayOfWeek = currDate
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase(); // thursday
    newWeekStats[dayOfWeek] = currentStats;
    newWeekStats.sum = sumStats(newWeekStats.sum, currentStats);

    //? Add current data in month :
    const newMonthlyStats = user.monthlyStats as MonthlyStats;
    const dayOfMonth = currDate.getDate(); // 16
    newMonthlyStats[dayOfMonth] = currentStats;
    newMonthlyStats.sum = sumStats(newMonthlyStats.sum, currentStats);

    //? Add current data in year :
    const newYearlyStats = user.yearlyStats as YearlyStats;
    const monthName = currDate.toLocaleString("en-US", { month: "short" }); // Dec
    newYearlyStats[monthName] = sumStats(
      newYearlyStats[monthName],
      currentStats
    );
    newYearlyStats.sum = sumStats(newYearlyStats.sum, currentStats);

    //? Add current data in total :
    const newTotalStats = user.totalStats as TotalStats;

    const yearName = currDate.getFullYear(); // 1971
    newTotalStats[yearName] = newTotalStats[yearName]
      ? sumStats(newTotalStats[yearName], currentStats)
      : currentStats;
    newTotalStats.sum = sumStats(newTotalStats.sum, currentStats);

    const data: DashBoardPayload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      isHireable: user.isHireable,
      imgLink: user.imgLink,
      bio: user.bio,
      location: user.location,
      githubUserName: user.githubUserName,
      email: user.email,
      portfolio: user.portfolio,
      twitterUsername: user.twitterUsername,
      linkedIn: user.linkedIn,
      peerlistLink: user.peerlistLink,
      leetcodeLink: user.leetcodeLink,
      codeforcesLink: user.codeforcesLink,
      latestTime: lastTime,
      dailyTotal,
      dailyRank,
      weeklyTotal,
      weeklyRank,
      monthlyTotal,
      monthlyRank,
      weeklyStats: newWeekStats,
      monthlyStats: newMonthlyStats,
      yearlyStats: newYearlyStats,
      totalStats: newTotalStats,
      joinAt: user.createdAt,
    };

    return c.json(data);
  } catch (error: any) {
    throw new HTTPException(500, {
      message:
        error.message || "An error from dashboard -> getDashboard controller ",
    });
  }
};

export const updateInfo = async (c: Context) => {
  const userId = c.get("user")?.id;
  try {
    const {
      firstname,
      lastname,
      isHireable,
      imgLink,
      bio,
      location,
      portfolio,
      email,
      twitterUsername,
      peerlistLink,
      leetcodeLink,
      codeforcesLink,
      linkedIn,
    } = await c.req.json<InfoPayload>();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new HTTPException(404, { message: "User not found" });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        isHireable,
        imgLink,
        bio,
        location,
        portfolio,
        email,
        twitterUsername,
        peerlistLink,
        leetcodeLink,
        codeforcesLink,
        linkedIn,
      },
    });

    return c.json(updatedUser);
  } catch (error: any) {
    throw new HTTPException(500, {
      message:
        error.message || "An error from dashboard -> updateInfo controller ",
    });
  }
};
