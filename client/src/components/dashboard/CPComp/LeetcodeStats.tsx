import React from "react";
import { ModePieChart } from "./ModePieChart";

const LeetcodeStats = () => {
  return (
    <>
      <div className="info-rank flex items-center justify-between">
        <div className="info flex flex-col items-start h-full mt-10 leading-8">
          <p className=" font-bold">ckbtamaldipnew</p>
          <p className=" text-sm text-slate-400">
            Contest Rating :{" "}
            <span className=" dark:text-green-400 font-bold text-green-600">
              1,414
            </span>
          </p>
          <p className=" text-sm text-slate-400">
            Global Rank :{" "}
            <span className=" dark:text-green-400 font-bold text-green-600">
              5336,264
            </span>
          </p>
        </div>
        <div className="stat flex items-center justify-between gap-2 flex-wrap w-[50%]">
          <StatCard topic="Contribution" stat="582" />
          <StatCard topic="Contest" stat="1" />
          <StatCard topic="Top" stat="78.71%" />
          <StatCard topic="Acceptance" stat="80.33%" />
        </div>
      </div>
      <p className="total text-sm font-bold gap-1 mt-1 flex items-center justify-center">
        {" "}
        Total <span className=" text-blue-400 text-[16px]">182</span>/
        <span className=" text-[16px] text-blue-600">3511</span> problem solved
      </p>
      <div className="problem-pie-chart flex items-center justify-between">
        <ModePieChart mode="Easy" solved={46} total={871} />
        <ModePieChart mode="Med." solved={111} total={1821} />
        <ModePieChart mode="Hard" solved={25} total={819} />
      </div>
    </>
  );
};

interface stat {
  topic: string;
  stat: string;
}

const StatCard = ({ topic, stat }: stat) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-[47%] mt-2">
      {topic === "Top" ? (
        <>
          <p className=" text-wrap text-xs">{topic}</p>
          <p className=" font-bold">{stat}</p>
        </>
      ) : (
        <>
          <p className=" font-bold">{stat}</p>
          <p className=" text-wrap text-xs">{topic}</p>
        </>
      )}
    </div>
  );
};

export default LeetcodeStats;
