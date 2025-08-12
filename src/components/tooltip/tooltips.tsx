import { Tooltip } from "react-tooltip";

const getColorForValue = (value: number, total: number) => {
  const percent = (value / total) * 100;
  if (percent < 50) return "black";
  if (percent < 60) return "#DA291C";
  if (percent < 75) return "#FF9900";
  if (percent < 90) return "#006428";
  return "#5691FB";
};

export const RatingBarWithTooltip = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => {
  const maxValue = 10;
  const minColor = getColorForValue(min, maxValue);
  const maxColor = getColorForValue(max, maxValue);

  return (
    <>
      <div
        data-tooltip-id="min-max-tooltip"
        className="w-full h-3 rounded-full relative"
      />

      <Tooltip
        id="min-max-tooltip"
        className="!bg-white !text-gray-800 !shadow-md !py-2 !px-3 !text-sm"
        place="bottom-end"
      >
        <div className="flex gap-4 flex-col">
          <div className="flex items-center gap-2">
            Min:{" "}
            <p
              className="text-white px-2 rounded-full"
              style={{ backgroundColor: minColor }}
            >
              {min.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            Max:{" "}
            <p
              className="text-white px-2 rounded-full"
              style={{ backgroundColor: maxColor }}
            >
              {max.toFixed(2)}
            </p>
          </div>
        </div>
      </Tooltip>
    </>
  );
};
