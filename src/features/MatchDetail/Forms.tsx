import React from "react";
import { Block } from "@/components/Block";
import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "@/services/teams-api";
import Image from "next/image";

const Forms = ({ participants }: { participants: any[] }) => {
  const team1Id = participants[0]?.id;
  const team2Id = participants[1]?.id;

  const { data: team1Matches } = useQuery({
    queryKey: ["teamLatestMatches", team1Id],
    queryFn: () =>
      getTeamById(team1Id, {
        include: "latest.league;latest.participants;latest.scores",
      }),
    select: (data) => data?.data?.latest?.slice(0, 5) as any[],
    enabled: !!team1Id,
  });

  const { data: team2Matches } = useQuery({
    queryKey: ["teamLatestMatches", team2Id],
    queryFn: () =>
      getTeamById(team2Id, {
        include: "latest.league;latest.participants;latest.scores",
      }),
    select: (data) => data?.data?.latest?.slice(0, 5) as any[],
    enabled: !!team2Id,
  });

  return (
    <Block title="Form" padding={false} showNextButton={false}>
      <div className="p-4 space-y-8">
        <div className="px-6 flex items-center justify-between space-x-4">
          <Image
            src={participants[0]?.image_path}
            alt="team_logo"
            width={35}
            height={35}
            className="w-10 h-10 object-cover"
          />
          {team1Matches?.map((match: any) => (
            <MatchCard key={match.id} match={match} currentTeamId={team1Id} />
          ))}
        </div>
        <div className="px-6 flex items-center justify-between space-x-4">
          <Image
            src={participants[1]?.image_path}
            alt="team_logo"
            width={35}
            height={35}
            className="w-10 h-10 object-cover"
          />
          {team2Matches?.map((match: any) => (
            <MatchCard key={match.id} match={match} currentTeamId={team2Id} />
          ))}
        </div>
      </div>
    </Block>
  );
};

const MatchCard = ({
  match,
  currentTeamId,
}: {
  match: any;
  currentTeamId: string;
}) => {
  const currentTeam = match.participants?.find(
    (p: any) => p.id === currentTeamId
  );
  const opponent = match.participants?.find((p: any) => p.id !== currentTeamId);

  const isDraw = match.result_info?.toLowerCase().includes("draw");
  const isWin = currentTeam?.meta?.winner;

  const scoreColorMap = {
    green: "bg-[#006428]",
    red: "bg-[#da291c]",
  };

  const scoreColor = isWin ? "green" : "red";
  const scoreClass = scoreColorMap[scoreColor];

  return (
    <div className="flex flex-col items-center gap-x-10 gap-y-3">
      <Image
        src={match.league?.image_path}
        alt="league-logo"
        width={128}
        height={128}
        className="size-7"
      />
      <Image
        src={opponent?.image_path}
        alt={opponent?.name || ""}
        width={128}
        height={128}
        className="size-9"
      />

      <span
        className={`${
          isDraw ? "text-white bg-dark" : `${scoreClass} text-white`
        } px-2  leading-7 font-semibold rounded-full`}
      >
        {getScoreDisplay(match, currentTeamId)}
      </span>
    </div>
  );
};

const getScoreDisplay = (match: any, currentTeamId: string) => {
  const currentTeam = match.participants?.find(
    (p: any) => p.id === currentTeamId
  );
  const isCurrentTeamHome = currentTeam?.meta?.location === "home";

  const opponent = match.participants?.find((p: any) => p.id !== currentTeamId);

  const currentTeamScore =
    match.scores?.find(
      (s: any) =>
        s.description === "2ND_HALF" && s.participant_id === currentTeamId
    )?.score?.goals || 0;

  const opponentScore =
    match.scores?.find(
      (s: any) =>
        s.description === "2ND_HALF" && s.participant_id === opponent?.id
    )?.score?.goals || 0;

  return isCurrentTeamHome
    ? `${currentTeamScore}-${opponentScore}`
    : `${opponentScore}-${currentTeamScore}`;
};

export default Forms;
