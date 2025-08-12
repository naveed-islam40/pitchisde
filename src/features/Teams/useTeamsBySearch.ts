import { getTeamsBySearch } from "@/services/teams-api";
import { useQuery } from "@tanstack/react-query";

export default function useTeamsBySearch({ name }) {
  const {
    data: foundTeams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams", "search", name],
    queryFn: ({ queryKey }) => getTeamsBySearch(queryKey[2]),
    enabled: !!name,
  });

  return { foundTeams, isLoading, isError, error };
}
