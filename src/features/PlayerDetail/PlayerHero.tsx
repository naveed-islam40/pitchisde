import { usePlayer } from "@/contexts/Player/PlayerContext";
import React from "react";
import PlayerTitle from "./PlayerTitle";
import Image from "next/image";
import { Actions } from "@/components/DetailView/DetailView";

export default function PlayerHero() {
  const playerData: any = usePlayer();
  const playerInfo = playerData?.data || {};

  return (
    <div className="app-block bg-white rounded-3xl p-6 mb-8">
      <div className="grid grid-cols-3 items-center">
        <PositionInfo info={playerInfo} />
        <PlayerTitle />
        <Actions />
      </div>
    </div>
  );
}

function PositionInfo({ info }) {
  const { position, detailedposition, country, metadata } = info;
  const preferredFoot = metadata?.find((item) => item.type_id === 229)?.values;

  return (
    <div className="flex gap-2 text-neutral-700">
      <div className="hidden md:block w-full max-w-36">
        <PositionVisualizer detailedPosition={detailedposition} />
      </div>
      <ul className="flex flex-col justify-between [&_h4]:font-semibold">
        <li>
          <h2 className="">{position.name}</h2>
          <h4>{detailedposition?.name}</h4>
        </li>
        <li className="flex gap-2 items-center">
          {preferredFoot ? (
            <Image
              width={100}
              height={100}
              src={`/mig/icons/${
                preferredFoot === "right" ? "left" : "right"
              }-foot.svg`}
              className="h-8 w-auto "
              alt="Feet"
            />
          ) : (
            <span></span>
          )}
          <h4 className="capitalize w-16 leading-5">{preferredFoot} Footed</h4>
        </li>
        <li>
          <Image
            title={country.name}
            width={512}
            height={512}
            style={{
              boxShadow: "0px 1px 4px 0px #00000040",
            }}
            src={country.image_path}
            className=" w-8 rounded-sm sm:w-10"
            alt={country.name}
          />
          <h4>{country.name}</h4>
        </li>
      </ul>
    </div>
  );
}

const PositionVisualizer = ({ detailedPosition }) => {
  // Position mapping with grid coordinates
  const positionMap = {
    // Goalkeeper
    goalkeeper: "GK",

    // Defenders
    "left-back": "LB",
    "centre-back": "CB",
    "right-back": "RB",

    // Midfielders
    "defensive-midfield": "DM",
    "central-midfied": "CM",
    "left-midfield": "LM",
    "right-midfield": "RM",
    "attacking-midfield": "AM",

    // Forwards
    "centre-forward": "CF",
    "left-wing": "LW",
    "right-wing": "RW",
    "secondary-striker": "SS",
  };

  const getPosition = (position) => {
    return positionMap[position];
  };

  return (
    <div className="relative w-full max-w-lg mx-auto ">
      <Image
        src={`/mig/positions/${getPosition(detailedPosition?.code)}.png`}
        alt="Player Position"
        width={722}
        height={1055}
        className="h-48 w-auto"
      />
    </div>
  );
};
