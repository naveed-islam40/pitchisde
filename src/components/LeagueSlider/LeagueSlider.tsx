import clsx from "clsx";
import styles from "./LeagueSlider.module.css";
import Image from "next/image";

export function LeagueSlider({
  leagues,
  selectedLeague,
  setSelectedLeague,
  hideAll = false,
}) {
  if (!leagues) return null;
  const sortedLeagues = leagues.sort((a, b) =>
    a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  );

  return (
    <header className="flex gap-x-2 border-b px-6 py-2 overflow-x-auto">
      {!hideAll && (
        <button
          data-active={selectedLeague === ""}
          onClick={() => setSelectedLeague("")}
          className={clsx(
            styles.league_slider,
            "text-lg font-bold text-primary"
          )}
        >
          All
        </button>
      )}
      {sortedLeagues.map((league) => (
        <button
          title={league.name}
          key={league.id}
          data-active={selectedLeague === league.id}
          onClick={() => setSelectedLeague(league.id)}
          className={clsx(styles.league_slider)}
        >
          <Image
            unoptimized
            width={250}
            height={250}
            src={league.image_path}
            className="object-contain size-8"
            alt={league.name}
          />
        </button>
      ))}
    </header>
  );
}
