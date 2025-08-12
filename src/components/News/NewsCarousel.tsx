import { Block } from "../Block";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import { useFixtureByIds } from "@/features/Fixtures/useFixturesByIds";
import { useGetFollowingMatchIds } from "@/hooks/useGetFollowing";
import { ScheduledMatch } from "../ScheduledMatch";

export function NewsCarousel({ title = "Upcoming Matches" }) {
  const { followingMatchIds } = useGetFollowingMatchIds();
  const { fixtures, isError, isLoading } = useFixtureByIds({
    ids: followingMatchIds,
  });

  const upcomingFixtures = getUpcomingMatches(fixtures?.data);

  if (isLoading)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden bg-gray-200 h-48 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  if (isError)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">
            {"Upcoming Matches not Available"}
          </p>
        </div>
      </Block>
    );

  if (upcomingFixtures?.length === 0)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">
            {"No Upcoming News"}
          </p>
        </div>
      </Block>
    );

  return (
    <Block
      title={title}
      showNextButton={false}
      contentClassName="pb-8 flex flex-col items-center justify-center"
    >
      <Splide
        options={{
          arrows: false,
          type: "loop",
          autoplay: true,
          width: "24rem",
          classes: { pagination: "splide__pagination !-bottom-5" },
        }}
      >
        <div className="space-y-6">
          {upcomingFixtures?.slice(0, 3)?.map((fixture) => (
            <ScheduledMatch key={fixture.id} fixture={fixture} />
          ))}
        </div>
      </Splide>
    </Block>
  );
}

const getUpcomingMatches = (fixtures: any) => {
  const today = Date.now() / 1000;
  return fixtures?.filter(
    (fixture: any) => fixture?.starting_at_timestamp > today
  );
};
