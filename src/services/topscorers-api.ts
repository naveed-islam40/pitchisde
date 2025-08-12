import axiosInstance from "@/utils/apiInstance";
import { toQueryString } from "@/utils/generics";

const topscorersUrl = "v3/football/topscorers";

export async function getTopScorersBySeasonId(
  seasonId: string,
  query?: object
) {
  const queryStr = query ? `?${toQueryString(query)}` : "";

  const res = await axiosInstance(
    `${topscorersUrl}/seasons/${seasonId}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
