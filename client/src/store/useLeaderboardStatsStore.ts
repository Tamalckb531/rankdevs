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

//? const ls = useLSSTore((state) => state.ls);
//? const setLs = useLSSTore((state) => state.setLs);
