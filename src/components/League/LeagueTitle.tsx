import { useLeague } from "@/contexts/League/LeagueContext";
import Image from "next/image";

import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function LeagueTitle() {
  const league: any = useLeague();

  if (!league) return null;

  const data = league.data;

  const { country } = data;

  return (
    <div className="flex h-full items-center gap-x-5 text-dark">
      <Image
        width={250}
        height={250}
        className="object-contain w-20 h-20"
        src={data.image_path}
        alt={data.name}
      />

      <div>
        <h2 className="xs:text-xl text-lg font-semibold sm:text-xl font-display ">
          {data.name}
        </h2>
        <div className="mt-1.5 flex items-center gap-x-2">
          <Image
            width={600}
            height={512}
            src={country.image_path}
            className="rounded-full object-cover aspect-square w-8"
            alt={country.name}
          />
          <p className="text-sm font-semibold sm:text-base ">{country.name}</p>
        </div>
        <SeasonSelect />
      </div>
    </div>
  );
}

function SeasonSelect() {
  const league: any = useLeague();

  const router = useRouter();
  const { pathname, query } = router;

  if (!league) return null;

  const data = league?.data;

  if (!data) return null;

  const { seasons } = data;

  const sortedSeasons =
    seasons?.sort((a, b) => b.name.localeCompare(a.name)) || [];

  const handleChangeSeason = (value) => {
    router.push({ pathname, query: { ...query, season: value } }, undefined, {
      shallow: true,
    });
  };

  const selectedSeason = query.season
    ? sortedSeasons.find((season) => season.id === Number(query.season))
    : sortedSeasons.find((season) => season.is_current);

  const selectedValue =
    selectedSeason || sortedSeasons.find((season) => !season.is_current) || {};

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue.id || ""}>
      <SelectTrigger className="w-20 text-sm px-0 border-0 bg-transparent font-display text-dark  focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder={selectedValue.name || "Select Season"} />
      </SelectTrigger>
      <SelectContent position="popper">
        {sortedSeasons.map(({ id, name }) => (
          <SelectItem key={id} className="py-1 pr-1 font-display" value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
