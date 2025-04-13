import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React from "react";

const StatSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
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
