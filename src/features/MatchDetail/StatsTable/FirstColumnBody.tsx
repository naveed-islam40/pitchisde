import { calculateAge } from "@/utils/generics";

const FirstColumnBody = ({ activeToggle, playerStats, lineups }) => {
  let content;

  if (activeToggle === "rating") {
    content = playerStats.find((stat) => stat.type_id === 118)?.data.value;
  } else if (activeToggle === "age") {
    const player = lineups?.find((stat) => stat?.player?.date_of_birth);
    content = player ? calculateAge(player.player.date_of_birth) : 0;
  } else {
    const country = lineups?.find((stat) => stat?.player?.country?.iso2)?.player
      .country.iso2;
    content = country ? country : "";
  }

  return (
    <td
      scope="row"
      className="px-2 w-48 text-wrap font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 sticky left-0 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-gray-300 dark:after:bg-gray-700"
    >
      <div className="flex gap-2 justify-center">{content}</div>
    </td>
  );
};

export default FirstColumnBody;
