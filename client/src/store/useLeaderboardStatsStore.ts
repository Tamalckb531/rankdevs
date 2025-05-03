import { statPayload } from "@/lib/type";
import { create } from "zustand";

type LeaderboardStatsState = {
  ls: statPayload[];
  setLs: (ls: statPayload[]) => void;
};

const useLSSTore = create<LeaderboardStatsState>((set) => ({
  ls: [],
  setLs: (ls) => set({ ls }),
}));

export default useLSSTore;

//? const ls = useTabStore((state) => state.ls);
//? const setLs = useTabStore((state) => state.setLs);
