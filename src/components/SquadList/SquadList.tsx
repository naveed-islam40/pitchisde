import { getSquadByTeamAndSeason } from "@/services/squad-api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function SquadCell({
  player,
  type,
  coach,
}: {
  player?: any;
  type: string;
  coach?: any;
}) {
  const { jersey_number, position } = player;
  const data = type === "player" ? player.player : coach.coach;

  return (
    <Link
      href={`/player/${data.id}`}
      className="flex flex-col items-center shadow py-4 rounded-lg hover:bg-neutral-50 transition-all duration-200"
    >
      <Image
        src={data.image_path}
        width={150}
        height={150}
        alt={data.common_name}
        className="rounded-full size-12"
      />
      <h3 className="font-bold text-dark text-lg text-nowrap">
        {`${data.display_name} #${jersey_number}`}
      </h3>
      <span>{position.name}</span>
      <Image
        title={data.country.official_name}
        height={512}
        width={512}
        src={data.country.image_path}
        alt={data.country.official_name}
        className="rounded-full size-6 my-2"
      />
      <div>
        <div className="mb-1.5 text-sm font-semibold text-x-grey-1">
          {data.country.name}
        </div>
      </div>
    </Link>
  );
}

export function SquadList({ team, season }: { team: string; season: string }) {
  const { data: playersData, isLoading } = useQuery({
    queryKey: ["squad", team, season],
    queryFn: () =>
      getSquadByTeamAndSeason(Number(team), Number(season), {
        include: "player.country;position",
      }),
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={`squad-loader-${i}`}
            className="relative overflow-x-hidden bg-gray-200 h-40 rounded-md"
          >
            <div className="shimmer-effect"></div>
          </div>
        ))}
      </div>
    );
  if (!playersData) return null;

  const players = playersData.data;

  const midfielders = players?.filter(
    (item) => item.position.code === "midfielder"
  );
  const defenders = players?.filter(
    (item) => item.position.code === "defender"
  );
  const attackers = players?.filter(
    (item) => item.position.code === "attacker"
  );
  const goalkeepers = players?.filter(
    (item) => item.position.code === "goalkeeper"
  );

  return (
    <div>
      <h1 className="font-bold text-dark text-xl mb-2">Goalkeepers</h1>
      <div className="grid grid-cols-4 gap-4 mb-5">
        {goalkeepers?.map((player) => (
          <SquadCell type="player" key={player.id} player={player} />
        ))}
      </div>
      <h1 className="font-bold text-dark text-xl mb-2">Defenders</h1>
      <div className="grid grid-cols-4 gap-4 mb-5">
        {defenders?.map((player) => (
          <SquadCell type="player" key={player.id} player={player} />
        ))}
      </div>
      <h1 className="font-bold text-dark text-xl mb-2">Midfielders</h1>
      <div className="grid grid-cols-4 gap-4 mb-5">
        {midfielders?.map((player) => (
          <SquadCell type="player" key={player.id} player={player} />
        ))}
      </div>
      <h1 className="font-bold text-dark text-xl mb-2">Attackers</h1>
      <div className="grid grid-cols-4 gap-4 mb-5">
        {attackers?.map((player) => (
          <SquadCell type="player" key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
