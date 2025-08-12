import axiosInstance from "@/utils/apiInstance";
import { toQueryString } from "@/utils/generics";

interface TvChannlesResponse {
  message?: string;
  subscription?: Array<any>;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
}
const tvChannelsUrl = "/v3/football/tv-stations/fixtures";

export async function getTvChannelsByFixtureId(
  fixtureId: string,
  query?: object
): Promise<TvChannlesResponse> {
  const queryStr = query
    ? `?${toQueryString(query)}&include=countries`
    : "?include=countries";
  const res = await axiosInstance.get(`${tvChannelsUrl}/${fixtureId}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
