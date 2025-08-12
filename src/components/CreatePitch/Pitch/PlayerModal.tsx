import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreatePitch } from "@/contexts/CreatePitch/CreatePitchContext";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const cards = [
  "/mig/svg/yellow_card.svg",
  "/mig/svg/half_yellow.svg",
  "/mig/svg/red.svg",
];
export default function PlayerModal({
  width = 40,
  height = 40,
}: {
  width?: number;
  height?: number;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rating, setRating] = useState(0);
  const { goals, setGoals } = useCreatePitch();

  const green = "text-green-700 border-white";

  return (
    <div className="flex items-center justify-center p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Image
            src="/mig/icons/player_plus.svg"
            alt="add"
            width={width}
            height={height}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="bg-[#3C8258] text-white p-0 gap-0 sm:rounded-2xl max-w-[472px]">
          <DialogHeader className="sr-only">
            <DialogTitle>Player Selection</DialogTitle>
          </DialogHeader>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-[#D2D2D2] z-10"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4 text-black" />
          </Button>

          <div className="p-6 pt-14">
            {/* Search Input */}
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Player Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#E9E9E9] h-[40px] placeholder:text-[#686868] border-none focus:ring-0  italic text-base focus-visible:ring-0 text-[#686868]"
              />
            </div>

            <div className="space-y-4">
              {/* goals  */}
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-2xl font-lato">Goals</h1>
                <div className="flex gap-3 items-center text-2xl text-white font-semibold">
                  <Minus
                    className="cursor-pointer"
                    onClick={() => {
                      if (goals <= 0) return;
                      setGoals(goals - 1);
                    }}
                  />
                  <p>{goals}</p>
                  <Plus
                    className="cursor-pointer"
                    onClick={() => setGoals(goals + 1)}
                  />
                </div>
              </div>
              {/* Substituted  */}
              <div className="flex justify-between">
                <h1 className="font-semibold text-2xl font-lato">
                  Substituted
                </h1>
                <input type="radio" className="w-6 h-6 sr-only" />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                ${green}
                 peer-checked:border-white peer-checked:text-white p-[1px]`}
                >
                  <Image
                    src="/mig/svg/thunder_white.svg"
                    alt="add"
                    width={18}
                    height={18}
                    className="object-cover pt-[1px]"
                  />
                </div>
              </div>
              {/* Rating */}
              <div className="flex gap-8 items-center">
                <h1 className="font-semibold text-2xl font-lato">Rating</h1>
                <div className="flex gap-4 items-center w-full">
                  <input
                    type="range"
                    value={rating}
                    min={0}
                    max={10}
                    step={0.1}
                    className="w-full appearance-none h-2 bg-gray-200 rounded-lg outline-none accent-[#D9D9D9]"
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                  />
                  <p className="bg-[#FF9900] flex justify-center items-center text-base rounded-full w-[40px]">
                    {rating}
                  </p>
                </div>
              </div>
              {/* card  */}
              <div className="flex justify-between items-center gap-3">
                <h1 className="font-semibold text-2xl font-lato">Card</h1>
                <div className="flex gap-4 items-center">
                  {cards.map((card, index) => (
                    <Image
                      src={card}
                      alt="card"
                      key={index}
                      width={30}
                      height={30}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-5">
                <Button className="py-6 bg-[#C00000] hover:bg-[#C00000] text-2xl font-semibold font-mono">
                  Remove
                </Button>
                <Button
                  className="py-6 bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#3C8258] hover:text-[#3C8258]
                text-2xl font-semibold font-mono "
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
