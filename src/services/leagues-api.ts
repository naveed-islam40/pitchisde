import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

interface LeaguesResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}

const leaguesUrl = "v3/football/leagues";

export async function getAllLeagues(params?: object): Promise<LeaguesResponse> {
  const queryStr = params ? toQueryString(params) : "";

  const res = await axiosInstance.get(`${baseUrl}/${leaguesUrl}?${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLeagueById(
  id: string,
  query?: object
): Promise<LeaguesResponse> {
  const queryStr = query ? toQueryString(query) : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${leaguesUrl}/${id}?${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLeaguesByCountryId(
  countryId: string
): Promise<LeaguesResponse> {
  const res = await axiosInstance.get(
    `${baseUrl}/${leaguesUrl}/countries/${countryId}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLeaguesBySearch(
  name: string
): Promise<LeaguesResponse> {
  const res = await axiosInstance.get(
    `${baseUrl}/${leaguesUrl}/search/${name}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
