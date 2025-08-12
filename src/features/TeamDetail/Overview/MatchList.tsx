import { Block } from "@/components/Block";
import { LeagueSlider } from "@/components/LeagueSlider/LeagueSlider";
import { VersusRow, VersusRowList } from "@/components/VersusView";
import { useState } from "react";

function MatchListInner({ fixtures }: any) {
  return <VersusRowList></VersusRowList>;
}

export function MatchList({ leagues }: any) {
  const [selectedLeague, setSelectedLeague] = useState(
    leagues.at(0).at(0).league.id
  );

  const activeFixtures = leagues.find(
    (l) => l.at(0).league.id === selectedLeague
  );
  return (
    <Block padding={false}>
      <div className="flex items-center justify-between px-4 border-b ">
        <h2 className="text-xl font-semibold text-primary">Matches</h2>
        <div className="translate-y-px translate-x-4">
          <LeagueSlider
            hideAll
            leagues={leagues.map((league) => league.at(0).league)}
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
        </div>
      </div>
      <MatchListInner fixtures={activeFixtures} />
    </Block>
  );
}
