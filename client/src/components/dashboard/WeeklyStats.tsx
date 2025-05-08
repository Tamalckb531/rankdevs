import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./StatsComp/StatSelect";
import { WeeklyPieChart } from "./WeeklyComp/weeklyPieChart";
import useWeeklyStateStore from "@/store/useWeeklyStatsStore";
import { Skeleton } from "../ui/skeleton";

const WeeklyStats = () => {
  const weeklyStats = useWeeklyStateStore((state) => state.weeklyStats);

  if (weeklyStats.isError) {
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
        <Header />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <Header />

      {!weeklyStats.isLoading ? (
        <Content />
      ) : (
        <Skeleton className="w-full h-[90%]" />
      )}
    </Card>
  );
};

export default WeeklyStats;

const Header = () => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold">Weekly Stats</CardTitle>
      <StatSelect />
    </CardHeader>
  );
};

const Content = () => {
  return (
    <CardContent>
      <WeeklyPieChart />
    </CardContent>
  );
};
