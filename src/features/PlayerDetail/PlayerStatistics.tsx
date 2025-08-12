import { Block } from "@/components/Block";
import StatsBox from "@/components/Player/PlayerStatistic/StatsBox";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import styles from "./MatchTable.module.css";
import SeasonSelect from "@/components/Player/PlayerStatistic/SeasonSelect";

export default function PlayerStatistics({ statistics, position }) {
  const filledStatistics = statistics.filter((stat) => stat.has_values);
  const groupBySeason = groupBySeasonName(filledStatistics);
  const seasons = Object.keys(groupBySeason)
    .map((season) => ({
      name: season,
      value: season,
    }))
    .sort((a: any, b: any) => b.value.slice(-2) - a.value.slice(-2));
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.value);

  const filteredBySeason = groupBySeason[selectedSeason];
  // sort by league id
  const sortedByLeague = filteredBySeason.sort(
    (a, b) => a.season.league_id - b.season.league_id
  );
  // Default selectedLeague is "" meaning "All"
  const [selectedLeague, setSelectedLeague] = useState("");

  // When "All" is selected, aggregate statistics from all leagues.
  // Otherwise, pick the stats for the selected league.
  const aggregatedStats = aggregatePlayerStats(filteredBySeason);
  const filteredByLeague =
    selectedLeague === ""
      ? aggregatedStats
      : filteredBySeason.find(
          (stat) => stat.season.league_id === selectedLeague
        );

  return (
    <Block>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-x-bargreen">Statistics</h2>
        <SeasonSelect seasons={seasons} onChange={setSelectedSeason} />
      </div>
      <header className=" mt-4 flex gap-x-2 pb-3">
        <button
          data-active={selectedLeague === ""}
          onClick={() => setSelectedLeague("")}
          className={clsx(
            styles.league_slider,
            "text-lg font-bold text-primary"
          )}
        >
          All
        </button>
        {sortedByLeague.map((stat) => (
          <button
            key={stat.id}
            data-active={selectedLeague === stat.season.league_id}
            onClick={() => setSelectedLeague(stat.season.league_id)}
            className={clsx(styles.league_slider)}
          >
            <Image
              width={250}
              height={250}
              src={stat?.season?.league?.image_path}
              alt={stat?.season?.league?.name}
            />
          </button>
        ))}
      </header>
      <StatsBox stats={filteredByLeague} position={position} />
    </Block>
  );
}

function groupBySeasonName(data) {
  return data.reduce((acc, item) => {
    const seasonName = item.season.name;
    if (!acc[seasonName]) {
      acc[seasonName] = [];
    }
    acc[seasonName].push(item);
    return acc;
  }, {});
}

function aggregatePlayerStats(statsArray) {
  if (!statsArray || statsArray.length === 0) return { details: [] };

  const aggregated = {};
  statsArray.forEach((stat) => {
    if (!stat.details) return;
    stat.details.forEach((detail) => {
      const { type_id, value } = detail;
      if (!aggregated[type_id]) {
        // Clone the value object
        aggregated[type_id] = { ...value };
        // For ratings, initialize a counter to compute an average
        if (type_id === 118) {
          aggregated[type_id].count = 1;
        }
      } else {
        // Sum numeric totals if present
        if (
          typeof value.total === "number" &&
          typeof aggregated[type_id].total === "number"
        ) {
          aggregated[type_id].total += value.total;
        }
        // Special handling for ratings (type_id 118)
        if (type_id === 118) {
          aggregated[type_id].average =
            (aggregated[type_id].average * aggregated[type_id].count +
              value.average) /
            (aggregated[type_id].count + 1);
          aggregated[type_id].lowest = Math.min(
            aggregated[type_id].lowest,
            value.lowest
          );
          aggregated[type_id].highest = Math.max(
            aggregated[type_id].highest,
            value.highest
          );
          aggregated[type_id].count += 1;
        }
        // If additional numeric properties (like penalties) exist, sum them as needed
        if (
          value.penalties !== undefined &&
          aggregated[type_id].penalties !== undefined
        ) {
          aggregated[type_id].penalties += value.penalties;
        }
      }
    });
  });

  // Convert the aggregated object back to an array in the same structure
  const aggregatedDetails = Object.keys(aggregated).map((key) => ({
    type_id: Number(key),
    value: aggregated[key],
  }));

  return { details: aggregatedDetails };
}
