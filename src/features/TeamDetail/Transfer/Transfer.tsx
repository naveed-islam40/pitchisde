import { GoogleAds } from "@/components/GoogleAds";
import { TransferGrid } from "@/components/TransferGrid/TransferGrid";
import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";
import useTransfersByTeam from "@/features/Transfers/useTransfersByTeam";
import { useTeam } from "@/contexts/Team/TeamContext";
import { NextMatches } from "../Standings/Matches";

export default function Transfer() {
  const teamData: any = useTeam();
  const team = teamData.data;

  const { teamTransfers, isLoading } = useTransfersByTeam();

  const transfers = teamTransfers?.data;

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 shrink-0 space-y-5">
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={`squad-loader-${i}`}
                className="relative overflow-x-hidden bg-gray-200 h-40 rounded-md"
              >
                <div className="shimmer-effect"></div>
              </div>
            ))}
          </div>
        ) : (
          <TransferGrid
            teamId={team.id}
            transfers={transfers}
            teamsData={teamData}
          />
        )}
      </div>
      <div className="shrink-0 space-y-5">
        <NextMatches fixtures={team.upcoming} />
        <GoogleAds />
        <Block title="News">
          <div className="flex flex-col items-center gap-8">
            <NewsCard />
            <NewsCard />
          </div>
        </Block>
      </div>
    </div>
  );
}
