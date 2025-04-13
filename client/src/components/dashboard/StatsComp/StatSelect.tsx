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

const StatSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mode</SelectLabel>
          <SelectItem value="time">Time</SelectItem>
          <SelectItem value="language">Language</SelectItem>
          <SelectItem value="stats">Stats</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatSelect;
