import { getSeasonById } from "@/services/seasons-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useSeason({ season, params }) {
  const router = useRouter();
  const { query } = router;
  const seasonId = (query.season as string) || season;

  const queryParams = {
    includes: "statistics.type",
    ...params,
  };

  const {
    data: seasonData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["season", `${seasonId}`],
    queryFn: () => getSeasonById(seasonId, queryParams),
  });

  return { seasonData, isLoading, isError, error };
}
