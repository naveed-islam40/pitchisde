import { getAllFixtures } from "@/services/fixtures-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useAllFixtures({ query }) {
  const {
    data: allFixtures,
    isLoading,
    error,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["fixtures", "all"],
    queryFn: ({ pageParam }) => getAllFixtures({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination: any = lastPage.pagination;
      if (!pagination) return undefined;
      return pagination.has_more ? pagination.current_page + 1 : undefined;
    },
  });

  return { allFixtures, isLoading, error, isError, fetchNextPage };
}
