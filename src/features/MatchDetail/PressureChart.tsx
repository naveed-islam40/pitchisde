import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BiFootball } from "react-icons/bi";

import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  ReferenceLine,
  ReferenceDot,
  YAxis,
} from "recharts";

export default function PressureChart({
  pressureData,
  metadata,
  participants,
  events,
}) {
  const [hoveredDot, setHoveredDot] = useState(null);

  const pressuresByMinute = groupByMinute(pressureData);
  const pressures = Object.values(pressuresByMinute);
  const homeTeam = participants.find(
    (participant) => participant.meta.location === "home"
  );
  const awayTeam = participants.find(
    (participant) => participant.meta.location === "away"
  );
  const sortedEvents = events.sort((a, b) => a.minute - b.minute);

  const transformedPressures = pressures.map((pair: any) => ({
    minute: pair[0].minute,
    homeTeamPressure: pair.find(
      (pressure) => pressure.participant_id === homeTeam.id
    ).pressure,
    awayTeamPressure: -pair.find(
      (pressure) => pressure.participant_id === awayTeam.id
    ).pressure,
  }));

  const homeTeamColor = metadata.find((item) => item.type_id === 161)?.values
    .participant;
  const awayTeamColor = metadata.find((item) => item.type_id === 162)?.values
    .participant;

  const offset1 = gradientOffset(transformedPressures, "homeTeamPressure");
  const offset2 = gradientOffset(transformedPressures, "awayTeamPressure");

  const includesExtraTime = transformedPressures.some(
    (pressure) => pressure.minute > 90
  );
  const maxMinute = includesExtraTime ? 120 : 90;

  const goalTypes = [14, 15, 16];

  return (
    <>
      <ResponsiveContainer width={"100%"} height={300}>
        <AreaChart
          data={transformedPressures}
          margin={{
            top: 20,
            left: 10,
            right: 10,
            bottom: 20,
          }}
        >
          <Area
            type="monotone"
            dataKey="homeTeamPressure"
            strokeWidth={0}
            stroke={homeTeamColor}
            strokeOpacity={0.8}
            fill={homeTeamColor}
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="awayTeamPressure"
            strokeWidth={0}
            stroke={awayTeamColor}
            strokeOpacity={0.8}
            fill={awayTeamColor}
            fillOpacity={1}
          />
          <XAxis
            dataKey="minute"
            axisLine={false}
            tick={false}
            domain={[0, maxMinute]}
          />
          <YAxis hide domain={[-150, 150]} />
          <defs>
            <linearGradient id="colorPressure1" x1="0" y1="0" x2="0" y2="1">
              <stop offset={offset1} stopColor={homeTeamColor || "green"} />
            </linearGradient>
            <linearGradient id="colorPressure2" x1="0" y1="0" x2="0" y2="1">
              <stop offset={offset2} stopColor={awayTeamColor || "gray"} />
            </linearGradient>
          </defs>
          <ReferenceLine
            x={1}
            stroke=""
            strokeDasharray="3 3"
            label={{
              value: "KO",
              position: "bottom",
              style: { fill: "#303030", fontWeight: "bold" },
            }}
          />
          <ReferenceLine
            x={45}
            stroke="gray"
            strokeDasharray="3 3"
            label={{
              value: "HT",
              position: "bottom",
              style: { fill: "#303030", fontWeight: "bold" },
            }}
          />
          <ReferenceLine
            x={90}
            stroke=""
            strokeDasharray="3 3"
            label={{
              value: "FT",
              position: "bottom",
              style: { fill: "#303030", fontWeight: "bold" },
            }}
          />
          {includesExtraTime && (
            <ReferenceLine
              x={120}
              stroke="gray"
              strokeDasharray="3 3"
              label={{
                value: "AET",
                position: "bottom",
                style: { fill: "#303030", fontWeight: "bold" },
              }}
            />
          )}

          <Tooltip
            content={
              <CustomTooltip
                payload={hoveredDot ? [{ value: hoveredDot }] : null}
                event={hoveredDot}
                homeTeam={homeTeam}
              />
            }
          />

          {sortedEvents.map((event, i) => {
            return goalTypes.includes(event.type_id) ? (
              <ReferenceDot
                x={event.minute}
                y={event.participant_id === homeTeam.id ? 100 : -100}
                key={i}
                stroke="0"
                label={({ viewBox }) => {
                  return (
                    <BiFootball
                      x={viewBox.x}
                      y={viewBox.y}
                      size={20}
                      className={
                        event.type.code === "owngoal"
                          ? "fill-danger"
                          : "fill-primary"
                      }
                      onMouseEnter={() => setHoveredDot(event)}
                      onMouseLeave={() => setHoveredDot(null)}
                    />
                  );
                }}
              />
            ) : null;
          })}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

const CustomTooltip = ({ payload, event, homeTeam }) => {
  const eventType =
    event?.type_id === 14
      ? "Goal"
      : event?.type_id === 15
      ? "Own Goal"
      : event?.type_id === 16
      ? "Penalty"
      : null;

  if (event)
    return (
      <div className="custom-tooltip p-2 rounded-lg bg-white shadow border border-gray-100">
        <h6 className="font-semibold text-x-darkgreen">{event.minute}&apos;</h6>
        <div className="flex gap-2">
          <div>
            <Image
              width={512}
              height={512}
              unoptimized
              src={event.player.image_path}
              alt={event.player.display_name}
              className="w-10 h-10 rounded-full border"
            />
          </div>
          <div>
            <h6 className="font-semibold text-sm text-dark">
              <span>{eventType}</span>
              <span>
                (
                {event.participant_id === homeTeam.id ? (
                  <>
                    <span
                      className={clsx(
                        event.type_id === 15 ? "text-danger" : "text-primary"
                      )}
                    >
                      {event.result.split("-")[0]}
                    </span>
                    -<span>{event.result.split("-")[1]}</span>
                  </>
                ) : (
                  <>
                    <span>{event.result.split("-")[0]}</span>-
                    <span
                      className={clsx(
                        event.type_id === 15 ? "text-danger" : "text-primary"
                      )}
                    >
                      {event.result.split("-")[1]}
                    </span>
                  </>
                )}
                )
              </span>
            </h6>
            <h6 className="text-sm font-semibold text-dark">
              {event.player.display_name}
            </h6>
          </div>
        </div>
      </div>
    );
  if (payload && payload.length) {
    return (
      <div className="custom-tooltip p-2 rounded-lg bg-white shadow border border-gray-100">
        <h6 className="label font-semibold">{`${payload[0].payload.minute}'`}</h6>
      </div>
    );
  }
  return null;
};

const groupByMinute = (data) => {
  return data.reduce((acc, item) => {
    const { minute } = item;
    if (!acc[minute]) {
      acc[minute] = [];
    }
    acc[minute].push(item);
    return acc;
  }, {});
};

const gradientOffset = (pressureData, key) => {
  const dataMax = Math.max(...pressureData.map((i) => i[key]));
  const dataMin = Math.min(...pressureData.map((i) => i[key]));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};
