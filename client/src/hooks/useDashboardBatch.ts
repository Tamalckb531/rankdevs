"use client";

import { languages } from "@/lib/language";
import { Stats, TotalChartData } from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import useTotalStateStore from "@/store/useTotalStatsStore";

const useDashboardBatch = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);

  //? Calculate Total Stats
  const setTotalStats = useTotalStateStore((state) => state.setTotalStats);
  const setLoading = useTotalStateStore((state) => state.setLoading);
  const setError = useTotalStateStore((state) => state.setError);

  const CalculateTotal = async (mode: any) => {
    console.log("Run");
    try {
      const data: Stats | undefined = dashboard?.totalStats[mode];

      if (!data) return;

      const chartData: TotalChartData[] = Object.entries(data)
        .filter(([key]) => key !== "total")
        .map(([key, time]) => ({
          languages: key,
          time,
          fill: languages[key]?.color || "#000",
        }))
        .sort((a, b) => b.time - a.time);

      setTotalStats(chartData);
    } catch (err: any) {
      setError(true);
      console.error("Total Stats Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const CalculateYearly = async () => {
    try {
      // TODO: add yearly calculation logic
    } catch (err) {
      console.error("Yearly Stats Error:", err);
    }
  };
  const CalculateWeekly = async () => {
    try {
      // TODO: add weekly calculation logic
    } catch (err) {
      console.error("Weekly Stats Error:", err);
    }
  };
  const CalculateMonthly = async () => {
    try {
      // TODO: add Monthly calculation logic
    } catch (err) {
      console.error("Monthly Stats Error:", err);
    }
  };
  const FetchLeetCode = async () => {
    try {
      // TODO: add fetch LeetCode logic
    } catch (err) {
      console.error("Fetch LeetCode Error:", err);
    }
  };
  const FetchCodeForce = async () => {
    try {
      // TODO: add fetch CodeForce logic
    } catch (err) {
      console.error("fetch CodeForce Error:", err);
    }
  };
  const FetchGithub = async () => {
    try {
      // TODO: add fetch Github logic
    } catch (err) {
      console.error("fetch Github Error:", err);
    }
  };

  return {
    CalculateTotal,
    CalculateYearly,
    CalculateWeekly,
    CalculateMonthly,
    FetchLeetCode,
    FetchCodeForce,
    FetchGithub,
  };
};

export default useDashboardBatch;
