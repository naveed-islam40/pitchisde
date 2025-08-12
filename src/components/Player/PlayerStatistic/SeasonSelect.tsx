import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function SeasonSelect({ seasons, onChange }) {
  const [selectedValue, setSelectedValue] = useState(seasons[0]);

  const sortedSeasons = seasons.sort((a, b) => b.name.localeCompare(a.name));

  const handleChangeSeason = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue.value}>
      <SelectTrigger className="w-32 text-base rounded text-black border-0 h-8 bg-gray-100 focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue
          defaultValue={selectedValue.value}
          placeholder={selectedValue.name}
        />
      </SelectTrigger>
      <SelectContent position="popper">
        {sortedSeasons.map(({ value, name }) => (
          <SelectItem key={value} className="py-1 pr-1" value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
