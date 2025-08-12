import { getTransfersByTeamId } from "@/services/transfer-api";
import { useQueries } from "@tanstack/react-query";

export default function useTransfersByTeams({ teamIds }) {
  const query = {
    per_page: "5",
    includes: "player;fromTeam;toTeam;position;detailedPosition;type",
  };
  const transfersByTeams = useQueries({
    queries: teamIds.map((id) => ({
      queryKey: ["transfers", `team-${id}`],
      queryFn: () => getTransfersByTeamId(id, query),
      enabled: !!id,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.map((result) => result.isLoading),
        error: results.map((result) => result.error),
        isError: results.map((result) => result.isError),
      };
    },
  });

  return transfersByTeams;
}
