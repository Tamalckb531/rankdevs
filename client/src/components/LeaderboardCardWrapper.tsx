import React from "react";
import TopRanks from "./Leaderboard/TopRanks";

const LeaderboardCardWrapper = () => {
  return (
    <div className=" w-[60rem] h-[20rem] flex items-center justify-center gap-5 mt-2 border-8">
      <TopRanks rank="2" />
      <TopRanks rank="1" />
      <TopRanks rank="3" />
    </div>
  );
};

export default LeaderboardCardWrapper;
