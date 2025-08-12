import { Block } from "@/components/Block";
import { CalendarBar } from "@/components/CalenderBar";
import MatchSkeleton from "@/components/Skeletons/MatchSkeleton";
import { TitleStrip } from "@/components/TitleStrip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VersusRow, VersusRowList } from "@/components/VersusView";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { useFixtureByIds } from "../Fixtures/useFixturesByIds";
import { useGetFollowingMatchIds } from "@/hooks/useGetFollowing";

dayjs.extend(utc);
dayjs.extend(timezone);

export function MatchListInner({ fixturesData }) {
  const { fixtures, isLoading, isFetchingNextPage } = fixturesData;
  const { query: searchParams } = useRouter();
  const { followingMatchIds } = useGetFollowingMatchIds();

  const {
    fixtures: fixturesByIds,
    isError,
    isLoading: isLoadingByIds,
  } = useFixtureByIds({ ids: followingMatchIds });

  if (isLoading)
    return (
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <MatchSkeleton key={i} />
        ))}
      </div>
    );

  if (fixtures[0]?.message)
    return <NoResults message={fixtures[0].message.split(".")[0]} />;

  if (searchParams.live && fixtures?.message)
    return <NoResults message={fixtures.message.split(".")[0]} />;

  let fixturesList = fixtures.flatMap((fixture) => fixture.data);
  const liveStates = new Set([2, 3, 4, 6, 7, 9, 21, 22, 23, 25]);
  if (searchParams.live) {
    fixturesList = fixturesList.filter((fixture) =>
      liveStates.has(fixture.state_id)
    );
  }

  if (searchParams.live && !fixturesList.length)
    return <NoResults message="No Live Matches" />;

  const leagues = groupByLeague(fixturesList);

  return (
    <section>
      <Accordion
        defaultValue={leagues.map((league) => league.id)}
        type="multiple"
      >
        {followingMatchIds?.length > 0 && (
          <div>
            <AccordionItem value={"value-1"}>
              <AccordionTrigger className="text-[#006428] text-xl px-4">
                Following
              </AccordionTrigger>

              <AccordionContent>
                {fixturesByIds?.data?.length > 0 &&
                  fixturesByIds?.data?.map((fixture) => (
                    <MatchRow key={fixture.id} match={fixture} />
                  ))}
              </AccordionContent>
            </AccordionItem>
          </div>
        )}

        {leagues.map((league) => {
          return (
            <AccordionItem value={league.id} key={league.id}>
              <TitleStrip
                matches={league.matches}
                leagueId={league.id}
                icon={league.image_path}
                title={`${league.country.name} - ${league.name}`}
              />

              <AccordionContent className="pb-0">
                <VersusRowList>
                  {league.matches.map((match) => (
                    <MatchRow key={match.id} match={match} />
                  ))}
                </VersusRowList>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {isFetchingNextPage ? (
        <div>
          {Array.from({ length: 2 }, (_, i) => (
            <MatchSkeleton key={i} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function MatchRow({ match }) {
  const {
    participants,
    scores,
    state,
    starting_at,
    periods,
    events,
    aggregate,
  } = match;

  const redCardEvents = events?.filter((ev) => ev.type_id === 20);

  const currentScores = scores?.filter(
    (score: any) => score.description === "CURRENT"
  );

  const teams = participants?.map((team) => {
    const teamScore = currentScores?.find(
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

  const notStarted = state?.short_name === "NS";

  const awaiting = /^(TBA|POST|AU|DEL|NS)$/.test(state?.short_name);
  const is12HourFormat = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  }).resolvedOptions().hour12;

  const timeFormat = is12HourFormat ? "hh:mm A" : "HH:mm";
  const matchTime = dayjs.utc(starting_at).local().format(timeFormat);

  const homeTeam = teams.find((team) => team.meta.location === "home");
  const awayTeam = teams.find((team) => team.meta.location === "away");

  const homeTeamRedCards = redCardEvents?.filter(
    (ev) => ev.participant_id === homeTeam.id
  )?.length;
  const awayTeamRedCards = redCardEvents?.filter(
    (ev) => ev.participant_id === awayTeam.id
  )?.length;

  let displayTag = state?.short_name;
  if (!notStarted && !awaiting && periods && periods.ticking) {
    displayTag = `${periods.minutes + 1}'`;
  }

  return (
    <VersusRow
      aggregate={aggregate?.result}
      key={match.id}
      mode={notStarted ? "schedule" : awaiting ? "awaiting" : "score"}
      time={notStarted ? matchTime : null}
      matchId={match.id}
      notification
      awaiting={awaiting && state.short_name}
      tag={awaiting ? null : displayTag}
      tagFull={state?.name}
      team1={homeTeam}
      team2={awayTeam}
      team1RedCards={homeTeamRedCards}
      team2RedCards={awayTeamRedCards}
    />
  );
}

export function MatchList({ fixturesData, ...props }) {
  return (
    <Block {...props} padding={false}>
      <CalendarBar />
      <MatchListInner fixturesData={fixturesData} />
    </Block>
  );
}

function NoResults({ message }: { message: string | undefined }) {
  return (
    <div className="h-96 flex items-center justify-center px-4">
      <h1 className="text-center text-xl text-dark/70 font-semibold">
        {message}
      </h1>
    </div>
  );
}

const groupByLeague = (arr) => {
  const grouped = arr.reduce((acc, obj) => {
    const key = obj.league.id;
    if (!acc[key]) {
      acc[key] = {
        id: obj.league.id,
        name: obj.league.name,
        image_path: obj.league.image_path,
        country: {
          name: obj.league.country.name,
          image_path: obj.league.country.image_path,
        },
        matches: [],
      };
    }
    acc[key].matches.push(obj);
    return acc;
  }, {});

  return Object.keys(grouped).map((key) => ({
    id: grouped[key].id,
    name: grouped[key].name,
    image_path: grouped[key].image_path,
    matches: grouped[key].matches,
    country: grouped[key].country,
  }));
};
