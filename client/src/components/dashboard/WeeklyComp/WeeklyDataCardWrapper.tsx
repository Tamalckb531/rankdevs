import { LanguageCard } from "@/components/Leaderboard/LanguageCard";
import { avgNumber, MostActive, MostTyped } from "@/lib/batchHelper";
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

  if (dashboard.weeklyStats.sum.total === 0) {
    return (
      <div className=" min-h-[220px] w-full flex flex-col items-center justify-around">
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Nothing to show right now
        </div>
      </div>
    );
  }

  const langOutput = MostTyped(dashboard.weeklyStats.sum);
  const average = avgNumber(dashboard.weeklyStats);
  return (
    <div className=" min-h-[220px] w-full flex flex-col items-center justify-around">
      <div className=" flex items-center justify-around w-full">
        <StatCard
          stat={dashboard?.weeklyStats.sum.total || 0}
          label="Total Typed"
        />
        <StatCard
          stat={(dashboard?.weeklyStats.sum.total || 0) / average}
          label={`Average (Day) ${average}`}
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
      <LanguageCard language={language} time={time} />
      <p className=" text-wrap text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default WeeklyDataCardWrapper;
