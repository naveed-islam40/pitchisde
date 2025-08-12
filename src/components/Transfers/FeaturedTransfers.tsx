import useTransfersByTeams from "@/features/Transfers/useTransfersByTeams";
import { Block } from "../Block";
import { getTopTransfersFromTeams } from "@/helpers/transfers-helper";
import { formatCurrencyShort } from "@/helpers/general";

export function FeaturedTransfers({ teamsData }) {
  const { data = [] } = teamsData || {};

  const fewTeamIds = data.slice(0, 10).map((team) => team.id);

  const transfersByTeams: any = useTransfersByTeams({ teamIds: fewTeamIds });

  const transfers = getTopTransfersFromTeams(transfersByTeams?.data);

  return (
    <Block
      title="Featured Transfers"
      showNextButton={false}
      contentClassName="!pb-2"
    >
      {transfers?.length > 0 &&
        transfers?.map((t, i) => <FeaturedTransfer key={i} transfer={t} />)}
    </Block>
  );
}

function FeaturedTransfer({ transfer }) {
  return (
    <div className="flex py-2 text-primary">
      <img
        src="/mig/player-2.png"
        className="h-11 w-11 shrink-0 rounded-full bg-dark/50"
      />
      <div className="flex flex-1 flex-col justify-center gap-y-0.5 pl-4">
        <p className="font-bold leading-none">
          {transfer?.player?.common_name}
        </p>
        <div className="flex items-center mt-1">
          <img className="w-4" src={transfer?.fromteam?.image_path} />
          <img
            className="w-3.5 mx-1"
            src="/mig/icons/arrow-right-bg-green.svg"
          />
          <img className="w-4" src={transfer?.toteam?.image_path} />
        </div>
      </div>

      <p className="bg-primary rounded-full self-center px-2 py-[0.1rem] text-xs font-bold text-white">
        {formatCurrencyShort(transfer?.amount)}
      </p>
    </div>
  );
}
