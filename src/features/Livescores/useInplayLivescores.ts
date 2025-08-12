import { getInplayLivescores } from "@/services/livescores-api";
import { useQuery } from "@tanstack/react-query";

export default function useInplayLivescores({ query = {} }) {
  const {
    data: inplayLivescores,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["livescores", "inplay"],
    queryFn: () => getInplayLivescores({ ...query }),
  });

  return { inplayLivescores, isLoading, error, isError };
}
