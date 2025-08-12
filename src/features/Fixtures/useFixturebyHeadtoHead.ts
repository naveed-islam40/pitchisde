import { useQuery } from "@tanstack/react-query";
import { useFixture } from "@/contexts/Fixture/FixtureContext";
import { getFixtureByHeadtoHead } from "@/services/fixtures-api";

export default function useFixtureByHeadtoHead() {
  const fixture: any = useFixture();
  const firstTeam = fixture?.data?.participants?.[0]?.id;
  const secondTeam = fixture?.data?.participants?.[1]?.id;

  const { data: fixtureHeadtoHead, isLoading } = useQuery({
    queryKey: ["fixtureHeadtoHead", firstTeam, secondTeam],
    queryFn: () => getFixtureByHeadtoHead(firstTeam, secondTeam),
    enabled: !!firstTeam && !!secondTeam,
  });

  return {
    matches: processMatches(fixtureHeadtoHead?.data),
    stats: calculateStats(fixtureHeadtoHead?.data),
    isLoading,
    fixtureHeadtoHead
  };
}

  export const calculateStats = (fixtureHeadtoHead) => {
    if (!fixtureHeadtoHead) {
      return {
        team1Wins: 0,
        team2Wins: 0,
        draws: 0,
        team1Color: "#C40010",
        team2Color: "#D446BA",
      };
    }

    const stats = fixtureHeadtoHead.reduce(
      (acc, match) => {
        const team1 = match.participants.find(
          (p) => p.meta.location === "home"
        );
        const team2 = match.participants.find(
          (p) => p.meta.location === "away"
        );

        if (team1.meta.winner) {
          acc.team1Wins++;
        } else if (team2.meta.winner) {
          acc.team2Wins++;
        } else {
          acc.draws++;
        }

        return acc;
      },
      { team1Wins: 0, team2Wins: 0, draws: 0 }
    );

    // Get team colors from metadata
    const latestMatch = fixtureHeadtoHead[0];
    const team1Color = latestMatch.metadata.find(m => m.type_id === 161)?.values?.participant || "#ffffff";
    const team2Color = latestMatch.metadata.find(m => m.type_id === 162)?.values?.participant || "#ffffff";

    return {
      ...stats,
      team1Color,
      team2Color,
    };
  };

  export const processMatches = (fixtureHeadtoHead) => {
    if (!fixtureHeadtoHead) return [];

    return fixtureHeadtoHead.map((match) => {
      const team1 = match.participants.find(p => p.meta.location === "home");
      const team2 = match.participants.find(p => p.meta.location === "away");

      return {
        id: match.id,
        date: new Date(match.starting_at).toLocaleDateString(),
        team1: {
          name: team1.name,
          logo: team1.image_path,
          score: match.scores
            .filter(
              (s) =>
                s.score.participant === "home" && s.description === "2ND_HALF"
            )
            .reduce((sum, s) => sum + (s.score.goals || 0), 0),
          isWinner: team1.meta.winner,
        },
        team2: {
          name: team2.name,
          logo: team2.image_path,
          score: match.scores
            .filter(
              (s) =>
                s.score.participant === "away" && s.description === "2ND_HALF"
            )
            .reduce((sum, s) => sum + (s.score.goals || 0), 0),
          isWinner: team2.meta.winner,
        },
        league: {
          name: match.league.name,
          logo: match.league.image_path,
        },
      };
    });
  };
