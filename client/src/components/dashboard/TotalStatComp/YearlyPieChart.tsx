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
import ChartToolTip from "@/components/ChartToolTip";
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
  {
    languages: "Git",
    time: 1730000,
    fill: languages["git-commit"].color,
  },
];
const chartConfig = {} satisfies ChartConfig;

export function YearlyPieChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className=" aspect-square lg:h-[200px] h-[180px] -mx-2 lg:mx-0"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel={false}
              formatter={(value, name, entry, index, payload) => {
                const ms = value as number;
                return (
                  <ChartToolTip
                    fill={entry.payload.fill}
                    language={entry.payload.languages}
                    time={ms}
                  />
                );
              }}
            />
          }
        />

        <Pie
          data={chartData}
          dataKey="time"
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
