import { useCreatePitch } from "@/contexts/CreatePitch/CreatePitchContext";
import { ArrowDownToLine, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DropDown } from "../Dropdown/DropDown";
import { Input } from "../ui/input";
import { formations } from "@/static/create-pitch";

const options = ["Formation", "Manager", "Country", "Club", "Age"];

const LeftBar = () => {
  const [value, setValue] = useState("");

  const {
    setTitle,
    title,
    setSubtitle,
    subtitle,
    setSelectedFormation,
    selectedFormation,
    setSelectedOption,
    selectedOption,
  } = useCreatePitch();

  const green = "text-green-700 border-green-700";

  const handleChange = (value: string) => {
    console.log("value", value);
    if (selectedOption.includes(value)) {
      setSelectedOption(selectedOption.filter((item) => item !== value));
    } else {
      setSelectedOption([...selectedOption, value]);
    }
  };

  console.log(selectedOption);
  return (
    <div className="h-full col-span-3 space-y-5 ">
      <div className="shadow-create-pitch px-8 rounded-l-lg py-4 space-y-5">
        <h1 className="text-[#006428] text-3xl font-normal text-center pt-3">
          create<span className="italic font-bold uppercase">Pitchside</span>
        </h1>

        <form className="space-y-3">
          <Input
            placeholder="Title"
            className="bg-[#E9E9E9] placeholder:italic focus-visible:ring-0 h-10"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input
            placeholder="Subtitle"
            className="bg-[#E9E9E9] placeholder:italic focus-visible:ring-0 h-10"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
          />
          <DropDown
            list={["Option 1", "Option 2"]}
            onChange={(value: string) => setValue(value)}
            placeholder="Select team, competition, match, country…"
            className={"bg-[#E9E9E9]"}
            value={value}
          />
          <DropDown
            list={formations}
            onChange={(value) => setSelectedFormation(value)}
            placeholder="Select formation"
            className={"bg-[#E9E9E9]"}
            value={selectedFormation}
          />
        </form>

        <div className="space-y-4">
          {options.map((option) => (
            <div className="flex justify-between items-center" key={option}>
              <h1 className={`text-[#006428] font-medium text-lg`}>{option}</h1>

              <label className="relative w-6 h-6">
                <input
                  type="radio"
                  name="custom-radio"
                  value={option}
                  onClick={() => handleChange(option)}
                  checked={selectedOption.includes(option)}
                  className="peer sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                ${green}
                peer-checked:border-green-700 peer-checked:text-white p-[1.5px]`}
                >
                  {selectedOption.includes(option) && (
                    <Image
                      src="/mig/icons/thunder.svg"
                      alt="add"
                      width={18}
                      height={18}
                      className="ml-[1px]"
                    />
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <DropDown
            list={["Option 1", "Option 2"]}
            onChange={() => {}}
            placeholder="Captain"
            className={"bg-[#E9E9E9]"}
          />
          <DropDown
            list={["Option 1", "Option 2"]}
            onChange={() => {}}
            placeholder="Player of the match"
            className={"bg-[#E9E9E9] placeholder:text-[#686868]"}
          />
          <div className="flex items-center justify-end gap-2 pt-10">
            <button className="flex items-center gap-2 bg-[#6E6E6E] font-bold w-[139px] h-[38px] justify-center text-[#FFFFFF] rounded-sm">
              <ArrowDownToLine />
              Save
            </button>
            <button className="flex items-center gap-2 bg-[#006428] font-bold w-[139px] h-[38px] justify-center text-[#FFFFFF] rounded-sm">
              <Share2 />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
