import { getAllCountries } from "@/services/core-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useInfiniteCountries() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["countries"],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        getAllCountries({ per_page: 50, page: pageParam, include: "leagues" }),
      getNextPageParam: (lastPage) => {
        // Check if there's a next page to fetch
        return lastPage?.pagination?.has_more
          ? lastPage?.pagination?.current_page + 1
          : undefined;
      },
    });

  // Automatically fetch the next page if the previous page has has_more = true
  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  // Flatten the data across all pages
  const countries = data?.pages.flatMap((page) => page.data) || [];

  return {
    countries,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  };
}
