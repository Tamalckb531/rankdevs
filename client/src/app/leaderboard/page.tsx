import LeaderboardRankBar from "@/components/Leaderboard/LeaderboardRankBar";
import LeaderboardTitleBar from "@/components/LeaderboardTitleBar";
import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col md:mx-3 p-2 ">
      <LeaderboardTitleBar />
      <LeaderboardRankBar />
    </div>
  );
};

export default page;
