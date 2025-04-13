import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./StatsComp/StatSelect";
import { WeeklyPieChart } from "./WeeklyComp/weeklyPieChart";

const WeeklyStats = () => {
  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Weekly Stats</CardTitle>
        <StatSelect />
      </CardHeader>
      <CardContent>
        <WeeklyPieChart />
      </CardContent>
    </Card>
  );
};

export default WeeklyStats;
