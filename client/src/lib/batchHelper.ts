import { languages } from "./language";
import {
  Stats,
  TotalChartData,
  ChartData,
  StatMode,
  WeeklyStats,
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
  data: WeeklyStats,
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

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
