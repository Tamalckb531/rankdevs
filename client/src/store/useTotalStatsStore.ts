import { TotalStatsPayload } from "@/lib/type";
import { create } from "zustand";

type TotalStateStore = {
  totalStats: TotalStatsPayload;
  setTotalStats: (totalStats: TotalStatsPayload) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMode: (mode: string) => void;
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
  setTotalStats: (totalStats) => set({ totalStats }),
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
        isError: !!error,
        error,
      },
    })),

  setMode: (mode) =>
    set((state) => ({
      totalStats: {
        ...state.totalStats,
        mode,
      },
    })),
}));

export default useTotalStateStore;
