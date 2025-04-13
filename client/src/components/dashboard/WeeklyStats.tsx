import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./StatsComp/StatSelect";

const WeeklyStats = () => {
  return (
    <Card className=" border flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Weekly Stats</CardTitle>
        <StatSelect />
      </CardHeader>
      <CardContent className=" flex flex-col gap-2 -mt-3"></CardContent>
    </Card>
  );
};

export default WeeklyStats;
