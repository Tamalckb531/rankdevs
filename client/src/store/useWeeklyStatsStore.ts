import { ChartData, StatMode, WeeklyStatsPayload } from "@/lib/type";
import { create } from "zustand";

type WeeklyStateStore = {
  weeklyStats: WeeklyStatsPayload;
  setWeeklyStats: (data: ChartData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMode: (mode: StatMode) => void;
};

const init: WeeklyStatsPayload = {
  mode: "time",
  data: [],
  isLoading: true,
  isError: false,
};

const useWeeklyStateStore = create<WeeklyStateStore>((set) => ({
  weeklyStats: init,
  setWeeklyStats: (data) =>
    set((state) => ({
      weeklyStats: {
        ...state.weeklyStats,
        data: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      weeklyStats: {
        ...state.weeklyStats,
        isLoading: loading,
      },
    })),
  setError: (error) =>
    set((state) => ({
      weeklyStats: {
        ...state.weeklyStats,
        isError: error,
      },
    })),
  setMode: (mode) =>
    set((state) => ({
      weeklyStats: {
        ...state.weeklyStats,
        mode,
      },
    })),
}));

export default useWeeklyStateStore;
