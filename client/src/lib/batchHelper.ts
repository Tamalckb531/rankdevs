import { languages } from "./language";
import { Stats, TotalChartData } from "./type";

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
