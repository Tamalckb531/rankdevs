"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getLanguageType, languages, msToHM } from "@/lib/language";
import ChartToolTip from "@/components/ChartToolTip";
import useTotalStateStore from "@/store/useTotalStatsStore";

const chartConfig = {} satisfies ChartConfig;

export function YearlyPieChart() {
  const totalStats = useTotalStateStore((state) => state.totalStats);

  const chartData = totalStats.data;
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
                    language={getLanguageType(entry.payload.languages)}
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
                      {msToHM(totalStats.total)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-xs"
                    >
                      {totalStats.mode == "sum" ? "All Time" : totalStats.mode}
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
