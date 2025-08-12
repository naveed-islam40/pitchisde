import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const roundesUrl = `v3/football/rounds`;

export async function getRoundsBySeasonId(seasonId: string, query?: object) {
  const queryStr = query ? `?${toQueryString(query)}` : "";
  const res = await axiosInstance(
    `${baseUrl}/${roundesUrl}/seasons/${seasonId}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
