import clsx from "clsx";
import { HexagonFilter } from "@/components/HexagonFilter";

export function StatTag({ stat=0, className = "", compact = false }) {
  return (
    <HexagonFilter radius={compact ? 6 : 8}>
      {({ style }) => (
        <p
          style={style}
          className={clsx(
            "bg-[#FF0000] text-white",
            compact
              ? "px-2 py-0.5 text-fine font-bold"
              : "px-3 py-1 font-semibold",
            className
          )}
        >
          {stat}
        </p>
      )}
    </HexagonFilter>
  );
}
