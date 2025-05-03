"use client";
import { statPayload } from "@/lib/type";
import useLSSTore from "@/store/useLeaderboardStatsStore";
import useTabStore from "@/store/userTabStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const useLeaderboard = () => {
  const setLs = useLSSTore((state) => state.setLs);
  const tab = useTabStore((state) => state.tab);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${backendUrl}/api/leaderboard/${tab}`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Can't find the data");
      }

      const data: statPayload[] = await res.json();
      setLs(data);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, [tab]);

  return mutation;
};

export default useLeaderboard;
