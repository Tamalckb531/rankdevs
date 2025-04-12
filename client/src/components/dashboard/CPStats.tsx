import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PlatfromSelect from "./CPComp/PlatfromSelect";

const CPStats = () => {
  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Leetcode</CardTitle>
        <PlatfromSelect />
      </CardHeader>

      <CardContent className=" flex"></CardContent>
    </Card>
  );
};

export default CPStats;
