import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  list: any;
  onChange: any;
  placeholder: any;
  className: any;
  value?: any;
};

export function DropDown({
  list,
  onChange,
  placeholder,
  className,
  value,
}: Props) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={className}>
        <span
          className={`text-sm ${
            !value ? "text-[#686868]" : "text-[#686868]"
          } truncate`}
        >
          {value || placeholder}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
