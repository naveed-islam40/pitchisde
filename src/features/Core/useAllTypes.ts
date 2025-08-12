import { getAllTypes } from "@/services/core-api";
import { useQuery } from "@tanstack/react-query";

export default function useAllTypes() {
  const {
    data: types,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["types"],
    queryFn: () => getAllTypes(),
  });

  return { types, isLoading, isError };
}
