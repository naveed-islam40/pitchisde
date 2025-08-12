import OverallRow from "../StatsTable/OverAllRow";
import AttackRow from "../StatsTable/AttackRow";
import DefenseRow from "../StatsTable/DefenceRow";
import BattleRow from "../StatsTable/BattleRow";
import DisciplineRow from "../StatsTable/DisciplineRow";
import GoalkeepingRow from "../StatsTable/GoalkeepingRow";

function PlayerRows({ filter, header, playerStats }) {
  switch (filter) {
    case "Overall":
      return <OverallRow playerStats={playerStats} header={header} />;
    case "Defense":
      return <DefenseRow playerStats={playerStats} header={header} />;
    case "Attack":
      return <AttackRow playerStats={playerStats} header={header} />;
    case "Battle":
      return <BattleRow playerStats={playerStats} header={header} />;
    case "Discipline":
      return <DisciplineRow playerStats={playerStats} header={header} />;
    case "Goalkeeping":
      return <GoalkeepingRow playerStats={playerStats} header={header} />;
  }
}

export default PlayerRows;
