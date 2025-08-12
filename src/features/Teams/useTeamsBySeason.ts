import { getTeamsBySeasonId } from "@/services/teams-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useTeamsBySeason({ season }) {
  const router = useRouter();
  const seasonId = router.query.season || season;
  const {
    data: seasonTeams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams", "season", seasonId],
    queryFn: ({ queryKey }) => getTeamsBySeasonId(queryKey[2]),
    enabled: !!seasonId,
  });

  return { seasonTeams, isLoading, isError, error };
}
