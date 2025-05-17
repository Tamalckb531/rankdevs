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
import useCPStatsStore from "@/store/useCPStatsStore";
import useDashboardBatch from "@/hooks/useDashboardBatch";
import { CPMode } from "@/lib/type";
const PlatfromSelect = () => {
  const setMode = useCPStatsStore((state) => state.setMode);
  const mode = useCPStatsStore((state) => state.cpStats.mode);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { FetchLeetCode, FetchCodeForce } = useDashboardBatch();

  useEffect(() => {
    if (!firstRender) {
      switch (mode) {
        case "leetcode":
          FetchLeetCode();
          break;
        case "codeforce":
          FetchCodeForce();
          break;
        default:
          break;
      }
    }
    setFirstRender(false);
  }, [mode]);

  return (
    <Select onValueChange={(value: CPMode) => setMode(value)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>CP Platform</SelectLabel>
          <SelectItem value="leetcode">Leetcode</SelectItem>
          <SelectItem value="codeforce">Codeforce</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PlatfromSelect;
