import { NewsCarouselDetailed } from "./NewsCarouselDetailed";
import { AllCompetitions } from "../../components/Dashboard/AllCompetitions";
import { TopCompetitions } from "../../components/Dashboard/TopCompetitions";
import { NewsCarousel } from "@/components/News/NewsCarousel";
import { MatchList } from "./MatchList";
import useFixturesByDate from "../Fixtures/useFixturesByDate";
import { useRef } from "react";

export function Dashboard() {
  const {
    fixtures,
    isError,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useFixturesByDate();

  const fixturesData = {
    fixtures,
    isError,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const bottomDiv = bottomRef.current as HTMLDivElement;
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     },
  //     {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 1.0,
  //     }
  //   );

  //   if (bottomRef.current) {
  //     observer.observe(bottomDiv);
  //   }

  //   return () => {
  //     if (bottomDiv) {
  //       observer.unobserve(bottomDiv);
  //     }
  //   };
  // }, [bottomRef, hasNextPage, fetchNextPage]);

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <div className="basis-3/12 lg:order-1 order-3 space-y-4">
        <NewsCarousel />
        <NewsCarouselDetailed />
      </div>
      <div className="flex-1 lg:order-2 order-1 relative">
        <MatchList fixturesData={fixturesData} />
        <div ref={bottomRef} className="h-px"></div>
      </div>
      <div className="basis-3/12 lg:order-3 order-2 space-y-4">
        <TopCompetitions />
        <AllCompetitions />
      </div>
    </div>
  );
}
