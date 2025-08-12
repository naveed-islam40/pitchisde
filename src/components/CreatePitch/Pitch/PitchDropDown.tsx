import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const PitchDropDown = ({
  formations,
  selectedFormation,
  setSelectedFormation,
}) => {
  return (
    <Select onValueChange={(value) => setSelectedFormation(value)}>
      <SelectTrigger className="bg-transparent border-none focus:ring-offset-0 text-white h-5">
        <SelectValue placeholder={selectedFormation} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {formations.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PitchDropDown;
