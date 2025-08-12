import { getRoundsBySeasonId } from "@/services/rounds-api";
import { useQuery } from "@tanstack/react-query";

export default function useRoundsBySeason({
  season,
  query,
}: {
  season: string;
  query?: object;
}) {
  const {
    data: roundsBySeason,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["round", season],
    queryFn: ({ queryKey }) => getRoundsBySeasonId(queryKey[1], query),
  });

  return { roundsBySeason, isLoading, isError, error };
}
