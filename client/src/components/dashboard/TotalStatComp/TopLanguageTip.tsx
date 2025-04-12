import { languages } from "@/lib/language";
import React from "react";

const chartData = [
  {
    languages: "Rust",
    time: "2H 24M",
    fill: languages["rust"].color,
  },
  {
    languages: "Tsx",
    time: "2H 15M",
    fill: languages["typescriptreact"].color,
  },
  {
    languages: "Docker",
    time: "30M",
    fill: languages["dockercompose"].color,
  },
  {
    languages: "git",
    time: "15M",
    fill: languages["git-commit"].color,
  },
  {
    languages: "Prisma",
    time: "2H 3M",
    fill: languages["prisma"].color,
  },
];

interface slide {
  language: string;
  time: string;
  fill: string;
}

const TopLanguageTip = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-1 w-full">
      {chartData.map((data) => (
        <LanguageSlide
          key={data.time}
          language={data.languages}
          time={data.time}
          fill={data.fill}
        />
      ))}
    </div>
  );
};

const LanguageSlide = ({ language, time, fill }: slide) => {
  return (
    <div className=" flex bg-background items-center justify-between gap-2 w-full ml-5">
      <div className=" flex gap-2 items-center 2">
        <div className=" h-2 w-2" style={{ backgroundColor: fill }}></div>
        <p className=" text-slate-400">{language}</p>
      </div>
      <p className="font-bold ml-3">{time}</p>
    </div>
  );
};

export default TopLanguageTip;
