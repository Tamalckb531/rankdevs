import { formatSize } from "@/lib/batchHelper";
import React from "react";

interface Info {
  fill: any;
  name: string;
  size: number;
}

const LanguageToolTip = ({ fill, name, size }: Info) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full text-nowrap">
      <div className="h-3 w-3 rounded-xs" style={{ backgroundColor: fill }} />
      <span className="text-muted-foreground">{name}</span>
      <span className="text-foreground font-mono font-medium tabular-nums ml-auto">
        {formatSize(size)}
      </span>
    </div>
  );
};

export default LanguageToolTip;
