import { LeetCodeData, CPPayload, CodeForceData, CPMode } from "@/lib/type";
import { create } from "zustand";

type CPStatsStore = {
  cpStats: CPPayload;
  setLeetCodeStats: (data: LeetCodeData) => void;
  setCodeForceStats: (data: CodeForceData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMode: (mode: CPMode) => void;
};

const init: CPPayload = {
  mode: "leetcode",
  lcData: null,
  cfData: null,
  isLoading: true,
  isError: false,
};

const useCPStatsStore = create<CPStatsStore>((set) => ({
  cpStats: init,
  setLeetCodeStats: (data) =>
    set((state) => ({
      cpStats: {
        ...state.cpStats,
        lcData: data,
      },
    })),
  setCodeForceStats: (data) =>
    set((state) => ({
      cpStats: {
        ...state.cpStats,
        cfData: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      cpStats: {
        ...state.cpStats,
        isLoading: loading,
      },
    })),
  setError: (error) =>
    set((state) => ({
      cpStats: {
        ...state.cpStats,
        isError: error,
      },
    })),
  setMode: (mode) =>
    set((state) => ({
      cpStats: {
        ...state.cpStats,
        mode,
      },
    })),
}));

export default useCPStatsStore;
