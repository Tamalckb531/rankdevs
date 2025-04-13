import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./StatsComp/StatSelect";
import { YearlyLineChart } from "./YearlyComp/YearlyLineChart";

const YearlyStats = () => {
  return (
    <Card className="flex flex-col lg:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2 ">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Yearly Stats</CardTitle>
        <StatSelect />
      </CardHeader>
      <CardContent>
        <YearlyLineChart />
      </CardContent>
    </Card>
  );
};

export default YearlyStats;
