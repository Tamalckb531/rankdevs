"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YearlyPieChart } from "./TotalStatComp/YearlyPieChart";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { languages } from "@/lib/language";

const chartData = [
  {
    languages: "Typescript",
    minute: 275,
    fill: languages["typescript"].color,
  },
  {
    languages: "Tsx",
    minute: 200,
    fill: languages["typescriptreact"].color,
  },
  {
    languages: "Docker",
    minute: 287,
    fill: languages["dockercompose"].color,
  },
  {
    languages: "git",
    minute: 173,
    fill: languages["git-commit"].color,
  },
  {
    languages: "Prisma",
    minute: 190,
    fill: languages["prisma"].color,
  },
];
const chartConfig = {
  Typescript: {
    label: "Typescript",
  },

  Tsx: {
    label: "Tsx",
  },

  Docker: {
    label: "Docker",
  },

  Git: {
    label: "Git",
  },

  Prisma: {
    label: "Prisma",
  },
} satisfies ChartConfig;

const TotalStats = () => {
  return (
    <Card className="flex flex-col bg-background shadow-md dark:shadow-slate-500 rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Coding Stats</CardTitle>
        <YearSelect />
      </CardHeader>

      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="minute"
              nameKey="languages"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          8H 30M
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Typing
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TotalStats;

const YearSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="allTime">All Time</SelectItem>
          <SelectLabel>Years</SelectLabel>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

{
  /* <Card className="bg-background shadow-md dark:shadow-slate-500 flex flex-col items-start justify-between rounded-2xl px-2">
      <CardHeader className="w-full flex items-center justify-between -mt-1">
        <CardTitle className="text-xl font-bold">Coding Stats</CardTitle>
        <YearSelect />
      </CardHeader>

      <div className=""></div>
    </Card> */
}
