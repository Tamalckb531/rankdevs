import React from "react";
import TopRanks from "./Leaderboard/TopRanks";
import { Status } from "@/lib/type";

const LeaderboardCardWrapper = ({ isPending, isError, error }: Status) => {
  if (isError) {
    return;
  }

  return (
    <div className=" w-full lg:w-[60rem] h-[22rem] flex items-center justify-center gap-3 mt-10 bg-radial-[at_50%_50%] dark:from-slate-400 from-slate-200 to-bg-background to-65%">
      <TopRanks rank={2} isPending={isPending} />
      <TopRanks rank={1} isPending={isPending} />
      <TopRanks rank={3} isPending={isPending} />
    </div>
  );
};

export default LeaderboardCardWrapper;
