import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";

type Pagination = {
  count: number;
  current_page: number;
  has_more: boolean;
  next_page: string;
  per_page: number;
};

interface CountriesResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: Pagination;
}

const coreUrl = "v3/core";
export async function getAllCountries(
  queryParams: object
): Promise<CountriesResponse> {
  try {
    const res = await axiosInstance(`${baseUrl}/${coreUrl}/countries`, {
      params: queryParams,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.data.message);
  }
}

export async function getAllTypes(): Promise<CountriesResponse> {
  try {
    const res = await axiosInstance(`${baseUrl}/${coreUrl}/types`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.data.message);
  }
}
