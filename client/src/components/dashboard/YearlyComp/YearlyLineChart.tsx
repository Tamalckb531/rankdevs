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
  { month: "Jan", sum: 1856 },
  { month: "Feb", sum: 3059 },
  { month: "Mar", sum: 2370 },
  { month: "Apr", sum: 783 },
  { month: "May", sum: 2109 },
  { month: "Jun", sum: 2154 },
  { month: "Jul", sum: 505 },
  { month: "Aug", sum: 1748 },
  { month: "Sep", sum: 2923 },
  { month: "Oct", sum: 3586 },
  { month: "Nov", sum: 4425 },
  { month: "Dec", sum: 2216 },
];
const chartConfig = {
  sum: {
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
          dataKey="month"
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
          dataKey="sum"
          type="natural"
          stroke="#dea584"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
