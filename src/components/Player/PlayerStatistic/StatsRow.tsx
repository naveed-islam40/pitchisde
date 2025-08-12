function StatsRow({ stat }) {
  const statName = (name: string) => {
    switch (name) {
      case "On Target / Total Shots (%)":
        return "Shots";
      case "Long Balls Won / Total (%)":
        return "Long Balls";
      case "Accurate / Total Crosses (%)":
        return "Crosses";
      case "Duels Won / Total (%)":
        return "Duels";
      case "Successful / Attempted Dribbles (%)":
        return "Dribbles";
      default:
        return name;
    }
  };
  return (
    <tr className=" font-medium text-gray-700">
      {stat.map((value, index) => (
        <td className="py-2" key={index}>
          {statName(value)}
        </td>
      ))}
    </tr>
  );
}

export default StatsRow;
