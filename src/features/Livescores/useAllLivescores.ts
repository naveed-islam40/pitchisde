import { getAllLivescores } from "@/services/livescores-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useAllLivescores({ query = {} }) {
  const {
    data: allLivescores,
    isLoading,
    error,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["livescores", "all"],
    queryFn: ({ pageParam }) => getAllLivescores({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination: any = lastPage.pagination;
      if (!pagination) return undefined;
      return pagination.has_more ? pagination.current_page + 1 : undefined;
    },
  });

  return { allLivescores, isLoading, error, isError, fetchNextPage };
}
