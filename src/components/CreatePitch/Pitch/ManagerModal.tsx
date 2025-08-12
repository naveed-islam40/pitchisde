import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ManagerModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Image
            src="/mig/icons/player_plus.svg"
            alt="add"
            width={30}
            height={30}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          />
        </DialogTrigger>

        <DialogContent className="bg-[#3C8258] text-white p-0 gap-0 sm:rounded-2xl max-w-[472px]">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-[#D2D2D2] z-10"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4 text-black" />
          </Button>
          <div className="pt-14 px-6">
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Manager Name"
                className="bg-[#E9E9E9] h-[40px] placeholder:text-[#686868] border-none focus:ring-0  italic text-base focus-visible:ring-0 text-[#686868]"
              />
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerModal;
