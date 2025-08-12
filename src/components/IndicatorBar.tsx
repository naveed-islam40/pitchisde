import clsx from "clsx";

export const indicatorColors = {
  147: "#16a34a",
  180: "#2563eb",
  181: "#ea580c",
  182: "#dc2626",
  246: "#60a5fa",
  249: "#ea580c",
  250: "#ea580c",
  264: "#ca8a04",
  265: "#fb923c",
  292: "#ca8a04",
  289: "#4ade80",
  "000": "inherit",
};

/* NOTE:The parent of this component must have `position: relative` */
export function IndicatorBar({ ruleId, ...rest }) {
  return (
    <span
      style={{ backgroundColor: indicatorColors[ruleId] }}
      {...rest}
      className={clsx("absolute block left-0 top-0 h-full w-1 rounded-lg")}
    />
  );
}
