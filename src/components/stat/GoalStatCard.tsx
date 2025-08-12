import { Block } from "@/components/Block";
import { StatTag } from "./StatTag";

export function GoalStatCard() {
  return (
    <Block
      padding={false}
      title="Goals per match"
      centerTitle
      contentClassName="border-t border-x-grey-3 py-3 px-4"
    >
      <div className="flex items-center py-3 md:flex-col">
        <div className="relative">
          <img
            src="/mig/teams/man-city.png"
            className="h-11 w-11 rounded-full md:h-16 md:w-16"
          />
          <StatTag className="absolute -right-6 -top-2 max-md:hidden" />
        </div>
        <p className="flex-1 font-medium max-md:pl-4 max-md:text-sm max-md:font-semibold md:mt-2">
          Manchester City
        </p>
        <StatTag compact className="ml-1 md:hidden" />
      </div>
      <div className="divide-y divide-x-grey-3 border-t border-x-grey-3 md:mt-4">
        <GoalRow />
        <GoalRow />
      </div>
    </Block>
  );
}
function GoalRow() {
  return (
    <div className="flex items-center py-3">
      <img
        src="/mig/teams/aston-villa-2.png"
        className="h-11 w-11 shrink-0 rounded-full"
      />
      <p className="flex-1 pl-4 text-sm leading-none max-md:font-medium">
        Aston Villa
      </p>
      <p className="mr-2 self-center text-sm font-medium">12</p>
    </div>
  );
}
