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
import useYearlyStateStore from "@/store/useYearlyStateStore";

const StatSelectYearly = () => {
  const setMode = useYearlyStateStore((state) => state.setMode);
  const yearlyStats = useYearlyStateStore((state) => state.yearlyStats);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { CalculateYearly } = useDashboardBatch();

  useEffect(() => {
    if (!firstRender) {
      CalculateYearly(yearlyStats.mode);
    }
    setFirstRender(false);
  }, [yearlyStats.mode]);

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

export default StatSelectYearly;
