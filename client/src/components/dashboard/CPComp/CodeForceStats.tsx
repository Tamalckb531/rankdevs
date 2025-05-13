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
        <div className="stat flex items-center justify-between gap-2 flex-wrap w-[40%] text-slate-400 text-lg">
          <div className=" flex items-center justify-between w-full">
            On Prime :{" "}
            {<CFRankCard rank={primeRank.name} color={primeRank.color} />}
          </div>
          <div className="flex items-center justify-between w-full">
            Now : {<CFRankCard rank={newRank.name} color={newRank.color} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeForceStats;
