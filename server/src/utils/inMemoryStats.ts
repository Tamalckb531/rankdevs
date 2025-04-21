import type { Stats } from "./types.js";

export const inMemoryStats: Record<
  string,
  {
    dailyStats: Stats;
    weeklyStats: Stats;
    monthlyStats: Stats;
    todaysStats: Stats & { lastTime: number };
  }
> = {};
