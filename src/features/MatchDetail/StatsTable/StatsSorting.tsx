export const sortPlayerStats = (
  playerStatsArray,
  statCode,
  isAscending = true
) => {
  return [...playerStatsArray].sort((a, b) => {
    const aValue = getStatValue(a[1], statCode);
    const bValue = getStatValue(b[1], statCode);

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    return isAscending ? aValue - bValue : bValue - aValue;
  });
};

const getStatValue = (statsArray, code) => {
  const stat = statsArray.find((stat) => {
    let statCode = stat.type.code?.toLowerCase();

    switch (statCode) {
      case "minutes-played":
        statCode = "minutes";
        break;
      case "shots-on-target":
        statCode = "shots";
        break;
      case "key-passes":
        statCode = "key passes";
        break;
      case "accurate-crosses":
        statCode = "crosses";
        break;
      case "big-chances-created":
        statCode = "big chances created";
        break;
      case "big-chances-missed":
        statCode = "big chances missed";
        break;
      case "goals-conceded":
        statCode = "goals conceded";
        break;
      default:
        return statCode;
    }

    const isStat = statCode === code?.toLowerCase();
    return isStat;
  });

  return stat?.data?.value ?? null;
};
