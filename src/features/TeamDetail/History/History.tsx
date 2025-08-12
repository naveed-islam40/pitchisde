import { Trophies } from "./Trophies";
import { PositionChart } from "./PositionChart";
import { useTeam } from "@/contexts/Team/TeamContext";

export default function History() {
  const teamData: any = useTeam();
  const team = teamData.data;
  const { trophies } = team;

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-5">
        <PositionChart />
      </div>
      <div className="shrink-0 max-w-xs w-full space-y-5">
        <Trophies trophies={trophies} />
      </div>
    </div>
  );
}
