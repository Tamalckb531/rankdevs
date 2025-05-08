import { TotalChartData, TotalStatsPayload } from "@/lib/type";
import { create } from "zustand";

type TotalStateStore = {
  totalStats: TotalStatsPayload;
  setTotalStats: (data: TotalChartData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMode: (mode: string) => void;
  setTotal: (total: number) => void;
};

const init: TotalStatsPayload = {
  mode: "sum",
  data: [],
  total: 0,
  isLoading: true,
  isError: false,
  error: null,
};

const useTotalStateStore = create<TotalStateStore>((set) => ({
  totalStats: init,
  setTotalStats: (data) =>
    set((state) => ({
      totalStats: {
        ...state.totalStats,
        data: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      totalStats: {
        ...state.totalStats,
        isLoading: loading,
      },
    })),

  setError: (error) =>
    set((state) => ({
      totalStats: {
        ...state.totalStats,
        isError: error,
      },
    })),

  setMode: (mode) =>
    set((state) => ({
      totalStats: {
        ...state.totalStats,
        mode,
      },
    })),

  setTotal: (total) =>
    set((state) => ({
      totalStats: {
        ...state.totalStats,
        total,
      },
    })),
}));

export default useTotalStateStore;
