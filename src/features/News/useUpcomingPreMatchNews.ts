import { getUpcomingPreMatchNews } from "@/services/news-api";
import { useQuery } from "@tanstack/react-query";

export default function useUpcomingPreMatchNews() {
  const {
    data: prematchNews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", "upcoming"],
    queryFn: () => getUpcomingPreMatchNews(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { prematchNews, isLoading, isError, error };
}
