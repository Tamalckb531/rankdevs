import React from "react";
import RankCard from "./RankCard";
import RankPodium from "./RankPodium";
import RankCardSkeleton from "../Skeletons/RankCardSkeleton";

interface Props {
  rank: number;
  isPending: boolean;
}

const TopRanks = ({ rank, isPending }: Props) => {
  return (
    <div
      className={` ${
        rank === 2 || rank === 3 ? "hidden" : "flex"
      } md:flex flex-col gap-2 items-center justify-end h-full`}
    >
      {isPending ? <RankCardSkeleton /> : <RankCard rank={rank} />}
      <RankPodium position={rank} />
    </div>
  );
};

export default TopRanks;
