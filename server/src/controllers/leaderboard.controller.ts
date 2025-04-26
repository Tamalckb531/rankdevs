import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import {
  inMemoryStats,
  leaderboards,
  userMap,
} from "../utils/inMemoryStats.js";
import type {
  RankEntry,
  SnapShot,
  statPayload,
  users,
} from "../utils/types.js";
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
      //* Tested -> working fine
      inMemoryStats[userId] = {
        dailyStats: snap.dailyStats,
        weeklyStats: snap.weeklyStats,
        monthlyStats: snap.monthlyStats,
        todaysStats: {
          ...snap.data,
          lastTime: parseInt(snap.data.lastTime),
        },
        lastReportTime: Date.now(),
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
        const status = await saveToDataBase(stats, user, newTime);
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
        lastReportTime: Date.now(),
      };
    }

    const newUser: users = {
      id: user.id,
      githubUserName: user.githubUserName,
      twitterUsername: user.twitterUsername,
    };

    //? add in userMap
    if (!userMap.dailyMap.get(userId)) {
      userMap.dailyMap.set(user.id, newUser);
    }
    if (!userMap.weeklyMap.get(userId)) {
      userMap.weeklyMap.set(user.id, newUser);
    }
    if (!userMap.monthlyMap.get(userId)) {
      userMap.monthlyMap.set(user.id, newUser);
    }

    //? Update rank
    //* Tested -> working fine
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

    //? setting users in a map for easy retrieval
    const rankedArray: RankEntry[] = leaderboards[statType];

    //? Rank wise setting the data
    rankedArray.forEach((entry) => {
      let user;
      switch (statType) {
        case "daily":
          user = userMap.dailyMap.get(entry.userId);
          break;
        case "weekly":
          user = userMap.weeklyMap.get(entry.userId);
          break;
        case "monthly":
          user = userMap.monthlyMap.get(entry.userId);
          break;
        default:
          return;
      }
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

export const getToday = async (c: Context) => {
  try {
    const todayStats = Object.entries(inMemoryStats).map(([userId, stats]) => ({
      userId,
      todaysStats: stats.todaysStats,
    }));

    return c.json(todayStats, 200);
  } catch (error) {
    console.error("Error in getToday controller:", error);
    return c.json({ error: "Failed to fetch today's stats" }, 500);
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
