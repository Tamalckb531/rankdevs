import type { Stats } from "./types.js";

export const inMemoryStats: Record<
  string,
  {
    dailyStats: Stats & { rank: number };
    weeklyStats: Stats & { rank: number };
    monthlyStats: Stats & { rank: number };
    todaysStats: Stats & { lastTime: number };
  }
> = {};
