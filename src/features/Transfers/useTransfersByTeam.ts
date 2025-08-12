import { getTransfersByTeamId } from "@/services/transfer-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useTransfersByTeam() {
  const router = useRouter();
  const { teamId } = router.query;
  const query = {
    includes: "player;fromTeam;toTeam;type;position",
  };
  const {
    data: teamTransfers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transfers", `team-${teamId}`],
    queryFn: () => getTransfersByTeamId(teamId as string, query),
    enabled: !!teamId,
  });

  return { teamTransfers, isLoading, isError, error };
}
