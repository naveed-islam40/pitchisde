import { TeamProvider } from "@/contexts/Team/TeamContext";
import Overview from "@/features/TeamDetail/Overview/Overview";
import { AppLayout } from "@/layouts/AppLayout";
import TeamLayout from "@/layouts/TeamLayout";
import { getTeamById } from "@/services/teams-api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export default function TeamOverview({ team, error }) {
  if (error)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load team data: ${error}`}
        </p>
      </AppLayout>
    );

  return (
    <TeamProvider team={team}>
      <TeamLayout>
        <Overview />
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
      "country;upcoming.participants;upcoming.league;seasons;seasons.league;activeseasons.league;latest.league;latest.participants;latest.scores;socials.channel;rankings;venue",
  };

  try {
    const data = await getTeamById(teamId, queryParams);

    return { props: { team: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
