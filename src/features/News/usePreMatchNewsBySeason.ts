import { useLeague } from "@/contexts/League/LeagueContext";
import { getPreMatchNewsBySeasonId } from "@/services/news-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function usePreMatchNewsBySeason() {
  const { query } = useRouter();
  const league: any = useLeague();
  const { seasons } = league.data;
  const seasonId =
    query.season || seasons.find((season) => season.is_current)?.id;

  const {
    data: seasonPreMatchNews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", "pre-match", `season-${seasonId}`],
    queryFn: () => getPreMatchNewsBySeasonId(seasonId as string),
    enabled: !!seasonId,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { seasonPreMatchNews, isLoading, isError, error };
}
