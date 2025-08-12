import { LeagueSlider } from "@/components/LeagueSlider/LeagueSlider";
import { useState } from "react";
import DesktopRow from "./DesktopRow";
import SeasonSelect from "../SeasonSelect";

function DesktopView({ seasons }) {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.id);
  const [selectedLeague, setSelectedLeague] = useState("");

  const seasonData = seasons.find((season) => season.id === selectedSeason);
  if (!seasonData) return null;
  const leagues = seasonData.leagues;

  const matches =
    selectedLeague === ""
      ? leagues.reduce((acc, league) => acc.concat(league.items), [])
      : leagues.find((league) => league.id === selectedLeague)?.items;

  return (
    <>
      <div className="px-4 py-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary">Matches</h2>
        <SeasonSelect
          onChange={(val) => {
            setSelectedSeason(val);
            setSelectedLeague("");
          }}
          seasons={seasons}
        />
      </div>

      <LeagueSlider
        leagues={leagues}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
      />
      <div className="max-h-[24rem] overflow-y-auto">
        {matches?.length
          ? sortByStartTimestamp(matches).map((match) => (
              <DesktopRow key={match.id} match={match} />
            ))
          : null}
      </div>
    </>
  );
}

export default DesktopView;

function sortByStartTimestamp(data) {
  return data.sort(
    (a, b) => b.fixture.starting_at_timestamp - a.fixture.starting_at_timestamp
  );
}
