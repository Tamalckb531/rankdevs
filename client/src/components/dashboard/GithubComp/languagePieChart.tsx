"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getLanguageType, languages, validLanguage } from "@/lib/language";
import { Language, LanguageForChart } from "@/lib/type";
import LanguageToolTip from "@/components/LanguageToolTip";
const chartConfig = {} satisfies ChartConfig;

export function LanguagePieChart({ language }: { language: Language[] }) {
  let chartData: LanguageForChart[] = [];

  language.map((lang, index) => {
    const langName = validLanguage(lang.name);

    const obj: LanguageForChart = {
      name: langName,
      size: lang.size,
      fill: languages[langName.toLowerCase()]?.color || "#000",
    };
    chartData.push(obj);
  });

  return (
    <ChartContainer
      config={chartConfig}
      className=" aspect-square h-[150px] -mt-4"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel={false}
              formatter={(value, name, entry, index, payload) => {
                const size = value as number;
                return (
                  <LanguageToolTip
                    fill={entry.payload.fill}
                    name={getLanguageType(entry.payload.name)}
                    size={size}
                  />
                );
              }}
            />
          }
        />
        <Pie
          data={chartData}
          dataKey="size"
          nameKey="name"
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
