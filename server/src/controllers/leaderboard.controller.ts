import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import { inMemoryStats } from "../utils/inMemoryStats.js";
import type { SnapShot, statPayload } from "../utils/types.js";

const prisma = new PrismaClient();

export const hello = async (c: Context) => {
  return c.text("Hello from leaderboard");
};

export const updateLeaderboard = async (c: Context) => {
  const snap = await c.req.json<SnapShot>();

  try {
    //? Find the user by apiKey

    if (!snap.apiKey) return c.json({ status: 401, msg: "API key missing" });

    const user = await prisma.user.findUnique({
      where: { apiKey: snap.apiKey },
    });

    if (!user) return c.json({ status: 404, msg: "User not found" });
    const userId = user.id;

    if (!inMemoryStats[userId]) {
      inMemoryStats[userId] = {
        dailyStats: snap.dailyStats,
        weeklyStats: snap.weeklyStats,
        monthlyStats: snap.monthlyStats,
        todaysStats: {
          ...snap.data,
          lastTime: parseInt(snap.data.lastTime),
        },
      };
    } else {
      //? adding the new today stats
      const stats = inMemoryStats[userId].todaysStats;

      stats.total += snap.data.total;
      stats.lastTime = parseInt(snap.data.lastTime);

      for (const lang in snap.data) {
        if (lang !== "total" && lang !== "lastTime") {
          stats[lang] = (stats[lang] || 0) + snap.data[lang];
        }
      }

      //? replacing old snap with new snap in every two minute
      inMemoryStats[userId] = {
        dailyStats: snap.dailyStats,
        weeklyStats: snap.weeklyStats,
        monthlyStats: snap.monthlyStats,
        todaysStats: stats,
      };
    }

    //? update times in memory
    return c.json({ status: 200, msg: "stats updated" });
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error from leader board update",
    });
  }
};

const getStats = async (
  c: Context,
  statType: "dailyStats" | "weeklyStats" | "monthlyStats"
) => {
  try {
    let data: statPayload[] = [];
    const users = await prisma.user.findMany({
      select: {
        id: true,
        githubUserName: true,
        twitterUsername: true,
      },
    });

    users.forEach((user) => {
      const userStats = inMemoryStats[user.id]?.[statType];

      if (userStats) {
        data.push({ ...user, Stats: userStats });
      }
    });

    return c.json(data);
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || `An error from leaderboard ${statType}`,
    });
  }
};

export const getDaily = (c: Context) => getStats(c, "dailyStats");
export const getWeekly = (c: Context) => getStats(c, "weeklyStats");
export const getMonthly = (c: Context) => getStats(c, "monthlyStats");
