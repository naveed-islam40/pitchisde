import { LeagueProvider } from "@/contexts/League/LeagueContext";
import News from "@/features/LeagueDetail/News/News";
import { AppLayout } from "@/layouts/AppLayout";
import LeagueLayout from "@/layouts/LeagueLayout";
import { getLeagueById } from "@/services/leagues-api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export default function LeagueNews({ league, error }) {
  if (error)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load league data: ${error}`}
        </p>
      </AppLayout>
    );
  return (
    <LeagueProvider league={league}>
      <LeagueLayout>
        <News />
      </LeagueLayout>
    </LeagueProvider>
  );
}
export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { params } = context;

  if (!params) return { notFound: true };

  const leagueId = params.leagueId as string;

  const query = {
    includes: "country;seasons;currentSeason",
  };

  try {
    const data = await getLeagueById(leagueId, query);

    return { props: { league: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
