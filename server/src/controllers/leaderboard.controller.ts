import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import { inMemoryStats, leaderboards } from "../utils/inMemoryStats.js";
import type { RankEntry, SnapShot, statPayload } from "../utils/types.js";
import { isSameDay } from "../utils/inMemoFunctions.js";
import { saveToDataBase } from "./dashboard.controller.js";

const prisma = new PrismaClient();

export const hello = async (c: Context) => {
  return c.text("Hello from leaderboard");
};

//? Test started

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

    //? storing user details in memory:
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

      const newTime = parseInt(snap.data.lastTime);
      const oldTime = stats.lastTime;

      if (isSameDay(oldTime, newTime)) {
        stats.total += snap.data.total;
        stats.lastTime = parseInt(snap.data.lastTime);

        for (const lang in snap.data) {
          if (lang !== "total" && lang !== "lastTime") {
            stats[lang] = (stats[lang] || 0) + snap.data[lang];
          }
        }
      } else {
        //? sending data to the backend to save it
        const status = await saveToDataBase(stats, user);
        if (!status) {
          return c.json({
            status: 400,
            msg: "Failed storing today data inside database",
          });
        }
      }

      //? Update the whole object
      inMemoryStats[userId] = {
        dailyStats: snap.dailyStats,
        weeklyStats: snap.weeklyStats,
        monthlyStats: snap.monthlyStats,
        todaysStats: isSameDay(oldTime, newTime)
          ? stats
          : {
              ...snap.data,
              lastTime: newTime,
            },
      };
    }

    //? Update rank
    updateLeaderboardArray("daily", userId, snap.dailyStats.total);
    updateLeaderboardArray("weekly", userId, snap.weeklyStats.total);
    updateLeaderboardArray("monthly", userId, snap.monthlyStats.total);

    return c.json({ status: 200, msg: "stats updated" });
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error from leader board update",
    });
  }
};

const getStats = async (
  c: Context,
  statType: "daily" | "weekly" | "monthly"
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

    //? setting users in a map for easy retrieval
    const userMap = new Map<string, typeof users[0]>();
    users.forEach((user) => userMap.set(user.id, user));

    const rankedArray: RankEntry[] = leaderboards[statType];

    //? Rank wise setting the data
    rankedArray.forEach((entry) => {
      const user = userMap.get(entry.userId);
      const stats = inMemoryStats[entry.userId]?.[`${statType}Stats`];

      if (user && stats) {
        data.push({
          id: user.id,
          githubUserName: user.githubUserName,
          twitterUsername: user.twitterUsername,
          Stats: stats,
        });
      }
    });

    return c.json(data);
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || `An error from leaderboard ${statType}`,
    });
  }
};

export const getDaily = (c: Context) => getStats(c, "daily");
export const getWeekly = (c: Context) => getStats(c, "weekly");
export const getMonthly = (c: Context) => getStats(c, "monthly");

const insertSorted = (arr: RankEntry[], entry: RankEntry) => {
  let start = 0;
  let end = arr.length - 1;
  let mid = end + Math.floor((start - end) / 2);

  while (start <= end) {
    if (entry.total > arr[mid].total) end = mid - 1;
    else start = mid + 1;
    mid = end + Math.floor((start - end) / 2);
  }

  arr.splice(start, 0, entry);
};

const removeIfExists = (arr: RankEntry[], userId: string) => {
  const index = arr.findIndex((e) => e.userId === userId);
  if (index !== -1) arr.splice(index, 1);
};

const updateLeaderboardArray = (
  scope: "daily" | "weekly" | "monthly",
  userId: string,
  total: number
) => {
  const arr = leaderboards[scope];
  removeIfExists(arr, userId);
  insertSorted(arr, { userId, total });
};
