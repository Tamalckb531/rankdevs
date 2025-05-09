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

const MonthlyDataCardWrapper = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);
  if (!dashboard) return;

  const langOutput = MostTyped(dashboard.monthlyStats.sum);
  const average = avgNumber(dashboard.monthlyStats);
  return (
    <div className=" min-h-[220px] w-full flex flex-col lg:flex-row items-center justify-around">
      <div className=" flex items-center justify-around w-full">
        <StatCard
          stat={dashboard?.monthlyStats.sum.total || 0}
          label="Total Typed"
        />
        <StatCard
          stat={(dashboard?.monthlyStats.sum.total || 0) / average}
          label={`Average (Day) ${average}`}
        />
      </div>
      <div className="flex items-center justify-around w-full">
        <StatCard
          stat={`Day ${MostActive(dashboard.monthlyStats)}`}
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

export default MonthlyDataCardWrapper;
