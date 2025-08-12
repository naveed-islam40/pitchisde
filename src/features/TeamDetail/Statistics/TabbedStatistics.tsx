import { TabBlock } from "@/components/TabBlock";
import { GoalStatCard } from "@/components/stat/GoalStatCard";

export function Players() {
  return (
    <div className="grid gap-6 md:grid-cols-2 wl:grid-cols-3">
      {/* <PlayerStatCard /> */}
    </div>
  );
}

export function Team() {
  return (
    <div className="grid gap-6 md:grid-cols-2 wl:grid-cols-3">
      <GoalStatCard />
    </div>
  );
}

export function TabbedStatistics() {
  return (
    <TabBlock>
      <TabBlock.List>
        <TabBlock.Tab label="Players" />
        <TabBlock.Tab label="Team" />
      </TabBlock.List>
      <TabBlock.Panels>
        <TabBlock.Panel>{/* <Players /> */}</TabBlock.Panel>
        <TabBlock.Panel>
          <Team />
        </TabBlock.Panel>
      </TabBlock.Panels>
    </TabBlock>
  );
}
