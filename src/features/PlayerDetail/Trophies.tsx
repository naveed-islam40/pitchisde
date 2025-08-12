import { Block } from "@/components/Block";
import Image from "next/image";

function Trophy({ team }) {
  const { team: teamDetails, items: trophies } = team;
  const filteredTrophies = trophies.filter(
    (trophy) => trophy.league && trophy.trophy_id === 1
  );
  return (
    <div className="  text-dark py-2">
      <header className="flex items-center gap-x-3 px-4">
        <Image
          src={`${teamDetails.image_path}`}
          className="w-12 h-auto"
          width={250}
          height={250}
          alt={teamDetails.name}
        />
        <div>
          <h2 className="font-bold text-fine">{teamDetails.name}</h2>
          {teamDetails.type === "domestic" && (
            <p className="text-xs font-medium">{teamDetails.country.name}</p>
          )}
        </div>
      </header>

      {filteredTrophies?.length ? (
        <ul className="space-y-2 font-medium pl-[4rem] pt-4 text-sm">
          {filteredTrophies.map((trophy, idx) => (
            <li key={idx} className="flex items-center">
              <Image
                src={trophy.league?.image_path}
                width={250}
                height={250}
                className="mx-1.5 w-6 h-auto"
                alt={trophy?.league?.name}
              />
              {trophy.league?.name}{" "}
              <strong className="ml-1">({trophy.season?.name})</strong>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Trophies({ trophies }) {
  const trophiesGroupedByTeam = trophies.length ? groupByTeam(trophies) : [];
  return (
    <Block padding={false} showNextButton={false} title="Trophies">
      <div className="divide-y px-4">
        {trophiesGroupedByTeam?.length
          ? trophiesGroupedByTeam.map((team: any) => (
              <Trophy key={team.team_id} team={team} />
            ))
          : "No Trophies"}
      </div>
    </Block>
  );
}

function groupByTeam(data) {
  return Object.values(
    data.reduce((acc, item) => {
      const { team_id } = item;

      if (!acc[team_id]) {
        acc[team_id] = {
          team_id,
          team: item.team,
          items: [],
        };
      }

      acc[team_id].items.push(item);
      return acc;
    }, {})
  );
}
