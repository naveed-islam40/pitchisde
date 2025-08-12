import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { IconCalendar } from "@tabler/icons-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { DayPicker } from "react-day-picker";

export default function CalendarPopover({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const router = useRouter();

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;

    setSelectedDate(newDate);
    const { pathname } = router;
    const date = format(newDate, "yyyy-MM-dd");
    onDateChange(date);
    router.push({ pathname, query: { date } });
  };

  return (
    <Popover className="relative">
      <PopoverButton
        className={clsx(
          "feedback shrink-0  flex items-center gap-x-1.5 self-center rounded-md  p-1 mr-auto text-gray-500 data-[active]:bg-dark/10"
        )}
      >
        <IconCalendar size={24} />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 z-10 mt-3  transform px-4 sm:px-0 bg-white">
          {({ close }) => (
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
              <DayPicker
                mode="single"
                selected={selectedDate}
                required
                onDayClick={() => {
                  close();
                }}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
