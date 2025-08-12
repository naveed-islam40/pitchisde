import { Block } from "@/components/Block";
import DesktopView from "@/components/Player/Match/DesktopView";

export interface Team {
  name: string;
  logo: string;
  score: number;
}

export function MatchTable({ lineups }) {
  const lineupsWithFixture = lineups.filter((lineup) => lineup.fixture);
  const lineupsBySeason = groupBySeasonAndLeague(lineupsWithFixture);

  return (
    <Block padding={false}>
      <DesktopView seasons={lineupsBySeason} />
    </Block>
  );
}

function groupBySeasonAndLeague(dataList) {
  return dataList.reduce((result, item) => {
    const { fixture, season = fixture.season, league = fixture.league } = item;

    // Find or create the season group by season.name
    let seasonGroup = result.find((s) => s.name === season.name);
    if (!seasonGroup) {
      seasonGroup = {
        ...season, // Include season fields
        leagues: [],
      };
      result.push(seasonGroup);
    }

    // Find or create the league group within the season
    let leagueGroup = seasonGroup.leagues.find((l) => l.id === league.id);
    if (!leagueGroup) {
      leagueGroup = {
        ...league, // Include league fields
        items: [],
      };
      seasonGroup.leagues.push(leagueGroup);
    }

    // Add the fixture to the league's items
    leagueGroup.items.push({
      ...item, // Include fields from the main object
      fixture, // Include specific fixture details
    });

    return result;
  }, []);
}
