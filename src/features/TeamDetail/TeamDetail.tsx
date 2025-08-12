import { TabDef } from "@/components/DetailView/DetailView";
import TeamTitle from "@/components/Team/TeamTitle";
import { useTeam } from "@/contexts/Team/TeamContext";
import {
  IconBell,
  IconBuildingStadium,
  IconCalendarUp,
  IconChartBar,
  IconSoccerField,
  IconStar,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export function TeamDetail() {
  const router = useRouter();
  const { query, pathname } = router;
  const onTransfersPage = pathname.includes("transfers");
  const { teamId, ...restQuery } = query;

  const createLink = (pathname) => {
    return {
      pathname,
      query: restQuery,
    };
  };

  const tabs = [
    { label: "Overview", path: createLink(`/team/${teamId}/overview`) },
    {
      label: "Standings",
      path: createLink(`/team/${teamId}/standings`),
    },
    { label: "Team", path: createLink(`/team/${teamId}/squad`) },
    { label: "Transfers", path: createLink(`/team/${teamId}/transfers`) },
    // { label: "News", path: createLink(`/team/${teamId}/news`) },
    {
      label: "Statistics",
      path: createLink(`/team/${teamId}/statistics`),
    },
    { label: "History", path: createLink(`/team/${teamId}/history`) },
  ];

  return (
    <section className="app-block bg-[#f5f5f5] h-48 rounded-xl mb-6 p-8 pb-0 ">
      <div className="flex h-full justify-between ">
        <Social />
        <div className=" flex flex-col items-center justify-between">
          <TeamTitle />
          <div className="flex max-w-full gap-x-4 overflow-x-auto text-base pt-7 md:pt-2 md:gap-x-8">
            {tabs.map((tab) => (
              <Tab key={tab.label} tab={tab} />
            ))}
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
    <div id="Actions" className="h-full">
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

function Social() {
  const team: any = useTeam();
  const { data } = team;
  const rankings = data.rankings;
  const venue = data.venue;
  const hasRankings = rankings?.length;

  return (
    <div id="Social" className="h-full">
      <ul className="space-y-2 text-dark font-display">
        {venue && (
          <li>
            <div className="flex items-center gap-3 ">
              <IconBuildingStadium />
              <span className="text-lg">{venue.name}</span>
            </div>
          </li>
        )}

        <li>
          <div className="flex items-center gap-3 ">
            <IconUsersGroup />
            <span className="text-lg">10,000</span>
          </div>
        </li>

        <li>
          <a
            target="__blank"
            href="#"
            className="flex items-center gap-3 hover:underline"
          >
            <IconWorld />
            <span className="text-lg">Website</span>
          </a>
        </li>
        {hasRankings ? (
          <li>
            <div className="flex items-center gap-3 ">
              <IconChartBar />
              <span className="text-lg">
                {rankings[0]?.type} Ranking: {rankings[0]?.position}
              </span>
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
