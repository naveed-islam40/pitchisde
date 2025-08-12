import History from "@/features/TeamDetail/History/History";
import TeamLayout from "@/layouts/TeamLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getTeamById } from "@/services/teams-api";
import { AppLayout } from "@/layouts/AppLayout";
import { TeamProvider } from "@/contexts/Team/TeamContext";

export default function TeamHistory({ team, error }) {
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
        <History />
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
      "country;trophies.season;trophies.league;seasons;socials.channel;rankings;venue",
  };

  try {
    const data = await getTeamById(teamId, queryParams);
    return { props: { team: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
