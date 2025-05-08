"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { field: "Monday", time: 237 },
  { field: "Tuesday", time: 73 },
  { field: "Wednesday", time: 209 },
  { field: "Thursday", time: 214 },
  { field: "Friday", time: 50 },
  { field: "Saturday", time: 186 },
  { field: "Sunday", time: 305 },
];

// const chartData = [
//   { field: "c", time: 186 },
//   { field: "cpp", time: 305 },
//   { field: "js", time: 237 },
//   { field: "tsx", time: 73 },
//   { field: "php", time: 209 },
//   { field: "prisma", time: 214 },
//   { field: "rust", time: 50 },
// ];
const chartConfig = {
  time: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function WeeklyPieChart() {
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
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
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
