import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MonthlyPieChart } from "./MonthlyComp/monthlyPieChart";
import useMonthlyStatsStore from "@/store/useMonthlyStatsStore";
import { Skeleton } from "../ui/skeleton";
import StatSelectMonthly from "./MonthlyComp/StatSelectMonthly";
import MonthlyDataCardWrapper from "./MonthlyComp/MonthlyDataCardWrapper";
import useDashboardStore from "@/store/useDashboardStore";
import { getMonthSpan } from "@/lib/DMY&TimeFormatter";

const MonthlyStats = () => {
  const monthlyStats = useMonthlyStatsStore((state) => state.monthlyStats);
  const time = useDashboardStore((state) => state.dashboard?.latestTime);

  if (monthlyStats.isError || !monthlyStats) {
    return (
      <Card className="flex flex-col md:col-span-2 lg:col-span-3 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can't show Monthly Stats
        </div>
      </Card>
    );
  }

  if (!monthlyStats.isLoading && monthlyStats.data.length === 0) {
    return (
      <Card className="flex flex-col md:col-span-2 lg:col-span-3 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <Header time="Time data not available" />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col md:col-span-2 lg:col-span-3 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 min-h-[300px]">
      <Header time={getMonthSpan(time)} />
      {!monthlyStats.isLoading ? (
        <Content mode={monthlyStats.mode} />
      ) : (
        <Skeleton className="w-full h-[90%]" />
      )}
    </Card>
  );
};

export default MonthlyStats;

const Header = ({ time }: { time: string }) => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold cursor-pointer" title={time}>
        Monthly Stats
      </CardTitle>
      <StatSelectMonthly />
    </CardHeader>
  );
};

const Content = ({ mode }: { mode: string }) => {
  return (
    <CardContent>
      {mode === "stats" ? <MonthlyDataCardWrapper /> : <MonthlyPieChart />}
    </CardContent>
  );
};
