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
import useDashboardStore from "@/store/useDashboardStore";
import useTotalStateStore from "@/store/useTotalStatsStore";
import { useEffect, useState } from "react";
export const YearSelect = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);
  const setMode = useTotalStateStore((state) => state.setMode);
  const totalStats = useTotalStateStore((state) => state.totalStats);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { CalculateTotal } = useDashboardBatch();

  const validYears = Object.keys(dashboard?.totalStats || {}).filter(
    (key) => key !== "sum" && key !== "NaN" && !isNaN(Number(key))
  );

  useEffect(() => {
    if (!firstRender) {
      CalculateTotal(totalStats.mode);
    }
    setFirstRender(false);
  }, [totalStats.mode]);

  return (
    <Select onValueChange={(value) => setMode(value)}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key={"sum"} value={"sum"}>
            All Time
          </SelectItem>
          <SelectLabel>Years</SelectLabel>
          {validYears.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
