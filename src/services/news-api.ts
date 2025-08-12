import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const prematchNewsUrl = `v3/football/news/pre-match`;
const postmatchNewsUrl = `v3/football/news/post-match`;
export async function getUpcomingPreMatchNews() {
  const res = await axiosInstance(`${baseUrl}/${prematchNewsUrl}/upcoming`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getPostMatchNews() {
  const res = await axiosInstance(`${baseUrl}/${postmatchNewsUrl}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getPreMatchNewsBySeasonId(
  seasonId: string,
  query?: object
) {
  const queryStr = query ? `?${toQueryString(query)}` : "";
  const res = await axiosInstance(
    `${baseUrl}/${prematchNewsUrl}/seasons/${seasonId}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getPostMatchNewsBySeasonId(
  seasonId: string,
  query?: object
) {
  const queryStr = query ? `?${toQueryString(query)}` : "";
  const res = await axiosInstance(
    `${baseUrl}/${postmatchNewsUrl}/seasons/${seasonId}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
