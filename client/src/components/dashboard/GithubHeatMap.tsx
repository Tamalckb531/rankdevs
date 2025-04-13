import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const GithubHeatMap = () => {
  return (
    <Card className="md:flex flex-col md:col-span-2 bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Github Heatmap</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col items-center justify-center h-full">
        <GitHubCalendar username="Tamalckb531" />
      </CardContent>
    </Card>
  );
};

export default GithubHeatMap;

//?hidden md:block md:col-span-2
