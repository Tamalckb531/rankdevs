import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useWeeklyStateStore from "@/store/useWeeklyStatsStore";
import useDashboardBatch from "@/hooks/useDashboardBatch";
import { StatMode } from "@/lib/type";

const StatSelect = () => {
  const setMode = useWeeklyStateStore((state) => state.setMode);
  const weeklyStats = useWeeklyStateStore((state) => state.weeklyStats);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { CalculateWeekly } = useDashboardBatch();

  useEffect(() => {
    if (!firstRender) {
      CalculateWeekly(weeklyStats.mode);
    }
    setFirstRender(false);
    console.log("Run");
  }, [weeklyStats.mode]);

  return (
    <Select onValueChange={(value: StatMode) => setMode(value)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mode</SelectLabel>
          <SelectItem value="time" key={"time"}>
            Time
          </SelectItem>
          <SelectItem value="language" key={"language"}>
            Language
          </SelectItem>
          <SelectItem value="stats" key={"stats"}>
            Stats
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatSelect;
