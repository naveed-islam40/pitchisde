import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const schedulesUrl = `v3/football/schedules`;

export async function getSchedulesBySeasonId(seasonId: string, query?: object) {
  const queryStr = query ? `?${toQueryString(query)}` : "";
  const res = await axiosInstance(
    `${baseUrl}/${schedulesUrl}/seasons/${seasonId}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
