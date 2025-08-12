import { Block } from "@/components/Block";
import { LeagueAward } from "@/components/LeagueAward";
import { NewsCard } from "@/components/News/NewsCard";
import { StandingsTable } from "@/components/StandingsTable/StandingsTable";
import { TeamOfWeek } from "@/components/TeamOfWeek/TeamOfWeek";
import { useLeague } from "@/contexts/League/LeagueContext";
import useStandingsBySeason from "@/features/Standings/useStandingsBySeason";
import { useRouter } from "next/router";

export default function Overview() {
  const league: any = useLeague();
  const router = useRouter();
  const { seasons } = league.data;
  const { query } = router;
  const { leagueId, ...restQuery } = query;

  const sortedSeasons = seasons.sort((a, b) => b.name.localeCompare(a.name));

  const selectedSeason = query.season
    ? sortedSeasons.find((season) => season.id === Number(query.season))
    : sortedSeasons.find((season) => season.is_current);

  const season = selectedSeason || sortedSeasons[0];

  const { standings: standingsBySeason, isLoading: isStandingsDataLoading } =
    useStandingsBySeason({
      season: season.id,
    });

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-5">
        {/* Standing Table */}
        <StandingsTable
          standingsData={standingsBySeason}
          isLoading={isStandingsDataLoading}
        />
        {/* Horizontal News */}
        <Block
          title="News"
          centerTitle
          showNextButton={false}
          contentClassName="flex flex-col"
        >
          <div className="flex justify-between gap-4 overflow-hidden pb-2 max-md:flex-col max-md:items-center flex-wrap">
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </div>

          <button
            onClick={() => router.push(`/league/${leagueId}/news`)}
            className=" mt-4 self-center text-primary hover:underline"
          >
            See More
          </button>
        </Block>
      </div>
      <div className="shrink-0 space-y-5">
        <Block contentClassName="!pb-2" title="Featured Match">
          {/* <ScheduledMatch /> */}
        </Block>
        <LeagueAward season={season} />
        <TeamOfWeek />
      </div>
    </div>
  );
}
