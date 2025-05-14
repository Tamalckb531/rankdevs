import { getRankInfo } from "@/lib/language";
import React from "react";
import { CFRankCard } from "./CFRankCard";
import LeetCodeStatsSkeleton from "@/components/Skeletons/LeetCodeSkeleton";
import useCPStatsStore from "@/store/useCPStatsStore";
import { CodeForceSkeleton } from "@/components/Skeletons/CodeForceSkeleton";

const CodeForceStats = ({ loading }: { loading: boolean }) => {
  if (loading) return <CodeForceSkeleton />;
  const codeForceStats = useCPStatsStore((state) => state.cpStats.cfData);
  if (!codeForceStats) return;

  const primeRank = getRankInfo(codeForceStats.maxRank);
  const newRank = getRankInfo(codeForceStats.rank);
  return (
    <>
      <div className="info-rank flex items-center justify-between">
        {/* info */}
        <div className="info flex flex-col items-start h-full mt-10 leading-8">
          <div
            className=" font-bold cursor-pointer"
            onClick={() =>
              window.open(
                `https://codeforces.com/profile/${codeForceStats.username}/`,
                "_blank"
              )
            }
          >
            {codeForceStats.username}
          </div>
          <p className=" text-sm text-slate-400">
            Last Active
            <span className=" dark:text-green-400 font-bold text-green-600 ml-1">
              {codeForceStats.lastActive}
            </span>
          </p>
          <p className=" text-sm text-slate-400">
            Rating:
            <span className=" dark:text-green-400 font-bold text-green-600 ml-1">
              {codeForceStats.rating}
            </span>
          </p>
          <p className=" text-sm text-slate-400">
            Max Rating:
            <span className=" dark:text-green-400 font-bold text-green-600 ml-1">
              {codeForceStats.maxRating}
            </span>
          </p>
        </div>
        <div className="stat flex flex-col items-center justify-between gap-2 w-[40%] text-slate-400 text-lg cursor-pointer">
          <div
            className=" flex items-center justify-between w-full"
            title={codeForceStats.maxRank}
          >
            On Prime :{" "}
            {<CFRankCard rank={primeRank.name} color={primeRank.color} />}
          </div>
          <div
            className="flex items-center justify-between w-full"
            title={codeForceStats.rank}
          >
            Now : {<CFRankCard rank={newRank.name} color={newRank.color} />}
          </div>
        </div>
      </div>
      <div className="stat flex items-center justify-between mt-2">
        <StatCard
          topic="Contest Attended"
          stat={codeForceStats.contestAttended}
        />
        <StatCard topic="Friends" stat={codeForceStats.friend} />
        <StatCard topic="Contributions" stat={codeForceStats.contribution} />
      </div>
    </>
  );
};

export default CodeForceStats;

interface stat {
  topic: string;
  stat: number;
}

const StatCard = ({ topic, stat }: stat) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center mt-2">
      <p className=" font-bold text-lg">{stat}</p>
      <p className=" text-wrap text-xs text-slate-400">{topic}</p>
    </div>
  );
};
