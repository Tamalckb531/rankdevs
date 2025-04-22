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
  user: User
): Promise<boolean> => {
  const prevDate = user.lastStatsTime ? new Date(user.lastStatsTime) : null;
  const currDate = new Date(data.lastTime);
  const lastStatsTime = currDate.toISOString(); //? timestamp for next calculation

  let { weeklyStats, monthlyStats, yearlyStats, totalStats }: allStats =
    user as any;

  //? initialize stats will empty object for further operation -> for the first ever user
  if (!weeklyStats && !monthlyStats && !yearlyStats && !totalStats) {
    ({ weeklyStats, monthlyStats, yearlyStats, totalStats } = initializeStats(
      currDate.getFullYear(),
      currDate.getMonth()
    ));
  }

  //? Convert Date to useful formats
  const dayOfWeek = currDate
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase(); // thursday
  const dayOfMonth = currDate.getDate(); // 16
  const monthName = currDate.toLocaleString("en-US", { month: "short" }); // Dec
  const yearName = currDate.getFullYear(); // 1971

  let weekChanged = false,
    monthChanged = false,
    yearChanged = false;

  //? Watching if anything changed
  if (prevDate) {
    weekChanged = isNewWeek(prevDate, currDate);
    monthChanged =
      prevDate.getMonth()! == currDate.getMonth() ||
      prevDate.getFullYear() !== currDate.getFullYear();
    yearChanged = prevDate.getFullYear() !== currDate.getFullYear();
  }

  //? resetting data according to the changes
  if (weekChanged) weeklyStats = initializeWeeklyStats();
  if (monthChanged)
    monthlyStats = initializeMonthlyStats(
      currDate.getFullYear(),
      currDate.getMonth()
    );
  if (yearChanged) yearlyStats = initializeYearlyStats();

  //? adding data to the stats
  const { total, lastTime, ...langStats } = data;

  //? day/month wise stats
  weeklyStats[dayOfWeek] = { total, ...langStats };
  monthlyStats[dayOfMonth] = { total, ...langStats };
  yearlyStats[monthName] = yearlyStats[monthName]
    ? sumStats(yearlyStats[monthName], data)
    : { total, ...langStats };
  totalStats[yearName] = totalStats[yearName]
    ? sumStats(totalStats[yearName], data)
    : { total, ...langStats };

  //? total Stats
  weeklyStats.sum = sumStats(weeklyStats.sum, data);
  monthlyStats.sum = sumStats(monthlyStats.sum, data);
  yearlyStats.sum = sumStats(yearlyStats.sum, data);
  totalStats.sum = sumStats(totalStats.sum, data);

  //? save updated stats in db :
  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      dailyStats: JSON.stringify({ total: 0, logs: [] }), // Reset daily
      weeklyStats: JSON.stringify(weeklyStats),
      monthlyStats: JSON.stringify(monthlyStats),
      yearlyStats: JSON.stringify(yearlyStats),
      totalStats: JSON.stringify(totalStats),
      lastStatsTime, // Update last recorded time
      updatedAt: new Date(),
    },
  });

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
