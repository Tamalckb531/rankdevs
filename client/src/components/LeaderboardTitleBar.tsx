import React from "react";
import LeaderboardText from "./Leaderboard/LeaderboardText";
import LeaderboardTab from "./Leaderboard/LearderboardTab";

const LeaderboardTitleBar = () => {
  return (
    <div className=" flex md:flex-row flex-col gap-3 items-center justify-between md:mt-2 mt-3">
      <LeaderboardText />
      <LeaderboardTab />
    </div>
  );
};

export default LeaderboardTitleBar;
