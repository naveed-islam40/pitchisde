import { Block } from "@/components/Block";

import styles from "./TeamOfWeek.module.css";
import clsx from "clsx";
import { useLeague } from "@/contexts/League/LeagueContext";

function Player() {
  return (
    <div className="feedback mx-auto flex h-fit w-fit flex-col items-center rounded-md p-2">
      <div className="relative ">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white">
          <img
            src="/mig/player.png"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11"
          />
        </div>
        <p className="absolute -right-4 -top-2 rounded-full bg-[#1EC853] px-2 text-sm font-bold text-white">
          8.6
        </p>
        <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
          <img
            src="/mig/teams/west-united.png"
            className="relative top-[1px] w-4"
          />
        </div>
      </div>
      <h4 className="mt-2 text-sm font-bold leading-none text-white">
        Haaland
      </h4>
    </div>
  );
}

export function TeamOfWeek() {
  const league: any = useLeague();

  const currentseason = league.data.currentseason;
  const title =
    currentseason && currentseason.finished === false
      ? "Team of the Weak"
      : "Team of the Season";
  return (
    <Block title={title} padding={false}>
      <div className="grid grid-cols-1 bg-primary-light rounded-b-xl px-6 pt-6">
        <div className="grid grid-cols-3 gap-x-4">
          <div className="mt-5">
            <Player />
          </div>
          <Player />
          <div className="mt-5">
            <Player />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-x-4">
          <div className="mt-5">
            <Player />
          </div>
          <Player />
          <div className="mt-5">
            <Player />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-x-4">
          <Player />
          <Player />
          <Player />
          <Player />
        </div>
        <div
          className={clsx("grid h-32 grid-cols-3 items-end", styles.field_bg)}
        >
          <div></div>
          <div>
            <Player />
          </div>
          <div></div>
        </div>
      </div>
    </Block>
  );
}
