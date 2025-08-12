import useTransfersByTeams from "@/features/Transfers/useTransfersByTeams";
import { Block } from "../Block";
import { TitleStripSimple } from "../TitleStrip";
import { TransferGrid } from "../TransferGrid/TransferGrid";

function Transfers({ teamsData }) {
  const { data } = teamsData;

  const fewTeamIds = data.slice(0, 10).map((team) => team.id);

  const transfersByTeams: any = useTransfersByTeams({ teamIds: fewTeamIds });

  const isLoading = transfersByTeams.isLoading.some((el) => el === true);

  if (isLoading)
    return (
      <Block padding={false}>
        <TitleStripSimple title="Transfer" />
        <div className="relative h-[32rem] bg-gray-200 overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  const transfersData = transfersByTeams.data.flatMap((item) => item.data);

  return (
    <TransferGrid
      transfers={transfersData}
      teamId={null}
      teamsData={teamsData}
    />
  );
}

export default Transfers;
