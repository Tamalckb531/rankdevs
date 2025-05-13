import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PlatfromSelect from "./CPComp/PlatfromSelect";
import LeetcodeStats from "./CPComp/LeetcodeStats";
import useLeetCodeStatsStore from "@/store/useCPStatsStore";
import { CodeForceData, CPMode, LeetCodeData } from "@/lib/type";
import CodeForceStats from "./CPComp/CodeForceStats";

const CPStats = () => {
  const cpStats = useLeetCodeStatsStore((state) => state.cpStats);
  let text: string;
  let data: LeetCodeData | CodeForceData | null;
  switch (cpStats.mode) {
    case "leetcode":
      text = "LeetCode";
      data = cpStats.lcData;
      break;
    case "codeforce":
      text = "CodeForce";
      data = cpStats.cfData;
      break;
    default:
      text = "";
      data = null;
      break;
  }

  if (!cpStats || cpStats.isError) {
    return (
      <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <Header text={text} />
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can't show {text} Stats
        </div>
      </Card>
    );
  }

  if (!cpStats.isLoading && !data) {
    return (
      <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <Header text={text} />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <Header text={text} />
      <Content loading={cpStats.isLoading} mode={cpStats.mode} />
    </Card>
  );
};

export default CPStats;

const Header = ({ text }: { text: string }) => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold">{text}</CardTitle>
      <PlatfromSelect />
    </CardHeader>
  );
};

interface content {
  loading: boolean;
  mode: CPMode;
}

const Content = ({ loading, mode }: content) => {
  return (
    <CardContent className=" flex flex-col gap-2 -mt-3">
      {mode === "leetcode" ? (
        <LeetcodeStats loading={loading} />
      ) : (
        <CodeForceStats loading={loading} />
      )}
    </CardContent>
  );
};
