import { getAllStandings } from "@/services/standings-api";
import { useQuery } from "@tanstack/react-query";

export default function useAllStandings({ seasons, query }) {
  const {
    data: standings,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["standings", seasons],
    queryFn: () => getAllStandings(query),
    enabled: !!seasons,
  });

  return { standings, isLoading, error, isError };
}
