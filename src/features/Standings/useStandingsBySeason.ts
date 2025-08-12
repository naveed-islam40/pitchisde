import { getStandingsBySeasonId } from "@/services/standings-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useStandingsBySeason({ season }) {
  const router = useRouter();
  const { query } = router;
  const seasonId = (query.season as string) || season;

  const queryParams = {
    includes:
      "participant.upcoming;form.fixture;details.type;group;season.league;rule.type",
  };

  const {
    data: standings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["standings", `season-${seasonId}`],
    queryFn: () => getStandingsBySeasonId(seasonId, queryParams),
  });

  return { standings, isLoading, isError, error };
}
