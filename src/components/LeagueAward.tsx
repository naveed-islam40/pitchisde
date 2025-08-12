import { Block } from "@/components/Block";
import useSeason from "@/features/Seasons/useSeason";
import { getPlayerById } from "@/services/players-api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function LeagueAwardPlayer({ stat, award }) {
  const { data: player } = useQuery({
    queryKey: ["player", stat.value.player_id],
    queryFn: () => getPlayerById(stat.value.player_id),
  });

  return (
    <div className="flex py-2 text-x-bargreen">
      <Image
        height={150}
        width={150}
        src={player?.data.image_path}
        className="h-11 w-11 shrink-0 rounded-full bg-x-grey-3"
        alt={stat.value.player_name}
      />
      <div className="flex flex-1 flex-col justify-center gap-y-0.5 pl-4">
        <Link href={`/stat/${stat.id}`} className="font-bold leading-none">
          {stat.value.player_name}
        </Link>
        <span className="text-sm font-medium">{award}</span>
      </div>
      <p className="mr-2 self-center text-xl font-bold">{stat.value.count}</p>
    </div>
  );
}

export function LeagueAward({ season }) {
  const router = useRouter();
  const { query } = router;
  const { leagueId } = query;
  const { seasonData } = useSeason({
    season: season.id,
    params: { filter: "seasonstatistictypes:208,209,195" },
  });
  const statistics = seasonData?.data?.statistics;

  const goldenBoot = statistics?.find((stat) => stat.type_id === 208);
  const playmaker = statistics?.find((stat) => stat.type_id === 209);
  const goldenGlove = statistics?.find((stat) => stat.type_id === 195);

  if (!goldenBoot && !playmaker && !goldenGlove)
    return (
      <Block title="League Awards" contentClassName="!pb-2">
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">No League Awards</p>
        </div>
      </Block>
    );

  return (
    <Block
      title="League Awards"
      contentClassName="!pb-2"
      onNextClick={() =>
        router.push({
          pathname: `/league/${leagueId}/stats`,
          query,
        })
      }
    >
      {goldenBoot && (
        <LeagueAwardPlayer stat={goldenBoot} award={"Golden Boot"} />
      )}
      {playmaker && <LeagueAwardPlayer stat={playmaker} award={"Playmaker"} />}
      {goldenGlove && (
        <LeagueAwardPlayer stat={goldenGlove} award={"Golden Glove"} />
      )}
    </Block>
  );
}
