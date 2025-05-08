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
import useDashboardBatch from "@/hooks/useDashboardBatch";
import { StatMode } from "@/lib/type";
import useMonthlyStatsStore from "@/store/useMonthlyStatsStore";

const StatSelectMonthly = () => {
  const setMode = useMonthlyStatsStore((state) => state.setMode);
  const monthlyStats = useMonthlyStatsStore((state) => state.monthlyStats);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { CalculateMonthly } = useDashboardBatch();

  useEffect(() => {
    if (!firstRender) {
      CalculateMonthly(monthlyStats.mode);
    }
    setFirstRender(false);
    console.log("Run");
  }, [monthlyStats.mode]);

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

export default StatSelectMonthly;
