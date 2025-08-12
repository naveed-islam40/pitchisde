import clsx from "clsx";
import { Block } from "@/components/Block";
import { useTeam } from "@/contexts/Team/TeamContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { startProgress, stopProgress } from "next-nprogress-bar";
import dayjs from "dayjs";
import { MdHome } from "react-icons/md";
import { IoMdAirplane } from "react-icons/io";

let formColorMap = {
  W: "#00985F",
  L: "#DD3636",
  D: "#8D9499",
};

function MatchCard({ fixture, isPrevious }) {
  const router = useRouter();
  const teamData: any = useTeam();
  const teamId = teamData.data.id;
  const location = fixture.meta.location;

  const homeTeam = fixture?.participants?.find((team) => team.id === teamId);
  const awayTeam = fixture?.participants?.find((team) => team.id !== teamId);

  const homeScore = fixture?.scores?.find(
    (score) =>
      score.description === "CURRENT" && score.score.participant === "home"
  );

  const awayScore = fixture?.scores?.find(
    (score) =>
      score.description === "CURRENT" && score.score.participant === "away"
  );

  const navigateToFixture = () => {
    if (isPrevious) {
      startProgress();
      router.push(`/match/${fixture.id}`).finally(() => stopProgress());
    }
  };

  const scoreDisplay = isPrevious ? (
    <div
      style={{
        backgroundColor:
          awayTeam?.meta.winner === true
            ? formColorMap["L"]
            : homeTeam?.meta.winner === true
            ? formColorMap["W"]
            : formColorMap["D"],
      }}
      className={clsx(
        "px-3 font-semibold text-center text-white text-sm rounded-full"
      )}
    >
      {homeScore?.score.goals} - {awayScore?.score.goals}
    </div>
  ) : (
    <div
      className={clsx(
        "px-3 font-semibold text-center text-white text-sm bg-primary-light rounded-full"
      )}
    >
      {dayjs(fixture.starting_at).format("DD MMM")}
      <br />
    </div>
  );

  return (
    <div
      onClick={navigateToFixture}
      className="flex flex-col items-center justify-center text-primary cursor-pointer select-none gap-1"
    >
      <Image
        src={fixture.league.image_path}
        width={250}
        height={250}
        className="size-7"
        alt={fixture.league.name}
        title={fixture.league.name}
      />
      {scoreDisplay}
      <span className="font-semibold text-primary">
        {location === "home" ? (
          <MdHome size={16} />
        ) : (
          <IoMdAirplane size={16} />
        )}
      </span>
      <Image
        src={awayTeam?.image_path}
        width={250}
        height={250}
        className="size-9 "
        alt={awayTeam?.name}
        title={awayTeam?.name}
      />
    </div>
  );
}

export function PreviousMatches({ fixtures }) {
  if (!fixtures) return null;
  return (
    <Block title="Latest" showNextButton={false}>
      <div className="flex gap-x-4 justify-between">
        {fixtures.length
          ? fixtures
              .slice(0, 5)
              .map((fixture) => (
                <MatchCard
                  key={fixture.id}
                  fixture={fixture}
                  isPrevious={true}
                />
              ))
          : null}
      </div>
    </Block>
  );
}

export function NextMatches({ fixtures }) {
  if (!fixtures) return null;
  return (
    <Block title="Upcoming" showNextButton={false}>
      <div className="flex gap-x-4 justify-between">
        {fixtures.length
          ? fixtures
              .slice(0, 5)
              .map((fixture) => (
                <MatchCard
                  key={fixture.id}
                  fixture={fixture}
                  isPrevious={false}
                />
              ))
          : null}
      </div>
    </Block>
  );
}
