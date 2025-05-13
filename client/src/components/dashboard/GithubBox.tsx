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
import useGithubStatsStore from "@/store/useGithbuStatsStore";
import { GithubSkeleton } from "../Skeletons/GithubSkeleton";

const GithubBox = () => {
  const githubStats = useGithubStatsStore((state) => state.githubStats);

  if (!githubStats || githubStats.isError) {
    return (
      <Card className=" flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <div className=" h-full w-full flex items-center justify-center text-xl text-red-400">
          Can't show Github Stats
        </div>
      </Card>
    );
  }

  if (!githubStats.isLoading && !githubStats.data) {
    return (
      <Card className=" flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
        <Header />
        <div className=" h-full w-full flex items-center justify-center text-xl text-blue-400">
          Data is empty
        </div>
      </Card>
    );
  }

  return (
    <Card className=" flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <Header />
      {!githubStats.isLoading ? <Content /> : <GithubSkeleton />}
    </Card>
  );
};

interface stat {
  topic: string;
  stat: number;
}

interface PRCard {
  topic: string;
  stat: number;
  username: string;
}

const StatCard = ({ topic, stat }: stat) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center mt-2">
      <p className=" font-bold text-lg">{stat}</p>
      <p className=" text-wrap text-xs text-slate-400">{topic}</p>
    </div>
  );
};

const PRCard = ({ topic, stat, username }: PRCard) => {
  return (
    <div
      className="flex flex-col gap-1 justify-center items-center mt-2 cursor-pointer"
      onClick={() =>
        window.open(
          `https://github.com/pulls?q=is%3Apr+author%3A${username}+is%3Aclosed`,
          "_blank"
        )
      }
    >
      <p className=" font-bold text-lg">{stat}</p>
      <p className=" text-wrap text-xs text-slate-400">{topic}</p>
    </div>
  );
};

export default GithubBox;

const Header = () => {
  return (
    <CardHeader className="w-full flex items-center justify-between -mt-1">
      <CardTitle className="text-xl font-bold">Github Stats</CardTitle>
    </CardHeader>
  );
};

const Content = () => {
  const githubStats = useGithubStatsStore((state) => state.githubStats);

  return (
    <>
      <CardContent className=" flex flex-col gap-2 -mt-3">
        <div className="flex items-center justify-between ">
          <div className="info flex flex-col items-start h-full mt-10 leading-8">
            <div
              className=" font-bold cursor-pointer"
              onClick={() =>
                window.open(
                  `https://github.com/${githubStats.data?.username}`,
                  "_blank"
                )
              }
            >
              {githubStats.data?.username}
            </div>
            <p className=" text-sm text-slate-400">
              Last Active :{" "}
              <span className=" dark:text-green-400 font-bold text-green-600">
                {githubStats.data?.lastActive}
              </span>
            </p>
            <p className=" text-sm text-slate-400">
              Contributions (LY) :{" "}
              <span className=" dark:text-green-400 font-bold text-green-600">
                {githubStats.data?.contribution}
              </span>
            </p>
          </div>
          <LanguagePieChart />
        </div>
        <div className="stat flex items-center justify-between pr-10 -mt-2">
          <StatCard topic="Repository" stat={githubStats.data?.repo || 0} />
          <StatCard topic="Fork" stat={githubStats.data?.fork || 0} />
          <StatCard topic="Star" stat={githubStats.data?.star || 0} />
          <PRCard
            topic="PR Merged"
            stat={githubStats.data?.pr || 0}
            username={githubStats.data?.username || ""}
          />
        </div>
      </CardContent>
      <CardFooter className=" flex items-center justify-start gap-3 -mb-3">
        {githubStats.data &&
          githubStats.data.pinnedRepo &&
          githubStats.data?.pinnedRepo.map((rep, index) => (
            <Badge
              className="h-5 px-2 text-xs mt-1 cursor-pointer"
              key={index}
              onClick={() =>
                window.open(
                  `https://github.com/${githubStats.data?.username}/${rep.name}`,
                  "_blank"
                )
              }
            >
              {rep.name.length < 15 ? rep.name : rep.name.slice(0, 14) + "..."}
            </Badge>
          ))}
      </CardFooter>
    </>
  );
};
