import { DashBoardPayload } from "@/lib/type";
import { create } from "zustand";

type DashboardStore = {
  dashboard: DashBoardPayload | null;
  setDashboard: (dashboard: DashBoardPayload | null) => void;
};

const useDashboardStore = create<DashboardStore>((set) => ({
  dashboard: null,
  setDashboard: (dashboard) => set({ dashboard }),
}));

export default useDashboardStore;
