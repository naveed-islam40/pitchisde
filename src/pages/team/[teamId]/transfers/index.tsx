import Transfer from "@/features/TeamDetail/Transfer/Transfer";
import TeamLayout from "@/layouts/TeamLayout";
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getTeamById } from "@/services/teams-api";
import { TeamProvider } from "@/contexts/Team/TeamContext";
import { AppLayout } from "@/layouts/AppLayout";

export default function TeamTransfer({ team, error }) {
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
        <Transfer />
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
      "country;socials;rankings;venue;upcoming.league;upcoming.participants",
  };

  try {
    const data = await getTeamById(teamId, queryParams);

    return { props: { team: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
