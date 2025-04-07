import React from "react";
import LeaderboardText from "./Leaderboard/LeaderboardText";
import LeaderboardTab from "./Leaderboard/LearderboardTab";

const LeaderboardTitleBar = () => {
  return (
    <div className=" flex items-center justify-between mt-2">
      <LeaderboardText />
      <LeaderboardTab />
    </div>
  );
};

export default LeaderboardTitleBar;
