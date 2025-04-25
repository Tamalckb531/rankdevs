import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import type { allStats, Stats } from "../utils/types.js";
import {
  initializeMonthlyStats,
  initializeStats,
  initializeWeeklyStats,
  initializeYearlyStats,
  isNewWeek,
  sumStats,
} from "../utils/dashboardTime.js";

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
  const userId = c.get("user")?.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new HTTPException(404, { message: "User not found" });

    return c.json(user);
  } catch (error: any) {
    throw new HTTPException(500, {
      message:
        error.message || "An error from dashboard -> getDashboard controller ",
    });
  }
};
