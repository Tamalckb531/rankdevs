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
    languages: "Typescript",
    minute: 490,
    fill: languages["typescript"].color,
  },
  {
    languages: "C++",
    minute: 310,
    fill: languages["cpp"].color,
  },
];
const chartConfig = {
  Rust: {
    label: "Rust",
  },
  Typescript: {
    label: "Typescript",
  },
  "C++": {
    label: "C++",
  },
} satisfies ChartConfig;

export function LanguagePieChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className=" aspect-square h-[150px] -mt-4"
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
          innerRadius={45}
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
                      Top
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-xs"
                    >
                      Languages
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
