import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";

const squadUrl = "v3/football/squads";

interface SquadResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
  latest?: object;
}

export async function getSquadByTeamAndSeason(
  teamId: number,
  seasonId: number,
  params: any
): Promise<SquadResponse> {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/${squadUrl}/seasons/${seasonId}/teams/${teamId}`,
      { params }
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
