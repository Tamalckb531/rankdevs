import { ChartData, StatMode, StatsPayload } from "@/lib/type";
import { create } from "zustand";

type MonthlyStatsStore = {
  monthlyStats: StatsPayload;
  setMonthlyStats: (data: ChartData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMode: (mode: StatMode) => void;
};

const init: StatsPayload = {
  mode: "time",
  data: [],
  isLoading: true,
  isError: false,
};

const useMonthlyStatsStore = create<MonthlyStatsStore>((set) => ({
  monthlyStats: init,
  setMonthlyStats: (data) =>
    set((state) => ({
      monthlyStats: {
        ...state.monthlyStats,
        data: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      monthlyStats: {
        ...state.monthlyStats,
        isLoading: loading,
      },
    })),
  setError: (error) =>
    set((state) => ({
      monthlyStats: {
        ...state.monthlyStats,
        isError: error,
      },
    })),
  setMode: (mode) =>
    set((state) => ({
      monthlyStats: {
        ...state.monthlyStats,
        mode,
      },
    })),
}));

export default useMonthlyStatsStore;
