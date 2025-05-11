import { languages, msToHM } from "./language";
import {
  Stats,
  TotalChartData,
  ChartData,
  StatMode,
  WeeklyStats,
  YearlyStats,
  MonthlyStats,
  GenStats,
  LeetCodeStats,
  LeetCodeData,
  Problems,
} from "./type";

export const getTotalChartData = (data: Stats): TotalChartData[] => {
  return Object.entries(data)
    .filter(([key]) => key !== "total")
    .map(([key, time]) => ({
      languages: key,
      time,
      fill: languages[key]?.color || "#1a1919",
    }))
    .sort((a, b) => b.time - a.time);
};

export const getWeeklyChartData = (
  data: WeeklyStats,
  mode: StatMode
): ChartData[] => {
  if (mode === "time") {
    const monthOrder = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    return monthOrder.map((day) => {
      const time = data[day]?.total || 0;
      return {
        field: capitalize(day),
        time,
      };
    });
  } else if (mode === "language") {
    const sum = data.sum;
    return Object.entries(sum)
      .filter(([key]) => key !== "total")
      .map(([field, time]) => ({
        field,
        time,
      }));
  }

  return [];
};

export const getYearlyChartData = (
  data: YearlyStats,
  mode: StatMode
): ChartData[] => {
  if (mode === "time") {
    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthOrder.map((mnt) => {
      const time = data[mnt]?.total || 0;
      return {
        field: mnt,
        time,
      };
    });
  } else if (mode === "language") {
    const sum = data.sum;
    return Object.entries(sum)
      .filter(([key]) => key !== "total")
      .map(([field, time]) => ({
        field,
        time,
      }));
  }

  return [];
};

export const getMonthlyChartData = (
  data: MonthlyStats,
  mode: StatMode
): ChartData[] => {
  if (mode === "time") {
    return Object.entries(data)
      .filter(([key]) => key !== "sum" && key !== "NaN")
      .map(([field, value]) => ({
        field,
        time: value.total,
      }));
  } else if (mode === "language") {
    const sum = data.sum;
    return Object.entries(sum)
      .filter(([key]) => key !== "total")
      .map(([field, time]) => ({
        field,
        time,
      }));
  }

  return [];
};

export const MostActive = (data: GenStats): string => {
  let mostActive: string = "";
  let maxTotal = 0;
  for (const [key, value] of Object.entries(data)) {
    if (key === "sum" || key === "invalid date" || key === "NaN") continue;
    if (value.total > maxTotal) {
      mostActive = capitalize(key);
      maxTotal = value.total;
    }
  }
  return mostActive;
};

interface MostTypedOutput {
  language: string;
  time: string;
}

export const MostTyped = (data: Stats): MostTypedOutput => {
  let mostTyped: string = "";
  let maxTotal: number = 0;

  for (const [key, value] of Object.entries(data)) {
    if (key === "total") continue;
    if (value > maxTotal) {
      mostTyped = key;
      maxTotal = value;
    }
  }

  let output: MostTypedOutput = { language: mostTyped, time: msToHM(maxTotal) };

  return output;
};

export const avgNumber = (data: GenStats): number => {
  let num: number = 0;
  for (const [key, value] of Object.entries(data)) {
    if (key === "sum" || key === "invalid date" || key === "NaN") continue;
    if (value.total > 0) num++;
  }
  return num !== 0 ? num : 1;
};

export const formatLeetCodeData = (
  ltPayload: LeetCodeStats,
  username: string
): LeetCodeData => {
  const { matchedUser, allQuestionsCount, userContestRanking } = ltPayload.data;

  const getProblemStats = (
    difficulty: "All" | "Easy" | "Medium" | "Hard"
  ): Problems => {
    const total =
      allQuestionsCount.find((d) => d.difficulty === difficulty)?.count || 0;
    const solved =
      matchedUser.submitStatsGlobal.acSubmissionNum.find(
        (d) => d.difficulty === difficulty
      )?.count || 0;

    return { total, solved };
  };

  return {
    username,
    rank: matchedUser.profile.ranking,
    contributionPoints: matchedUser.contributions.points,
    contestAttended: userContestRanking?.attendedContestsCount || 0,
    contestRating: userContestRanking?.rating || 0,
    topPercentage: userContestRanking?.topPercentage || 0,
    all: getProblemStats("All"),
    easy: getProblemStats("Easy"),
    medium: getProblemStats("Medium"),
    hard: getProblemStats("Hard"),
  };
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
