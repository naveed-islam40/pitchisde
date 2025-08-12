import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const teamsUrl = "v3/football/teams";

interface TeamsResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
  latest?: object;
}

export async function getTeamsBySearch(name: string): Promise<TeamsResponse> {
  const res = await axiosInstance.get(`${baseUrl}/${teamsUrl}/search/${name}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getTeamById(id: string, query?: object) {
  const queryStr = query ? `?${toQueryString(query)}` : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${teamsUrl}/${id}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getTeamsBySeasonId(
  seasonId: string,
  query?: object
): Promise<TeamsResponse> {
  const res = await axiosInstance.get(
    `${baseUrl}/${teamsUrl}/seasons/${seasonId}`,
    { params: query }
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
