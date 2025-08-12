import { getFixtureByIds } from "@/services/fixtures-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useFixtureByIds({ ids }: { ids?: string[] }) {
    const router = useRouter();
    const { query } = router;
    const {
      data: fixtures,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["fixtures", ids || query.matchId],
      queryFn: () =>
        getFixtureByIds(ids || [], {
          include:
            "venue;participants;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches;league;state",
        }),
        enabled: !!ids,
    });
  
    return { fixtures, isLoading, isError };
  }