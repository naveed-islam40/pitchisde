import { getFixturesByDateRange } from "@/services/fixtures-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFixturesByDateRange({
  startDate,
  endDate,
  leagueId,
  seasonId,
  teamId,
  queryParams,
  order,
}: {
  startDate: string;
  endDate: string;
  leagueId: string;
  seasonId: string;
  teamId?: number;
  queryParams: object;
  order?: string;
}) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "fixtures",
      `league-${leagueId}`,
      `season-${seasonId}`,
      `team-${teamId}`,
      `${startDate}-${endDate}`,
    ],
    queryFn: ({ pageParam }) =>
      getFixturesByDateRange(
        startDate,
        endDate,
        teamId,
        order ? order : "asc",
        queryParams,
        pageParam
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination: any = lastPage.pagination;
      if (!pagination) return undefined;
      return pagination.has_more ? pagination.current_page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const fixtures = data?.pages.flatMap((page) => page) || [];

  return {
    fixtures,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    status,
  };
}
