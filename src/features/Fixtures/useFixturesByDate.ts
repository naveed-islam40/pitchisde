import { getFixturesByDate } from "@/services/fixtures-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useEffect } from "react";

export default function useFixturesByDate() {
  const { query } = useRouter();
  const today = format(new Date(), "yyyy-MM-dd");
  const date: string = (query.date as string) || today;

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["fixtures", date],
    queryFn: ({ pageParam }) =>
      getFixturesByDate(date, {
        page: pageParam,
        per_page: 50,
        includes:
          "scores;group;aggregate;league.country;state;periods;participants;events",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination: any = lastPage.pagination;
      if (!pagination) return undefined;
      return pagination.has_more ? pagination.current_page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const fixtures = data?.pages.flatMap((page) => page) || [];

  return {
    fixtures,
    isLoading,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    status,
  };
}
