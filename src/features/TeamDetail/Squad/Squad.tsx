import { GoogleAds } from "@/components/GoogleAds";
import { NewsCarousel } from "@/components/News/NewsCarousel";
import { TeamOfWeek } from "@/components/TeamOfWeek/TeamOfWeek";
import { SquadList } from "@/components/SquadList/SquadList";
import { useTeam } from "@/contexts/Team/TeamContext";
import { useRouter } from "next/router";

export default function Squad() {
  const router = useRouter();
  const { teamId, season } = router.query;
  const teamData: any = useTeam();
  const team = teamData.data;

  const { coaches, seasons } = team;

  const activeSeason = season || seasons.find((season) => season.is_current).id;

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 shrink-0 space-y-5">
        <SquadList team={teamId as string} season={activeSeason} />
      </div>
      <div className="shrink-0 space-y-5">
        {/* <TeamOfWeek /> */}
        <GoogleAds />
        <NewsCarousel />
      </div>
    </div>
  );
}

function groupPlayersByPosition(players) {
  const grouped = players.reduce((acc, player) => {
    const key = player.position.code;
    if (!acc[key]) {
      acc[key] = {
        position_id: player.position_id,
        position: player.position.code || "Others",
        players: [],
      };
    }
    acc[key].players.push(player);
    return acc;
  }, {});

  return Object.keys(grouped).map((key) => ({
    position_id: grouped[key].position_id,
    position: grouped[key].position,
    players: grouped[key].players,
  }));
}
