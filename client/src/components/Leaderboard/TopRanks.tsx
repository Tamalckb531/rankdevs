import React from "react";
import RankCard from "./RankCard";
import Podium from "./Podium";

interface Props {
  rank: string;
}

const TopRanks = ({ rank }: Props) => {
  return (
    <div className=" flex flex-col gap-2 items-center justify-center">
      <RankCard rank={rank} />
      <Podium />
    </div>
  );
};

export default TopRanks;
