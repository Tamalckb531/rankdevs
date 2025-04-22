import type { RankEntry, Stats } from "./types.js";

export const inMemoryStats: Record<
  string,
  {
    dailyStats: Stats;
    weeklyStats: Stats;
    monthlyStats: Stats;
    todaysStats: Stats & { lastTime: number };
  }
> = {};

export const leaderboards = {
  daily: [] as RankEntry[],
  weekly: [] as RankEntry[],
  monthly: [] as RankEntry[],
};
