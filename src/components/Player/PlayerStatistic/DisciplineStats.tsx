import { foulTypeIds } from "@/ApiTypes/PlayerTypes";
import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function DisciplineStats({ stats, minutes_played }) {
  // const fouls = stats?.details.find((stat) => stat.type_id === 56);
  // const foulsDrawn = stats?.details.find((stat) => stat.type_id === 96);
  // const yellowCards = stats?.details.find((stat) => stat.type_id === 84);
  // const redCards = stats?.details.find((stat) => stat.type_id === 83);

  const foulsData = Object.fromEntries(
    Object.entries(foulTypeIds)?.map(([key, type]) => [
      key,
      stats?.details?.find((stat) => stat?.type_id === type),
    ])
  );

  const { fouls, foulsDrawn, yellowCards, redCards } = foulsData;
  const getPer90 = (stat) => {
    if (!stat?.value?.total || minutes_played === 0) return "";
    return ((stat.value.total / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Discipline", "Total", "Per 90"]} stats={stats}>
      {fouls && (
        <StatsRow stat={["Fouls", `${fouls.value.total}`, getPer90(fouls)]} />
      )}
      {foulsDrawn && (
        <StatsRow
          stat={[
            "Fouls Drawn",
            `${foulsDrawn.value.total}`,
            getPer90(foulsDrawn),
          ]}
        />
      )}
      {yellowCards && (
        <StatsRow
          stat={[
            "Yellow Cards",
            `${yellowCards.value.total}`,
            getPer90(yellowCards),
          ]}
        />
      )}
      {redCards && (
        <StatsRow
          stat={["Red Cards", `${redCards.value.total}`, getPer90(redCards)]}
        />
      )}
    </StatsTable>
  );
}

export default DisciplineStats;
