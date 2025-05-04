"use client";
import React from "react";
import LeaderboardCardWrapper from "@/components/LeaderboardCardWrapper";
import LeaderboardContent from "@/components/LeaderboardContent";
import useLeaderboard from "@/hooks/useLeaderboard";

const LeaderboardRankBar = () => {
  const { isPending, isError, error } = useLeaderboard();
  return (
    <div className=" flex flex-col gap-2 items-center justify-center h-full">
      <LeaderboardCardWrapper
        isPending={isPending}
        isError={isError}
        error={error}
      />
      <LeaderboardContent
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default LeaderboardRankBar;
