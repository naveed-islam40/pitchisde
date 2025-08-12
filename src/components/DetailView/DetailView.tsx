import clsx from "clsx";
import React, { HTMLProps, PropsWithChildren } from "react";
import Link from "next/link";
import LeagueTitle from "../League/LeagueTitle";
import { FaRegStar } from "react-icons/fa6";
import { PiBellSimpleFill } from "react-icons/pi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLeague } from "@/contexts/League/LeagueContext";
import TeamTitle from "../Team/TeamTitle";
import { UrlObject } from "url";
import PlayerTitle from "@/features/PlayerDetail/PlayerTitle";
import MyXiIcon from "./MyXIIcon";
import { useTeam } from "@/contexts/Team/TeamContext";

export interface TabDef {
  label: string;
  path: UrlObject;
}

type DetailViewProps = {
  tabs?: TabDef[];
  defaultTabIndex?: number;
  colorBackground?: string;
  colorAccent?: string;
  showYearPicker?: boolean;
  childrenClassName?: string;
  detailsFor?: "team" | "player" | "league";

  temp__OnlyPlayerActions?: boolean;
} & PropsWithChildren &
  HTMLProps<HTMLDivElement>;

export function DetailView({
  className,
  style,
  tabs,
  colorBackground = "#00401A",
  colorAccent = "#ffffff",
  showYearPicker = true,
  detailsFor = "league",
  childrenClassName = "",
  children,
  ...rest
}: DetailViewProps) {
  return (
    <>
      <div
        {...rest}
        style={
          {
            "--dv-background": colorBackground,
            "--dv-accent": colorAccent,
            ...style,
          } as React.CSSProperties
        }
        className={clsx(
          "shadow-x-0-2-15-0",
          "mb-6 lg:rounded-[20px] border-red-400 bg-[--dv-background] px-4 pt-4 md:pt-8 sm:px-6 md:px-10 lg:px-14 max-lg:-mx-4 lg:mt-8",
          "text-[--dv-accent]",
          className
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-[auto,1fr,auto] grid-rows-[auto,1fr,auto] items-start",
            !tabs && "pb-10"
          )}
        >
          <div className={clsx(!showYearPicker && "row-span-2 md:h-full")}>
            {detailsFor === "league" ? (
              <LeagueTitle />
            ) : detailsFor === "team" ? (
              <TeamTitle />
            ) : detailsFor === "player" ? (
              <PlayerTitle />
            ) : (
              <LeagueTitle />
            )}
          </div>
          <div
            className={clsx(
              "max-xl:col-span-full max-xl:row-[3/4]",
              !showYearPicker && "row-span-2 h-full",
              childrenClassName
            )}
          >
            {children}
          </div>
          <Actions />
          {showYearPicker && (
            <div className="mt-5 lg:ml-0 ml-auto">
              <SeasonSelect />
            </div>
          )}
        </div>
        {/* Tabs */}
        {tabs && (
          <div className="flex max-w-full gap-x-4 overflow-x-auto text-base pt-7 md:pt-2 md:gap-x-8">
            {tabs.map((tab) => (
              <Tab key={tab.label} tab={tab} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Tab({ tab }: { tab: TabDef }) {
  const router = useRouter();
  const { asPath } = router;

  const isActive = asPath.includes(tab.path.pathname as string);

  return (
    <Link
      className={clsx(
        "detail-view-tab",
        "group relative rounded-[0.1rem] border-b-4 pb-1",
        isActive
          ? "active border-[--dv-accent]"
          : "border-transparent opacity-75"
      )}
      href={tab.path}
    >
      <span className="invisible font-semibold">{tab.label}</span>
      <span className="absolute left-1/2 -translate-x-1/2 group-[.active]:font-semibold">
        {tab.label}
      </span>
    </Link>
  );
}

function Action({ name, icon }) {
  return (
    <button className="ml-auto group flex cursor-pointer flex-row-reverse items-center gap-x-4">
      {icon}
      <span className="text-right font-semibold text-lg group-hover:underline">
        {name}
      </span>
    </button>
  );
}

export function Actions() {
  return (
    <div className="row-span-2 hidden space-y-2 md:block text-neutral-600">
      <Action name="CreatePITCHSIDE" icon={<MyXiIcon className="w-6 h-6" />} />
      <Action name="Follow" icon={<FaRegStar className="w-6 h-6" />} />
      <Action
        name="Notifications"
        icon={<PiBellSimpleFill className="w-6 h-6" />}
      />
      <Action
        name="Sync Calendar"
        icon={<MdOutlineCalendarToday className="w-6 h-6" />}
      />

      {/* Socials */}
      <div className="flex flex-row-reverse items-center gap-x-1.5 pr-9 pt-2">
        <Link href="#">
          <AiFillTikTok className="w-5 h-5" />
        </Link>
        <Link href="#">
          <FaSquareXTwitter className="w-5 h-5" />
        </Link>
        <Link href="#">
          <FaSquareInstagram className="w-5 h-5" />
        </Link>
        <Link href="#">
          <FaFacebookSquare className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default function SeasonSelect() {
  const league: any = useLeague();
  const team: any = useTeam();

  const router = useRouter();
  const { pathname, query } = router;

  if (!league && !team) return null;

  const data = league?.data || team?.data;

  if (!data) return null;

  const { seasons } = data;

  const sortedSeasons =
    seasons?.sort((a, b) => b.name.localeCompare(a.name)) || [];

  const handleChangeSeason = (value) => {
    router.push({ pathname, query: { ...query, season: value } }, undefined, {
      shallow: true,
    });
  };

  const selectedSeason = query.season
    ? sortedSeasons.find((season) => season.id === Number(query.season))
    : sortedSeasons.find((season) => season.is_current);

  const selectedValue =
    selectedSeason || sortedSeasons.find((season) => !season.is_current) || {};

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue.id || ""}>
      <SelectTrigger className="w-20 text-sm px-0 border-0 bg-transparent font-display text-dark  focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder={selectedValue.name || "Select Season"} />
      </SelectTrigger>
      <SelectContent position="popper">
        {sortedSeasons.map(({ id, name }) => (
          <SelectItem key={id} className="py-1 pr-1 font-display" value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
