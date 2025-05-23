"use client";

import {
  formatGithubData,
  formatLeetCodeData,
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
  LeetCodeStats,
  LeetCodeData,
  GitHubUserStats,
  CodeForceData,
} from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import useGithubStatsStore from "@/store/useGithbuStatsStore";
import useLeetCodeStatsStore from "@/store/useCPStatsStore";
import useMonthlyStatsStore from "@/store/useMonthlyStatsStore";
import useTotalStateStore from "@/store/useTotalStatsStore";
import useWeeklyStateStore from "@/store/useWeeklyStatsStore";
import useYearlyStateStore from "@/store/useYearlyStateStore";

const useDashboardBatch = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);

  //! Calculate Total Stats
  const totalStore = useTotalStateStore();

  const CalculateTotal = (mode: any) => {
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

  //! Calculate Weekly Stats
  const weeklyStore = useWeeklyStateStore();

  const CalculateWeekly = (mode: StatMode) => {
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

  //! Calculate Yearly Stats
  const yearlyStore = useYearlyStateStore();

  const CalculateYearly = (mode: StatMode) => {
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

  //! Calculate Yearly Stats
  const monthlyStats = useMonthlyStatsStore();

  const CalculateMonthly = (mode: StatMode) => {
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

  const cp = useLeetCodeStatsStore();

  //! Fetch user LeetCode data
  const FetchLeetCode = async () => {
    cp.setLoading(true);
    cp.setError(false);

    try {
      const username = dashboard?.leetcodeLink;
      if (!username) throw new Error("Leetcode username not found");
      if (cp.cpStats.lcData?.username === username) return;

      const res = await fetch(`/api/leetcode/${username}`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const payload: LeetCodeStats = await res.json();
      const data: LeetCodeData = formatLeetCodeData(payload, username);

      cp.setLeetCodeStats(data);
    } catch (err) {
      cp.setError(true);
      console.error("Fetch LeetCode Error:", err);
    } finally {
      cp.setLoading(false);
    }
  };

  const FetchCodeForce = async () => {
    cp.setLoading(true);
    cp.setError(false);

    try {
      const username = dashboard?.codeforcesLink;
      if (!username) throw new Error("Codeforce username not found");
      if (cp.cpStats.cfData?.username === username) return;

      const res = await fetch(`/api/codeforce/${username}`);
      if (res.status !== 200) {
        throw new Error("can't get data");
      }
      const data: CodeForceData = await res.json();

      cp.setCodeForceStats(data);
    } catch (err) {
      cp.setError(true);
      console.error("fetch CodeForce Error:", err);
    } finally {
      cp.setLoading(false);
    }
  };

  //! Fetch user LeetCode data
  const ghStats = useGithubStatsStore();

  const FetchGithub = async () => {
    ghStats.setLoading(true);
    ghStats.setError(false);

    try {
      const username = dashboard?.githubUserName;
      if (!username) throw new Error("Github username not found");
      if (ghStats.githubStats.data?.username === username) return;

      const res = await fetch(`/api/github/${username}?date=${Date.now()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const payload: GitHubUserStats = await res.json();
      const data = formatGithubData(payload, username);

      ghStats.setGithubStats(data);
    } catch (err) {
      ghStats.setError(true);
      console.error("fetch Github Error:", err);
    } finally {
      ghStats.setLoading(false);
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
