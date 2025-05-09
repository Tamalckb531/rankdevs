import { LanguageCard } from "@/components/Leaderboard/LanguageCard";
import { MostActive, MostTyped } from "@/lib/batchHelper";
import { msToHM } from "@/lib/language";
import useDashboardStore from "@/store/useDashboardStore";
import React from "react";

interface Info {
  stat: number | string;
  label: string;
}

interface Lang {
  language: string;
  time: string;
  label: string;
}

const WeeklyDataCardWrapper = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);
  if (!dashboard) return;

  const langOutput = MostTyped(dashboard.weeklyStats.sum);
  return (
    <div className=" min-h-[200px] w-full flex flex-col items-center justify-around">
      <div className=" flex items-center justify-around w-full">
        <StatCard
          stat={dashboard?.weeklyStats.sum.total || 0}
          label="Total Typed"
        />
        <StatCard
          stat={(dashboard?.weeklyStats.sum.total || 0) / 7}
          label="Average"
        />
      </div>
      <div className="flex items-center justify-around w-full">
        <StatCard
          stat={MostActive(dashboard?.weeklyStats)}
          label="Most active"
        />
        <MostLangCard
          language={langOutput.language}
          time={langOutput.time}
          label="Most Typed"
        />
      </div>
    </div>
  );
};

const StatCard = ({ stat, label }: Info) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full mt-2">
      <p className=" font-bold text-xl">
        {typeof stat === "number" ? msToHM(stat) : stat}
      </p>
      <p className=" text-wrap text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

const MostLangCard = ({ language, time, label }: Lang) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full mt-2">
      <p className="">
        <LanguageCard language={language} time={time} />
      </p>
      <p className=" text-wrap text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default WeeklyDataCardWrapper;
