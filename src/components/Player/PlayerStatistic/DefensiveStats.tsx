import { defensiveTypeIds } from "@/ApiTypes/PlayerTypes";
import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function DefensiveStats({ stats, minutes_played }) {
  // const clearances = stats?.details.find((stat) => stat.type_id === 101);
  // const tackles = stats?.details.find((stat) => stat.type_id === 78);
  // const interceptions = stats?.details.find((stat) => stat.type_id === 100);
  // const dribbledPast = stats?.details.find((stat) => stat.type_id === 110);
  // const blockedShots = stats?.details.find((stat) => stat.type_id === 97);
  // const errorLeadToGoal = stats?.details.find((stat) => stat.type_id === 571);
  // const penaltiesCommitted = stats?.details.find(
  //   (stat) => stat.type_id === 114
  // );
  // const goalsConceded = stats?.details.find((stat) => stat.type_id === 88);
  // const cleanSheets = stats?.details.find((stat) => stat.type_id === 194);

  const defensiveStatsData = Object.fromEntries(
    Object.entries(defensiveTypeIds).map(([key, type]) => [
      key,
      stats?.details?.find((stat) => stat.type_id === type),
    ])
  );

  const {
    clearances,
    tackles,
    interceptions,
    dribbledPast,
    blockedShots,
    errorLeadToGoal,
    penaltiesCommitted,
    goalsConceded,
    cleanSheets,
  } = defensiveStatsData;

  const getPer90 = (stat) => {
    if (!stat?.value?.total || minutes_played === 0) return "";
    return ((stat.value.total / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Defensive", "Total", "Per 90"]} stats={stats}>
      {clearances && (
        <StatsRow
          stat={[
            "Clearances",
            `${clearances.value.total}`,
            getPer90(clearances),
          ]}
        />
      )}
      {tackles && (
        <StatsRow
          stat={["Tackles", `${tackles.value.total}`, getPer90(tackles)]}
        />
      )}
      {interceptions && (
        <StatsRow
          stat={[
            "Interceptions",
            `${interceptions.value.total}`,
            getPer90(interceptions),
          ]}
        />
      )}
      {blockedShots && (
        <StatsRow
          stat={[
            "Blocked Shots",
            `${blockedShots.value.total}`,
            getPer90(blockedShots),
          ]}
        />
      )}
      {dribbledPast && (
        <StatsRow
          stat={[
            "Dribbled Past",
            `${dribbledPast.value.total}`,
            getPer90(dribbledPast),
          ]}
        />
      )}
      {errorLeadToGoal && (
        <StatsRow
          stat={[
            "Errors Lead to Goal",
            `${errorLeadToGoal.value.total}`,
            getPer90(errorLeadToGoal),
          ]}
        />
      )}
      {penaltiesCommitted && (
        <StatsRow
          stat={[
            "Penalties Given",
            `${penaltiesCommitted.value.total}`,
            getPer90(penaltiesCommitted),
          ]}
        />
      )}
      {goalsConceded && (
        <StatsRow
          stat={[
            "Goals Conceded",
            `${goalsConceded.value.total}`,
            getPer90(goalsConceded),
          ]}
        />
      )}
      {cleanSheets && (
        <StatsRow
          stat={[
            "Clean Sheets",
            `${cleanSheets.value.total}`,
            getPer90(cleanSheets),
          ]}
        />
      )}
    </StatsTable>
  );
}

export default DefensiveStats;
