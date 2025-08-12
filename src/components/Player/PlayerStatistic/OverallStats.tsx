import { appearanceTypeIds } from "@/ApiTypes/PlayerTypes";
import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function OverallStats({ stats, minutes_played }) {
  // const rating = stats?.details.find((stat) => stat.type_id === 118);
  // const appearances = stats?.details.find((stat) => stat.type_id === 321);
  // const substitutions = stats?.details.find((stat) => stat.type_id === 59);
  // const bench = stats?.details.find((stat) => stat.type_id === 323);
  // const minutesPlayed = stats?.details.find((stat) => stat.type_id === 119);

  const appearanceStatsData = Object.fromEntries(
    Object.entries(appearanceTypeIds).map(([key, type]) => [
      key,
      stats?.details?.find((stat) => stat.type_id === type),
    ])
  );

  // Destructuring the appearance stats
  const { rating, appearances, substitutions, bench, minutesPlayed } =
    appearanceStatsData;

  const getPer90 = (stat, isMinutesPlayed = false) => {
    if (!stat?.value?.total) return "";
    if (isMinutesPlayed) return (stat.value.total / 90).toFixed(1);
    if (minutes_played === 0) return "";
    return ((stat.value.total / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Overall", "Total", "Per 90"]} stats={stats}>
      {rating && (
        <StatsRow
          stat={[
            "Rating (Min/Max)",
            `${rating.value.average.toFixed(2)} (${rating.value.lowest} / ${
              rating.value.highest
            })`,
            ``,
          ]}
        />
      )}
      {appearances && (
        <StatsRow
          stat={["Starts / Appearances", appearances.value.total, ""]}
        />
      )}
      {substitutions && (
        <StatsRow
          stat={[
            "Substitutions in / out",
            `${substitutions.value.in} / ${substitutions.value.out}`,
            ``,
          ]}
        />
      )}
      {bench && <StatsRow stat={["Benched", `${bench.value.total}`, ``]} />}
      {minutesPlayed && (
        <StatsRow
          stat={[
            "Minutes Played",
            minutesPlayed.value.total,
            getPer90(minutesPlayed, true),
          ]}
        />
      )}
    </StatsTable>
  );
}

export default OverallStats;
