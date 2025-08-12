import { Block } from "@/components/Block";
import StandingsTableSkeleton from "../Skeletons/StandingsTableSkeleton";
import GroupedStandings from "./GroupedStandings";
import UnGroupedStandings from "./UnGroupedStandings";
import Link from "next/link";
import { format } from "date-fns";

let formColorMap = {
  W: "#00973c",
  L: "#da291c",
  D: "#8D9499",
};

export function FormSquare({ form }) {
  return (
    <Link
      title={`${format(form.fixture.starting_at, "MMMM dd hh:mm a")}, ${
        form.fixture.name
      }`}
      href={`/match/${form.fixture_id}`}
      className="relative flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-light hover:opacity-80 group text-lg"
      style={{ backgroundColor: formColorMap[form.form] || "#8D9499" }}
    >
      {form.form}
      <span
        style={{ backgroundColor: formColorMap[form.form] || "#8D9499" }}
        className="group-last:inline-block hidden w-3/5 mx-auto absolute -bottom-1 left-1/2 -translate-x-1/2  h-0.5 rounded-md"
      ></span>
    </Link>
  );
}

export function StandingsTable({ standingsData, isLoading, showTitle = true }) {
  if (isLoading) return <StandingsTableSkeleton />;

  const standingsList = standingsData.data;

  if (!standingsList)
    return (
      <Block className="h-48 flex items-center justify-center">
        <h1 className="text-center text-xl text-dark/70 font-semibold">
          {"No standings for this season"}
        </h1>
      </Block>
    );

  const isGrouped = standingsList[0].group_id;

  const standings = isGrouped
    ? groupStandingsByGroupId(standingsList)
    : standingsList;

  console.log("standings", standings);
  return (
    <Block padding={false}>
      {showTitle && (
        <div className="flex items-center gap-2 px-4 py-2 text-primary rounded-t-lg">
          <span className="text-lg font-semibold">Standings</span>
        </div>
      )}
      {isGrouped ? (
        <GroupedStandings groups={standings} />
      ) : (
        <UnGroupedStandings standings={standings} />
      )}
    </Block>
  );
}

function groupStandingsByGroupId(standings) {
  const grouped = standings.reduce((acc, standing) => {
    const key = standing.group_id;
    if (!acc[key]) {
      acc[key] = {
        group_id: standing.group_id,
        group_name: standing.group?.name || "Others",
        standings: [],
      };
    }
    acc[key].standings.push(standing);
    return acc;
  }, {});

  return Object.keys(grouped).map((key) => ({
    id: grouped[key].group_id,
    name: grouped[key].group_name,
    standings: grouped[key].standings,
  }));
}
