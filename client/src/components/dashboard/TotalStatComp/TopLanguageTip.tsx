import { getLanguageType, msToHM } from "@/lib/language";
import { TotalChartData } from "@/lib/type";
import useTotalStateStore from "@/store/useTotalStatsStore";
import React, { useEffect, useState } from "react";

interface slide {
  language: string;
  time: number;
  fill: string;
}

const TopLanguageTip = () => {
  const todaysStats = useTotalStateStore((state) => state.totalStats);

  const chartData = todaysStats.data.slice(0, 5);

  return (
    <div className=" flex flex-col items-center justify-center gap-1 w-full">
      {chartData.map((data) => (
        <LanguageSlide
          key={data.languages}
          language={data.languages}
          time={data.time}
          fill={data.fill}
        />
      ))}
    </div>
  );
};

const LanguageSlide = ({ language, time, fill }: slide) => {
  return (
    <div className=" flex bg-background items-center justify-between gap-2 w-full ml-5">
      <div className=" flex gap-2 items-center 2">
        <div className=" h-2 w-2" style={{ backgroundColor: fill }}></div>
        <p className=" text-slate-400">{getLanguageType(language)}</p>
      </div>
      <p className="font-bold lg:ml-3 lg:text-md text-[15px]">{msToHM(time)}</p>
    </div>
  );
};

export default TopLanguageTip;
