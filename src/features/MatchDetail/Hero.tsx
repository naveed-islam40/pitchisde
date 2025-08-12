import MyXiIcon from "@/components/DetailView/MyXIIcon";
import { useFixture } from "@/contexts/Fixture/FixtureContext";
import {
  IconBuildingStadium,
  IconHash,
  IconUsersGroup,
} from "@tabler/icons-react";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { BiFootball } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { GiWhistle } from "react-icons/gi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiBellSimpleFill } from "react-icons/pi";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

function Action({ name, icon }) {
  return (
    <div className="group flex cursor-pointer flex-row-reverse items-center gap-x-4">
      {icon}
      <button className="text-right font-semibold group-hover:underline">
        {name}
      </button>
    </div>
  );
}

function Actions() {
  return (
    <div className="row-span-2 hidden space-y-2 md:block">
      <Action name="CreatePITCHSIDE" icon={<MyXiIcon className="w-6 h-6" />} />
      <Action name="Follow" icon={<FaRegStar className="w-6 h-6" />} />
      <Action
        name="Notifications"
        icon={<PiBellSimpleFill className="w-6 h-6" />}
      />
      <Action
        name="Sync Calendar"
        icon={<MdOutlineCalendarToday className="w-6 h-6" />}
      />
    </div>
  );
}

export function Hero() {
  const fixture: any = useFixture();

  const {
    league,
    participants,
    scores,
    state,
    starting_at,
    result_info,
    round,
    stage,
    events,
    venue,
    metadata,
    referees,
  } = fixture.data;

  const currentScores = scores.filter(
    (score: any) => score.description === "CURRENT"
  );

  const homeTeam = participants.find((team) => team.meta.location === "home");
  const awayTeam = participants.find((team) => team.meta.location === "away");

  const homeTeamScore = currentScores.find(
    (score: any) => score.participant_id === homeTeam.id
  );
  const awayTeamScore = currentScores.find(
    (score: any) => score.participant_id === awayTeam.id
  );

  const matchDateTime = dayjs(starting_at).format("dddd, D MMM YYYY - H:mm");
  const matchTime = dayjs(starting_at).format("hh:mm A");

  const homeTeamGoals = events
    .filter((event) => event.participant_id === homeTeam.id)
    .filter((event) => [14, 15, 16].includes(event.type_id));

  const awayTeamGoals = events
    .filter((event) => event.participant_id === awayTeam.id)
    .filter((event) => [14, 15, 16].includes(event.type_id));

  const attendance = metadata.find((item) => item.type_id === 578)?.values;
  const referee = referees.find((item) => item.type_id === 6)?.referee;
  const hashTags = metadata.find((item) => item.type_id === 613)?.values;

  const hasStarted = state.state !== "NS";

  return (
    <div
      className={clsx(
        "relative app-block",
        "p-6 rounded-3xl",
        "bg-white text-dark",
        "font-semibold"
      )}
    >
      <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <IconBuildingStadium />
            <a
              href={`https://www.google.com/maps?q=${venue?.latitude},${venue?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <span>{venue?.name}</span>
            </a>
          </li>
          {attendance && (
            <li className="flex items-center gap-2">
              <IconUsersGroup />
              <span>{attendance.attendance}</span>
            </li>
          )}
          {referee && (
            <li className="flex items-center gap-2">
              <GiWhistle size={24} />
              <span>{referee?.name}</span>
            </li>
          )}
          {hashTags && (
            <li className="flex items-center gap-2">
              <IconHash />
              <span>{hashTags}</span>
            </li>
          )}
        </ul>

        <div>
          <div className="flex items-center justify-center">
            <Image
              width={150}
              height={150}
              src={league.image_path}
              className="mr-1.5 w-6"
              alt={`${league.title} Logo`}
            />
            <p>{`${league.name} -  ${
              round
                ? `Matchweek ${round.name}`
                : stage
                ? `Round of ${stage.name}`
                : null
            }`}</p>
          </div>
          <div className="mt-6 flex flex-col sm:grid grid-cols-[1fr,8rem,1fr] gap-4 justify-center text-2xl font-bold justify-items-center ">
            <div className="w-full">
              <div className="flex gap-4 items-center">
                <h2 className="flex-1 text-right">{homeTeam.name}</h2>
                <div>
                  <Image
                    height={250}
                    width={250}
                    src={homeTeam.image_path}
                    className=" w-12"
                    alt={`${homeTeam.name} Logo`}
                  />
                </div>
              </div>
              <div className="text-base mt-6">
                {homeTeamGoals.map((event) => (
                  <p key={event.id} className="text-right">
                    {`${event.player.display_name}  ${event.minute}'${
                      event.extra_minute ? `+${event.extra_minute}` : ""
                    }  ${
                      event.type_id === 15
                        ? `(OG)`
                        : event.type_id === 16
                        ? "(Pen)"
                        : ""
                    }`}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className=" text-4xl text-center whitespace-nowrap">
                {`${homeTeamScore?.score?.goals} - ${awayTeamScore?.score?.goals}`}
              </p>
              <p className="text-center text-base">{state.name}</p>
              <div className="mt-2">
                <BiFootball size={20} className="mx-auto" />
              </div>
            </div>
            <div className="w-full">
              <div className="flex gap-4 items-center">
                <Image
                  height={250}
                  width={250}
                  src={awayTeam.image_path}
                  className=" w-12"
                  alt={`${awayTeam.name} Logo`}
                />
                <h2 className="flex-1">{awayTeam.name}</h2>
              </div>
              <div className="text-base mt-6">
                {awayTeamGoals.map((event) => (
                  <p key={event.id} className=" text-neutral-700">
                    {`${event.player.lastname} ${event.minute}'${
                      event.extra_minute ? `+${event.extra_minute}` : ""
                    } ${
                      event.type_id === 15
                        ? `(OG)`
                        : event.type_id === 16
                        ? "(Pen)"
                        : ""
                    }`}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3">
            {result_info ? <p className="text-center">{result_info}</p> : null}

            <p className="text-center">{matchDateTime}</p>
          </div>
        </div>

        <div>
          <Actions />
        </div>
      </div>
    </div>
  );
}
