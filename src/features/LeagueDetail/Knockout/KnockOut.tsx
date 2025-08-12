"use client";

import { matches } from "@/static/knock";
import { useState } from "react";
import { renderConnector, renderMatch } from "./Match";

export default function TournamentBracket() {
  const [hoveredMatch, setHoveredMatch] = useState<string | null>(null);
  const [hoveredConnectors, setHoveredConnectors] = useState<string[]>([]);

  const handleMouseEnter = (matchId: string) => {
    setHoveredMatch(matchId);

    // Find the match
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      // Set all connectors related to this match as hovered
      setHoveredConnectors(match.connectorIds);
    }
  };

  const handleMouseLeave = () => {
    setHoveredMatch(null);
    setHoveredConnectors([]);
  };

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1200px] h-[800px] relative p-8">
        {/* Trophy in the center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 21h10m-5-3v3m-2.5-14h5M17 4v4.5a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 7 8.5V4m0 0h10M7 4H6a2 2 0 0 0-2 2v.5A2.5 2.5 0 0 0 6.5 9h.5m11-5h1a2 2 0 0 1 2 2v.5A2.5 2.5 0 0 1 17.5 9h-.5" />
            </svg>
          </div>
          <div className="text-gray-500 text-sm mt-2">CHAMPION</div>
        </div>

        {/* Bracket structure */}
        <div className="flex justify-between h-full">
          {/* Left side of the bracket */}
          <div className="w-[45%] flex flex-col justify-between">
            <div className="flex h-[45%]">
              <div className="w-1/3 flex flex-col justify-around">
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderMatch({
                  match: matches[1],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-around relative">
                {/* {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })} */}
                {/* {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })} */}
                {renderConnector({
                  direction: "",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c11",
                  hoveredConnectors,
                })}
              </div>
              {/* <div className="w-1/3 flex flex-col justify-center relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c12",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div> */}
            </div>

            {/* <div className="flex h-[45%]">
              <div className="w-1/3 flex flex-col justify-around">
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-around relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c13",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c14",
                  hoveredConnectors,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-center relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c15",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
            </div> */}
          </div>

          {/* Center connectors to final */}
          {/* <div className="w-[10%] flex flex-col justify-center">
            <div className="h-1/3 relative">
              {renderConnector({
                direction: "right",
                position: "bottom",
                isCenter: true,
                connectorId: "c10",
                hoveredConnectors,
              })}
              {renderMatch({
                match: matches[0],
                hoveredMatch,
                handleMouseLeave,
                handleMouseEnter,
              })}
            </div>
            <div className="h-1/3 flex items-center justify-center">
              {renderMatch({
                match: matches[0],
                hoveredMatch,
                handleMouseLeave,
                handleMouseEnter,
              })}
            </div>
            <div className="h-1/3 relative">
              {renderConnector({
                direction: "right",
                position: "bottom",
                isCenter: true,
                connectorId: "c10",
                hoveredConnectors,
              })}
              {renderMatch({
                match: matches[0],
                hoveredMatch,
                handleMouseLeave,
                handleMouseEnter,
              })}
            </div>
          </div> */}

          {/* Right side of the bracket */}
          {/* <div className="w-[45%] flex flex-col justify-between">
            <div className="flex h-[45%]">
              <div className="w-1/3 flex flex-col justify-center relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-around relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-around">
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
            </div>

            <div className="flex h-[45%]">
              <div className="w-1/3 flex flex-col justify-center relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-around relative">
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderConnector({
                  direction: "right",
                  position: "bottom",
                  isCenter: true,
                  connectorId: "c10",
                  hoveredConnectors,
                })}
              </div>
              <div className="w-1/3 flex flex-col justify-around">
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
                {renderMatch({
                  match: matches[0],
                  hoveredMatch,
                  handleMouseLeave,
                  handleMouseEnter,
                })}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
