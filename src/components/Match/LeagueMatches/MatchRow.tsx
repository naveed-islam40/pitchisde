import { VersusRow } from "@/components/VersusView";
import dayjs from "dayjs";

function MatchRow({ match }) {
  const { participants, scores, starting_at } = match;
  // const redCardEvents = events?.filter((ev) => ev.type_id === 20);
  const currentScores = scores.filter(
    (score: any) => score.description === "CURRENT"
  );

  const teams = participants.map((team) => {
    const teamScore = currentScores.find(
      (score) => score.participant_id === team.id
    );
    return {
      ...team,
      score: teamScore ? teamScore.score.goals : 0,
      logo: team.image_path,
      name: team.name,
      id: team.id,
    };
  });

  const homeTeam = teams.find((team) => team.meta.location === "home");
  const awayTeam = teams.find((team) => team.meta.location === "away");

  // const homeTeamRedCards = redCardEvents?.filter(
  //   (ev) => ev.participant_id === homeTeam.id
  // )?.length;
  // const awayTeamRedCards = redCardEvents?.filter(
  //   (ev) => ev.participant_id === awayTeam.id
  // )?.length;

  // const notStarted = state.short_name === "NS";

  // const awaiting = /^(TBA|POST|AU|DEL|NS)$/.test(state.short_name);

  const matchTime = dayjs.utc(starting_at).local().format("hh:mm A");
  const now = dayjs();
  const mode = dayjs.utc(starting_at).local().isAfter(now)
    ? "schedule"
    : dayjs.utc(starting_at).local().isBefore(now)
    ? "score"
    : "awaiting";

  return (
    <VersusRow
      key={match.id}
      mode={mode}
      // awaiting={awaiting && state.short_name}
      // tag={awaiting ? null : state.short_name}
      time={matchTime}
      team1={teams[0]}
      team2={teams[1]}
      // tagFull={state.name}
      matchId={match.id}
      // team1RedCards={homeTeamRedCards}
      // team2RedCards={awayTeamRedCards}
    />
  );
}

export default MatchRow;
