import { Block } from "@/components/Block";
import { TitleStripSimple } from "@/components/TitleStrip";

export const PositionChart = () => ( 
  <Block padding={false}>
    <TitleStripSimple title="League Table Positions" center={false} />
    <div className="overflow-x-scroll">
      <div className="h-[450px] w-full max-lg:min-w-[1000px]">
      
      </div>
    </div>
  </Block>
);


