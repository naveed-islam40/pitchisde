import { getLatestFixtures } from "@/services/fixtures-api";
import { useQuery } from "@tanstack/react-query";

export default function useLatestFixtures() {
  const {
    data: fixtures,
    isLoading,
    isFetching,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["fixtures", "latest"],
    queryFn: () =>
      getLatestFixtures({
        includes:
          "scores;group;aggregate;league.country;state;periods;participants",
      }),
    refetchInterval: 10000,
  });

  return {
    fixtures,
    isLoading,
    isFetching,
    isError,
    error,
    status,
  };
}
