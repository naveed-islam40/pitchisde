import { Block } from "@/components/Block";
import LeagueMatchSwitch from "@/components/Match/league-match-switch";
import { CurrentWeek } from "@/components/Match/LeagueMatches/CurrentWeek";
import { MatchesTable } from "@/components/Match/LeagueMatches/MatchesTable";
import { RoundMatches } from "@/components/Match/LeagueMatches/RoundMatches";
import { NewsCard } from "@/components/News/NewsCard";
import MatchSkeleton from "@/components/Skeletons/MatchSkeleton";
import { useLeague } from "@/contexts/League/LeagueContext";
import useSchedulesBySeasons from "@/features/Seasons/useGetSchedulesBuSeason";
import {
  groupByMatchWeeks,
  groupFixturesByStage,
  groupFixturesByWeek,
} from "@/helpers/math-helper";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Matches() {
  const [activeToggle, setActiveToggle] = useState<
    "stage" | "matchWeek" | "date"
  >("matchWeek");
  const [loadedWeeks, setLoadedWeeks] = useState<number>(1);
  const [allFixtures, setAllFixtures] = useState<any>({});
  const [displayedFixtures, setDisplayedFixtures] = useState<any>({});
  const [currentWeekFixtures, setCurrentWeekFixtures] = useState<any>({});

  const league: any = useLeague();
  const { query } = useRouter();

  const sortedSeasons = league.data.seasons.sort((a, b) =>
    b.name.localeCompare(a.name)
  );

  const seasonId = (query.season as string) || sortedSeasons[0].id;

  const { Schedules, isError, error, isLoading } = useSchedulesBySeasons({
    seasonId,
  });
  const isToggleShow = Schedules?.data?.length > 1;

  useEffect(() => {
    if (Schedules?.data) {
      const processedFixtures = isToggleShow
        ? activeToggle === "matchWeek"
          ? groupByMatchWeeks(Schedules.data)
          : groupFixturesByWeek(Schedules.data)
        : groupFixturesByWeek(Schedules.data);

      setAllFixtures(processedFixtures);
      switch (activeToggle) {
        case "matchWeek":
          return updateDisplayedFixtures(
            processedFixtures,
            loadedWeeks,
            setCurrentWeekFixtures
          );
        case "date":
          return updateDisplayedFixtures(
            processedFixtures,
            loadedWeeks,
            setDisplayedFixtures
          );
      }
    }
  }, [Schedules?.data, activeToggle, isToggleShow]);

  useEffect(() => {
    updateDisplayedFixtures(allFixtures, loadedWeeks, setDisplayedFixtures);
  }, [loadedWeeks]);

  const handleLoadMore = () => {
    setLoadedWeeks((prev) => prev + 1);
  };

  const canLoadMore = Object.keys(allFixtures).length > loadedWeeks;

  if (isError) {
    return (
      <Block padding={false} className="py-20">
        <p className="text-center">{error?.message.split(".")[0]}</p>
      </Block>
    );
  }

  const RenderComponent = () => {
    if (activeToggle === "stage") {
      return <RoundMatches fixturesData={Schedules?.data} />;
    } else if (activeToggle === "date") {
      return <MatchesTable fixturesData={displayedFixtures} />;
    } else {
      return <CurrentWeek fixturesData={currentWeekFixtures} />;
    }
  };

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-5">
        {isLoading && <MatchSkeleton />}
        {!isLoading && (
          <Block padding={false}>
            <div className="bg-white px-4 py-4 rounded-md">
              {/* Toggle Buttons  */}
              {isToggleShow && (
                <LeagueMatchSwitch
                  setActiveToggle={setActiveToggle}
                  activeToggle={activeToggle}
                />
              )}
              {/* Match list  */}

              <RenderComponent />

              {/* Load More Button */}
              {activeToggle === "date" && canLoadMore && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="p-2 rounded-md border my-2 w-1/2 hover:bg-gray-100"
                  >
                    Load More Weeks
                  </button>
                </div>
              )}
            </div>
          </Block>
        )}
      </div>
      <div className="shrink-0 space-y-5">
        <Block title="News">
          <div className="flex flex-col items-center gap-8">
            <NewsCard />
            <NewsCard />
          </div>
        </Block>
      </div>
    </div>
  );
}

const updateDisplayedFixtures = (
  fixtures: any,
  weeksToShow: number,
  setDisplayedFixtures
) => {
  const weekKeys = Object.keys(fixtures).sort().reverse();
  const weeksToDisplay = weekKeys.slice(0, weeksToShow);
  const result: Record<string, any> = {};

  weeksToDisplay.forEach((week) => {
    result[week] = fixtures[week];
  });

  const values = Object.values(result);
  setDisplayedFixtures(result);
};
