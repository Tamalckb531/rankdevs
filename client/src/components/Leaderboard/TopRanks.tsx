import React from "react";
import RankCard from "./RankCard";
import Podium from "./Podium";

const TopRanks = () => {
  return (
    <div className=" flex flex-col gap-2 items-center justify-center">
      <RankCard />
      <Podium />
    </div>
  );
};

export default TopRanks;
