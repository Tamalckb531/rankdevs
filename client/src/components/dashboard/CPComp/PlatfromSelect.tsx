import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const PlatfromSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>CP Platform</SelectLabel>
          <SelectItem value="leetcode">Leetcode</SelectItem>
          <SelectItem value="codeforce">Codeforce</SelectItem>
          <SelectItem value="gfg">GFG</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PlatfromSelect;
