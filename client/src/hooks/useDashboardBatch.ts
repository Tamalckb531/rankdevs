"use client";

import {
  getMonthlyChartData,
  getTotalChartData,
  getWeeklyChartData,
  getYearlyChartData,
} from "@/lib/batchHelper";
import {
  Stats,
  StatMode,
  WeeklyStats,
  YearlyStats,
  MonthlyStats,
} from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import useMonthlyStatsStore from "@/store/useMonthlyStatsStore";
import useTotalStateStore from "@/store/useTotalStatsStore";
import useWeeklyStateStore from "@/store/useWeeklyStatsStore";
import useYearlyStateStore from "@/store/useYearlyStateStore";

const useDashboardBatch = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);

  //? Calculate Total Stats
  const totalStore = useTotalStateStore();

  const CalculateTotal = (mode: any) => {
    console.log("CalculateTotal Run");
    try {
      const data: Stats | undefined = dashboard?.totalStats[mode];

      if (!data) return;

      const chartData = getTotalChartData(data);
      totalStore.setTotalStats(chartData);
      totalStore.setTotal(data.total || 0);
    } catch (err: any) {
      totalStore.setError(true);
      console.error("Total Stats Error:", err);
    } finally {
      totalStore.setLoading(false);
    }
  };

  //? Calculate Weekly Stats
  const weeklyStore = useWeeklyStateStore();

  const CalculateWeekly = (mode: StatMode) => {
    console.log("CalculateWeekly Run: ", mode);
    if (mode === "stats") return;

    try {
      const data: WeeklyStats | undefined = dashboard?.weeklyStats;
      if (!data) return;

      const chartData = getWeeklyChartData(data, mode);
      weeklyStore.setWeeklyStats(chartData);
    } catch (err) {
      weeklyStore.setError(true);
      console.error("Weekly Stats Error:", err);
    } finally {
      weeklyStore.setLoading(false);
    }
  };

  //? Calculate Yearly Stats
  const yearlyStore = useYearlyStateStore();

  const CalculateYearly = (mode: StatMode) => {
    console.log("CalculateYearly Run");
    if (mode === "stats") return;

    try {
      const data: YearlyStats | undefined = dashboard?.yearlyStats;
      if (!data) return;

      const chartData = getYearlyChartData(data, mode);
      yearlyStore.setYearlyStats(chartData);
    } catch (err) {
      yearlyStore.setError(true);
      console.error("Yearly Stats Error:", err);
    } finally {
      yearlyStore.setLoading(false);
    }
  };

  //? Calculate Yearly Stats
  const monthlyStats = useMonthlyStatsStore();

  const CalculateMonthly = (mode: StatMode) => {
    console.log("CalculateMonthly Run");
    if (mode === "stats") return;

    try {
      const data: MonthlyStats | undefined = dashboard?.monthlyStats;
      if (!data) return;

      const chartData = getMonthlyChartData(data, mode);
      monthlyStats.setMonthlyStats(chartData);
    } catch (err) {
      monthlyStats.setError(true);
      console.error("Yearly Stats Error:", err);
    } finally {
      monthlyStats.setLoading(false);
    }
  };
  const FetchLeetCode = async () => {
    console.log("FetchLeetCode Run");

    try {
      // TODO: add fetch LeetCode logic
    } catch (err) {
      console.error("Fetch LeetCode Error:", err);
    }
  };
  const FetchCodeForce = async () => {
    console.log("FetchCodeForce Run");

    try {
      // TODO: add fetch CodeForce logic
    } catch (err) {
      console.error("fetch CodeForce Error:", err);
    }
  };
  const FetchGithub = async () => {
    console.log("FetchGithub Run");

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
