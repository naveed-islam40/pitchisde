import { TeamProvider } from "@/contexts/Team/TeamContext";
import Standings from "@/features/TeamDetail/Standings/Standings";
import { AppLayout } from "@/layouts/AppLayout";
import TeamLayout from "@/layouts/TeamLayout";
import { getTeamById } from "@/services/teams-api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export default function TeamStandings({ team, error }) {
  if (error)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load league data: ${error}`}
        </p>
      </AppLayout>
    );
  return (
    <TeamProvider team={team}>
      <TeamLayout>
        <Standings />
      </TeamLayout>
    </TeamProvider>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { params } = context;

  if (!params) return { notFound: true };

  const teamId = params.teamId as string;

  const queryParams = {
    includes:
      "country;activeSeasons.league.country;seasons.league;upcoming.participants;upcoming.scores;latest.scores;latest.participants;upcoming.league;latest.league;latest.state;",
  };

  try {
    const data = await getTeamById(teamId, queryParams);

    return { props: { team: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
