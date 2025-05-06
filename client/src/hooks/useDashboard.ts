"use client";
import { DashBoardPayload } from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import { useMutation } from "@tanstack/react-query";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const useDashboard = (userId: string) => {
  const dashboard = useDashboardStore((state) => state.dashboard);
  const setDashboard = useDashboardStore((state) => state.setDashboard);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${backendUrl}/api/dashboard/data/${userId}`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Can't find the data");
      }

      const data: DashBoardPayload = await res.json();
      setDashboard(data);
    },
  });

  return mutation;
};

export default useDashboard;
