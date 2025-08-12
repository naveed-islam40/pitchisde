import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VersusRowList } from "@/components/VersusView";
import { MatchRow } from "@/features/Dashboard/MatchList";
import { groupFixturesByStage } from "@/helpers/math-helper";
import { useEffect, useState } from "react";

export function RoundMatches({ fixturesData }) {
  const [selectedRound, setSelectedRound] = useState("");
  const [currentRoundFixtures, setCurrentRoundFixtures] = useState<any>([]);

  const rounds: any = [];
  for (const fixture of fixturesData) {
    if (!rounds.includes(fixture.name)) {
      rounds.push(fixture.name);
    }
  }

  useEffect(() => {
    if (selectedRound) {
      const aggregate = fixturesData.find(
        (fixture) => fixture.name === selectedRound
      );

      const fixtures = groupFixturesByStage(aggregate.aggregates);
      setCurrentRoundFixtures(
        selectedRound === "Final" ? aggregate.fixtures : fixtures
      );
    } else {
      const aggregates = fixturesData[0].aggregates;
      const fixtures = groupFixturesByStage(aggregates);
      setCurrentRoundFixtures(fixtures);
      setSelectedRound(fixturesData[0]?.name);
    }
  }, [selectedRound]);

  if (!fixturesData || Object.keys(fixturesData).length === 0)
    return <p className="text-center">No Upcoming Matches</p>;

  return (
    <div>
      <div className="bg-gray-300 flex justify-center py-5">
        <Select onValueChange={setSelectedRound} value={selectedRound}>
          <SelectTrigger className="w-[280px] bg-gray-300">
            <SelectValue placeholder="Round" />
          </SelectTrigger>
          <SelectContent>
            {rounds.map((round) => (
              <SelectItem key={round} value={round}>
                {round}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {currentRoundFixtures.map((match) => (
        <div>
          <VersusRowList>
            <MatchRow key={match.id} match={match} />
          </VersusRowList>
        </div>
      ))}
    </div>
  );
}
