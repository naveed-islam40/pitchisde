import useAllLeagues from "@/features/Leagues/useAllLeagues";
import { Block } from "../Block";
import { CardCompetition } from "./CardCompetition";

export function TopCompetitions() {
  const { leagues, isLoading } = useAllLeagues();

  if (isLoading)
    return (
      <Block
        title="Top Competitions"
        showNextButton={false}
        padding={false}
        className="overflow-x-hidden"
        contentClassName="border-t border-x-grey-3 p-6 "
      >
        <div className="relative h-48 bg-gray-200 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  if (!leagues || !leagues.data)
    return <p className="text-center">No data available.</p>;

  const activeLeagues = leagues?.data.filter((league) => league.active);
  return (
    <Block
      title="Top Competitions"
      padding={false}
      showNextButton={false}
      className="overflow-x-hidden"
    >
      <div>
        {activeLeagues.map((league) => (
          <CardCompetition key={league.id} league={league} />
        ))}
      </div>
    </Block>
  );
}
