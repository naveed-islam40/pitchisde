import { TabBlock } from "@/components/TabBlock";
import { GoalStatCard } from "@/components/stat/GoalStatCard";
import { Block } from "@/components/Block";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

function Players({
  title = "Top Scorers",
  players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setScrolled(scrollRef.current.scrollTop > 0);
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <div className="w-full  rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
      {/* Title */}
      <h3 className="px-4 py-3 text-lg font-bold">{title}</h3>

      {/* First Player (fixed) */}
      <div
        className={`flex items-center px-4 py-3  z-10 ${
          scrolled ? "shadow-md" : ""
        } transition-shadow duration-200`}
      >
        <img
          src="/mig/player-3.png"
          className="size-14 shrink-0 rounded-full bg-dark/50"
        />
        <div className="ml-4 flex flex-1 flex-col justify-center">
          <p className="font-bold text-base leading-none">Muhammad Salah</p>
          <div className="mt-1 flex items-center gap-x-1.5">
            <img src="/mig/teams/laliga.png" className="w-5" />
            <span className="text-sm font-bold text-dark/70">Liverpool</span>
          </div>
        </div>
        <p className="ml-auto text-base font-bold">12</p>
      </div>

      {/* Scrollable List */}
      <div ref={scrollRef} className="max-h-96 overflow-y-auto scroll-smooth">
        {players.slice(1).map((player, i) => (
          <div
            key={i}
            className="flex items-center border-t border-gray-100 px-4 py-3"
          >
            <img
              src={"/mig/player-3.png"}
              className="size-10 shrink-0 rounded-full bg-dark/50"
            />
            <div className="ml-4 flex flex-1 flex-col justify-center">
              <p className="text-sm leading-none">Mo Salah</p>
              <div className="mt-1 flex items-center gap-x-1.5">
                <img src={"/mig/teams/laliga.png"} className="w-4" />
                <span className="text-xs text-dark/50">Liverpool</span>
              </div>
            </div>
            <p className="ml-auto text-sm font-medium">2</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Team() {
  return (
    <div className="grid gap-6 md:grid-cols-2 wl:grid-cols-3">
      <GoalStatCard />
    </div>
  );
}

export default function TrophyStatCard() {
  const router = useRouter();
  const { leagueId, ...rest } = router.query;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el.scrollTop > 0);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Block
      padding={false}
      title="2022 / 2023"
      centerTitle
      onNextClick={() =>
        router.push({
          pathname: `/league/${leagueId}/overview`,
          query: rest,
        })
      }
    >
      <div className="relative max-h-80 overflow-hidden">
        {/* Fixed Top Team */}
        <div
          className={`bg-white transition-shadow duration-300 px-4 ${
            isScrolled ? "shadow-md z-10 relative" : ""
          }`}
        >
          <div className="flex items-center py-2">
            <img
              src="/mig/teams/aston-villa-2.png"
              className="h-11 w-11 shrink-0 rounded-full"
            />
            <p className="flex-1 pl-4 text-sm leading-none font-semibold max-md:font-medium">
              Aston Villa
            </p>
            <img src="/mig/icons/trophy.png" className="h-7 w-7 shrink-0" />
          </div>
        </div>

        {/* Scrollable Teams */}
        <div
          ref={scrollRef}
          className="max-h-64 overflow-y-auto divide-y divide-x-grey-3"
        >
          {/* Second */}
          <div className="flex items-center py-2 px-4">
            <img
              src="/mig/teams/liverpool.png"
              className="h-11 w-11 shrink-0 rounded-full"
            />
            <p className="flex-1 pl-4 text-sm leading-none max-md:font-medium">
              Liverpool
            </p>
            <p className="mr-2 self-center font-medium">
              2<sup>nd</sup>
            </p>
          </div>

          {/* Add more teams below as needed */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center py-2 px-4">
              <img
                src="/mig/teams/laliga.png"
                className="h-11 w-11 shrink-0 rounded-full"
              />
              <p className="flex-1 pl-4 text-sm leading-none">Team {i + 3}</p>
              <p className="mr-2 self-center text-sm font-medium">
                {i + 3}
                <sup>
                  {
                    ["th", "st", "nd", "rd"][
                      (i + 3) % 10 > 3 || (i + 3) % 10 === 0 ? 0 : (i + 3) % 10
                    ]
                  }
                </sup>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
}

function Trophies() {
  return (
    <div className="grid gap-6 md:grid-cols-2 wl:grid-cols-3">
      <TrophyStatCard />
    </div>
  );
}

export function TabbedStatistics() {
  return (
    <TabBlock>
      <TabBlock.List>
        <TabBlock.Tab label="Players" />
        <TabBlock.Tab label="Teams" />
        <TabBlock.Tab label="Seasons" />
      </TabBlock.List>
      <TabBlock.Panels>
        <TabBlock.Panel className={"grid grid-cols-2 gap-4"}>
          <Players title="Top Assists" />
          <Players title="Top Scoreres" />
          <Players title="Goal Keepers" />
        </TabBlock.Panel>
        <TabBlock.Panel>
          <Team />
        </TabBlock.Panel>
        <TabBlock.Panel>
          <Trophies />
        </TabBlock.Panel>
      </TabBlock.Panels>
    </TabBlock>
  );
}
