function OverallRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Rating":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 118)?.data.value || 0}
        </td>
      );
    case "Minutes":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 119)?.data.value || 0}
        </td>
      );
    case "Goals":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 52)?.data.value || 0}
        </td>
      );
    case "xG":
      return (
        <td className={className}>
          {playerStats
            .find((stat) => stat.type_id === 5304)
            ?.data?.value?.toFixed(1) || 0}
        </td>
      );
    case "Assists":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 79)?.data?.value || 0}
        </td>
      );
    case "Shots":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 86)?.data?.value || 0}/
          {playerStats.find((stat) => stat.type_id === 42)?.data?.value || 0} (
          {playerStats.find((stat) => stat.type_id === 9682)?.data?.value || 0}
          {""}
          %)
        </td>
      );
    case "Passes":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 81)?.data?.value || 0}/
          {playerStats.find((stat) => stat.type_id === 80)?.data?.value || 0} (
          {playerStats.find((stat) => stat.type_id === 82)?.data?.value || 0}
          {""}
          %)
        </td>
      );
    case "Touches":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 120)?.data?.value || 0}
        </td>
      );

    default:
      return null;
  }
}

export default OverallRow;
