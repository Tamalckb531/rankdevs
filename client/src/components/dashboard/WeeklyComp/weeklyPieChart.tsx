"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useWeeklyStateStore from "@/store/useWeeklyStatsStore";
import ChartToolTip from "@/components/ChartToolTip";
import { getLanguageType, languages } from "@/lib/language";

const chartConfig = {} satisfies ChartConfig;

export function WeeklyPieChart() {
  const weeklyStats = useWeeklyStateStore((state) => state.weeklyStats);
  const chartData = weeklyStats.data;
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[220px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="field"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
          padding={{ left: 10, right: 10 }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel={false}
              formatter={(value, name, entry, index, payload) => {
                const ms = value as number;
                return (
                  <ChartToolTip
                    fill={languages[entry.payload.field]?.color || "#3178c6"}
                    language={getLanguageType(entry.payload.field)}
                    time={ms}
                  />
                );
              }}
            />
          }
        />
        <Line
          dataKey="time"
          type="natural"
          stroke="#3178c6"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
