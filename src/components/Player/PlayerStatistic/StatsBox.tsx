import DefensiveStats from "./DefensiveStats";
import DisciplineStats from "./DisciplineStats";
import GoalkeepingStats from "./GoalkeepingStats";
import OffensiveStats from "./OffensiveStats";
import OverallStats from "./OverallStats";

function StatsBox({ stats, position }) {
  // Find the minutes played statistic (type_id 119)
  const minutesPlayedStat = stats?.details.find((stat) => stat.type_id === 119);
  const minutes_played = minutesPlayedStat?.value?.total || 0;

  return (
    <div className="flex gap-10">
      {/* Left Column */}
      <div className="flex-1 space-y-10">
        <OverallStats stats={stats} minutes_played={minutes_played} />
        {position.code === "goalkeeper" && (
          <GoalkeepingStats stats={stats} minutes_played={minutes_played} />
        )}
        <DefensiveStats stats={stats} minutes_played={minutes_played} />
      </div>

      {/* Right Column */}
      <div className="flex-1 space-y-10">
        <OffensiveStats stats={stats} minutes_played={minutes_played} />
        <DisciplineStats stats={stats} minutes_played={minutes_played} />
      </div>
    </div>
  );
}

export default StatsBox;
