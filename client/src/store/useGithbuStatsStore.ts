import { LeetCodeData, GHPayload, GithubData } from "@/lib/type";
import { create } from "zustand";

type GithubStatsStore = {
  githubStats: GHPayload;
  setGithubStats: (data: GithubData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
};

const init: GHPayload = {
  data: null,
  isLoading: true,
  isError: false,
};

const useGithubStatsStore = create<GithubStatsStore>((set) => ({
  githubStats: init,
  setGithubStats: (data) =>
    set((state) => ({
      githubStats: {
        ...state.githubStats,
        data: data,
      },
    })),
  setLoading: (loading) =>
    set((state) => ({
      githubStats: {
        ...state.githubStats,
        isLoading: loading,
      },
    })),
  setError: (error) =>
    set((state) => ({
      githubStats: {
        ...state.githubStats,
        isError: error,
      },
    })),
}));

export default useGithubStatsStore;
