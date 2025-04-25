import type { RankEntry, Stats, users } from "./types.js";

export const inMemoryStats: Record<
  string,
  {
    dailyStats: Stats;
    weeklyStats: Stats;
    monthlyStats: Stats;
    todaysStats: Stats & { lastTime: number };
  }
> = {};

export const userMap = {
  dailyMap: new Map<string, users>(),
  weeklyMap: new Map<string, users>(),
  monthlyMap: new Map<string, users>(),
};

export const leaderboards = {
  daily: [] as RankEntry[],
  weekly: [] as RankEntry[],
  monthly: [] as RankEntry[],
};
