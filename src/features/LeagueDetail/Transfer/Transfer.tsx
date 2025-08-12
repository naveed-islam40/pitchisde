import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";
import { TitleStripSimple } from "@/components/TitleStrip";
import { FeaturedTransfers } from "@/components/Transfers/FeaturedTransfers";
import Transfers from "@/components/Transfers/Transfers";
import { useLeague } from "@/contexts/League/LeagueContext";
import useTeamsBySeason from "@/features/Teams/useTeamsBySeason";
import { useRouter } from "next/router";

export default function Transfer() {
  const league: any = useLeague();
  const router = useRouter();
  const { seasons } = league.data;
  const { query } = router;
  const { leagueId } = query;

  const sortedSeasons = seasons.sort((a, b) => b.name.localeCompare(a.name));

  const selectedSeason = query.season
    ? sortedSeasons.find((season) => season.id === Number(query.season))
    : sortedSeasons.find((season) => season.is_current);

  const season = selectedSeason || sortedSeasons[0];

  const { seasonTeams, isLoading } = useTeamsBySeason({
    season: season.id,
  });

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-5">
        {isLoading && (
          <Block padding={false}>
            <TitleStripSimple title="Transfer" />
            <div className="relative h-[32rem] bg-gray-200 overflow-hidden">
              <div className="shimmer-effect"></div>
            </div>
          </Block>
        )}
        {seasonTeams && !isLoading ? (
          <Transfers teamsData={seasonTeams} />
        ) : null}
      </div>
      <div className="shrink-0 space-y-5">
        <FeaturedTransfers teamsData={seasonTeams} />
        <Block
          title="News"
          onNextClick={() =>
            router.push({ pathname: `/league/${leagueId}/news`, query })
          }
        >
          <div className="flex flex-col items-center gap-8">
            <NewsCard />
            <NewsCard />
          </div>
        </Block>
      </div>
    </div>
  );
}
