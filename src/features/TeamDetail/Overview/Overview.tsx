import { MatchList } from "./MatchList";
import { MiniStandings } from "./MiniStandings";
import { GoogleAds } from "@/components/GoogleAds";
import { NewsCarousel } from "@/components/News/NewsCarousel";
import { Block } from "@/components/Block";
import { ScheduledMatch } from "@/components/ScheduledMatch";
import { useTeam } from "@/contexts/Team/TeamContext";
import { PreviousMatches } from "../Standings/Matches";

export default function Overview() {
  const teamData: any = useTeam();
  const { upcoming, latest } = teamData?.data || {};

  const fixturesByLeagues = Object.entries(
    latest?.reduce((league, fixture) => {
      const leagueId = fixture.league_id;

      if (!league[leagueId]) {
        league[leagueId] = [];
      }
      league[leagueId].push(fixture);
      return league;
    }, {})
  ).map((item) => item[1]);

  return (
    <div className={"flex lg:flex-row flex-col gap-4"}>
      <div className="basis-3/12 lg:order-1 order-3 space-y-4">
        <PreviousMatches fixtures={latest} />
        <GoogleAds />
        <NewsCarousel />
      </div>
      <div className="flex-1 lg:order-2 order-1 relative">
        <MatchList leagues={fixturesByLeagues} />
      </div>
      <div className="basis-3/12 lg:order-3 order-2 space-y-4">
        <Block title="Upcoming Matches">
          <div className="space-y-6">
            {upcoming?.length
              ? upcoming
                  .slice(0, 2)
                  .map((fixture) => (
                    <ScheduledMatch key={fixture.id} fixture={fixture} />
                  ))
              : "No Upcoming Matches"}
          </div>
        </Block>
        <MiniStandings />
      </div>
    </div>
  );
}
