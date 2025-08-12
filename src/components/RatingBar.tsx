import type React from "react";
import { Tooltip } from "react-tooltip";
import { RatingBarWithTooltip } from "./tooltip/tooltips";

interface RatingBarProps {
  start: any;
  end: number;
  value: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ start, end, value }) => {
  const isInvalid = !isFinite(start) || !isFinite(end) || isNaN(value);

  const safeStart = isInvalid ? 0 : start;
  const safeEnd = isInvalid ? 0 : end;
  const safeValue = isInvalid ? 0 : value;

  const clampedStart = Math.max(0, Math.min(safeStart, 10));
  const clampedEnd = Math.max(0, Math.min(safeEnd, 10));
  const clampedValue = Math.max(0, Math.min(safeValue, 10));

  const allZero = clampedStart === 0 && clampedEnd === 0 && clampedValue === 0;

  // Convert to percentages
  const startPercent = (clampedStart / 10) * 100;
  const endPercent = (clampedEnd / 10) * 100;
  const valuePercent = (clampedValue / 10) * 100;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "12px",
    backgroundColor: "lightgray",
    borderRadius: "5px",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `
      linear-gradient(
        to right,
        black 0%,
        black 50%,
        #DA291C 50%,
        #DA291C 60%,
        #FF9900 60%,
        #FF9900 75%,
        #006428 75%,
        #006428 90%,
        #5691FB 90%,
        #5691FB 100%
      )
    `,
    clipPath: `polygon(${startPercent}% 0%, ${endPercent}% 0%, ${endPercent}% 100%, ${startPercent}% 100%)`,
    opacity: allZero ? 0.5 : 1,
    borderRadius: "8px",
  };

  const tickStyle: React.CSSProperties = {
    position: "absolute",
    top: "-5px",
    left: `${valuePercent}%`,
    width: "2px",
    height: "20px",
    backgroundColor: "black",
    transform: "translateX(-50%)",
    display: allZero ? "none" : "block",
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    top: "-25px",
    left: `${valuePercent}%`,
    transform: "translateX(-50%)",
    color: "black",
    padding: "1px 8px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
    display: allZero ? "none" : "block",
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={tickStyle}></div>

      <span style={{ ...labelStyle, zIndex: "30" }}>
        {clampedValue.toFixed(1)}
      </span>

      <RatingBarWithTooltip min={clampedStart} max={clampedEnd} />
    </div>
  );
};

export default RatingBar;
