"use client";
import { DashBoardPayload } from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import { useMutation } from "@tanstack/react-query";
import useDashboardBatch from "./useDashboardBatch";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const useDashboard = (userId: string) => {
  const setDashboard = useDashboardStore((state) => state.setDashboard);
  const {
    CalculateTotal,
    CalculateWeekly,
    CalculateMonthly,
    CalculateYearly,
    FetchLeetCode,
    FetchGithub,
  } = useDashboardBatch();

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

    onSuccess: async () => {
      const queue = [
        () => CalculateTotal(),
        () => CalculateWeekly(),
        () => CalculateYearly(),
        () => CalculateMonthly(),
        () => FetchLeetCode(),
        () => FetchGithub(),
      ];

      for (const fn of queue) {
        try {
          await fn();
        } catch (err) {
          console.log("Batch failed: ", err);
        }
      }
    },
  });

  return mutation;
};

export default useDashboard;
