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
  { day: "1", sum: 186 },
  { day: "2", sum: 305 },
  { day: "3", sum: 237 },
  { day: "4", sum: 73 },
  { day: "5", sum: 209 },
  { day: "6", sum: 214 },
  { day: "7", sum: 50 },
  { day: "8", sum: 178 },
  { day: "9", sum: 223 },
  { day: "10", sum: 356 },
  { day: "11", sum: 445 },
  { day: "12", sum: 22 },
  { day: "13", sum: 246 },
  { day: "14", sum: 153 },
  { day: "15", sum: 89 },
  { day: "16", sum: 201 },
  { day: "17", sum: 203 },
  { day: "18", sum: 202 },
  { day: "19", sum: 208 },
  { day: "20", sum: 315 },
  { day: "21", sum: 198 },
  { day: "22", sum: 150 },
  { day: "23", sum: 178 },
  { day: "24", sum: 251 },
  { day: "25", sum: 365 },
  { day: "26", sum: 256 },
  { day: "27", sum: 189 },
  { day: "28", sum: 120 },
  { day: "29", sum: 30 },
  { day: "30", sum: 75 },
  { day: "31", sum: 111 },
];
const chartConfig = {
  sum: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonthlyPieChart() {
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
          dataKey="day"
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
          stroke="#f34b7d"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
