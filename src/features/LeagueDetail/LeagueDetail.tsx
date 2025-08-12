import { TabDef } from "@/components/DetailView/DetailView";
import LeagueTitle from "@/components/League/LeagueTitle";
import { useLeague } from "@/contexts/League/LeagueContext";
import { shouldShowKnockoutPage } from "@/helpers/knockout-helper";
import {
  IconBell,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconCalendarUp,
  IconSoccerField,
  IconStar,
  IconWorld,
} from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export function LeagueDetail() {
  const router = useRouter();
  const { query } = router;

  const { leagueId, ...restQuery } = query;

  const league: any = useLeague();

  const showKnockOutPage = shouldShowKnockoutPage(league?.data?.stages);

  const createLink = (pathname) => {
    return {
      pathname,
      query: restQuery,
    };
  };
  const tabs = [
    { label: "Overview", path: createLink(`/league/${leagueId}/overview`) },
    {
      label: "Matches",
      path: createLink(`/league/${leagueId}/matches`),
    },
    // {
    //   label: "Knockout",
    //   path: createLink(`/league/${leagueId}/playoff`),
    // },
    {
      label: "Statistics",
      path: createLink(`/league/${leagueId}/stats`),
    },
    { label: "Transfers", path: createLink(`/league/${leagueId}/transfer`) },
    { label: "News", path: createLink(`/league/${leagueId}/news`) },
  ];
  return (
    <section className="app-block bg-[#f5f5f5] h-48 rounded-xl mb-6 p-8 pb-0 ">
      <div className="flex h-full justify-between ">
        <SocialLinks />
        <div className=" flex flex-col items-center justify-between">
          <LeagueTitle />
          <div className="flex max-w-full gap-x-4 overflow-x-auto text-base pt-7 md:pt-2 md:gap-x-8">
            {tabs.map((tab) =>
              tab.label === "knockout" && !showKnockOutPage ? (
                ""
              ) : (
                <Tab key={tab.label} tab={tab} />
              )
            )}
          </div>
        </div>
        <Actions />
      </div>
    </section>
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
        "group relative rounded-[0.1rem] border-b-4 pb-2 text-lg text-dark font-display",
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
function Actions() {
  return (
    <div id="socialLinks" className="h-full">
      <ul className="space-y-2 text-dark font-display text-right">
        <li>
          <button
            type="button"
            className="w-full flex items-center gap-3 justify-end"
          >
            <span className="text-lg">Follow</span>
            <IconStar />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="w-full flex items-center gap-3 justify-end"
          >
            <span className="text-lg">Notifications</span>
            <IconBell />
          </button>
        </li>
        <li>
          <button className="w-full flex items-center gap-3 justify-end">
            <span className="text-lg">Sync Calendar</span>
            <IconCalendarUp />
          </button>
        </li>
        <li>
          <button className="w-full flex items-center gap-3 justify-end">
            <span className="text-lg">
              Create
              <span className="uppercase font-display font-semibold italic">
                pitchside
              </span>
            </span>
            <IconSoccerField />
          </button>
        </li>
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div id="socialLinks" className="h-full">
      <ul className="space-y-2 text-dark font-display">
        <li>
          <a
            target="__blank"
            href="https://facebook.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconBrandFacebook />
            <span className="text-lg">Facebook</span>
          </a>
        </li>
        <li>
          <a
            target="__blank"
            href="https://instagram.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconBrandInstagram />
            <span className="text-lg">Instagram</span>
          </a>
        </li>
        <li>
          <a
            target="__blank"
            href="https://instagram.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconBrandX />
            <span className="text-lg">Twitter</span>
          </a>
        </li>
        <li>
          <a
            target="__blank"
            href="https://uk_pl.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconWorld />
            <span className="text-lg">Website</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
