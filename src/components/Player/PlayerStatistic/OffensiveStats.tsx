import { statTypes } from "@/ApiTypes/PlayerTypes";
import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function OffensiveStats({ stats, minutes_played }) {
  // const goals = stats?.details.find((stat) => stat.type_id === 52);
  // const penaltiesScored = stats?.details.find((stat) => stat.type_id === 111);
  // const penaltiesWon = stats?.details.find((stat) => stat.type_id === 115);
  // const assists = stats?.details.find((stat) => stat.type_id === 79);
  // const shotsOnTarget = stats?.details.find((stat) => stat.type_id === 86);
  // const totalShots = stats?.details.find((stat) => stat.type_id === 42);
  // const shotsBlocked = stats?.details.find((stat) => stat.type_id === 58);
  // const hitWoodwork = stats?.details.find((stat) => stat.type_id === 64);
  // const keyPasses = stats?.details.find((stat) => stat.type_id === 117);
  // const longBalls = stats?.details.find((stat) => stat.type_id === 122);
  // const longBallsWon = stats?.details.find((stat) => stat.type_id === 123);
  // const throughBalls = stats?.details.find((stat) => stat.type_id === 124);
  // const throughBallsWon = stats?.details.find((stat) => stat.type_id === 125);
  // const totalCrosses = stats?.details.find((stat) => stat.type_id === 98);
  // const accurateCrosses = stats?.details.find((stat) => stat.type_id === 99);
  // const totalDuels = stats?.details.find((stat) => stat.type_id === 105);
  // const duelsWon = stats?.details.find((stat) => stat.type_id === 106);
  // const dribbleAttemps = stats?.details.find((stat) => stat.type_id === 108);
  // const successfulDribbles = stats?.details.find(
  //   (stat) => stat.type_id === 109
  // );
  // const offsides = stats?.details.find((stat) => stat.type_id === 51);
  // const dispossessed = stats?.details.find((stat) => stat.type_id === 94);

  const statsData = Object.fromEntries(
    Object.entries(statTypes).map(([key, type]) => [
      key,
      stats?.details?.find((stat) => stat.type_id === type),
    ])
  );

  const {
    goals,
    penaltiesScored,
    penaltiesWon,
    assists,
    shotsOnTarget,
    totalShots,
    shotsBlocked,
    hitWoodwork,
    keyPasses,
    longBalls,
    longBallsWon,
    throughBalls,
    throughBallsWon,
    totalCrosses,
    accurateCrosses,
    totalDuels,
    duelsWon,
    dribbleAttemps,
    successfulDribbles,
    offsides,
    dispossessed,
  } = statsData;

  const getPer90 = (stat) => {
    if (!stat?.value?.total || minutes_played === 0) return "";
    return ((stat.value.total / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Offensive", "Total", "Per 90"]} stats={stats}>
      {goals && (
        <StatsRow
          stat={[
            "Goals (Penalties)",
            `${goals.value.total} (${goals.value.penalties})`,
            getPer90(goals),
          ]}
        />
      )}
      {penaltiesScored && (
        <StatsRow
          stat={[
            "Penalties Scored",
            `${penaltiesScored.value.total}`,
            getPer90(penaltiesScored),
          ]}
        />
      )}
      {penaltiesWon && (
        <StatsRow
          stat={[
            "Penalties Won",
            `${penaltiesWon.value.total}`,
            getPer90(penaltiesWon),
          ]}
        />
      )}
      {assists && (
        <StatsRow
          stat={["Assists", `${assists.value.total}`, getPer90(assists)]}
        />
      )}
      {shotsOnTarget && totalShots && (
        <StatsRow
          stat={[
            "On Target / Total Shots (%)",
            `${shotsOnTarget.value.total} / ${totalShots.value.total} (${(
              (shotsOnTarget.value.total / totalShots.value.total) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(totalShots)} / ${getPer90(totalShots)}`,
          ]}
        />
      )}
      {shotsBlocked && (
        <StatsRow
          stat={[
            "Shots Blocked",
            `${shotsBlocked.value.total}`,
            getPer90(shotsBlocked),
          ]}
        />
      )}
      {hitWoodwork && (
        <StatsRow
          stat={[
            "Hit Woodwork",
            `${hitWoodwork.value.total}`,
            getPer90(hitWoodwork),
          ]}
        />
      )}
      {keyPasses && (
        <StatsRow
          stat={["Key Passes", `${keyPasses.value.total}`, getPer90(keyPasses)]}
        />
      )}
      {longBalls && longBallsWon && (
        <StatsRow
          stat={[
            "Long Balls Won / Total (%)",
            `${longBallsWon.value.total} / ${longBalls.value.total} (${(
              (longBallsWon.value.total / longBalls.value.total) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(longBalls)} / ${getPer90(longBallsWon)}`,
          ]}
        />
      )}
      {throughBalls && throughBallsWon && (
        <StatsRow
          stat={[
            "Through Balls Won / Total (%)",
            `${throughBallsWon.value.total} / ${throughBalls.value.total} (${(
              (throughBallsWon.value.total / throughBalls.value.total) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(throughBalls)} / ${getPer90(throughBallsWon)}`,
          ]}
        />
      )}
      {accurateCrosses && totalCrosses && (
        <StatsRow
          stat={[
            "Accurate / Total Crosses (%)",
            `${accurateCrosses.value.total} / ${totalCrosses.value.total} (${(
              (accurateCrosses.value.total / totalCrosses.value.total) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(accurateCrosses)} / ${getPer90(totalCrosses)}`,
          ]}
        />
      )}
      {duelsWon && totalDuels && (
        <StatsRow
          stat={[
            "Duels Won / Total (%)",
            `${duelsWon.value.total} / ${totalDuels.value.total} (${(
              (duelsWon.value.total / totalDuels.value.total) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(duelsWon)}/ ${getPer90(totalDuels)}`,
          ]}
        />
      )}
      {successfulDribbles && dribbleAttemps && (
        <StatsRow
          stat={[
            "Successful / Attempted Dribbles (%)",
            `${successfulDribbles.value.total} / ${
              dribbleAttemps.value.total
            } (${(
              (successfulDribbles.value.total / dribbleAttemps.value.total) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(successfulDribbles)} / ${getPer90(dribbleAttemps)}`,
          ]}
        />
      )}
      {offsides && (
        <StatsRow
          stat={["Offsides", `${offsides.value.total}`, getPer90(offsides)]}
        />
      )}
      {dispossessed && (
        <StatsRow
          stat={[
            "Dispossessed",
            `${dispossessed.value.total}`,
            getPer90(dispossessed),
          ]}
        />
      )}
    </StatsTable>
  );
}

export default OffensiveStats;
