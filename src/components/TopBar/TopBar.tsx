import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Drawer from "react-modern-drawer";
import SearchBox from "../SearchBox";

import {
  IconBellFilled,
  IconMenu2,
  IconMessageCircleQuestion,
  IconScoreboard,
  IconSettings,
  IconSoccerField,
  IconStarFilled,
  IconSwords,
  IconX,
} from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useFixtureById from "@/features/Fixtures/useFixtureById";
import dayjs from "dayjs";
import useClient from "@/hooks/useClient";

function LeftDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <button onClick={open} className="feedback rounded-lg p-3">
        <IconMenu2 />
      </button>
      {client &&
        createPortal(
          <Drawer
            open={isOpen}
            onClose={close}
            direction="left"
            overlayOpacity={0.6}
            duration={200}
            className="font-display"
            lockBackgroundScroll
          >
            <div className="h-full flex flex-col  bg-primary p-4 text-white">
              <header className="flex items-center justify-between ">
                <Image
                  width={256}
                  height={96}
                  src="/pitchside-logo-white.png"
                  className="w-32"
                  alt="PitchSide Logo"
                />
                <button onClick={close} className="feedback p-2">
                  <IconX />
                </button>
              </header>

              <div className="mt-20 space-y-2">
                <Link
                  href={"/"}
                  className=" flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10"
                >
                  <IconScoreboard size={32} />
                  <span className="text-lg font-bold uppercase italic font-display">
                    PITCHSIDE
                  </span>
                </Link>
                <Link
                  href={"/create"}
                  className=" flex items-center gap-x-5 rounded-lg px-2 py-2.5 hover:bg-light/10"
                >
                  <IconSoccerField size={32} />
                  <span className="text-lg font-sans">
                    Create
                    <span className="font-bold font-display italic">
                      PITCHSIDE
                    </span>
                  </span>
                </Link>
                <Link
                  href={"/play"}
                  className=" flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10"
                >
                  <IconSwords size={32} />
                  <span className="text-lg font-sans">
                    Play
                    <span className="font-bold font-display italic">
                      PITCHSIDE
                    </span>
                  </span>
                </Link>
              </div>
              <div className="mt-auto">
                <button className="w-full flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10">
                  <IconMessageCircleQuestion size={32} />
                  <p className="text-lg font-bold">Contact Us</p>
                </button>
                <button className="w-full flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10">
                  <IconSettings size={32} />
                  <p className="text-lg font-bold">Settings</p>
                </button>
              </div>
            </div>
          </Drawer>,
          document.getElementById("main") || document.body
        )}
    </>
  );
}

export function TopBar() {
  const client = useClient();
  return (
    <div
      className={clsx(
        "max-w-screen-2xl mx-auto relative flex items-center justify-between bg-primary px-5 py-5 text-white"
      )}
    >
      <div className="flex gap-x-4">
        <LeftDrawer />
        <Link href={"/"}>
          <Image
            width={256}
            height={96}
            src="/pitchside-logo-white.png"
            alt="PitchSide Logo"
            className="w-32 h-auto"
          />
        </Link>
      </div>
      <SearchBox />
      <div className="flex items-center gap-x-1 lg:gap-x-6">
        <div className="pr-4 border-r border-light">
          <Link href={"/about-us"} className="text-lg font-semibold">
            Who we are{" "}
          </Link>
        </div>
        <IconStarFilled className="text-warning" />
        {client && <NotificationsPopover />}

        <Image
          width={250}
          height={250}
          src="/mig/user.png"
          className="size-12 rounded-full object-cover"
          alt="User Profile"
        />
      </div>
    </div>
  );
}

function NotificationsPopover() {
  const [fixtureIds, setFixtureIds] = useState([]);
  useEffect(() => {
    const fetchUserMatches = () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const userJSON = JSON.parse(localUser);
        const { notify } = userJSON;
        const { matches } = notify || {};
        if (matches?.length) {
          setFixtureIds(matches);
        }
      }
    };

    fetchUserMatches();

    const intervalId = setInterval(fetchUserMatches, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Popover>
      <PopoverTrigger className="rounded-full hover:bg-primary-light data-[state=open]:bg-primary-light p-1">
        <IconBellFilled className="text-warning" />
      </PopoverTrigger>
      <PopoverContent className=" px-0" align="end">
        {!fixtureIds.length && (
          <div className="h-40 flex items-center justify-center">
            <p className="text-center text-lg">No match added</p>
          </div>
        )}
        {fixtureIds?.map((fixture) => (
          <FixtureRow key={fixture} fixtureId={fixture} />
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function FixtureRow({ fixtureId }: { fixtureId: any }) {
  const { fixture, isLoading } = useFixtureById({ id: fixtureId });
  if (isLoading)
    return (
      <div className="h-5 animate-pulse bg-dark/20 overflow-hidden my-2"></div>
    );

  if (!fixture) return null;

  const { participants, starting_at, id, league } = fixture?.data;
  const homeTeam = participants.find((p) => p.meta.location === "home");
  const awayTeam = participants.find((p) => p.meta.location === "away");
  const time = dayjs(starting_at).format("hh:mm a");

  return (
    <Link
      href={`/match/${id}`}
      className="border-b py-2 text-sm flex gap-2 divide-x hover:bg-light px-4"
    >
      <div className="self-end">
        <img
          src={league.image_path}
          alt={league.name}
          className="size-8 object-contain mx-auto"
        />
        <span>{time}</span>
      </div>
      <div className="px-2">
        <span className="inline-flex items-center gap-2">
          <img
            src={homeTeam.image_path}
            className="size-6 object-contain"
            alt={homeTeam.title}
          />
          <span>{homeTeam.name}</span>
        </span>
        <br />
        <span className="inline-flex items-center gap-2">
          <img
            src={awayTeam.image_path}
            alt={awayTeam.title}
            className="size-6 object-contain"
          />
          <span>{awayTeam.name}</span>
        </span>
      </div>
    </Link>
  );
}
