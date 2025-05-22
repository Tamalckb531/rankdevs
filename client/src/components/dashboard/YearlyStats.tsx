import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { YearlyLineChart } from "./YearlyComp/YearlyLineChart";
import useYearlyStateStore from "@/store/useYearlyStateStore";
import { Skeleton } from "../ui/skeleton";
import StatSelectYearly from "./YearlyComp/StatSelectYearly";
import YearlyDataCardWrapper from "./YearlyComp/YearlyDataCardWrapper";
import useDashboardStore from "@/store/useDashboardStore";
import { getYearSpan } from "@/lib/DMY&TimeFormatter";

const YearlyStats = () => {
  const yearlyStats = useYearlyStateStore((state) => state.yearlyStats);
  const time = useDashboardStore((state) => state.dashboard?.latestTime);

  if (yearlyStats.isError || !yearlyStats) {
    return (
      <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can&apos;t show Yearly Stats
        </div>
      </Card>
    );
  }

  if (!yearlyStats.isLoading && yearlyStats.data.length === 0) {
    return (
      <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
        <Header time="Time data not available" />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <Header time={getYearSpan(time)} />
      {!yearlyStats.isLoading ? (
        <Content mode={yearlyStats.mode} />
      ) : (
        <Skeleton className="w-full h-[90%]" />
      )}
    </Card>
  );
};

export default YearlyStats;

const Header = ({ time }: { time: string }) => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold cursor-pointer" title={time}>
        Yearly Stats
      </CardTitle>
      <StatSelectYearly />
    </CardHeader>
  );
};

const Content = ({ mode }: { mode: string }) => {
  return (
    <CardContent>
      {mode === "stats" ? <YearlyDataCardWrapper /> : <YearlyLineChart />}
    </CardContent>
  );
};
