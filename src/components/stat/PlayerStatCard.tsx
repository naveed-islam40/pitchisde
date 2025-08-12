import { Block } from "@/components/Block";
import { StatTag } from "./StatTag";
import Image from "next/image";

export function PlayerStatCard({ playerData }) {
  const { player, participant, total } = playerData;
  return (
    <Block
      padding={false}
      title="Top Scorer"
      centerTitle
      contentClassName="border-t border-x-grey-3 py-3 px-4"
    >
      <div className="flex items-center py-3 md:flex-col">
        <div className="relative">
          <Image
            height={150}
            width={150}
            src={player.image_path}
            className="h-11 w-11 rounded-full bg-x-grey-3 md:h-16 md:w-16"
            alt={player.display_name}
          />
          <StatTag
            stat={total}
            className="absolute -right-6 -top-2 max-md:hidden"
          />
        </div>
        <p className="flex-1 font-medium max-md:pl-4 max-md:text-sm max-md:font-semibold md:mt-2">
          {player.common_name}
        </p>
        <div className="flex items-center justify-center gap-x-1.5">
          <span className="text-xs leading-none max-md:hidden">
            {participant.name}
          </span>
          <Image
            height={250}
            width={250}
            src={participant.image_path}
            className="w-7 md:w-5"
            alt={participant.name}
          />
          <StatTag compact className="ml-1 md:hidden" />
        </div>
      </div>
      <div className="divide-y divide-x-grey-3 border-t border-x-grey-3 md:mt-4">
        <PlayerRow />
        <PlayerRow />
      </div>
    </Block>
  );
}

function PlayerRow() {
  return (
    <div className="flex py-3">
      <img
        src="/mig/player-3.png"
        className="h-11 w-11 shrink-0 rounded-full bg-x-grey-3"
      />
      <div className="flex flex-1 flex-col justify-center gap-y-0.5 pl-4">
        <p className="text-sm leading-none max-md:font-medium">
          Muhammad Salah
        </p>
        <div className="flex items-center gap-x-1.5 max-md:hidden">
          <img src="/mig/teams/laliga.png" className="w-4" />
          <span className="text-xs text-x-grey-1">Liverpool</span>
        </div>
      </div>
      <img
        src="/mig/teams/laliga.png"
        className="mr-4 w-6 self-center md:hidden md:w-4"
      />
      <p className="mr-2 self-center text-sm font-medium">12</p>
    </div>
  );
}
