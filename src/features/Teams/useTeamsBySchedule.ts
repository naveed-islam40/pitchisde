// import { getTeamSchedulesByTeamId } from "@/services/schedules-api";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/router";

// export default function useSchedulesByTeam({ teamId }) {
//   const router = useRouter();
//   const {
//     data: teamsSchedules,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["teams", "season", teamId],
//     queryFn: ({ queryKey }) => getTeamSchedulesByTeamId(queryKey[2]),
//     enabled: !!teamId,
//   });

//   return { teamsSchedules, isLoading, isError, error };
// }
