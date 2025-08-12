import axiosInstance from "@/utils/apiInstance";
import { toQueryString } from "@/utils/generics";

interface FixturesResponse {
  message?: string;
  subscription?: object;
  data?: any;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}
const fixturesUrl = "/v3/football/fixtures";

export async function getAllFixtures(
  query?: object
): Promise<FixturesResponse> {
  const queryStr = query ? `?${toQueryString(query)}` : "";
  const res = await axiosInstance.get(`${fixturesUrl}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixturesByDate(
  date: string,
  queryParams: object
): Promise<FixturesResponse> {
  const res = await axiosInstance.get(`${fixturesUrl}/date/${date}`, {
    params: queryParams,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLatestFixtures(
  queryParams: object
): Promise<FixturesResponse> {
  const res = await axiosInstance.get(`${fixturesUrl}/latest`, {
    params: queryParams,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixturesByLeague(
  leagueId: string
): Promise<FixturesResponse> {
  const res = await axiosInstance(
    `${fixturesUrl}?filters=fixtureLeagues:${leagueId}&per_page=50&page=4&includes=participants`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixtureById(
  fixtureId: string,
  query?: object
): Promise<FixturesResponse> {
  const queryStr = query
    ? `?${toQueryString(
        query
      )}&include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches`
    : "?include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches";
  const res = await axiosInstance(`${fixturesUrl}/${fixtureId}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixtureByIds(
  fixtureIds: string[],
  query?: object
): Promise<FixturesResponse> {
  const queryStr = query
    ? `?${toQueryString(
        query
      )}&include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches`
    : "?include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches";
  const res = await axiosInstance(`${fixturesUrl}/multi/${fixtureIds}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixtureByHeadtoHead(
  firstTeam: Number,
  secondTeam: Number
): Promise<FixturesResponse> {
  let queryStr: string = "?includes=league;scores;participants;metadata";
  const res = await axiosInstance.get(
    `${fixturesUrl}/head-to-head/${firstTeam}/${secondTeam}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixturesByDateRange(
  startDate: string,
  endDate: string,
  teamId: number | undefined,
  order: string,
  query: object,
  page: number
): Promise<FixturesResponse> {
  const queryStr = toQueryString(query);
  const url = teamId
    ? `${fixturesUrl}/between/${startDate}/${endDate}/${teamId}?${queryStr}&page=${page}`
    : `${fixturesUrl}/between/${startDate}/${endDate}?${queryStr}&page=${page}&order=${order}`;
  const res = await axiosInstance(url);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
