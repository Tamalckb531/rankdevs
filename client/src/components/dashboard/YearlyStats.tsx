import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./StatsComp/StatSelect";
import { YearlyLineChart } from "./YearlyComp/YearlyLineChart";
import useYearlyStateStore from "@/store/useYearlyStateStore";
import { Skeleton } from "../ui/skeleton";

const YearlyStats = () => {
  const yearlyStats = useYearlyStateStore((state) => state.yearlyStats);

  if (yearlyStats.isError) {
    return (
      <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can't show Yearly Stats
        </div>
      </Card>
    );
  }

  if (!yearlyStats.isLoading && yearlyStats.data.length === 0) {
    return (
      <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
        <Header />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <Header />
      {!yearlyStats.isLoading ? (
        <Content />
      ) : (
        <Skeleton className="w-full h-[90%]" />
      )}
    </Card>
  );
};

export default YearlyStats;

const Header = () => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold">Yearly Stats</CardTitle>
      {/* <StatSelect /> */}
    </CardHeader>
  );
};

const Content = () => {
  return (
    <CardContent>
      <YearlyLineChart />
    </CardContent>
  );
};
