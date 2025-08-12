import clsx from "clsx";
import { Block } from "@/components/Block";
import { useEffect, useState } from "react";
import Image from "next/image";
import { filters } from "@/static/lineup-filters";
import PlayerRows from "./StatsTable/PlayerRows";
import { sortPlayerStats } from "./StatsTable/StatsSorting";
import { IoMdArrowDropdown } from "react-icons/io";
import FirstColumn from "./StatsTable/FirstColumnHeader";
import FirstColumnBody from "./StatsTable/FirstColumnBody";

const filterTypeIds = (data, types) =>
  data.filter((item) => types.includes(item.type_id));

export function StatsTable({ lineups, activeToggle }) {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [playerRows, setPlayerRows] = useState<any>([]);
  const [sortConfig, setSortConfig] = useState<{
    header: string;
    isAscending: boolean;
  }>({
    header: "",
    isAscending: true,
  });

  const headers = activeFilter.headers;

  const details = lineups.flatMap((lineup) => lineup.details);
  const filteredDetails = filterTypeIds(details, activeFilter.types);

  const groupedByPlayer = filteredDetails.reduce((grouped, item) => {
    const playerId = item.player_id;
    if (!grouped[playerId]) {
      grouped[playerId] = [];
    }
    grouped[playerId].push(item);
    return grouped;
  }, {});

  const groupedGoalkeepers = lineups
    .filter((lineup) => lineup.position_id === 24)
    .flatMap((lineup) => lineup.details)
    .reduce((grouped, item) => {
      const playerId = item.player_id;
      if (!grouped[playerId]) {
        grouped[playerId] = [];
      }
      grouped[playerId].push(item);
      return grouped;
    }, {});

  useEffect(() => {
    const playerRows =
      activeFilter.category === "Goalkeeping"
        ? Object.entries(groupedGoalkeepers)
        : Object.entries(groupedByPlayer);
    setPlayerRows(playerRows);
  }, [activeFilter, lineups]);

  return (
    <Block>
      <div className="flex justify-between items-center">
        <h2 className="text-left py-4 text-xl font-bold text-x-bargreen">
          Player Statistics
        </h2>
        <div className="flex gap-2 rounded-full bg-gray-200 p-1">
          {filters.map((filter) => (
            <FilterButton
              key={`filter-${filter.category}`}
              name={filter.category}
              isActive={filter.category === activeFilter.category}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "mb-6 grid grid-cols-[1fr,repeat(9,auto)] gap-y-2.5 overflow-x-auto whitespace-nowrap font-medium"
        )}
      >
        <div className="relative overflow-x-auto">
          <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* headers row */}
            <thead className="text-sm text-gray-700 capitalize bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr className="h-14 border-b border-gray-300">
                <th
                  scope="col"
                  className="px-2 w-48 text-wrap font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 sticky left-0 z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-gray-300 dark:after:bg-gray-700"
                >
                  Player
                </th>
                <FirstColumn
                  activeToggle={activeToggle}
                  playerRows={playerRows}
                  setPlayerRows={setPlayerRows}
                  setSortConfig={setSortConfig}
                  sortConfig={sortConfig}
                />
                {headers.map((header) => (
                  <th
                    key={`header-${header}`}
                    scope="col"
                    className="w-32 px-2 border-r last:border-r-0 border-gray-300 whitespace-normal break-words text-center leading-4"
                    onClick={() => {
                      let isAscending = true;

                      if (sortConfig.header === header) {
                        isAscending = !sortConfig.isAscending;
                      }

                      const sorted = sortPlayerStats(
                        playerRows,
                        header,
                        isAscending
                      );
                      setPlayerRows(sorted);

                      setSortConfig({ header, isAscending });
                    }}
                  >
                    <div className="flex items-center justify-center font- flex-col">
                      {header}
                      <IoMdArrowDropdown
                        className={clsx(
                          sortConfig.header === header && sortConfig.isAscending
                            ? "rotate-180"
                            : "rotate-0"
                        )}
                        title={"text-center"}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* body  */}
            <tbody>
              {playerRows.map((player) => (
                <tr
                  key={player[0]}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-14"
                >
                  <td
                    scope="row"
                    className="px-2 w-48 text-wrap font-medium text-gray-900  dark:text-white bg-white dark:bg-gray-800 sticky left-0 z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-gray-300 dark:after:bg-gray-700"
                  >
                    <div className="flex gap-2">
                      <Image
                        width={512}
                        height={512}
                        src={
                          lineups.find(
                            (lineup) => lineup.player_id === +player[0]
                          )?.player.image_path
                        }
                        alt="player"
                        className="size-6 rounded-full"
                      />
                      {
                        lineups.find(
                          (lineup) => lineup.player_id === +player[0]
                        )?.player.lastname
                      }
                    </div>
                  </td>
                  <FirstColumnBody
                    activeToggle={activeToggle}
                    playerStats={player[1]}
                    lineups={lineups}
                  />
                  {headers.map((header) => (
                    <PlayerRows
                      filter={activeFilter.category}
                      key={header}
                      playerStats={player[1]}
                      header={header}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Block>
  );
}

function FilterButton({ name, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "text-sm px-4 py-1.5 rounded-full hover:bg-gray-50 font-semibold",
        isActive ? "bg-white text-x-bargreen" : "text-gray-600"
      )}
    >
      {name}
    </button>
  );
}
