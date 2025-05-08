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
// const chartData = [
//   { field: "Monday", time: 237 },
//   { field: "Tuesday", time: 73 },
//   { field: "Wednesday", time: 209 },
//   { field: "Thursday", time: 214 },
//   { field: "Friday", time: 50 },
//   { field: "Saturday", time: 186 },
//   { field: "Sunday", time: 305 },
// ];

// const chartData = [
//   { field: "c", time: 186 },
//   { field: "cpp", time: 305 },
//   { field: "js", time: 237 },
//   { field: "tsx", time: 73 },
//   { field: "php", time: 209 },
//   { field: "prisma", time: 214 },
//   { field: "", time: 50 },
// ];
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
