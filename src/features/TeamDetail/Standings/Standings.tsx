import { GoogleAds } from "@/components/GoogleAds";
import { NewsCarousel } from "@/components/News/NewsCarousel";
import { StandingsTable } from "@/components/StandingsTable/StandingsTable";
import { useTeam } from "@/contexts/Team/TeamContext";
import useStandingsBySeason from "@/features/Standings/useStandingsBySeason";
import { useRouter } from "next/router";
import { NextMatches, PreviousMatches } from "./Matches";
import { Block } from "@/components/Block";

export default function Standings() {
  const teamData: any = useTeam();
  const { data, message } = teamData;
  const { seasons } = data;

  const activeSeason = seasons.find((season) => season.is_current);

  if (!data) return <p>{message}</p>;

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-5">
        <ActiveSeasonStandings activeSeason={activeSeason} />
      </div>
      <div className="shrink-0 space-y-5">
        <PreviousMatches fixtures={data.latest} />
        <NextMatches fixtures={data.upcoming} />
        <GoogleAds />
        <NewsCarousel />
      </div>
    </div>
  );
}

function ActiveSeasonStandings({ activeSeason }) {
  const router = useRouter();
  const { query } = router;
  const selectedSeason = query.season || activeSeason.id;
  const { standings, isLoading, isError } = useStandingsBySeason({
    season: selectedSeason,
  });

  if (isError)
    return (
      <Block
        title="New Standings"
        centerTitle
        showNextButton={false}
        contentClassName="flex flex-col"
      >
        <p className="mx-auto text-lg">No Standings Available</p>
      </Block>
    );
  return (
    <StandingsTable
      standingsData={standings}
      isLoading={isLoading}
      showTitle={false}
    />
  );
}
