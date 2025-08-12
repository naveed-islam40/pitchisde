import { PresenterPropsR } from "@/utils/types";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";

function TeamSide({ label, icon }: PresenterPropsR) {
  return (
    <div className="flex mx-auto max-w-40 flex-col items-center space-y-2">
      <Image
        unoptimized
        src={icon}
        width={512}
        height={512}
        className="w-10"
        alt={label}
      />
      <p title={label} className="text-center max-w-40 truncate text-xs font-bold text-x-grey-1 w-max">{label}</p>
    </div>
  );
}

export function ScheduledMatch({ fixture }) {
  const { participants, league, meta } = fixture || {};
  const [homeTeam, awayTeam] = participants || [];

  return (
    <div
      className={clsx(
        "grid grid-cols-[1fr,4rem,1fr] justify-center",
        meta?.location === "away" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <TeamSide label={homeTeam.name} icon={homeTeam.image_path} />
      <div className="text-center space-y-4">
        <Image
          src={league.image_path}
          width={512}
          height={512}
          className="w-7 mx-auto"
          alt={league.name}
        />
        <h6 className="text-xs font-semibold">
          {format(fixture.starting_at, "dd MMM")}
        </h6>
      </div>
      <TeamSide label={awayTeam.name} icon={awayTeam.image_path} />
    </div>
  );
}
