import { getAllLeagues } from "@/services/leagues-api";
import { useQuery } from "@tanstack/react-query";

export default function useAllLeagues() {
  const params = { per_page: 8 };
  const {
    data: leagues,
    isError,
    isLoading,
  } = useQuery({ queryKey: ["leagues"], queryFn: () => getAllLeagues(params) });
  return { leagues, isError, isLoading };
}
