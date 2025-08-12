import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";

const seasonsUrl = "v3/football/seasons";

interface SeasonsResponse {
  message?: string;
  subscription?: object;
  data?: any;
  rate_limit?: object;
  timezone?: string;
}

export async function getSeasonById(
  id: string,
  query?: object
): Promise<SeasonsResponse> {
  const res = await axiosInstance.get(`${baseUrl}/${seasonsUrl}/${id}`, {
    params: query,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
