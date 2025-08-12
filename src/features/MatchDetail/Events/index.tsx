import clsx from "clsx";
import Link from "next/link";
import { BsBandaidFill } from "react-icons/bs";
import Image from "next/image";

const GoalEvent = ({ event, home }) => {
  return (
    <div className="">
      <div
        className={clsx(
          "px-10 py-3 w-11/12 rounded-full  shadow-black/25 bg-white",
          home ? "mr-auto" : "ml-auto"
        )}
      >
        <div
          className={clsx(
            "flex items-center gap-2",
            home ? "" : " flex-row-reverse"
          )}
        >
          <h3 className="font-semibold text-xl text-x-darkgreen">
            {`${event.minute}'${
              event.extra_minute ? `+${event.extra_minute}` : ""
            }`}
          </h3>
        </div>
        <div
          className={clsx(
            "flex items-center gap-2 space-y-1",
            home ? "" : " flex-row-reverse"
          )}
        >
          {/* <IoFootball
            className={clsx(
              "w-8 h-8",
              event.type.code === "owngoal" ? "fill-red-500" : "fill-[#006428]"
            )}
          /> */}
          <Image
            src={
              event.type.code === "owngoal"
                ? "/mig/icons/Asset 2.png"
                : "/mig/icons/Asset 1.png"
            }
            alt=""
            height={20}
            width={20}
          />
          <div className={home ? "text-left" : "text-right"}>
            <h3 className="font-semibold text-x-darkgreen">
              <Link
                href={`/player/${event.player_id}`}
                className="hover:underline"
              >
                {event.player_name}
                <span> ({event.result}) </span>
              </Link>
            </h3>

            {event.related_player_name ? (
              <h6 className="text-gray-600 text-sm">
                {event.info !== "Shot" ? `${event.info},` : ""}
                {` Assist: ${event.related_player_name}`}
              </h6>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
const YellowCardEvent = ({ event, home }) => {
  return (
    <div className="">
      <div
        className={clsx(
          "px-10 py-3 w-11/12 rounded-full  shadow-black/25 bg-white",
          home ? "mr-auto" : "ml-auto"
        )}
      >
        <div
          className={clsx(
            "flex items-center gap-2",
            home ? "flex-row-reverse justify-end" : "justify-end"
          )}
        >
          <div className={home ? "text-left" : "text-right"}>
            <Link
              href={`/player/${event.player_id}`}
              className="hover:underline font-semibold"
            >
              {event.player_name}
            </Link>
            <p className="text-sm">{event.info}</p>
          </div>
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="19" height="19" rx="9.5"></rect>
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="9.5"
              stroke="var(--EventIcons-borderColor)"
            ></rect>
            <g clipPath="url(#clip0_7632_41880)">
              <path
                d="M12.9092 2.96924H7.091C5.88601 2.96924 4.90918 3.94607 4.90918 5.15106V14.8478C4.90918 16.0528 5.88601 17.0296 7.091 17.0296H12.9092C14.1142 17.0296 15.091 16.0528 15.091 14.8478V5.15106C15.091 3.94607 14.1142 2.96924 12.9092 2.96924Z"
                fill="#FFC000"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_7632_41880">
                <rect
                  width="16"
                  height="16"
                  fill="transparent"
                  transform="translate(2 2)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          <h3 className="font-semibold text-xl text-x-darkgreen">
            {event.minute}&apos;
          </h3>
        </div>
      </div>
    </div>
  );
};
const RedCardEvent = ({ event, home }) => {
  return (
    <div className="drop-shadow-xl">
      <div
        className={clsx(
          "px-10 py-3 w-11/12 rounded-full  shadow-black/25 bg-white",
          home ? "mr-auto" : "ml-auto"
        )}
      >
        <div
          className={clsx(
            "flex items-center",
            home ? "flex-row-reverse justify-end" : "justify-end"
          )}
        >
          <div className={home ? "text-left" : "text-right"}>
            <Link
              href={`/player/${event.player_id}`}
              className="hover:underline font-semibold"
            >
              {event.player_name}
            </Link>
            <p className="text-sm">{event.info}</p>
          </div>
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="19" height="19" rx="9.5"></rect>
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="9.5"
              stroke="var(--EventIcons-borderColor)"
            ></rect>
            <g clipPath="url(#clip0_7632_41880)">
              <path
                d="M12.9092 2.96924H7.091C5.88601 2.96924 4.90918 3.94607 4.90918 5.15106V14.8478C4.90918 16.0528 5.88601 17.0296 7.091 17.0296H12.9092C14.1142 17.0296 15.091 16.0528 15.091 14.8478V5.15106C15.091 3.94607 14.1142 2.96924 12.9092 2.96924Z"
                fill="red"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_7632_41880">
                <rect
                  width="16"
                  height="16"
                  fill="transparent"
                  transform="translate(2 2)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          <h3 className="font-semibold text-xl text-x-darkgreen">
            {event.minute}&apos;
          </h3>
        </div>
      </div>
    </div>
  );
};

const SubstituteEvent = ({ event, home }) => {
  return (
    <div className="">
      <div
        className={clsx(
          "px-10 py-3 w-11/12 rounded-full  shadow-black/25 bg-white",
          home ? "mr-auto" : "ml-auto"
        )}
      >
        <div
          className={clsx(
            "flex items-center gap-2",
            home ? "flex-row" : "flex-row-reverse"
          )}
        >
          <h3 className="font-semibold text-xl text-x-darkgreen">
            {event.minute}&apos;
          </h3>

          <div className="space-y-2">
            <div
              className={clsx(
                "flex gap-1 items-center",
                home ? "" : "justify-start flex-row-reverse"
              )}
            >
              {home ? (
                // <FaChevronLeft className="w-5 h-5 fill-green-500" />
                <Image
                  src={"/mig/icons/Asset 6.png"}
                  alt="Chevron"
                  height={20}
                  width={20}
                />
              ) : (
                <Image
                  src={"/mig/icons/Asset 6.png"}
                  alt="Chevron"
                  height={20}
                  width={20}
                />
                // <FaChevronRight className="w-5 h-5 fill-green-500" />
              )}
              <Link
                href={`/player/${event.related_player_id}`}
                className={clsx(
                  "hover:underline flex items-center gap-2",
                  home ? "flex-row" : "flex-row-reverse"
                )}
              >
                <span>{event.player_name}</span>
                {event.injured ? (
                  <span>
                    <BsBandaidFill className="w-4 h-4 fill-red-600 inline-block" />
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </div>
            <div
              className={clsx(
                "flex gap-1 items-center",
                home ? "" : "justify-start flex-row-reverse"
              )}
            >
              {home ? (
                // <FaChevronLeft className="w-5 h-5 fill-green-500" />
                <Image
                  src={"/mig/icons/Asset 5.png"}
                  alt="Chevron"
                  height={20}
                  width={20}
                />
              ) : (
                <Image
                  src={"/mig/icons/Asset 5.png"}
                  alt="Chevron"
                  height={20}
                  width={20}
                />
                // <FaChevronRight className="w-5 h-5 fill-green-500" />
              )}
              <Link
                href={`/player/${event.player_id}`}
                className="hover:underline"
              >
                {event.related_player_name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GoalEvent, YellowCardEvent, SubstituteEvent, RedCardEvent };
