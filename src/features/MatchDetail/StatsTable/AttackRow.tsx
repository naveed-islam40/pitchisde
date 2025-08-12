function AttackRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Goals":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 52)?.data.value || 0}
        </td>
      );
    case "Key Passes":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 117)?.data.value || 0}
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
    case "Crosses":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 99)?.data?.value || 0}/
          {playerStats.find((stat) => stat.type_id === 98)?.data?.value || 0} (
          {playerStats.find((stat) => stat.type_id === 1533)?.data?.value || 0}
          {""}
          %)
        </td>
      );
    case "Big Chances Created":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 580)?.data?.value || 0}
        </td>
      );
    case "Big Chances Missed":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 581)?.data?.value || 0}
        </td>
      );
    case "Hit Woodwork":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 64)?.data?.value || 0}
        </td>
      );

    default:
      return null;
  }
}

export default AttackRow;
