import { Block } from "@/components/Block";
import { TeamOfWeek } from "@/components/TeamOfWeek/TeamOfWeek";
import { TabbedStatistics } from "./TabbedStatistics";

export default function Statistics() {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 shrink-0 space-y-5">
        <TabbedStatistics />
      </div>
      <div className="shrink-0 space-y-5">
        <Block contentClassName="space-y-6" title="Upcoming Matches">
          {/* <ScheduledMatch /> */}
        </Block>
        <TeamOfWeek />
      </div>
    </div>
  );
}
