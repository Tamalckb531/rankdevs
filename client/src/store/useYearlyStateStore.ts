import { ChartData, StatMode, StatsPayload } from "@/lib/type";
import { create } from "zustand";

type YearlyStateStore = {
  yearlyStats: StatsPayload;
  setYearlyStats: (data: ChartData[]) => void;
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

const useYearlyStateStore = create<YearlyStateStore>((set) => ({
  yearlyStats: init,
  setYearlyStats: (data) =>
    set((state) => ({
      yearlyStats: {
        ...state.yearlyStats,
        data: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      yearlyStats: {
        ...state.yearlyStats,
        isLoading: loading,
      },
    })),
  setError: (error) =>
    set((state) => ({
      yearlyStats: {
        ...state.yearlyStats,
        isError: error,
      },
    })),
  setMode: (mode) =>
    set((state) => ({
      yearlyStats: {
        ...state.yearlyStats,
        mode,
      },
    })),
}));

export default useYearlyStateStore;
