import { statPayload } from "@/lib/type";
import { create } from "zustand";

type LeaderboardStatsState = {
  ls: statPayload[] | null;
  setLs: (ls: statPayload[] | null) => void;
};

const useLSSTore = create<LeaderboardStatsState>((set) => ({
  ls: null,
  setLs: (ls) => set({ ls }),
}));

export default useLSSTore;

//? const ls = useTabStore((state) => state.ls);
//? const setLs = useTabStore((state) => state.setLs);
