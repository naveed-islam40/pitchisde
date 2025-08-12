function DisciplineRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Fouls":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 56)?.data.value || 0}
        </td>
      );
    case "Yellow Cards":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 84)?.data.value || 0}
        </td>
      );
    case "Red Cards":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 83)?.data.value || 0}
        </td>
      );
    case "Second Yellow":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 85)?.data?.value || 0}
        </td>
      );
    case "Offside":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 51)?.data?.value || 0}
        </td>
      );
    case "Offside Provoked":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 95)?.data?.value || 0}
        </td>
      );
    default:
      return null;
  }
}

export default DisciplineRow;
