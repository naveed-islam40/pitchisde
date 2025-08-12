import { getTopScorersBySeasonId } from "@/services/topscorers-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useTopScorersBySeason({
  seasonId,
  queryParams,
  customKeys = [],
}: {
  seasonId: string;
  queryParams: object;
  customKeys?: Array<string>;
}) {
  const {
    data: topscorers,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["topscorers", `season-${seasonId}`, ...customKeys],
    queryFn: ({ pageParam }) =>
      getTopScorersBySeasonId(seasonId, { ...queryParams, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination: any = lastPage.pagination;
      if (!pagination) return undefined;
      return pagination.has_more ? pagination.current_page + 1 : undefined;
    },
    enabled: !!seasonId,
  });

  return { topscorers, isLoading, isFetchingNextPage, fetchNextPage };
}
