import React from "react";
import TopRanks from "./Leaderboard/TopRanks";

const LeaderboardCardWrapper = () => {
  return (
    <div className=" w-[60rem] h-[20rem] flex items-center justify-center gap-5 mt-2 border-8">
      <TopRanks />
      <TopRanks />
      <TopRanks />
    </div>
  );
};

export default LeaderboardCardWrapper;
