"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { YearlyPieChart } from "./TotalStatComp/YearlyPieChart";
import { YearSelect } from "./TotalStatComp/YearSelect";
import TopLanguageTip from "./TotalStatComp/TopLanguageTip";
import useTotalStateStore from "@/store/useTotalStatsStore";
import { YearlyPieChartFullSkeleton } from "../Skeletons/YearlyComponentSkeleton";

const TotalStats = () => {
  const totalStats = useTotalStateStore((state) => state.totalStats);
  if (totalStats.isError) {
    return (
      <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can&apos;t show Total Stats
        </div>
      </Card>
    );
  }

  if (!totalStats.isLoading && totalStats.data.length === 0) {
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
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <Header />

      {!totalStats.isLoading ? <Content /> : <YearlyPieChartFullSkeleton />}
    </Card>
  );
};

export default TotalStats;

const Header = () => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold">Coding Stats</CardTitle>
      <YearSelect />
    </CardHeader>
  );
};

const Content = () => {
  return (
    <CardContent className=" flex">
      <YearlyPieChart />
      <TopLanguageTip />
    </CardContent>
  );
};
