import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import type { allStats, updatePayload } from "../utils/types.js";
import {
  initializeMonthlyStats,
  initializeStats,
  initializeWeeklyStats,
  initializeYearlyStats,
  isNewWeek,
  sumStats,
} from "../utils/dashboardTime.js";

const prisma = new PrismaClient();

//! FLOW :: get user with apiKey -> get the previous and current stat time for calculation -> get the stats of user and initialize them if all empty -> if not empty then check if week, month or year changed and initialize the changed -> place data on current position of each stat -> add the data in sum -> update the user model
export const updateDashboard = async (c: Context) => {
  const { apiKey, data }: updatePayload = await c.req.json();

  if (!apiKey || !data)
    return c.json({
      status: 401,
      msg: "API key missing or data is not sufficient",
    });

  try {
    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user)
      return c.json({
        status: 404,
        message: "User not found, change your apiKey",
      });

    const { total, lastTime, ...langStats } = data;
    //? for date calculation
    const prevDate = user.lastStatsTime ? new Date(user.lastStatsTime) : null;
    const today = new Date(lastTime);
    //? later used in prevDate
    const lastStatsTime = today.toISOString();

    let { weeklyStats, monthlyStats, yearlyStats, totalStats }: allStats =
      user as any;

    //? Ensure all stats exist or initialize them if empty
    if (!weeklyStats || !monthlyStats || !yearlyStats || !totalStats) {
      ({ weeklyStats, monthlyStats, yearlyStats, totalStats } = initializeStats(
        today.getFullYear(),
        today.getMonth()
      ));
    }

    //? Convert Date to useful formats
    const dayOfWeek = today
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase(); // thursday
    const dayOfMonth = today.getDate(); // 16
    const monthName = today.toLocaleString("en-US", { month: "short" }); // Dec
    const yearName = today.getFullYear(); // 1971

    let weekChanged = false,
      monthChanged = false,
      yearChanged = false;

    if (prevDate) {
      weekChanged = isNewWeek(prevDate, today);
      monthChanged = prevDate.getMonth() !== today.getMonth();
      yearChanged = prevDate.getFullYear() != today.getFullYear();
    }

    if (weekChanged) weeklyStats = initializeWeeklyStats();
    if (monthChanged)
      monthlyStats = initializeMonthlyStats(
        today.getFullYear(),
        today.getMonth()
      );
    if (yearChanged) yearlyStats = initializeYearlyStats();

    //? Update Stats
    weeklyStats[dayOfWeek] = { total, ...langStats };
    monthlyStats[dayOfMonth] = { total, ...langStats };
    yearlyStats[monthName] = yearlyStats[monthName]
      ? sumStats(yearlyStats[monthName], data)
      : { total, ...langStats };
    totalStats[yearName] = totalStats[yearName]
      ? sumStats(totalStats[yearName], data)
      : { total, ...langStats };

    //? Update sum fields
    weeklyStats.sum = sumStats(weeklyStats.sum, data);
    monthlyStats.sum = sumStats(monthlyStats.sum, data);
    yearlyStats.sum = sumStats(yearlyStats.sum, data);
    totalStats.sum = sumStats(totalStats.sum, data);

    //? Save updated stats
    await prisma.user.update({
      where: { apiKey },
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

    return c.json({ message: "Stats updated successfully." });
  } catch (error: any) {
    throw new HTTPException(500, {
      message:
        error.message ||
        "An error from dashboard -> updateDashboard controller ",
    });
  }
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
