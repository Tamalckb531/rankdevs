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
import { useEffect } from "react";
export const YearSelect = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);
  const setMode = useTotalStateStore((state) => state.setMode);
  const totalStats = useTotalStateStore((state) => state.totalStats);
  const setTotalStats = useTotalStateStore((state) => state.setTotalStats);

  const { CalculateTotal } = useDashboardBatch();

  const validYears = Object.keys(dashboard?.totalStats || {}).filter(
    (key) => key !== "sum" && key !== "NaN" && !isNaN(Number(key))
  );

  useEffect(() => {
    setTotalStats([]);
    CalculateTotal(totalStats.mode);
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
