import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LanguagePieChart } from "./GithubComp/languagePieChart";
import { Badge } from "../ui/badge";

const GithubBox = () => {
  return (
    <Card className=" flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Github Stats</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2 -mt-3">
        <div className="flex items-center justify-between ">
          <div className="info flex flex-col items-start h-full mt-10 leading-8">
            <p className=" font-bold">Tamalckb531</p>
            <p className=" text-sm text-slate-400">
              Last Active :{" "}
              <span className=" dark:text-green-400 font-bold text-green-600">
                12/04/25
              </span>
            </p>
            <p className=" text-sm text-slate-400">
              Last Year Contribution :{" "}
              <span className=" dark:text-green-400 font-bold text-green-600">
                884
              </span>
            </p>
          </div>
          <LanguagePieChart />
        </div>
        <div className="stat flex items-center justify-around gap-2 -mt-2">
          <StatCard topic="Repository" stat="45" />
          <StatCard topic="Fork" stat="48" />
          <StatCard topic="Start" stat="22" />
          <StatCard topic="PR Merged" stat="27" />
        </div>
      </CardContent>
      <CardFooter className=" flex items-center justify-start gap-3 -mb-3">
        <Badge className="h-5 px-2 text-xs mt-1">RankDevs</Badge>
        <Badge className="h-5 px-2 text-xs mt-1">Unshackled</Badge>
        <Badge className="h-5 px-2 text-xs mt-1">Cointrade</Badge>
      </CardFooter>
    </Card>
  );
};

interface stat {
  topic: string;
  stat: string;
}

const StatCard = ({ topic, stat }: stat) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center mt-2">
      <p className=" font-bold">{stat}</p>
      <p className=" text-wrap text-xs">{topic}</p>
    </div>
  );
};

export default GithubBox;
