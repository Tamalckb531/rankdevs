import React from "react";

const CodeForceStats = () => {
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
        <div className="stat flex items-center justify-between gap-2 flex-wrap w-[50%]">
          <div>On Prime : Legendary Grandmaster</div>
          <div>Now : International Grandmaster</div>
        </div>
      </div>
    </>
  );
};

export default CodeForceStats;
