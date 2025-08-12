import { useLeague } from "@/contexts/League/LeagueContext";
import { getPostMatchNewsBySeasonId } from "@/services/news-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function usePostMatchNewsBySeason() {
  const { query } = useRouter();
  const league: any = useLeague();
  const { seasons } = league.data;
  const seasonId =
    query.season || seasons.find((season) => season.is_current)?.id;

  const {
    data: seasonPostMatchNews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", "post-match", `season-${seasonId}`],
    queryFn: () => getPostMatchNewsBySeasonId(seasonId as string),
    enabled: !!seasonId,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { seasonPostMatchNews, isLoading, isError, error };
}
