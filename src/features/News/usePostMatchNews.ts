import { getPostMatchNews } from "@/services/news-api";
import { useQuery } from "@tanstack/react-query";

export default function usePostMatchNews() {
  const {
    data: postMatchNews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", "post-match"],
    queryFn: () => getPostMatchNews(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { postMatchNews, isLoading, isError, error };
}
