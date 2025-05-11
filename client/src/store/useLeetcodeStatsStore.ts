import { LeetCodeData, LCPayload } from "@/lib/type";
import { create } from "zustand";

type LeetCodeStatsStore = {
  leetCodeStats: LCPayload;
  setLeetCodeStats: (data: LeetCodeData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
};

const init: LCPayload = {
  data: null,
  isLoading: true,
  isError: false,
};

const useLeetCodeStatsStore = create<LeetCodeStatsStore>((set) => ({
  leetCodeStats: init,
  setLeetCodeStats: (data) =>
    set((state) => ({
      leetCodeStats: {
        ...state.leetCodeStats,
        data: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      leetCodeStats: {
        ...state.leetCodeStats,
        isLoading: loading,
      },
    })),
  setError: (error) =>
    set((state) => ({
      leetCodeStats: {
        ...state.leetCodeStats,
        isError: error,
      },
    })),
}));

export default useLeetCodeStatsStore;
