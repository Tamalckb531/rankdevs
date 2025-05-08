import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatSelect from "./StatsComp/StatSelect";
import { MonthlyPieChart } from "./MonthlyComp/monthlyPieChart";

const MonthlyStats = () => {
  return (
    <Card className="flex flex-col md:col-span-2 lg:col-span-3 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Monthly Stats</CardTitle>
        {/* <StatSelect /> */}
      </CardHeader>
      <CardContent>
        <MonthlyPieChart />
      </CardContent>
    </Card>
  );
};

export default MonthlyStats;
