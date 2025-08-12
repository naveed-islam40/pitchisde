import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const playersUrl = "v3/football/players";

interface PlayerResponse {
  message?: string;
  subscription?: object;
  data?: any;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}

export async function getPlayerById(
  id: string,
  query?: object
): Promise<PlayerResponse> {
  const queryStr = query ? `?${toQueryString(query)}` : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${playersUrl}/${id}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
