import { getFixtureById } from "@/services/fixtures-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useFixtureById({ id }: { id?: string }) {
  const router = useRouter();
  const { query } = router;
  const {
    data: fixture,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fixture", id || query.matchId],
    queryFn: () =>
      getFixtureById(id || (query.matchId as string), {
        include:
          "venue;participants;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches;league",
      }),
  });

  return { fixture, isLoading, isError };
}
