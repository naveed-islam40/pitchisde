import clsx from "clsx";
import { LeagueFilterProps } from "./head-to-head-types";

function LeagueFilter({
  leagues,
  selectedLeague,
  setSelectedLeague,
  matches,
  homeOnly,
  setHomeOnly,
}: LeagueFilterProps) {
  return (
    <div className="flex flex-col w-full">
      <p className="px-2 font-semibold">Head to Head</p>
      <div className="flex items-center justify-between px-1  pt-1">
        <div className="flex gap-2 overflow-x-auto">
          {leagues.map((league) => {
            const matchForLeague = matches.find(
              (m) => m.league.name === league
            );
            return (
              <button
                key={league}
                onClick={() => setSelectedLeague(league)}
                className={clsx(
                  "inline-flex items-center justify-center gap-1 size-10 rounded-full transition-colors",
                  selectedLeague === league
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                )}
              >
                {league === "All" ? (
                  <span className="text-sm">All</span>
                ) : (
                  matchForLeague && (
                    <img
                      src={matchForLeague.league.logo}
                      alt={league}
                      className="w-6 h-6"
                    />
                  )
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setHomeOnly(!homeOnly)}
          className={clsx(
            "flex items-center gap-2 px-3 py-1 rounded-full transition-colors",
            homeOnly ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
          )}
        >
          <img
            src={matches[0]?.team1.logo}
            alt="Home team"
            className="w-4 h-4"
          />
          <span className="text-sm">Home</span>
        </button>
      </div>
    </div>
  );
}

export default LeagueFilter;
