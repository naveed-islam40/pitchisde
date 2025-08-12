import { getLeaguesByCountryId } from "@/services/leagues-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useLeaguesByCountry() {
  const router = useRouter();
  const countryId = router.query.country;

  const {
    data: countryLeagues,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leagues", `country-${countryId}`],
    queryFn: () => getLeaguesByCountryId(countryId as string),
    enabled: !!countryId,
  });

  return { countryLeagues, isLoading, isError };
}
