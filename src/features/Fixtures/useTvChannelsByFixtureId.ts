import { useQuery } from "@tanstack/react-query";
import { useFixture } from "@/contexts/Fixture/FixtureContext";
import { getTvChannelsByFixtureId } from "@/services/tvChannels-api";

export default function useTvChannelsByFixtureId() {
  const fixture: any = useFixture();

  const fixtureId = fixture?.data?.id;

  const {
    data: tvChannels,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["tvChannels", fixtureId],
    queryFn: async () => {
      const response = await getTvChannelsByFixtureId(fixtureId as string);
      return response.data || [];
    },
    enabled: !!fixtureId,
  });

  return {  tvChannels: tvChannels || [], isLoading, error, isError };
}
