"use client";

import * as React from "react";
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
    languages: "Rust",
    minute: 275,
    fill: languages["rust"].color,
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
  {
    languages: "Typescript",
    minute: 490,
    fill: languages["typescript"].color,
  },
];
const chartConfig = {
  Rust: {
    label: "Rust",
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
  Typescript: {
    label: "Typescript",
  },
} satisfies ChartConfig;

export function YearlyPieChart() {
  return (
    <ChartContainer config={chartConfig} className=" aspect-square h-[200px]">
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
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
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
  );
}
