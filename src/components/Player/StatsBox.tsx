import { MdOutlineQuestionMark } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import RatingBar from "../RatingBar";
import Stat from "./Stats";

function StatsBox({ stats }) {
  const calculatedStats = filterAndAccumulateData(stats);
  const actualStats = accumulateStats(calculatedStats);

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-3 gap-x-12 gap-y-9 text-dark">
          <Stat label="Goals" value={actualStats["Goals"]} />
          <Stat label="Assists" value={actualStats["Assists"]} />
          <Stat label="Appearances" value={actualStats["Appearances"]} />
          <Stat label="Yellow Cards" value={actualStats["Yellow Cards"]} />
          <Stat label="Red Cards" value={actualStats["Red Cards"]} />
          <Stat label="Minutes" value={actualStats["Minutes"]} />
        </div>
      </div>

      <div className="mt-8">
        <RatingBar
          start={actualStats["Rating"].lowest?.toFixed(2)}
          end={actualStats["Rating"].highest?.toFixed(2)}
          value={actualStats["Rating"].average?.toFixed(2)}
        />

        {/* Tooltips  */}
        <div className="flex justify-center mt-3">
          <span className="flex gap-x-1 items-center">
            <p className="font-semibold">Rating</p>
            <MdOutlineQuestionMark
              className="w-5 h-5 p-1 bg-gray-300 rounded-full"
              data-tooltip-id="rating-tooltip"
              data-tooltip-content="The rating bar shows the range of player ratings obtained over the season, Select the desired league and hover over the bar to see the minimum, maximum, and average rating of the player."
            />
            <Tooltip
              id="rating-tooltip"
              place="bottom-start"
              className="custom-tooltip"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatsBox;

function filterAndAccumulateData(dataArray) {
  const targetTypeIds = {
    52: "Goals",
    79: "Assists",
    321: "Appearances",
    322: "Starts",
    84: "Yellow Cards",
    83: "Red Cards",
    85: "Red Cards",
    119: "Minutes",
    118: "Rating",
  };

  return dataArray.map((player) => {
    const result = {
      Goals: 0,
      Assists: 0,
      Appearances: 0,
      Starts: 0,
      "Yellow Cards": 0,
      "Red Cards": 0,
      Minutes: 0,
      Rating: { average: null, highest: null, lowest: null }, // Initialize as null
    };

    player.details.forEach((detail) => {
      const { type_id, value } = detail;

      if (targetTypeIds[type_id]) {
        const type = targetTypeIds[type_id];

        if (type === "Rating") {
          // DIRECT ASSIGNMENT (don't sum these)
          result.Rating = {
            average: value?.average || 0,
            highest: value?.highest || 0,
            lowest: value?.lowest || 0,
          };
        } else if (type === "Red Cards") {
          result["Red Cards"] += 1;
        } else if (type === "Yellow Cards") {
          result["Yellow Cards"] += value?.total || 0;
        } else {
          result[type] += value?.total || 0;
        }
      }
    });

    return result;
  });
}

function accumulateStats(data) {
  return data.reduce(
    (acc, player) => {
      // Simple accumulations
      acc.Goals += player.Goals || 0;
      acc.Assists += player.Assists || 0;
      acc.Appearances += player.Appearances || 0;
      acc.Starts += player.Starts || 0;
      acc["Yellow Cards"] += player["Yellow Cards"] || 0;
      acc["Red Cards"] += player["Red Cards"] || 0;
      acc.Minutes += player.Minutes || 0;

      // Handle ratings (only if they exist)
      if (
        player.Rating?.average !== null &&
        player.Rating?.average !== undefined
      ) {
        if (acc.Rating.count === 0) {
          // Initialize with first valid rating
          acc.Rating.average = player.Rating.average;
          acc.Rating.lowest = player.Rating.lowest;
          acc.Rating.highest = player.Rating.highest;
          acc.Rating.sum = player.Rating.average;
        } else {
          // Accumulate ratings
          acc.Rating.sum += player.Rating.average;
          acc.Rating.average = acc.Rating.sum / (acc.Rating.count + 1);
          acc.Rating.lowest = Math.min(acc.Rating.lowest, player.Rating.lowest);
          acc.Rating.highest = Math.max(
            acc.Rating.highest,
            player.Rating.highest
          );
        }
        acc.Rating.count += 1;
      }

      return acc;
    },
    {
      Goals: 0,
      Assists: 0,
      Appearances: 0,
      Starts: 0,
      "Yellow Cards": 0,
      "Red Cards": 0,
      Minutes: 0,
      Rating: {
        average: 0,
        lowest: Infinity,
        highest: -Infinity,
        count: 0,
        sum: 0,
      },
    }
  );
}
