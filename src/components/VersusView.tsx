import {
  IconBell,
  IconBellFilled,
  IconRectangleVerticalFilled,
} from "@tabler/icons-react";
import clsx from "clsx";
import { startProgress, stopProgress } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export interface VersusRowTeam {
  id?: number;
  name: string;
  logo: string;
  score: number;
  meta: any;
}

export interface VersusRowProp {
  aggregate?: string;
  team1: VersusRowTeam;
  team2: VersusRowTeam;
  tag?: string;
  tagFull?: string;
  notification?: boolean;
  mode?: "score" | "schedule" | "awaiting";
  time?: string | null;
  matchId?: string;
  awaiting?: string;
  team1RedCards?: number;
  team2RedCards?: number;
}

function Scoreboard({
  team1,
  team2,
  aggregateResult,
}: {
  team1: VersusRowTeam;
  team2: VersusRowTeam;
  aggregateResult?: string;
}) {
  return (
    <div>
      {aggregateResult && (
        <p className="text-center font-bold text-dark/70">
          ({aggregateResult})
        </p>
      )}
      <div className="grid grid-cols-3 text-center text-xl font-bold text-dark xl:text-xl">
        <span>{team1.score}</span>
        <span> - </span>
        <span>{team2.score}</span>
      </div>
    </div>
  );
}

function Schedule({ time }: { time: string }) {
  return (
    <div className="text-center font-bold text-dark xl:text-lg whitespace-nowrap">
      {time}
    </div>
  );
}

export function VersusRow({
  team1,
  team2,
  tag,
  tagFull,
  notification = false,
  mode,
  time,
  matchId,
  awaiting,
  aggregate,
  team1RedCards,
  team2RedCards,
}: VersusRowProp) {
  const [isNotify, setIsNotify] = useState(false);

  const router = useRouter();
  const toggleNotify = (e) => {
    e.stopPropagation();
    setIsNotify(!isNotify);
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const userJSON = JSON.parse(localUser);
      const { matches } = userJSON?.notify;

      const updatedMatches = matches.includes(matchId)
        ? matches.filter((id) => id !== matchId)
        : [...matches, matchId];

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userJSON,
          notify: {
            ...userJSON.notify,
            matches: updatedMatches,
          },
        })
      );
    }
  };

  const navigateToFixture = () => {
    startProgress();
    router.push(`/match/${matchId}`).finally(() => stopProgress());
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const userJSON = JSON.parse(localUser);
      const { notify } = userJSON;
      const { matches } = notify || {};
      if (matches?.length) {
        if (matches.find((match) => match === matchId)) setIsNotify(true);
      }
    }
  }, [matchId]);

  return (
    <div
      onClick={navigateToFixture}
      className={clsx(
        "flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 items-center"
      )}
    >
      {/* Tag */}
      <div className="w-8">
        {tag && (
          <p
            data-tooltip-id={`${team1.name}-${tag}-${team2.name}`}
            data-tooltip-content={tagFull}
            data-tooltip-place="left"
            data-tooltip-delay-show={200}
            data-tooltip-variant="info"
            className={clsx(
              "bg-primary rounded-full py-1 text-xs leading-none text-center font-semibold text-white md:block cursor-default",
              tag === "FT" && "bg-dark/50"
            )}
          >
            {tag}
          </p>
        )}
        <Tooltip id={`${team1.name}-${tag}-${team2.name}`} />
      </div>
      <div
        style={{
          gridTemplateColumns: `1fr  minmax(3rem, auto) 1fr`,
        }}
        className="flex-1 grid items-center gap-4"
      >
        <div className="flex items-center justify-end gap-2">
          {Array.from({ length: team1RedCards || 0 }, (_, i) => (
            <IconRectangleVerticalFilled
              key={`${team1.name}-redcard-${i}`}
              size={16}
              className="text-danger"
            />
          ))}
          <Link
            href={`/team/${team1.id}/overview`}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "justify-self-end text-right font-semibold text-dark text-nowrap lg:text-base text-xs hover:underline underline-offset-2",
              team1.meta.winner && "font-semibold"
            )}
          >
            {team1.name}
          </Link>
          <Image
            width={150}
            height={150}
            src={team1.logo}
            className=" w-7 md:w-8 object-contain"
            alt={`${team1.name} Logo`}
          />
        </div>

        {/* Content */}
        {mode === "schedule" && time ? (
          <Schedule time={time} />
        ) : mode === "awaiting" ? (
          <div className="font-bold text-dark xl:text-lg text-center whitespace-nowrap">
            {awaiting}
          </div>
        ) : (
          <Scoreboard team1={team1} team2={team2} aggregateResult={aggregate} />
        )}
        <div className="flex items-center gap-2">
          <Image
            width={150}
            height={150}
            src={team2.logo}
            className=" w-7 md:w-8 object-contain"
            alt={`${team2.name} Logo`}
          />

          <Link
            href={`/team/${team2.id}/overview`}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "font-semibold text-dark text-nowrap lg:text-base text-xs  hover:underline underline-offset-2",
              team2.meta.winner && "font-semibold"
            )}
          >
            {team2.name}
          </Link>
          {Array.from({ length: team2RedCards || 0 }, (_, i) => (
            <IconRectangleVerticalFilled
              key={`${team2.name}-redcard-${i}`}
              size={16}
              className="text-danger"
            />
          ))}
        </div>
      </div>
      {/* Notification */}
      <div className="box-content h-10">
        {notification && (
          <button
            onClick={toggleNotify}
            className="rounded-md hover:bg-gray-300 p-1"
          >
            {isNotify ? (
              <IconBellFilled className="w-6 h-6 fill-yellow-500" />
            ) : (
              <IconBell className="w-6 h-6 text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Its children must be VersusRow's
export function VersusRowList({ children }: PropsWithChildren) {
  return <div className="py-2">{children}</div>;
}
