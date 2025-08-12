import { Block } from "@/components/Block";
import { getContrastYIQ } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

export default function MatchStatistics({ statistics, metadata }) {
  if (!statistics) return null;

  const groupedByType = statistics.reduce((acc, item) => {
    const typeId = item.type_id;
    if (!acc[typeId]) {
      acc[typeId] = [];
    }
    acc[typeId].push(item);
    return acc;
  }, {});

  const groupedStatisticsList = Object.entries(groupedByType);

  if (!groupedStatisticsList?.length) return null;
  return (
    <Block>
      {/* <h2 className="text-left py-4 text-xl font-bold text-x-bargreen">
        Statistics
      </h2> */}
      <div className="divide-y max-h-[1000px] overflow-y-auto px-3">
        <div className="divide-y space-y-2 pb-5">
          <OverallStatistics
            metadata={metadata}
            statistics={groupedStatisticsList}
          />
        </div>
        <div className="divide-y space-y-2 pt-5">
          <AttackStatistics
            metadata={metadata}
            statistics={groupedStatisticsList}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6 divide-y">
            <DefenseStatistics
              metadata={metadata}
              statistics={groupedStatisticsList}
            />
            <BattleStatistics
              metadata={metadata}
              statistics={groupedStatisticsList}
            />
            <DisciplineTypes
              metadata={metadata}
              statistics={groupedStatisticsList}
            />
          </div>
          <div className="space-y-6 divide-y border-t">
            <PassesStatistics
              metadata={metadata}
              statistics={groupedStatisticsList}
            />
          </div>
        </div>
      </div>
    </Block>
  );
}

const overAllTypes = [
  45, 118, 5304, 9687, 4286, 64, 580, 581, 34, 55, 51, 56, 120, 59, 53,
];
function OverallStatistics({ statistics, metadata }) {
  const lowerBetterTypes = [581, 51, 56];
  const overAllStats = overAllTypes
    .map((type) => statistics.find((stat) => +stat[0] === type))
    .filter((stat) => Boolean(stat))
    .map((stat) => stat[1]);
  const homeColor = metadata.find((item) => item?.type_id === 161)?.values
    ?.participant;
  const awayColor = metadata.find((item) => item?.type_id === 162)?.values
    ?.participant;
  const renderBallPossession = () => {
    const ballPossession = overAllStats.find((stat) => stat[0].type_id === 45);
    return (
      <div>
        <h1 className=" text-center mb-2 font-semibold">Ball Possession %</h1>
        <div className="rounded-full font-semibold flex gap-1">
          <div
            style={{
              width: `${ballPossession?.[0]?.data?.value}%`,
              backgroundColor: homeColor,
              color: getContrastYIQ(homeColor),
            }}
            className="h-full  rounded-l-full px-4 py-2.5"
          >{`${ballPossession?.[0]?.data?.value}%`}</div>
          <div
            style={{
              width: `${ballPossession[1]?.data?.value}%`,
              backgroundColor: awayColor,
              color: getContrastYIQ(awayColor),
            }}
            className="h-full  text-right rounded-r-full px-4 py-2.5"
          >
            {`${ballPossession[1]?.data?.value}%`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h4 className="text-center text-lg font-bold text-x-green-2">Overall</h4>
      <div className="space-y-4">
        {renderBallPossession()}
        {overAllStats
          .filter((stat) => stat[0].type_id !== 45)
          .map((stat, index) => (
            <StatRow
              metadata={metadata}
              key={`overall-${index + 1}`}
              stat={stat}
              lowerBetter={lowerBetterTypes.includes(stat[0].type_id)}
            />
          ))}
      </div>
    </div>
  );
}

const attackTypes = [
  42, 86, 41, 49, 50, 58, 43, 44, 1527, 115, 111, 112, 54, 108, 109, 1605, 110,
];
function AttackStatistics({ statistics, metadata }) {
  const lowerBetterTypes = [41, 58, 112];
  const attackStats = attackTypes
    .map((type) => statistics.find((stat) => +stat[0] === type))
    .filter((stat) => Boolean(stat))
    .map((stat) => stat[1]);

  return (
    <div className="space-y-6 px-4 pb-4">
      <h4 className="text-center text-lg font-bold text-x-green-2">Attack</h4>
      <div className="space-y-4">
        {attackStats.map((stat, index) => (
          <StatRow
            metadata={metadata}
            key={`attack-${index + 1}`}
            stat={stat}
            lowerBetter={lowerBetterTypes.includes(stat[0].type_id)}
          />
        ))}
      </div>
    </div>
  );
}
const defenseTypes = [
  9686, 57, 104, 49, 113, 114, 96, 78, 583, 100, 66, 97, 101, 102, 582, 46, 61,
  76, 103, 584, 48997, 571, 121,
];

function DefenseStatistics({ statistics, metadata }) {
  const lowerBetterTypes = [114, 61, 48997, 571, 121];
  const defenseStats = defenseTypes
    .map((type) => statistics.find((stat) => +stat[0] === type))
    .filter((stat) => Boolean(stat))
    .map((stat) => stat[1]);

  return (
    <div className="space-y-6 pt-4">
      <h4 className="text-center text-lg font-bold text-x-green-2">Defense</h4>
      <div className="space-y-4">
        {defenseStats.map((stat, index) => (
          <StatRow
            metadata={metadata}
            key={`defense-${index + 1}`}
            stat={stat}
            lowerBetter={lowerBetterTypes.includes(stat[0].type_id)}
          />
        ))}
      </div>
    </div>
  );
}

const passesTypes = [
  80, 81, 82, 49, 117, 98, 99, 1533, 63, 62, 27264, 27265, 122, 123, 124, 125,
  60, 70, 65,
];

function PassesStatistics({ statistics, metadata }) {
  const lowerBetterTypes = [""];
  const passesStats = passesTypes
    .map((type) => statistics.find((stat) => +stat[0] === type))
    .filter((stat) => Boolean(stat))
    .map((stat) => stat[1]);

  return (
    <div className="space-y-6 p-4 ">
      <h4 className="text-center text-lg font-bold text-x-green-2">Passes</h4>
      <div className="space-y-4">
        {passesStats.map((stat, index) => (
          <StatRow
            metadata={metadata}
            key={`passes-${index + 1}`}
            stat={stat}
            lowerBetter={lowerBetterTypes.includes(stat[0].type_id)}
          />
        ))}
      </div>
    </div>
  );
}
const battleTypes = [78, 94, 105, 106, 1491, 107, 27266, 77];
function BattleStatistics({ statistics, metadata }) {
  const lowerBetterTypes = [94, 1491, 27266];
  const battleStats = battleTypes
    .map((type) => statistics.find((stat) => +stat[0] === type))
    .filter((stat) => Boolean(stat))
    .map((stat) => stat[1]);

  return (
    <div className="space-y-6 p-4 ">
      <h4 className="text-center text-lg font-bold text-x-green-2">Battle</h4>
      <div className="space-y-4">
        {battleStats.map((stat, index) => (
          <StatRow
            metadata={metadata}
            key={`battle-${index + 1}`}
            stat={stat}
            lowerBetter={lowerBetterTypes.includes(stat[0].type_id)}
          />
        ))}
      </div>
    </div>
  );
}
const disciplineTypes = [56, 84, 85, 83, 95];
function DisciplineTypes({ statistics, metadata }) {
  const lowerBetterTypes = [56, 84, 85, 83];
  const disciplineStats = disciplineTypes
    .map((type) => statistics.find((stat) => +stat[0] === type))
    .filter((stat) => Boolean(stat))
    .map((stat) => stat[1]);

  return (
    <div className="space-y-6 p-4 ">
      <h4 className="text-center text-lg font-bold text-x-green-2">
        Discipline
      </h4>
      <div className="space-y-4">
        {disciplineStats.map((stat, index) => (
          <StatRow
            metadata={metadata}
            key={`discipline-${index + 1}`}
            stat={stat}
            lowerBetter={lowerBetterTypes.includes(stat[0].type_id)}
          />
        ))}
      </div>
    </div>
  );
}

function StatRow({ stat, lowerBetter, metadata }) {
  const homeStat = stat.find((stat) => stat.location === "home");
  const awayStat = stat.find((stat) => stat.location === "away");
  const statName = homeStat.type.name;
  const homeValue = homeStat.data.value;
  const awayValue = awayStat.data.value;
  const homeWin = lowerBetter ? homeValue < awayValue : homeValue > awayValue;
  const draw = homeValue === awayValue;

  const homeColor = metadata.find((item) => item?.type_id === 161)?.values
    ?.participant;
  const awayColor = metadata.find((item) => item?.type_id === 162)?.values
    ?.participant;

  return (
    <div className="flex items-center justify-between">
      <span
        style={
          homeColor && homeWin && !draw
            ? { backgroundColor: homeColor, color: getContrastYIQ(homeColor) }
            : {}
        }
        className={clsx(
          homeWin ? "bg-gray-100 " : "",
          "px-2 rounded-full font-medium "
        )}
      >
        {homeValue}
      </span>
      <span className="font-medium">{statName}</span>
      <span
        style={
          awayColor && !homeWin && !draw
            ? { backgroundColor: awayColor, color: getContrastYIQ(awayColor) }
            : {}
        }
        className={clsx("px-2 rounded-full font-medium ")}
      >
        {awayValue}
      </span>
    </div>
  );
}
