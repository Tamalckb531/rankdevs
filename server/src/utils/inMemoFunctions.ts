import { inMemoryStats, leaderboards } from "./inMemoryStats.js";
import type { RankEntry } from "./types.js";

export const isSameDay = (t1: number, t2: number) => {
  const d1 = new Date(t1);
  const d2 = new Date(t2);

  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate()
  );
};

export const removeInactiveUsers = (
  statType: "daily" | "weekly" | "monthly",
  inactiveTimeLimit: number
) => {
  const rankedArray: RankEntry[] = leaderboards[statType];
  const cutoffTime = Date.now() - inactiveTimeLimit;

  for (let i = rankedArray.length - 1; i >= 0; i--) {
    const entry = rankedArray[i];
    const time = inMemoryStats[entry.userId]?.lastReportTime;
    if (time && time < cutoffTime) rankedArray.splice(i, 1);
  }
};
