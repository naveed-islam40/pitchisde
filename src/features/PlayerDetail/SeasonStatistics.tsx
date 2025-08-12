import { Block } from "@/components/Block";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import styles from "./MatchTable.module.css";
import SeasonSelect from "@/components/Player/Match/SeasonSelect";
import StatsBox from "@/components/Player/StatsBox";

export function SeasonStatistics({ statistics }) {
  const filledStatistics = statistics.filter((stat) => stat.has_values);

  // [group by season]
  const groupBySeason = groupBySeasonName(filledStatistics);
  const seasons = Object.keys(groupBySeason)
    .map((season) => ({
      name: season,
      value: season,
    }))
    .sort((a: any, b: any) => b.value.slice(-2) - a.value.slice(-2));

  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.value);
  const [selectedLeague, setSelectedLeague] = useState("");

  const filteredBySeason = groupBySeason[selectedSeason];

  const filteredByLeague = filteredBySeason?.filter(
    (stat) => stat.season.league_id === selectedLeague
  );

  const filteredStats = filteredByLeague.length
    ? filteredByLeague
    : filteredBySeason;

  const sortedByLeague = filteredStats.sort(
    (a, b) => a.season.league_id - b.season.league_id
  );

  return (
    <Block>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">
          Season Statistics
        </h2>
        <SeasonSelect seasons={seasons} onChange={setSelectedSeason} />
      </div>
      <header className=" mt-3 flex gap-x-2 border-b pb-3">
        <button
          data-active={selectedLeague === ""}
          className={clsx(
            styles.league_slider,
            "text-lg font-bold text-primary"
          )}
          type="button"
          onClick={() => setSelectedLeague("")}
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
      {/* Season Statistics Stats  */}
      <StatsBox stats={filteredStats} />
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
