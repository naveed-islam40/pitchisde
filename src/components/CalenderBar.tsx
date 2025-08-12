import { WeekDay, getWeekDays } from "@/utils/generics";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import CalendarPopover from "@/components/CalendarPopover";
import { format } from "date-fns";

import useMediaQuery from "@/hooks/useMediaQuery";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const currentWeekDays = getWeekDays();

export function CalendarBar() {
  const [days, setDays] = useState<WeekDay[]>(currentWeekDays);
  const isDesktopScreen = useMediaQuery("(min-width: 1024px)");

  const responsiveDays = isDesktopScreen ? days : days.slice(1, -1);

  const router = useRouter();
  const isLive = router.query.live === "yes";

  const updateDays = (date: string) => {
    const weekDays = getWeekDays(date);

    const updatedDays = weekDays.map((day) => ({
      ...day,
      active: day.date === date,
    }));
    setDays(updatedDays);
  };

  const handleChangeDate = (date: string) => {
    const { pathname } = router;
    updateDays(date);
    router.push({ pathname, query: { date } }, undefined, { shallow: true });
  };

  const handleLiveClick = () => {
    const { push, query } = router;
    push(
      { pathname: router.pathname, query: query.live ? {} : { live: "yes" } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handlePrevClick = () => {
    const activeDate = days.find((day) => day.active)?.date || days[0].date;
    const previousDate = calculateAdjacentDate(activeDate, -1); // Get the previous date
    handleChangeDate(previousDate);
  };

  const handleNextClick = () => {
    const activeDate = days.find((day) => day.active)?.date || days[0].date;
    const nextDate = calculateAdjacentDate(activeDate, 1); // Get the next date
    handleChangeDate(nextDate);
  };

  const calculateAdjacentDate = (date: string, offset: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + offset); // Add or subtract days
    return format(currentDate, "yyyy-MM-dd"); // Return formatted date
  };

  return (
    <div className="flex gap-x-0.5 items-center justify-between border-b border-[#BFBFBF] px-2">
      {/* Arrow Button: Previous */}
      <button
        onClick={handlePrevClick}
        className="p-2 rounded-full text-primary hover:bg-light"
      >
        <IconChevronLeft className="size-6" />
      </button>
      <button
        onClick={handleLiveClick}
        className={clsx(
          "flex gap-1 self-center rounded-lg px-2.5 py-0.5 font-bold capitalize hover:bg-light items-center",
          isLive ? "text-danger" : "text-dark/70"
        )}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark/70 opacity-75"></span>
          {isLive && (
            <span className="relative iznline-flex rounded-full h-3 w-3 bg-danger"></span>
          )}
        </span>
        <span>live</span>
      </button>
      <div className="flex justify-center items-center">
        {responsiveDays.map((weekday, idx) => (
          <DateCell
            key={idx}
            dayInfo={weekday}
            onChangeDate={handleChangeDate}
          />
        ))}
      </div>
      <CalendarPopover onDateChange={updateDays} />

      <button
        onClick={handleNextClick}
        className="p-2 rounded-full text-primary hover:bg-light"
      >
        <IconChevronRight className="size-6" />
      </button>
    </div>
  );
}

interface DateCellProps {
  dayInfo: WeekDay;
  // eslint-disable-next-line no-unused-vars
  onChangeDate: (date: string) => void;
}

function DateCell({ dayInfo, onChangeDate }: DateCellProps) {
  const { weekday, day, month, active, date } = dayInfo;
  return (
    <button
      onClick={() => onChangeDate(date)}
      className={clsx(
        "font-bold space-y-2 px-5 py-4 text-center hover:bg-black/[0.08] [&>p]:leading-none",
        active ? "text-x-bargreen" : "text-x-grey-1"
      )}
    >
      <p className="  uppercase">{weekday}</p>
      <p className=" text-nowrap">{`${day} ${month}`}</p>
    </button>
  );
}
