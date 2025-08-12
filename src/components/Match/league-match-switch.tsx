import { useRouter } from "next/router";

const LeagueMatchSwitch = ({ activeToggle, setActiveToggle }) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { group } = router.query;
  //   setActiveToggle(group);
  // }, [router.isReady]);

  const { leagueId, ...rest } = router.query;

  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex gap-2 bg-gray-200 rounded-full  p-1">
        <button
          className={`text-sm px-4 py-1.5 rounded-full font-semibold hover:bg-gray-50 ${
            activeToggle === "date"
              ? "bg-white text-x-bargreen"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveToggle("date");
            // router.replace({
            //   pathname: "/league/[leagueId]/matches",
            //   query: {
            //     leagueId,
            //     ...rest,
            //     group: "date",
            //   },
            // });
          }}
        >
          By Date
        </button>
        <button
          className={`text-sm px-4 py-1.5 rounded-full font-semibold hover:bg-gray-50 ${
            activeToggle === "stage"
              ? "bg-white text-x-bargreen"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveToggle("stage");
            // router.replace({
            //   pathname: "/league/[leagueId]/matches",
            //   query: {
            //     leagueId,
            //     ...rest,
            //     group: "stage",
            //   },
            // });
          }}
        >
          By Stage
        </button>
        <button
          className={`text-sm px-4 py-1.5 rounded-full font-semibold hover:bg-gray-50 ${
            activeToggle === "matchWeek"
              ? "bg-white text-x-bargreen"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveToggle("matchWeek");
            // router.replace({
            //   pathname: "/league/[leagueId]/matches",
            //   query: {
            //     leagueId,
            //     ...rest,
            //     group: "matchWeek",
            //   },
            // });
          }}
        >
          Match Week
        </button>
      </div>
    </div>
  );
};

export default LeagueMatchSwitch;
