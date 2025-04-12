import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { YearlyPieChart } from "./TotalStatComp/YearlyPieChart";
import { YearSelect } from "./TotalStatComp/YearSelect";
import TopLanguageTip from "./TotalStatComp/TopLanguageTip";

const TotalStats = () => {
  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Coding Stats</CardTitle>
        <YearSelect />
      </CardHeader>

      <CardContent className=" flex">
        <YearlyPieChart />
        <TopLanguageTip />
      </CardContent>
    </Card>
  );
};

export default TotalStats;
