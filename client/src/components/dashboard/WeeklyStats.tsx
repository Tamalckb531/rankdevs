import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./WeeklyComp/StatSelect";
import { WeeklyPieChart } from "./WeeklyComp/weeklyPieChart";
import useWeeklyStateStore from "@/store/useWeeklyStatsStore";
import { Skeleton } from "../ui/skeleton";
import WeeklyDataCardWrapper from "./WeeklyComp/WeeklyDataCardWrapper";
import useDashboardStore from "@/store/useDashboardStore";
import { getWeekSpan } from "@/lib/DMY&TimeFormatter";

const WeeklyStats = () => {
  const weeklyStats = useWeeklyStateStore((state) => state.weeklyStats);
  const time = useDashboardStore((state) => state.dashboard?.latestTime);

  if (weeklyStats.isError || !weeklyStats) {
    return (
      <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can't show Weekly Stats
        </div>
      </Card>
    );
  }

  if (!weeklyStats.isLoading && weeklyStats.data.length === 0) {
    return (
      <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <Header time="Time data not available" />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <Header time={getWeekSpan(time)} />

      {!weeklyStats.isLoading ? (
        <Content mode={weeklyStats.mode} />
      ) : (
        <Skeleton className="w-full h-[90%]" />
      )}
    </Card>
  );
};

export default WeeklyStats;

const Header = ({ time }: { time: string }) => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold cursor-pointer" title={time}>
        Weekly Stats
      </CardTitle>
      <StatSelect />
    </CardHeader>
  );
};

const Content = ({ mode }: { mode: string }) => {
  return (
    <CardContent>
      {mode === "stats" ? <WeeklyDataCardWrapper /> : <WeeklyPieChart />}
    </CardContent>
  );
};
