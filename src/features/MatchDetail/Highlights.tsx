import clsx from "clsx";
import { Block } from "@/components/Block";
import { HexagonFilter } from "@/components/HexagonFilter";

export function HighlightSmall() {
  return (
    <Block
      title="Match Highlights"
      padding={false}
      showNextButton={false}
      className="min-w-[332px]"
      contentClassName="border-t border-x-bargreen min-h-[23rem] h-full bg-x-grey-2"
    />
  );
}

function HighlightBigCell() {
  return (
    <div className="w-36 max-w-36">
      <div className="relative mx-auto aspect-hex w-28">
        <HexagonFilter radius={16}>
          {({ style }) => (
            <div
              style={style}
              className="relative h-full w-full bg-[#BFBFBF]"
            ></div>
          )}
        </HexagonFilter>

        <img
          src="/mig/icons/hex-plus.svg"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 translate-x-1/2"
        />
      </div>
      {/* 17 A. Garnacho LM Knee Injury */}
      <h2 className="text-center text-fine font-bold text-x-bargreen">
        17 A. Garnacho LM
      </h2>
      <p className="text-center text-sm font-medium text-x-bargreen">
        Knee Injury
      </p>
    </div>
  );
}

export function HighlightBig() {
  return (
    <Block
      title="Match Highlights"
      showNextButton={false}
      className="flex-1"
      contentClassName={clsx(
        "border-t border-x-bargreen",
        "grid grid-cols-2 ph:grid-cols-3 md:grid-cols-4 wl:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-y-6 !py-6 justify-items-center"
      )}
    >
      <HighlightBigCell />
    </Block>
  );
}
