
import { getLatestUpdatedLivescores } from "@/services/livescores-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useLatestLivescores({ query = {}}) {
  const {
    data: latestLivescores,
    isLoading,
    error,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["livescores", "latest"],
    queryFn: ({ pageParam }) => getLatestUpdatedLivescores({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination: any = lastPage.pagination;
      if (!pagination) return undefined;
      return pagination.has_more ? pagination.current_page + 1 : undefined;
    },
  });

  return { latestLivescores, isLoading, error, isError, fetchNextPage };
}
