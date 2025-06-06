"use client";
import { DashBoardPayload } from "@/lib/type";
import useDashboardStore from "@/store/useDashboardStore";
import { useMutation } from "@tanstack/react-query";
import useDashboardBatch from "./useDashboardBatch";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const useDashboard = (username: string) => {
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
      const res = await fetch(`${backendUrl}/api/dashboard/data/${username}`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Can't find the data");
      }

      const data: DashBoardPayload = await res.json();
      setDashboard(data);
    },

    onSuccess: () => {
      const queue = [
        () => CalculateTotal("sum"),
        () => CalculateWeekly("time"),
        () => CalculateYearly("time"),
        () => CalculateMonthly("time"),
        () => FetchLeetCode(),
        () => FetchGithub(),
      ];

      for (const fn of queue) {
        try {
          fn();
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  return mutation;
};

export default useDashboard;
