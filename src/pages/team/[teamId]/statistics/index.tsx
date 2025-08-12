import TeamLayout from "@/layouts/TeamLayout";
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getTeamById } from "@/services/teams-api";
import { TeamProvider } from "@/contexts/Team/TeamContext";
import { AppLayout } from "@/layouts/AppLayout";
import Statistics from "@/features/TeamDetail/Statistics/Statistics";

export default function TeamStatistics({ team, error }) {
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
        <Statistics />
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
    includes: "country",
  };

  try {
    const data = await getTeamById(teamId, queryParams);

    return { props: { team: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
