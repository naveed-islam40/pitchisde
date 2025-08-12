import axiosInstance from "@/utils/apiInstance";
import { toQueryString } from "@/utils/generics";

const transfersUrl = "v3/football/transfers";

export async function getTransfersByTeamId(teamId: string, query?: object) {
  const queryStr = query ? `?${toQueryString(query)}` : "";

  const res = await axiosInstance(`${transfersUrl}/teams/${teamId}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
