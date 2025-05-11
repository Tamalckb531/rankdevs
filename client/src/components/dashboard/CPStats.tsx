import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PlatfromSelect from "./CPComp/PlatfromSelect";
import LeetcodeStats from "./CPComp/LeetcodeStats";
import useLeetCodeStatsStore from "@/store/useLeetcodeStatsStore";

const CPStats = () => {
  const leetCodeStats = useLeetCodeStatsStore((state) => state.leetCodeStats);

  if (!leetCodeStats || leetCodeStats.isError) {
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
        Can't show Leetcode Stats
      </div>
    </Card>;
  }

  if (!leetCodeStats.isLoading && !leetCodeStats.data) {
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <Header />
      <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
        Data is empty
      </div>
    </Card>;
  }

  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <Header />
      <Content />
    </Card>
  );
};

export default CPStats;

const Header = () => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold">Leetcode</CardTitle>
      <PlatfromSelect />
    </CardHeader>
  );
};

const Content = () => {
  return (
    <CardContent className=" flex flex-col gap-2 -mt-3">
      <LeetcodeStats />
    </CardContent>
  );
};
