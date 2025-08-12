import clsx from "clsx";
import { Block } from "@/components/Block";
import useStandingsBySeason from "../Standings/useStandingsBySeason";
import { useFixture } from "@/contexts/Fixture/FixtureContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { IndicatorBar } from "@/components/IndicatorBar";
import dayjs from "dayjs";
import useFixtureById from "../Fixtures/useFixtureById";

function findMostUpcomingFixture(fixtures) {
  const now = dayjs();

  // First filter only upcoming fixtures
  const upcomingFixtures = fixtures.filter((fixture) =>
    dayjs.unix(fixture.starting_at_timestamp).isAfter(now)
  );

  // Sort by timestamp (ascending)
  upcomingFixtures.sort(
    (a, b) => a.starting_at_timestamp - b.starting_at_timestamp
  );

  // Find the first (closest) fixture
  return upcomingFixtures.find(() => true) || null;
}

function Row({ standing }: any) {
  const { details, participant, position, points, rule } = standing;

  const matchesPlayed = details.find(
    (item) => item.type.code === "overall-matches-played"
  );
  const goalDifference = details.find(
    (item) => item.type.code === "goal-difference"
  );

  const sortedUpcoming = participant.upcoming.sort(
    (a, b) => a.starting_at_timestamp - b.starting_at_timestamp
  );
  const { fixture: nextFixture } = useFixtureById({ id: sortedUpcoming[0].id });

  const { participants } = nextFixture?.data || {};

  const rival = participants?.find((team) => team.id !== participant.id);

  return (
    <div className="relative col-span-full grid grid-cols-subgrid items-center justify-items-center font-medium">
      <span>
        {rule && <IndicatorBar ruleId={rule.type_id} />}
        {position}
      </span>
      <div className="flex items-center gap-x-2 justify-self-start">
        <Image
          width={512}
          height={512}
          src={participant.image_path}
          className="w-7"
          alt={participant.name}
        />
        <p>{participant.name}</p>
      </div>
      <p className="px-1">{matchesPlayed.value}</p>
      <p className="px-1">{goalDifference.value}</p>
      <p className="px-1">{points}</p>
      {rival ? (
        <Image
          height={512}
          width={512}
          src={rival.image_path}
          className="w-5 mx-1"
          alt={rival.name}
          title={rival.name}
        />
      ) : null}
    </div>
  );
}

export function MatchMiniStandings({ seasonId }: { seasonId: number }) {
  const router = useRouter();
  const fixtureData: any = useFixture();
  const { participants, league_id } = fixtureData.data;
  const homeTeam = participants.find((team) => team.meta.location === "home");
  const awayTeam = participants.find((team) => team.meta.location === "away");
  const { standings } = useStandingsBySeason({ season: seasonId });

  if (!standings) return null;
  const { data } = standings;
  const homeTeamStanding = data?.find(
    (team: any) => team.participant_id === homeTeam.id
  );
  const awayTeamStanding = data?.find(
    (team: any) => team.participant_id === awayTeam.id
  );

  const gotoLeague = () => {
    router.push({
      pathname: `/league/${league_id}/overview`,
      query: { season: seasonId },
    });
  };
  return (
    <Block title="Standings" onNextClick={gotoLeague} padding={false}>
      <div className="grid grid-cols-[2rem,1fr,auto,auto,auto,auto] gap-2 px-2 mb-5 pb-4">
        <div
          className={clsx(
            "col-span-full grid grid-cols-subgrid justify-items-center gap-x-0 py-2  font-semibold text-primary "
          )}
        >
          <h3> </h3>
          <h3 className="justify-self-start">Team</h3>
          <h3>P</h3>
          <h3>+/-</h3>
          <h3>Pts</h3>
          <h3 className="mx-1">Next</h3>
        </div>
        <Row standing={homeTeamStanding} />
        <Row standing={awayTeamStanding} />
      </div>
    </Block>
  );
}
