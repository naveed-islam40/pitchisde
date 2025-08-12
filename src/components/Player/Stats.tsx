import clsx from "clsx";
import React from "react";

function Stat({ label, value, color = "" }) {
  const colorClass =
    color === "Red"
      ? "bg-danger"
      : color === "Orange"
      ? "bg-warning"
      : color === "Green"
      ? "bg-primary"
      : color === "Blue"
      ? "bg-info"
      : "";
  return (
    <div className=" [&>p]:text-center space-y-2">
      <p className="text-2xl font-bold">
        {label === "Rating" ? (
          <span
            className={clsx(
              "px-3 text-xl font-semibold text-white rounded-full",
              colorClass
            )}
          >
            {value}
          </span>
        ) : (
          <span>{value}</span>
        )}
      </p>
      <p className="font-medium">{label}</p>
    </div>
  );
}

export default Stat;
