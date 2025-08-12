import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckedDropdown({
  placeholder,
  options,
  selectedOptions,
  setSelectedOption,
}) {
  const allIds = options?.map((opt) => opt.id) || [];

  const isAllSelected =
    selectedOptions?.length > 0 &&
    allIds.every((id) => selectedOptions.includes(id));

  const handleToggle = (id) => {
    if (selectedOptions.includes(id)) {
      setSelectedOption(selectedOptions.filter((item) => item !== id));
    } else {
      setSelectedOption([...selectedOptions, id]);
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedOption([]);
    } else {
      setSelectedOption(allIds);
    }
  };

  return (
    <Select>
      <SelectTrigger className="w-[230px] text-base">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <div className="flex items-center gap-2 p-2 focus:ring-0">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
            <SelectLabel>Select All</SelectLabel>
          </div>
          {options?.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2 p-2">
              <Checkbox
                id={`opt-${opt.id}`}
                checked={selectedOptions.includes(opt.id)}
                onCheckedChange={() => handleToggle(opt.id)}
              />
              <label htmlFor={`opt-${opt.id}`} className="capitalize">
                {opt.name}
              </label>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
