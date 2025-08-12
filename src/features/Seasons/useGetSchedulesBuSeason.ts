import { getSchedulesBySeasonId } from "@/services/schedules-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useSchedulesBySeasons({ seasonId }) {
  const router = useRouter();
  const {
    data: Schedules,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams", "season", seasonId],
    queryFn: ({ queryKey }) => getSchedulesBySeasonId(queryKey[2]),
    enabled: !!seasonId,
  });

  return { Schedules, isLoading, isError, error };
}
