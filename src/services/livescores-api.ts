import axiosInstance from "@/utils/apiInstance";

interface FixturesResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}
const livescoresUrl = "/v3/football/livescores";

export async function getInplayLivescores(
  queryParams: object
): Promise<FixturesResponse> {
  const res = await axiosInstance.get(`${livescoresUrl}/inplay`, {
    params: queryParams,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getAllLivescores(
  queryParams: object
): Promise<FixturesResponse> {
  const res = await axiosInstance.get(`${livescoresUrl}`, {
    params: queryParams,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLatestUpdatedLivescores(
  queryParams: object
): Promise<FixturesResponse> {
  const res = await axiosInstance.get(`${livescoresUrl}/latest`, {
    params: queryParams,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
