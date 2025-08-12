function GoalkeepingRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Saves":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 57)?.data.value || 0}
        </td>
      );
    case "Come Outs":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 76)?.data.value || 0}
        </td>
      );
    case "Goals Conceded":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 88)?.data.value || 0}
        </td>
      );
    case "Punches":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 103)?.data?.value || 0}
        </td>
      );
    case "Penalities Saved":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 113)?.data?.value || 0}
        </td>
      );
    case "High Claim":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 184)?.data?.value || 0}
        </td>
      );
    case "Error Lead to Goals":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 571)?.data?.value || 0}
        </td>
      );
    case "xGP":
      return (
        <td className={className}>
          {playerStats
            .find((stat) => stat.type_id === 9686)
            ?.data?.value?.toFixed(1) || 0}
        </td>
      );
    default:
      return null;
  }
}

export default GoalkeepingRow;
