"use client";

import React, { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
interface chart {
  mode: string;
  solved: number;
  total: number;
}

export function ModePieChart({ mode, solved, total }: chart) {
  const [solvedColor, setSolvedColor] = useState<string>("#000000");
  const [totalColor, setTotalColor] = useState<string>("#000000");
  const [modeToggle, setModeToggle] = useState<boolean>(false);

  useEffect(() => {
    switch (mode) {
      case "Med.":
        setSolvedColor("#F9B702");
        setTotalColor("#524527");
        break;
      case "Easy":
        setSolvedColor("#3DBABA");
        setTotalColor("#254545");
        break;
      case "Hard":
        setSolvedColor("#F53737");
        setTotalColor("#502B2C");
        break;
      default:
        break;
    }
  }, [mode]);

  const chartData = [
    {
      mode: "Solved",
      sum: solved,
      fill: solvedColor,
    },
    {
      mode: "Total",
      sum: total,
      fill: totalColor,
    },
  ];
  const chartConfig = {
    Solved: {
      label: "Solved",
    },

    Total: {
      label: "Total",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className=" aspect-square h-[100px] -mt-2 -mb-8"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="sum"
          nameKey="mode"
          innerRadius={30}
          strokeWidth={10}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 3}
                      className="fill-foreground text-xs font-bold text-center"
                      onClick={() => setModeToggle((prev) => !prev)}
                    >
                      {modeToggle ? solved + "/" + total : mode}
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
