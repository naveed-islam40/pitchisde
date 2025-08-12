import clsx from "clsx";

import { Block } from "@/components/Block";
import { TitleStripRaw, TitleStripSimple } from "@/components/TitleStrip";

function Row() {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-center gap-x-2.5">
      <img
        src="/mig/teams/girona.png"
        className="box-content w-7 min-w-7 pl-6"
      />
      <p>Girona</p>
      <p className="justify-self-center px-2 md:px-20">65</p>
      <p className="justify-self-center pr-6">7.8</p>
    </div>
  );
}

export function Performance() {
  return (
    <Block padding={false}>
      <TitleStripSimple title="Performance" />

      <div className="overflow-x-scroll px-2.5 py-4 relative">
        <img
          src="/views/performance-chart.svg"
          className="w-full bg-white max-lg:min-w-[1000px] noselect"
        />
      </div>

      <div
        className={clsx(
          "mb-6 grid grid-cols-[auto,1fr,auto,auto] gap-y-2.5 overflow-x-auto whitespace-nowrap font-medium"
        )}
      >
        <TitleStripRaw className="col-span-full mb-2 grid grid-cols-subgrid py-4 text-xl font-bold text-x-bargreen">
          <h1 className="col-span-2 pl-6">Career</h1>
          <h1 className="justify-self-center px-2 md:px-20">Appearances</h1>
          <h1 className="justify-self-center pr-6">Avg. Rating</h1>
        </TitleStripRaw>

        <Row />
      </div>
    </Block>
  );
}
