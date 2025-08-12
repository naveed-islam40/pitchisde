import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function League() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  if (!params) return { redirect: { destination: "/", permanent: true } };
  const leagueId = params.leagueId;

  return {
    redirect: {
      destination: `/league/${leagueId}/overview`,
      permanent: false,
    },
  };
};

