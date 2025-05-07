import { msToHM } from "@/lib/language";
import React from "react";

interface Info {
  fill: any;
  language: string;
  time: number;
}

const ChartToolTip = ({ fill, language, time }: Info) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      {/* Color Dot */}
      <div className="h-3 w-3 rounded-xs" style={{ backgroundColor: fill }} />
      {/* Language Name */}
      <span className="text-muted-foreground">{language}</span>
      {/* Time */}
      <span className="text-foreground font-mono font-medium tabular-nums ml-auto">
        {msToHM(time)}
      </span>
    </div>
  );
};

export default ChartToolTip;
