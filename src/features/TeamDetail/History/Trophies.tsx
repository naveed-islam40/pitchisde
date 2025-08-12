import Image from "next/image";
import { useState } from "react";

export function Trophies({ trophies }: { trophies: any }) {
  const [toggle, setToggle] = useState("season");

  const byLeague = groupByLeague(trophies);
  const bySeason = groupBySeason(trophies.filter((trophy) => trophy.season));

  const leagueIds = Object.keys(byLeague);
  const seasonIds = Object.keys(bySeason).sort((a, b) => b.localeCompare(a));

  return (
    <div className="app-block rounded-lg p-4  min-w-60">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-semibold text-primary">Trophies</h2>
        <div className="flex items-center gap-x-1 bg-neutral-200 rounded-full p-1">
          <button
            onClick={() => setToggle("season")}
            className={`${
              toggle === "season" ? "bg-white" : "text-neutral-500"
            } px-2 py-1 rounded-full font-bold  text-sm`}
          >
            Season
          </button>
          <button
            onClick={() => setToggle("league")}
            className={`${
              toggle === "league" ? "bg-white" : "text-neutral-500"
            } px-2 py-1 rounded-full font-bold text-sm `}
          >
            League
          </button>
        </div>
      </div>
      <div className="space-y-2.5 md:space-y-6 max-w-sm w-full mt-6">
        {toggle === "season"
          ? seasonIds.map((seasonId) => (
              <SeasonView key={seasonId} season={bySeason[seasonId]} />
            ))
          : leagueIds.map((leagueId) => (
              <LeagueView key={leagueId} league={byLeague[leagueId]} />
            ))}
      </div>
    </div>
  );
}
function SeasonView({ season }) {
  if (!season) return null;

  const { trophies } = season;

  const winnerTrophies = trophies.filter((trophy) => trophy.trophy_id === 1);
  const runnerUpTrophies = trophies.filter((trophy) => trophy.trophy_id === 2);

  return (
    <div className="space-y-2.5 md:space-y-6">
      <div className="flex items-center gap-x-2">
        <p className="font-semibold md:font-bold text-dark">{season.name}</p>
      </div>
      {winnerTrophies.length ? (
        <div className="flex gap-4 items-center">
          <Image
            width={512}
            height={512}
            src="/mig/icons/trophy.png"
            className="h-8 w-auto"
            alt="Trophy"
          />
          <div className="space-y-2 ">
            {winnerTrophies.map((trophy) => (
              <div key={trophy.id} className="flex gap-2 items-center">
                <Image
                  width={512}
                  height={512}
                  src={trophy.league.image_path}
                  className="h-8 w-auto"
                  alt={trophy.league.name}
                />
                <span>{trophy.league.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {runnerUpTrophies.length ? (
        <div className="flex gap-4 items-center">
          <span className="font-bold text-lg text-dark">2nd</span>
          <div className="space-y-2 ">
            {runnerUpTrophies.map((trophy) => (
              <div key={trophy.id} className="flex gap-2 items-center">
                <Image
                  width={512}
                  height={512}
                  src={trophy.league.image_path}
                  className="h-8 w-auto"
                  alt={trophy.league.name}
                />
                <span>{trophy.league.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LeagueView({ league }) {
  if (!league.league) return null;
  const { trophies } = league;
  const winnerTrophies = trophies.filter((trophy) => trophy.trophy_id === 1);
  const runnerUpTrophies = trophies.filter((trophy) => trophy.trophy_id === 2);
  return (
    <div className="space-y-2.5 md:space-y-6">
      <div className="flex items-center gap-x-2">
        <Image
          width={512}
          height={512}
          src={league.league.image_path}
          className="size-6 md:size-8 "
          alt={league.name}
        />
        <p className="font-semibold md:font-bold text-dark">
          {league.league.name}
        </p>
      </div>
      {winnerTrophies.length ? (
        <div className="flex gap-4 items-center">
          <Image
            width={512}
            height={512}
            src="/mig/icons/trophy.png"
            className="h-12 w-auto"
            alt="Trophy"
          />
          <div className="grid grid-cols-2 gap-2">
            {league.trophies.map((trophy) => (
              <div key={trophy.id} className="rounded-lg bg-neutral-100 p-1 ">
                {trophy.season.name}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {runnerUpTrophies.length ? (
        <div className="flex gap-4 items-center">
          <span className="font-bold text-lg w-12 text-center text-dark">
            2nd
          </span>
          <div className="grid grid-cols-2 gap-2">
            {league.trophies.map((trophy) => (
              <div key={trophy.id} className="rounded-lg bg-neutral-100 p-1 ">
                {trophy.season.name}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const groupByLeague = (data) => {
  return data.reduce((acc, item) => {
    const key = item.league_id;
    if (!acc[key]) {
      acc[key] = {
        league: item.league,
        trophies: [],
      };
    }
    acc[key].trophies.push(item);
    return acc;
  }, {});
};

const groupBySeason = (data) => {
  return data.reduce((acc, item) => {
    const key = item.season.name;
    if (!acc[key]) {
      acc[key] = {
        name: key,
        trophies: [],
      };
    }
    acc[key].trophies.push(item);
    return acc;
  }, {});
};
