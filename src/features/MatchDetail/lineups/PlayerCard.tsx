import React from "react";
import {
  getEventTags,
  getPlayerRating,
  getRatingColor,
  getStatTags,
} from "../matchHelpers";
import { calculateAge } from "@/utils/generics";
import Link from "next/link";
import Image from "next/image";

const PlayerCard = ({ substitutes, events, activeToggle }) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
      {substitutes?.map((substitute) => {
        const rating = getPlayerRating(substitute);
        const playerAge = calculateAge(substitute.player.date_of_birth);
        const statTags = getStatTags(substitute);
        const eventTags = getEventTags(events, substitute.player.id);
        return (
          <Link
            href={`/player/${substitute.player.id}`}
            key={substitute.id}
            className="flex flex-col justify-center items-center text-white"
          >
            <div className="bg-white rounded-full relative">
              <Image
                width={512}
                height={512}
                unoptimized
                src={substitute.player.image_path}
                alt={substitute.player.name}
                className=" w-14 rounded-full object-cover h-auto"
              />
              {/* Event Tags */}
              {eventTags.length > 0 && (
                <div className="absolute -left-0 bottom-0 flex flex-col gap-1">
                  {eventTags.map((tag, index) => (
                    <div key={`event-${substitute.id}-${index}`}>
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
                  key={`${substitute.id}-${tag.icon}-${index}`}
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
              {activeToggle === "country" && substitute.player.country && (
                <Image
                  width={20}
                  height={20}
                  unoptimized
                  src={substitute.player.country.image_path}
                  alt={substitute.player.country.name}
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
            <span className="text-xs text-center max-w-[100px] pt-4">
              {substitute?.player?.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default PlayerCard;
