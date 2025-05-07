import { languages, msToHM } from "@/lib/language";
import React from "react";

const chartData = [
  {
    languages: "Typescript",
    time: 4900000,
    fill: languages["typescript"].color,
  },
  {
    languages: "Docker",
    time: 2870000,
    fill: languages["dockercompose"].color,
  },
  {
    languages: "Rust",
    time: 2750000,
    fill: languages["rust"].color,
  },
  {
    languages: "Tsx",
    time: 2000000,
    fill: languages["typescriptreact"].color,
  },
  {
    languages: "Prisma",
    time: 1900000,
    fill: languages["prisma"].color,
  },
];

interface slide {
  language: string;
  time: number;
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
      <p className="font-bold lg:ml-3 lg:text-md text-[15px]">{msToHM(time)}</p>
    </div>
  );
};

export default TopLanguageTip;
