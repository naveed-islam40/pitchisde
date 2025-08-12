import { GoogleAds } from "@/components/GoogleAds";
import { usePlayer } from "@/contexts/Player/PlayerContext";
import { AppLayout } from "@/layouts/AppLayout";
import { MatchTable } from "./MatchTable";
import { MiniTransfer } from "./MiniTransfer";
import PlayerHero from "./PlayerHero";
import PlayerStatistics from "./PlayerStatistics";
import { SeasonStatistics } from "./SeasonStatistics";
import { Trophies } from "./Trophies";

export function PlayerDetail() {
  const player: any = usePlayer();
  const { transfers, trophies, lineups, statistics, ...playerInfo } =
    player?.data || {};

  if (player.message)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load player data: ${player.message}`}
        </p>
      </AppLayout>
    );

  return (
    <AppLayout>
      <PlayerHero />
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="flex-1 space-y-5">
          <MatchTable lineups={lineups} />
          <PlayerStatistics
            statistics={statistics}
            position={playerInfo.position}
          />
        </div>
        <div className="shrink-0 space-y-5">
          <SeasonStatistics statistics={statistics} />
          <GoogleAds />
          <MiniTransfer transfers={transfers} />
          <Trophies trophies={trophies} />
        </div>
      </div>
    </AppLayout>
  );
}
