import useLeaguesBySearch from "@/features/Leagues/useLeaguesBySearch";
import useTeamsBySearch from "@/features/Teams/useTeamsBySearch";
import useDebounce from "@/hooks/useDebounce";
import { IconSearch, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(query.trim(), 1000);

  const { foundLeagues, isLoading: isLeaguesDataLoading } = useLeaguesBySearch({
    name: debouncedSearchQuery,
  });
  const { foundTeams, isLoading: isTeamsDataLoading } = useTeamsBySearch({
    name: debouncedSearchQuery,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={searchBoxRef}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          className="px-5 pl-10 rounded-full py-2.5 focus:outline-none focus-visible:ring-1 ring-primary-light bg-primary-light/50 placeholder:text-light/80 placeholder:font-medium w-80 peer"
        />
        <IconSearch
          className="peer-focus:text-light text-light/80 absolute top-1/2 -translate-y-1/2 left-2.5"
          size={20}
        />
        {query && (
          <button
            className="absolute right-2.5 top-1/2 -translate-y-1/2"
            type="button"
            onClick={() => setQuery("")}
          >
            <IconX size={16} />
          </button>
        )}
      </div>
      {open && (
        <div className="rounded-lg absolute top-14 left-0 w-[32rem] z-30 shadow bg-white text-dark">
          <SearchResultsBox
            teams={foundTeams}
            leagues={foundLeagues}
            isLoadingLeagues={isLeaguesDataLoading}
            isLoadingTeams={isTeamsDataLoading}
            debouncedQuery={debouncedSearchQuery}
          />
        </div>
      )}
    </div>
  );
}
const tabs = [
  { value: "teams", label: "Teams" },
  { value: "leagues", label: "Leagues" },
];
function SearchResultsBox({
  teams,
  leagues,
  isLoadingLeagues,
  isLoadingTeams,
  debouncedQuery = "",
}) {
  const [tab, setTab] = useState("teams");
  const teamsList = teams?.data;
  const leaguesList = leagues?.data;
  const isLoading = isLoadingLeagues || isLoadingTeams;

  const list = tab === "teams" ? teamsList : leaguesList;
  const noResults = !isLoading && !list && debouncedQuery;

  return (
    <div className="font-sans text-left rounded-lg overflow-auto h-72 transition-all bg-white z-50 space-y-4 scrollbar-thin">
      <div className="bg-white border-b p-2 sticky top-0 flex gap-2">
        {tabs.map((item) => (
          <button
            key={item.value}
            onClick={() => setTab(item.value)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-semibold",
              item.value === tab
                ? "bg-primary text-light"
                : "bg-light text-dark"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {!debouncedQuery && (
        <div className="">
          <p className="text-center text-lg px-6 text-dark/70 font-medium pt-20 ">
            Start typing to search...
          </p>
        </div>
      )}

      {noResults ? (
        <div>
          <p className="text-center py-20 px-2 text-lg ">
            No teams or leagues matched &nbsp;
            <span className="font-semibold text-dark/80">
              &apos;{debouncedQuery}&apos;
            </span>
          </p>
        </div>
      ) : null}

      {isLoading && (
        <div className="px-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="relative overflow-hidden mt-2 h-8 rounded-md bg-dark/2 0"
            >
              <div className="shimmer-effect"></div>
            </div>
          ))}
        </div>
      )}

      {list ? (
        <div className="basis-full">
          <ul>
            {list.map((item) => (
              <li key={item.id} className={`rounded-md hover:bg-light`}>
                <Link
                  href={`/${tab === "teams" ? "team" : "league"}/${
                    item.id
                  }/overview`}
                  className="p-2 rounded-md flex items-center gap-x-2"
                >
                  <Image
                    width={150}
                    height={150}
                    src={item.image_path}
                    alt={`${item.name} Logo`}
                    className="w-8 object-contain"
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
