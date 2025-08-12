import React from "react";
import { formatDate } from "@/utils/generics";
import { RowProps } from "./head-to-head-types";

function Row({ team1, team2, date, league }: RowProps) {
  return (
    <div className="text-sm grid grid-cols-3 items-center">
      <p className=" leading-tight text-x-grey-1">{formatDate(date)}</p>
      <div className="font-semibold text-x-grey-1 grid grid-cols-3 gap-3 items-center">
        <img src={team1.logo} className="size-8 mx-auto" alt={team1.name} />
        <p className="text-center text-base">{`${team1.score} - ${team2.score}`}</p>
        <img src={team2.logo} className="size-8 mx-auto" alt={team2.name} />
      </div>
      <div className=" text-x-grey-1 flex justify-end items-center space-x-1">
        <p className="text-right">{league.name}</p>
        <img src={league.logo} className="size-6" alt={league.name} />
      </div>
    </div>
  );
}

export default Row;
