import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const standingsUrl = "v3/football/standings";

interface StandingsResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
}

export async function getStandingsBySeasonId(
  id: string,
  query?: object
): Promise<StandingsResponse> {
  const queryStr = query ? toQueryString(query) : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${standingsUrl}/seasons/${id}?${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getAllStandings(
  query?: object
): Promise<StandingsResponse> {
  const queryStr = query ? toQueryString(query) : "";
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/${standingsUrl}?${queryStr}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
