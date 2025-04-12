import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const YearSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="allTime">All Time</SelectItem>
          <SelectLabel>Years</SelectLabel>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
