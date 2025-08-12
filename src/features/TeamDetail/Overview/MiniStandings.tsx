import { Block } from "@/components/Block";
import StandingsTableSkeleton from "@/components/Skeletons/StandingsTableSkeleton";
import { useTeam } from "@/contexts/Team/TeamContext";
import useStandingsBySeason from "@/features/Standings/useStandingsBySeason";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Row({ standing }) {
  const { details, participant, participant_id, position, points } = standing;
  const matchesPlayed = details.find(
    (item) => item.type.code === "overall-matches-played"
  );
  return (
    <div className="grid grid-cols-[auto,1fr,auto,auto] gap-y-2 items-center gap-x-4">
      <div className={clsx("relative py-2 w-4")}>{position}</div>
      <div className=" flex items-center gap-x-3">
        <Image
          width={100}
          height={100}
          src={participant.image_path}
          className="w-7"
          alt={`${participant.name} logo`}
        />
        <Link
          className="hover:underline underline-offset-2"
          href={`/team/${participant_id}/overview`}
        >
          {participant.name}
        </Link>
      </div>
      <span className="text-center font-semibold text-dark">
        {matchesPlayed.value}
      </span>
      <span className="text-center font-semibold text-dark">{points}</span>
    </div>
  );
}

function Seperator({ image_path, name }) {
  return (
    <div className="col-span-full flex items-center justify-center gap-x-1.5">
      <Image
        unoptimized
        width={512}
        height={512}
        src={image_path}
        className="w-7"
        alt={name}
      />

      <p className="font-bold">{name}</p>
    </div>
  );
}

export function MiniStandings() {
  const router = useRouter();
  const teamData: any = useTeam();
  const { activeseasons, id } = teamData?.data || {};

  const filteredActiveSeasons = activeseasons?.filter(
    (season) => season.standings_recalculated_at
  );

  return (
    <Block
      onNextClick={() => {
        router.push(`/team/${id}/standings`);
      }}
      title="Standings"
    >
      <div className=" grid grid-cols-[auto,1fr,auto,auto] gap-y-2">
        <div className="col-span-full grid grid-cols-subgrid gap-x-4 font-semibold text-dark">
          <h3>#</h3>
          <h3>Team</h3>
          <h3>P</h3>
          <h3>Pts</h3>
        </div>
      </div>
      {filteredActiveSeasons?.length &&
        filteredActiveSeasons.map((season) => (
          <StandingLeague teamId={id} key={season.id} activeSeason={season} />
        ))}
    </Block>
  );
}

const StandingLeague = ({ activeSeason, teamId }) => {
  const { standings, isLoading } = useStandingsBySeason({
    season: activeSeason.id,
  });
  const firstRankedTeam = standings?.data?.find(
    (standing) => standing.position === 1
  );

  const secondRankedTeam = standings?.data?.find(
    (standing) => standing.position === 2
  );
  const currentTeam = standings?.data?.find(
    (standing) => standing.participant_id === teamId
  );

  const isSameTeam = firstRankedTeam?.id === currentTeam?.id;

  if (isLoading) return <StandingsTableSkeleton />;

  return (
    <div className="space-y-4">
      <Seperator
        image_path={activeSeason.league.image_path}
        name={activeSeason.league.name}
      />
      {isSameTeam ? (
        <div className="space-y-2">
          <Row standing={firstRankedTeam} />
          <Row standing={secondRankedTeam} />
        </div>
      ) : (
        <div className="space-y-2">
          <Row standing={firstRankedTeam} />
          <Row standing={currentTeam} />
        </div>
      )}
    </div>
  );
};
