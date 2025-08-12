import { useFixture } from "@/contexts/Fixture/FixtureContext";
import { AppLayout } from "@/layouts/AppLayout";
import { useState } from "react";
import Channels from "./Channels";
import { EventsInfo } from "./EventsInfo";
import Forms from "./Forms";
import { HeadToHead } from "./HeadToHead";
import { Hero } from "./Hero";
import LineupField from "./LineupField";
import { MatchMiniStandings } from "./MatchMiniStandings";
import PressureChart from "./PressureChart";

export default function MatchDetail() {
  const fixtureData: any = useFixture();
  const [showPlayerStatistics, setShowPlayerStatistics] = useState(false);

  const { data } = fixtureData;

  return (
    <AppLayout>
      <Hero />
      <div className="mt-6 flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="basis-1/3 space-y-5">
          {data.pressure?.length ? (
            <div className="app-block rounded-2xl px-2 pl-3">
              <PressureChart
                pressureData={data.pressure}
                participants={data.participants}
                metadata={data.metadata}
                events={data.events}
              />
            </div>
          ) : null}
          {data.events ? (
            <EventsInfo
              events={data.events}
              participants={data.participants}
              comments={data.comments}
              statistics={data.statistics}
              metadata={data.metadata}
            />
          ) : null}
          <Forms participants={data.participants} />
          <MatchMiniStandings seasonId={data.season_id} />
          <HeadToHead />
          <Channels />
        </div>
        <div className="basis-2/3 space-y-5">
          <LineupField
            lineups={data.lineups}
            lineupText={data.placeholder ? "Expected Lineups" : "Lineups"}
            formations={data.formations}
            metadata={data.metadata}
            sidelined={data.sidelined}
            participants={data.participants}
            coaches={data.coaches}
            events={data.events}
            setShowPlayerStatistics={setShowPlayerStatistics}
            showPlayerStatistics={showPlayerStatistics}
          />

          {/* <MatchStatistics
            statistics={data.statistics}
            metadata={data.metadata}
          /> */}
        </div>
      </div>
    </AppLayout>
  );
}
