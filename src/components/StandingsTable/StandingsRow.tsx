import clsx from "clsx";
import { IndicatorBar } from "../IndicatorBar";
import Image from "next/image";
import { FormSquare } from "./StandingsTable";
import Link from "next/link";
import useFixturesByDateRange from "@/features/Fixtures/useFixturesByDateRange";
import { add, format } from "date-fns";
import { useRouter } from "next/router";

export default function StandingsRow({ standing }) {
  const {
    participant,
    participant_id,
    form,
    details,
    season,
    season_id,
    league_id,
    rule,
  } = standing;

  const queryParams = {
    includes: "participants",
  };
  const router = useRouter();
  const { teamId } = router.query;
  const { fixtures, isLoading } = useFixturesByDateRange({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(add(new Date(), { weeks: 3 }), "yyyy-MM-dd"),
    leagueId: league_id,
    seasonId: season_id,
    teamId: participant_id,
    queryParams,
  });

  const { data } = fixtures?.[0] || {};
  const fixturesForThisLeague = data?.filter(
    (fixture) => fixture.league_id === league_id
  );

  const nextFixture = fixturesForThisLeague?.[0] || null;

  const matchesPlayed = details.find(
    (item) => item.type.code === "overall-matches-played"
  );
  const matchesWon = details.find((item) => item.type.code === "overall-won");
  const matchesDraw = details.find((item) => item.type.code === "overall-draw");
  const matchesLost = details.find((item) => item.type.code === "overall-lost");
  const goalsFor = details.find(
    (item) => item.type.code === "overall-goals-for"
  );
  const goalsAgainst = details.find(
    (item) => item.type.code === "overall-goals-against"
  );
  const goalDifference = details.find(
    (item) => item.type.code === "goal-difference"
  );

  return (
    <tr
      className={clsx(
        " hover:bg-[#F2F2F2] [&_td]:py-1.5",
        teamId
          ? Number(teamId) === participant_id
            ? "bg-neutral-200"
            : ""
          : "",
        rule?.type_id === 267 ? "bg-amber-400" : ""
      )}
    >
      <td className={clsx("relative pl-6 pr-4")}>
        <IndicatorBar ruleId={rule ? rule.type_id : "000"} />
        {standing.position}
      </td>
      <td className="w-[90%] px-4">
        <span className="mr-24 flex items-center gap-x-2">
          <Image
            width={100}
            height={100}
            src={participant.image_path}
            className="w-7"
            alt={`${participant.name} logo`}
          />
          <Link
            className="hover:underline underline-offset-2"
            href={`/team/${participant.id}/overview`}
          >
            {participant.name}
          </Link>
        </span>
      </td>
      <td>{matchesPlayed.value}</td>
      <td>{matchesWon.value}</td>
      <td>{matchesDraw.value}</td>
      <td>{matchesLost.value}</td>
      <td>{`${goalsFor.value}-${goalsAgainst.value}`}</td>
      <td>{goalDifference.value}</td>
      <td>{standing.points}</td>
      <td>
        <span className="flex gap-x-1">
          {form
            .slice(-5)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((form) => (
              <FormSquare key={form.id} form={form} />
            ))}
        </span>
      </td>
      <td className="pl-2 pr-6 ">
        {isLoading ? (
          <div className="size-7 rounded-full bg-gray-300"></div>
        ) : !season.finished && nextFixture ? (
          <Link href={`/match/${nextFixture.id}`}>
            <Image
              width={250}
              height={250}
              unoptimized
              title={`${format(nextFixture.starting_at, "MMMM dd hh:mm a")}, ${
                nextFixture.name
              }`}
              src={
                nextFixture.participants.find(
                  (team) => team.id !== participant_id
                ).image_path
              }
              className="mx-auto w-7 hover:opacity-50"
              alt={nextFixture.name}
            />
          </Link>
        ) : null}
      </td>
    </tr>
  );
}
