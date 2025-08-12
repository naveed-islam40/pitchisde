function BattleRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Interceptions":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 66)?.data.value || 0}
        </td>
      );
    case "Tackles":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 78)?.data.value || 0}
        </td>
      );
    case "Dispossessions":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 94)?.data.value || 0}
        </td>
      );
    case "Fouls Drawn":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 96)?.data.value || 0}
        </td>
      );
    case "Duels":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 106)?.data?.value || 0}/
          {playerStats.find((stat) => stat.type_id === 105)?.data?.value || 0} (
          {playerStats.find((stat) => stat.type_id === 106)?.data?.value /
          playerStats.find((stat) => stat.type_id === 105)?.data?.value
            ? (
                (playerStats.find((stat) => stat.type_id === 106)?.data?.value /
                  playerStats.find((stat) => stat.type_id === 105)?.data
                    ?.value) *
                100
              )?.toFixed(0)
            : 0}
          {""}
          %)
        </td>
      );
    case "Aerials":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 107)?.data?.value || 0}
        </td>
      );
    case "Dribbles":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 109)?.data?.value || 0}/
          {playerStats.find((stat) => stat.type_id === 108)?.data?.value || 0} (
          {playerStats.find((stat) => stat.type_id === 1605)?.data?.value || 0}
          {""}
          %)
        </td>
      );
    default:
      return null;
  }
}

export default BattleRow;
