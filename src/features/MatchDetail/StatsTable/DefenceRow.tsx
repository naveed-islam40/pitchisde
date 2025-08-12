function DefenseRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Ball Safe":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 46)?.data.value || 0}
        </td>
      );
    case "Goals Conceded":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 88)?.data.value || 0}
        </td>
      );
    case "Blocked Shots":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 97)?.data.value || 0}
        </td>
      );
    case "Interceptions":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 100)?.data?.value || 0}
        </td>
      );
    case "Clearances":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 101)?.data?.value || 0}
        </td>
      );
    case "Error Lead to Goal":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 571)?.data?.value || 0}
        </td>
      );

    case "Line Clearances":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 582)?.data?.value || 0}
        </td>
      );
    case "Last Man Tackle":
      return (
        <td className={className}>
          {playerStats.find((stat) => stat.type_id === 583)?.data?.value || 0}
        </td>
      );
    default:
      return null;
  }
}

export default DefenseRow;
