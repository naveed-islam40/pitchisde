import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CardCompetition({ league }) {
  const [favourite, setFavourite] = useState(false);

  const toggleFavourite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFavourite(!favourite);
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      // If no user data exists, create new with this league as favorite
      localStorage.setItem(
        "user",
        JSON.stringify({ favourites: { leagues: [league.id] } })
      );
    } else {
      const userJSON = JSON.parse(localUser);
      const currentLeagues = userJSON.favourites?.leagues || [];

      const updatedLeagues = currentLeagues.includes(league.id)
        ? currentLeagues.filter((id) => id !== league.id)
        : [...currentLeagues, league.id];

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userJSON,
          favourites: {
            ...userJSON.favourites,
            leagues: updatedLeagues,
          },
        })
      );
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const userJSON = JSON.parse(localUser);
      const { favourites } = userJSON;
      const { leagues } = favourites || {};
      if (leagues?.length) {
        if (leagues.find((match) => match === league.id)) setFavourite(true);
      }
    }
  }, [league]);

  return (
    <Link
      href={`/league/${league.id}/overview`}
      className="flex gap-2 items-center px-4 py-2 hover:bg-dark/10 transition duration-200"
    >
      <Image
        width={100}
        height={100}
        src={league.image_path}
        className="size-7"
        alt={league.name}
      />
      <p className="text-base font-semibold text-dark whitespace-nowrap">
        {league.name}
      </p>
      <button
        type="button"
        onClick={(e) => toggleFavourite(e)}
        className="ml-auto"
      >
        {favourite ? (
          <IconStarFilled size={20} className="text-warning" />
        ) : (
          <IconStar size={20} className="text-dark/70" />
        )}
      </button>
    </Link>
  );
}