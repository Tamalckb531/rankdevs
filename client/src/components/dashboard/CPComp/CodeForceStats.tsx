import { getRankInfo } from "@/lib/language";
import React from "react";
import { CFRankCard } from "./CFRankCard";

const CodeForceStats = () => {
  const primeRank = getRankInfo("legendary grandmaster");
  const newRank = getRankInfo("specialist");
  return (
    <>
      <div className="info-rank flex items-center justify-between">
        {/* info */}
        <div className="info flex flex-col items-start h-full mt-10 leading-8">
          <div
            className=" font-bold cursor-pointer"
            // onClick={() =>
            //   window.open(
            //     `https://leetcode.com/${leetCodeStats?.username}/`,
            //     "_blank"
            //   )
            // }
          >
            TamalCDip
          </div>
          <p className=" text-sm text-slate-400">
            Last Active
            <span className=" dark:text-green-400 font-bold text-green-600 ml-1">
              13/5/25
            </span>
          </p>
          <p className=" text-sm text-slate-400">
            Rating:
            <span className=" dark:text-green-400 font-bold text-green-600 ml-1">
              2602
            </span>
          </p>
          <p className=" text-sm text-slate-400">
            Max Rating:
            <span className=" dark:text-green-400 font-bold text-green-600 ml-1">
              2902
            </span>
          </p>
        </div>
        <div className="stat flex flex-col items-center justify-between gap-2 w-[40%] text-slate-400 text-lg">
          <div
            className=" flex items-center justify-between w-full"
            title="legendary grandmaster"
          >
            On Prime :{" "}
            {<CFRankCard rank={primeRank.name} color={primeRank.color} />}
          </div>
          <div
            className="flex items-center justify-between w-full"
            title="specialist"
          >
            Now : {<CFRankCard rank={newRank.name} color={newRank.color} />}
          </div>
        </div>
      </div>
      <div className="stat flex items-center justify-between mt-2">
        <StatCard topic="Contest Attended" stat={15} />
        <StatCard topic="Friends" stat={3} />
        <StatCard topic="Contributions" stat={9} />
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
