import { FixtureProvider } from "@/contexts/Fixture/FixtureContext";
import MatchDetail from "@/features/MatchDetail/MatchDetail";
import { AppLayout } from "@/layouts/AppLayout";
import { getFixtureById } from "@/services/fixtures-api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export default function MatchPage({ match, error }) {
  if (error)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load league data: ${error}`}
        </p>
      </AppLayout>
    );

  return (
    <FixtureProvider fixture={match}>
      <MatchDetail />
    </FixtureProvider>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { params } = context;

  if (!params) return { notFound: true };

  const leagueId = params.matchId as string;

  const query = {
    includes:
      "participants;league;scores;state;events.type;events.period;events.player;lineups.position;lineups.details.type;lineups.player.country;venue;pressure;formations;metadata;statistics.type;comments;round;stage;referees",
  };

  try {
    const data = await getFixtureById(leagueId, query);

    return { props: { match: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
