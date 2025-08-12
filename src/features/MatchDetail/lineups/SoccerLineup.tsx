import React from "react";
import GoalField from "../GoalField";
import {
  getEventTags,
  getPlayerRating,
  getRatingColor,
  getStatTags,
} from "../matchHelpers";
import { calculateAge } from "@/utils/generics";
import Link from "next/link";
import Image from "next/image";

const SoccerLineup = ({
  homeLineups,
  awayLineups,
  events,
  activeToggle,
  homePlayersHeight,
  homeFormationArray,
  awayFormationArray,
  awayPlayersHeight,
}) => {
  return (
    <div className="lg:h-[960px] md:h-[768px] h-[640px] relative border-[5px] border-[#006428] lineup-field-container w-full">
      <div className="absolute mt-0 left-1/2 -translate-x-1/2 w-1/2">
        <GoalField className="-mt-[5px]" />
      </div>
      <div className="player-field-container basis-full h-full flex flex-col justify-center divide-y-4 divide-[#006428]">
        <div className="basis-1/2 relative">
          {homeLineups
            .filter((lineup) => lineup.formation_field === "1:1")
            .map((lineup) => {
              const statTags = getStatTags(lineup);
              const eventTags = getEventTags(events, lineup.player?.id);
              const rating = getPlayerRating(lineup);
              const playerAge = calculateAge(lineup.player?.date_of_birth);

              return (
                <Link
                  href={`/player/${lineup.player?.id}`}
                  key={lineup.id}
                  className="z-10 absolute  transition duration-300 left-1/2 -translate-x-1/2 top-1 flex flex-col justify-center items-center text-white"
                >
                  {/* Player Image Container */}
                  <div className="relative">
                    <Image
                      width={512}
                      height={512}
                      unoptimized
                      src={lineup.player?.image_path}
                      alt={lineup.player?.name}
                      className="rounded-full w-14 object-cover h-auto bg-white"
                    />
                    {/* Event Tags */}
                    {eventTags.length > 0 && (
                      <div className="absolute left-0 top-1/2 -translate-x-[90%] -translate-y-1/2 flex flex-col gap-1">
                        {eventTags.map((tag, index) => (
                          <div
                            key={`event-${lineup.id}-${index}`}
                            className="flex items-center gap-1"
                          >
                            <span className="text-sm font-semibold text-white">
                              {tag.minute}&apos;
                            </span>
                            <Image
                              width={20}
                              height={20}
                              src={tag.icon}
                              alt="event"
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Stat Tags */}
                    {statTags.map((tag, index) => (
                      <div
                        key={`${lineup.id}-${tag.icon}-${index}`}
                        className={`absolute ${
                          tag.position === "top-center"
                            ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            : tag.position === "bottom-left"
                            ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                            : tag.position === "bottom-center"
                            ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                            : "top-0 right-0 translate-x-1/2 -translate-y-1/2"
                        }`}
                      >
                        {/* <Image
                          width={20}
                          height={20}
                          src={tag.icon}
                          alt={tag.icon}
                          className="w-6 h-6 object-contain"
                        /> */}
                      </div>
                    ))}

                    {/* Country Flag (Bottom Right) */}
                    {activeToggle === "country" && lineup.player?.country && (
                      <Image
                        width={20}
                        height={20}
                        unoptimized
                        src={lineup.player?.country.image_path}
                        alt={lineup.player?.country.name}
                        className="absolute -bottom-3 left-4 translate-x-1 translate-y-1 rounded-full border-white border-[1px] w-5 h-5 object-cover"
                      />
                    )}

                    {/* Rating (Top Right) */}
                    {activeToggle === "rating" && rating !== null && (
                      <span
                        className={`absolute top-4 -right-5 translate-x-2 w-8 h-5 ${getRatingColor(
                          rating
                        )} rounded-full text-xs flex items-center justify-center font-bold`}
                      >
                        {rating.toFixed(1)}
                      </span>
                    )}
                    {/* Age (Top Left) */}
                    {activeToggle === "age" && playerAge && (
                      <span className="absolute top-4 -right-5 translate-x-2 w-8 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold">
                        {playerAge}
                      </span>
                    )}
                  </div>

                  {/* Player Name and Number */}
                  <span className="text-sm text-center pt-3">
                    {lineup.jersey_number} {lineup.player?.lastname}{" "}
                  </span>
                </Link>
              );
            })}
          {homeLineups
            .filter((lineup) => lineup.formation_field !== "1:1")
            .map((lineup) => {
              const rowNumber = lineup.formation_field.split(":")[0];
              const currentCol = lineup.formation_field.split(":")[1];
              const columns = homeFormationArray[rowNumber - 2];
              const width = 100 / columns;
              const rating = getPlayerRating(lineup);
              const playerAge = calculateAge(lineup?.player?.date_of_birth);
              const statTags = getStatTags(lineup);
              const eventTags = getEventTags(events, lineup.player?.id);

              return (
                <Link
                  href={`/player/${lineup.player?.id}`}
                  key={lineup.id}
                  style={{
                    top: `${
                      homePlayersHeight * rowNumber - homePlayersHeight * 2 + 20
                    }%`,
                    left: `${width * currentCol - width}%`,
                    width: `${width}%`,
                    height: `${homePlayersHeight - rowNumber}%`,
                  }}
                  className="z-10 absolute  transition duration-300 flex flex-col justify-center items-center text-white"
                >
                  {/* Player Image Container */}
                  <div className="bg-white rounded-full relative">
                    <Image
                      width={512}
                      height={512}
                      unoptimized
                      src={lineup.player?.image_path}
                      alt={lineup.player?.name}
                      className="rounded-full w-14 object-cover h-auto"
                    />
                    {/* Event Tags */}
                    {eventTags.length > 0 && (
                      <div className="absolute -left-6 -bottom-1  flex flex-col gap-1">
                        {eventTags.map((tag, index) => (
                          <div
                            key={`event-${lineup.id}-${index}`}
                            className="flex items-center space-x-1"
                          >
                            <span className="text-xs font-semibold text-white">
                              {tag.minute}&apos;
                            </span>
                            <Image
                              width={20}
                              height={20}
                              src={tag.icon}
                              alt="event"
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Stat Tags */}
                    {statTags.map((tag, index) => (
                      <div
                        key={`${lineup.id}-${tag.icon}-${index}`}
                        className={`absolute ${
                          tag.position === "top-center"
                            ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            : tag.position === "bottom-left"
                            ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                            : tag.position === "bottom-center"
                            ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                            : tag.position === "middle-left"
                            ? "top-1/2 -left-1 -translate-x-1/2 -translate-y-1/2"
                            : tag.position === "top-left"
                            ? "-top-0 -left-2"
                            : tag.position === "top-right"
                            ? "-top-0 -right-1"
                            : "top-0 right-0 translate-x-1/2 -translate-y-1/2"
                        }`}
                      >
                        <Image
                          width={16}
                          height={16}
                          src={tag.icon}
                          alt={tag.icon}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                    ))}

                    {activeToggle === "country" && lineup.player?.country && (
                      <Image
                        width={20}
                        height={20}
                        unoptimized
                        src={lineup.player?.country.image_path}
                        alt={lineup.player?.country.name}
                        className="absolute -bottom-4 left-5 rounded-full border-white border-[1px] w-5 h-5 object-cover"
                      />
                    )}
                    {activeToggle === "rating" && rating !== null && (
                      <span
                        className={`absolute top-4 -right-5 translate-x-2 w-8 h-5 ${getRatingColor(
                          rating
                        )} rounded-full text-xs flex items-center justify-center font-bold`}
                      >
                        {rating.toFixed(1)}
                      </span>
                    )}
                    {activeToggle === "age" && playerAge && (
                      <span className="absolute top-4 -right-5 translate-x-2 w-8 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold">
                        {playerAge}
                      </span>
                    )}
                  </div>

                  {/* Player Name and Number */}
                  <span className="text-sm text-center max-w-[100px] pt-4">
                    {lineup.jersey_number} {lineup.player?.name}{" "}
                  </span>
                </Link>
              );
            })}
        </div>
        <div className="basis-1/2 relative">
          {awayLineups
            .filter((lineup) => lineup.formation_field === "1:1")
            .map((lineup) => {
              const rating = getPlayerRating(lineup);
              const playerAge = calculateAge(lineup.player?.date_of_birth);
              const statTags = getStatTags(lineup);
              const eventTags = getEventTags(events, lineup.player?.id);

              return (
                <Link
                  href={`/player/${lineup.player?.id}`}
                  key={lineup.id}
                  className="z-10 absolute  transition duration-300 h-20 left-1/2 -translate-x-1/2 bottom-1 justify-end flex flex-col  items-center text-white"
                >
                  <div className="bg-white rounded-full relative">
                    <Image
                      width={512}
                      height={512}
                      unoptimized
                      src={lineup.player?.image_path}
                      alt={lineup.player?.name}
                      className="rounded-full w-14 object-cover h-auto"
                    />
                    {/* Event Tags */}
                    {eventTags.length > 0 && (
                      <div className="absolute left-0 top-1/2 -translate-x-[90%] -translate-y-1/2 flex flex-col gap-1">
                        {eventTags.map((tag, index) => (
                          <div
                            key={`event-${lineup.id}-${index}`}
                            className="flex items-center space-x-1"
                          >
                            <span className="text-xs font-semibold text-white">
                              {tag.minute}&apos;
                            </span>
                            <Image
                              width={20}
                              height={20}
                              src={tag.icon}
                              alt="event"
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Stat Tags */}
                    {statTags.map((tag, index) => (
                      <div
                        key={`${lineup.id}-${tag.icon}-${index}`}
                        className={`absolute ${
                          tag.position === "top-center"
                            ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            : tag.position === "bottom-left"
                            ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                            : tag.position === "bottom-center"
                            ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                            : "top-0 right-0 translate-x-1/2 -translate-y-1/2"
                        }`}
                      >
                        <Image
                          width={16}
                          height={16}
                          src={tag.icon}
                          alt={tag.icon}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    ))}
                    {activeToggle === "country" && lineup.player?.country && (
                      <Image
                        width={20}
                        height={20}
                        unoptimized
                        src={lineup.player?.country.image_path}
                        alt={lineup.player?.country.name}
                        className="absolute -bottom-4 left-5 rounded-full border-white border-[1px] w-5 h-5 object-cover"
                      />
                    )}
                    {activeToggle === "rating" && rating !== null && (
                      <span
                        className={`absolute top-4 -right-5 translate-x-2 w-8 h-5 ${getRatingColor(
                          rating
                        )} rounded-full text-xs flex items-center justify-center font-bold`}
                      >
                        {rating.toFixed(1)}
                      </span>
                    )}
                    {activeToggle === "age" && playerAge && (
                      <span className="absolute top-4 -right-5 translate-x-2 w-8 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold">
                        {playerAge}
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-center pt-3">
                    {lineup.jersey_number} {lineup.player?.lastname}{" "}
                  </span>
                </Link>
              );
            })}
          {awayLineups
            .filter((lineup) => lineup.formation_field !== "1:1")
            .map((lineup) => {
              const rowNumber = lineup.formation_field.split(":")[0];
              const currentCol = lineup.formation_field.split(":")[1];
              const columns = awayFormationArray[rowNumber - 2];
              const width = 100 / columns;
              const rating = getPlayerRating(lineup);
              const playerAge = calculateAge(lineup.player?.date_of_birth);
              const statTags = getStatTags(lineup);
              const eventTags = getEventTags(events, lineup.player?.id);

              return (
                <Link
                  href={`/player/${lineup.player?.id}`}
                  key={lineup.id}
                  style={{
                    bottom: `${
                      awayPlayersHeight * rowNumber - awayPlayersHeight * 2 + 15
                    }%`,
                    left: `${width * currentCol - width}%`,
                    width: width + "%",
                    height: `${awayPlayersHeight - rowNumber}%`,
                  }}
                  className="z-10 absolute  transition duration-300 flex flex-col justify-center items-center text-white"
                >
                  <div className="bg-white rounded-full relative">
                    <Image
                      width={512}
                      height={512}
                      unoptimized
                      src={lineup.player?.image_path}
                      alt={lineup.player?.name}
                      className="rounded-full w-14  object-cover h-auto "
                    />
                    {/* Event Tags */}
                    {eventTags.length > 0 && (
                      <div className="absolute -left-8 bottom-0 flex flex-col gap-1">
                        {eventTags.map((tag, index) => (
                          <div
                            key={`event-${lineup.id}-${index}`}
                            className="flex items-center space-x-1"
                          >
                            <span className="text-xs font-semibold text-white">
                              {tag.minute}&apos;
                            </span>
                            <Image
                              width={20}
                              height={20}
                              src={tag.icon}
                              alt="event"
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Stat Tags */}
                    {statTags.map((tag, index) => (
                      <div
                        key={`${lineup.id}-${tag.icon}-${index}`}
                        className={`absolute ${
                          tag.position === "top-center"
                            ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            : tag.position === "bottom-left"
                            ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                            : tag.position === "bottom-center"
                            ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                            : tag.position === "middle-left"
                            ? "top-1/2 -left-1 -translate-x-1/2 -translate-y-1/2"
                            : tag.position === "top-left"
                            ? "-top-0 -left-2"
                            : tag.position === "top-right"
                            ? "-top-0 -right-1"
                            : "top-0 right-0 translate-x-1/2 -translate-y-1/2"
                        }`}
                      >
                        {/* <Image
                          width={16}
                          height={16}
                          src={tag.icon}
                          alt={tag.icon}
                          className="w-5 h-5 object-contain"
                        /> */}
                      </div>
                    ))}
                    {activeToggle === "country" && lineup.player?.country && (
                      <Image
                        width={20}
                        height={20}
                        unoptimized
                        src={lineup.player?.country.image_path}
                        alt={lineup.player?.country.name}
                        className="absolute -bottom-4 left-5 rounded-full border-white border-[1px] w-5 h-5 object-cover"
                      />
                    )}
                    {activeToggle === "rating" && rating !== null && (
                      <span
                        className={`absolute top-4 -right-5 translate-x-2 w-8 h-5 ${getRatingColor(
                          rating
                        )} rounded-full text-xs flex items-center justify-center font-bold`}
                      >
                        {rating.toFixed(1)}
                      </span>
                    )}
                    {activeToggle === "age" && playerAge && (
                      <span className="absolute top-4 -right-5 translate-x-2 w-8 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold">
                        {playerAge}
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-center pt-4 max-w-[100px]">
                    {lineup.jersey_number} {lineup.player?.name}{" "}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="goal-field-container absolute left-1/2 bottom-0 -translate-x-1/2 w-1/2">
        <GoalField className="-mb-[5px] rotate-180" />
      </div>
    </div>
  );
};

export default SoccerLineup;
