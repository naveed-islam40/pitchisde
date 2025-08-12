import { Block } from "@/components/Block";
import { useEffect, useState } from "react";
import useFixtureByHeadtoHead, {
  calculateStats,
} from "../Fixtures/useFixturebyHeadtoHead";
import LeagueFilter from "@/components/Match/HeadToHead/head-to-head-league-filter";
import Row from "@/components/Match/HeadToHead/head-to-head-row";
import { getContrastYIQ } from "@/lib/utils";

export function HeadToHead() {
  const { matches, stats, isLoading, fixtureHeadtoHead } =
    useFixtureByHeadtoHead();
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [homeOnly, setHomeOnly] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [statsToDisplay, setStatsToDisplay] = useState(stats);

  useEffect(() => {
    if (!fixtureHeadtoHead?.data) return;

    let filteredFixtures = fixtureHeadtoHead.data;

    // Apply league filter if not "All"
    if (selectedLeague !== "All") {
      filteredFixtures = filteredFixtures.filter(
        (f) => f.league?.name === selectedLeague
      );
    }

    // Apply home-only filter
    if (homeOnly) {
      filteredFixtures = filteredFixtures.filter(
        (f) => f?.participants?.[0]?.meta?.location === "home"
      );
    }

    const stats = calculateStats(filteredFixtures);
    setStatsToDisplay(stats);
  }, [selectedLeague, homeOnly, fixtureHeadtoHead]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const leagues = [
    "All",
    ...new Set(matches.map((match) => match.league.name)),
  ];

  const filteredMatches = matches.filter((match) => {
    const leagueMatch =
      selectedLeague === "All" || match.league.name === selectedLeague;
    const homeMatch = !homeOnly || match.team1.isWinner;
    return leagueMatch && homeMatch;
  });

  const displayMatches = showAllMatches
    ? filteredMatches
    : filteredMatches.slice(0, 5);

  // console.log(fixtureHeadtoHead);

  return (
    <Block showNextButton={false} padding={false}>
      <LeagueFilter
        leagues={leagues as string[]}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        matches={matches}
        homeOnly={homeOnly}
        setHomeOnly={setHomeOnly}
      />
      <div className="flex items-center gap-x-3 px-4 py-4 text-lg">
        <img
          src={matches[0]?.team1.logo}
          className="ml-auto w-12"
          alt={matches[0]?.team1.name}
        />
        <div className="flex w-full h-10 overflow-hidden justify-center">
          <div
            style={{
              backgroundColor: `${statsToDisplay.team1Color}`,
              color: getContrastYIQ(statsToDisplay.team1Color),
            }}
            className="h-full w-[35%] flex font-semibold items-center justify-center rounded-s-3xl"
          >
            {statsToDisplay.team1Wins}
          </div>
          <div className="h-full bg-gray-300 font-semibold flex justify-center items-center w-[35%]">
            {statsToDisplay.draws}
          </div>
          <div
            style={{
              backgroundColor: `${statsToDisplay.team2Color}`,
              color: getContrastYIQ(statsToDisplay.team2Color),
            }}
            className="h-full flex font-semibold items-center justify-center rounded-e-3xl w-[30%]"
          >
            {statsToDisplay.team2Wins}
          </div>
        </div>

        <img
          src={matches[0]?.team2.logo}
          className="mr-auto w-12"
          alt={matches[0]?.team2.name}
        />
      </div>

      <div className="mb-6 px-4 py-2 space-y-4 overflow-x-auto">
        {displayMatches.map((match) => (
          <Row
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            league={match.league}
          />
        ))}
      </div>

      <div className="text-center pb-2">
        {filteredMatches.length > 5 && (
          <button
            onClick={() => setShowAllMatches(!showAllMatches)}
            className="mx-auto px-4 py-1 rounded-full text-primary font-semibold hover:bg-dark/10"
          >
            {showAllMatches ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </Block>
  );
}
