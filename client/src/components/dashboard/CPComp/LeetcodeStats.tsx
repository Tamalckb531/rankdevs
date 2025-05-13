import React from "react";
import { ModePieChart } from "./ModePieChart";
import LeetCodeStatsSkeleton from "@/components/Skeletons/LeetCodeSkeleton";
import useCPStatsStore from "@/store/useCPStatsStore";

const LeetcodeStats = ({ loading }: { loading: boolean }) => {
  if (loading) return <LeetCodeStatsSkeleton />;

  const leetCodeStats = useCPStatsStore((state) => state.cpStats.lcData);

  return (
    <>
      <div className="info-rank flex items-center justify-between">
        <div className="info flex flex-col items-start h-full mt-10 leading-8">
          <div
            className=" font-bold cursor-pointer"
            onClick={() =>
              window.open(
                `https://leetcode.com/${leetCodeStats?.username}/`,
                "_blank"
              )
            }
          >
            {leetCodeStats?.username}
          </div>
          <p className=" text-sm text-slate-400">
            Contest Rating :{" "}
            <span className=" dark:text-green-400 font-bold text-green-600">
              {Math.ceil(leetCodeStats?.contestRating || 0)}
            </span>
          </p>
          <p className=" text-sm text-slate-400">
            Global Rank :{" "}
            <span className=" dark:text-green-400 font-bold text-green-600">
              {leetCodeStats?.rank.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="stat flex items-center justify-between gap-2 flex-wrap w-[50%]">
          <StatCard
            topic="Contribution"
            stat={leetCodeStats?.contributionPoints || 0}
          />
          <StatCard
            topic="Contest"
            stat={leetCodeStats?.contestAttended || 0}
          />
          <StatCard topic="Top" stat={leetCodeStats?.topPercentage || 0} />
          <StatCard
            topic="Acceptance"
            stat={`${leetCodeStats?.acRate || 0}%`}
          />
        </div>
      </div>
      <p className="total text-sm font-bold gap-1 mt-1 flex items-center justify-center">
        {" "}
        Total{" "}
        <span className=" text-blue-400 text-[16px]">
          {leetCodeStats?.all.solved || 0}
        </span>
        /
        <span className=" text-[16px] text-blue-600">
          {leetCodeStats?.all.total || 100}
        </span>{" "}
        problem solved
      </p>
      <div className="problem-pie-chart flex items-center justify-between">
        <ModePieChart
          mode="Easy"
          solved={leetCodeStats?.easy.solved || 0}
          total={leetCodeStats?.easy.total || 100}
        />
        <ModePieChart
          mode="Med."
          solved={leetCodeStats?.medium.solved || 0}
          total={leetCodeStats?.medium.total || 100}
        />
        <ModePieChart
          mode="Hard"
          solved={leetCodeStats?.hard.solved || 0}
          total={leetCodeStats?.hard.total || 100}
        />
      </div>
    </>
  );
};

interface stat {
  topic: string;
  stat: number | string;
}

const StatCard = ({ topic, stat }: stat) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-[47%] mt-2">
      {topic === "Top" ? (
        <>
          <p className=" text-wrap text-xs">{topic}</p>
          <p className=" font-bold">{stat}%</p>
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
