"use client";

import { getTotalChartData } from "@/lib/batchHelper";
import { Stats } from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import useTotalStateStore from "@/store/useTotalStatsStore";

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

  const CalculateYearly = () => {
    console.log("CalculateYearly Run");

    try {
      // TODO: add yearly calculation logic
    } catch (err) {
      console.error("Yearly Stats Error:", err);
    }
  };
  const CalculateWeekly = () => {
    console.log("CalculateWeekly Run");

    try {
      // TODO: add weekly calculation logic
    } catch (err) {
      console.error("Weekly Stats Error:", err);
    }
  };
  const CalculateMonthly = () => {
    console.log("CalculateMonthly Run");

    try {
      // TODO: add Monthly calculation logic
    } catch (err) {
      console.error("Monthly Stats Error:", err);
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
