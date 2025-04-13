import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import PlatfromSelect from "./CPComp/PlatfromSelect";
import StatSelect from "./StatsComp/StatSelect";

const WeeklyStats = () => {
  return (
    <Card className=" border flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Weekly Stats</CardTitle>
        <StatSelect />
      </CardHeader>
    </Card>
  );
};

export default WeeklyStats;
