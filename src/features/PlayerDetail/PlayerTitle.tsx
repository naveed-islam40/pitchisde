import { usePlayer } from "@/contexts/Player/PlayerContext";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";

export default function PlayerTitle() {
  const player: any = usePlayer();

  if (!player) return null;

  const playerInfo = player.data;

  const { teams } = playerInfo || {};
  const playerTeam = teams.find((team) => team.detailed_position_id) || {};

  return (
    <div className="flex flex-col h-full items-center gap-x-3 text-neutral-600">
      <div className="p-1 rounded-lg bg-white">
        <Image
          width={250}
          height={250}
          className="object-contain size-16 rounded-full border"
          src={playerInfo?.image_path}
          alt={playerInfo?.common_name}
        />
      </div>
      <div className="text-center">
        <h2 className=" text-lg font-bold sm:text-xl">
          {playerInfo?.display_name}
        </h2>
        <div className="flex items-center gap-2">
          <Image
            src={`${playerTeam?.team?.image_path}`}
            className="size-8 object-contain"
            width={250}
            height={250}
            alt={`team-${playerTeam?.name}`}
          />
          <h5 className="font-semibold">
            {playerTeam?.team?.name} #{playerTeam?.jersey_number}
          </h5>
        </div>
      </div>
      <PlayerInfo info={playerInfo} />
    </div>
  );
}

function PlayerInfo({ info }) {
  const { height, weight, date_of_birth } = info;

  return (
    <>
      <ul
        className={clsx(
          "grid h-full grid-cols-2 items-center gap-8 text-center max-xl:pt-10 sm:grid-cols-3 mt-2 [&_h2]:font-bold max-w-4xl"
        )}
      >
        <li>
          <h2>{dayjs().diff(dayjs(date_of_birth), "year")}</h2>
          <h4>{dayjs(date_of_birth).format("DD MMM YYYY")}</h4>
        </li>

        <li>
          <h2>{height ? `${height} cm` : ""}</h2>
          <h4>{height ? `${cmToFeetInches(height)}` : ""}</h4>
        </li>
        <li>
          <h2>{weight ? `${weight} kg` : ""}</h2>
          <h4>{weight ? `${kgToLbs(weight)} lbs` : ""}</h4>
        </li>
      </ul>
    </>
  );
}

// Convert height from cm to feet and inches
function cmToFeetInches(cm) {
  const inches = cm / 2.54; // Convert cm to inches
  const feet = Math.floor(inches / 12); // Calculate feet
  const remainingInches = Math.round(inches % 12); // Calculate remaining inches
  return `${feet}ft ${remainingInches}in`;
}

// Convert weight from kg to lbs
function kgToLbs(kg) {
  const lbs = kg * 2.20462; // Convert kg to lbs
  return lbs.toFixed(0);
}
