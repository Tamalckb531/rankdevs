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
  { field: "Jan", time: 1856 },
  { field: "Feb", time: 3059 },
  { field: "Mar", time: 2370 },
  { field: "Apr", time: 783 },
  { field: "May", time: 2109 },
  { field: "Jun", time: 2154 },
  { field: "Jul", time: 505 },
  { field: "Aug", time: 1748 },
  { field: "Sep", time: 2923 },
  { field: "Oct", time: 3586 },
  { field: "Nov", time: 4425 },
  { field: "Dec", time: 2216 },
];
const chartConfig = {
  time: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function YearlyLineChart() {
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
          stroke="#dea584"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
