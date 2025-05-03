import { TabType } from "@/lib/type";
import { create } from "zustand";

type TabState = {
  tab: TabType;
  setTab: (tab: TabType) => void;
};

const useTabStore = create<TabState>((set) => ({
  tab: "daily",
  setTab: (tab) => set({ tab }),
}));

export default useTabStore;

//? const tab = useTabStore((state) => state.tab);
//? const setTab = useTabStore((state) => state.setTab);
