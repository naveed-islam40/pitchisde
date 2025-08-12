import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Team() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  if (!params) return { redirect: { destination: "/", permanent: true } };
  const teamId = params.teamId;

  return {
    redirect: {
      destination: `/team/${teamId}/overview`,
      permanent: false,
    },
  };
};
