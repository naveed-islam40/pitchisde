import { getLeaguesBySearch } from "@/services/leagues-api";
import { useQuery } from "@tanstack/react-query";

export default function useLeaguesBySearch({ name }) {
  const {
    data: foundLeagues,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leagues", "search", name],
    queryFn: ({ queryKey }) => getLeaguesBySearch(queryKey[2]),
    enabled: !!name,
  });

  return { foundLeagues, isLoading, isError, error };
}
