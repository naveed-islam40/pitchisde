import { VersusRowList } from "@/components/VersusView";
import { format } from "date-fns";
import MatchRow from "./MatchRow";

export function CurrentWeek({ fixturesData }) {
  if (!fixturesData || Object.keys(fixturesData).length === 0)
    return <p className="text-center">No Upcoming Matches</p>;

  const title = (weekStartStr) => {
    const date = new Date(weekStartStr);
    if (!isNaN(date.getTime())) {
      return format(date, "dd MMM yyyy");
    }
    return weekStartStr;
  };

  return (
    <div>
      {Object.entries(fixturesData).map(([weekStartStr, matches]: any) => (
        <div key={weekStartStr}>
          {/* <TitleStripSimple title={title(weekStartStr)} /> */}
          <VersusRowList>
            {matches?.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </VersusRowList>
        </div>
      ))}
    </div>
  );
}
