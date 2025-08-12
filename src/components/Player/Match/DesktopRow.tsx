import RedCard from "@/components/GameCards/RedCard";
import YellowCard from "@/components/GameCards/YellowCard";
import clsx from "clsx";
import dayjs from "dayjs";
import { startProgress, stopProgress } from "next-nprogress-bar";
import Image from "next/image";
import { useRouter } from "next/router";

function DesktopRow({ match }) {
  const router = useRouter();
  const { fixture } = match || {};
  const homeTeamScore = fixture?.scores?.find(
    (score) =>
      score.participant_id === fixture?.participants?.[0]?.id &&
      score.description === "CURRENT"
  );
  const awayTeamScore = fixture?.scores?.find(
    (score) =>
      score.participant_id === fixture?.participants?.[1]?.id &&
      score.description === "CURRENT"
  );

  const yellowCards = match.details.find((detail) => detail.type_id === 84);
  const redCards = match.details.find((detail) => detail.type_id === 83);
  const yellowRedCards = match.details.find((detail) => detail.type_id === 85);
  const goalsMade = match.details.find((detail) => detail.type_id === 52);
  const rating = match.details.find((detail) => detail.type_id === 118);
  const minutesPlayed = match.details.find((detail) => detail.type_id === 119);
  const assists = match.details.find((detail) => detail.type_id === 79);
  const ratingValue = rating?.data?.value;
  const ratingColor =
    ratingValue >= 9.0
      ? "bg-info"
      : ratingValue >= 7.5
      ? "bg-primary"
      : ratingValue >= 6.0
      ? "bg-warning"
      : ratingValue >= 5.0
      ? "bg-danger"
      : "bg-dark";

  const navigateToFixture = () => {
    startProgress();
    router.push(`/match/${fixture.id}`).finally(() => stopProgress());
  };
  return (
    <div
      onClick={navigateToFixture}
      className="grid border-b py-2 px-4 gap-2 hover:bg-gray-200 cursor-pointer "
      style={{
        gridTemplateColumns:
          " minmax(6rem, auto) minmax(1.5rem , auto) minmax(30rem, 1fr) minmax(17rem, auto)",
      }}
    >
      <span className="text-center font-medium text-gray-700">
        {dayjs(fixture.starting_at).format("DD MMM YYYY")}
      </span>
      <span className=" text-center font-medium text-gray-700">
        {fixture?.state?.short_name}
      </span>

      <div
        className="grid gap-3 items-center"
        style={{
          gridTemplateColumns:
            "minmax(5rem, 1fr) 2rem auto 2rem minmax(5rem, 1fr)",
        }}
      >
        {" "}
        <span
          className={clsx(
            "justify-self-end text-gray-700 text-right",
            fixture.participants?.[0].meta.winner ? "font-bold" : "font-medium"
          )}
        >
          {fixture?.participants?.[0].name}
        </span>
        <Image
          unoptimized
          width={250}
          height={250}
          src={fixture?.participants?.[0].image_path}
          className=" w-7 md:w-8"
          alt={fixture?.participants?.[0].name}
        />
        <div className="text-center text-xl font-bold text-gray-700 xl:text-xl">
          <span>{homeTeamScore?.score?.goals}&nbsp;</span>
          <span>-</span>
          <span>&nbsp;{awayTeamScore?.score?.goals}</span>
        </div>
        <Image
          unoptimized
          width={250}
          height={250}
          src={fixture.participants?.[1].image_path}
          className=" w-7 md:w-8"
          alt={fixture.participants?.[1].name}
        />
        {/* Team 2 Name */}
        <span
          className={clsx(
            "text-gray-700",
            fixture?.participants?.[1].meta?.winner
              ? "font-bold"
              : "font-medium"
          )}
        >
          {fixture?.participants?.[1]?.name}
        </span>
      </div>

      <div className="grid grid-cols-7">
        <div className="text-center">
          <span className="text-lg font-bold text-primary">
            {minutesPlayed ? (
              minutesPlayed?.data?.value
            ) : (
              <Image
                src={"/mig/icons/bench-svgrepo-com.svg"}
                alt="Bench"
                width={20}
                height={20}
                className="ml-2"
              />
            )}
          </span>
        </div>
        <div className="text-center">
          {goalsMade ? (
            <div className="relative inline-block mx-auto">
              <Image
                width={100}
                height={100}
                alt="Football icon"
                src="/mig/icons/football.png"
                className={clsx("w-6")}
              />
              <span className="absolute -top-1 -right-2 inline-block text-center size-4 text-xs leading-[12px] rounded-full px-0.5 bg-danger text-white">
                {goalsMade?.data?.value}
              </span>
            </div>
          ) : null}
        </div>
        <div className="text-center">
          {assists ? (
            <div className="relative inline-block mx-auto">
              <Image
                width={100}
                height={100}
                alt="Sneaker icon"
                src="/mig/icons/sneaker.png"
                className={clsx("w-6")}
              />
              <span className="absolute -top-1 -right-2 inline-block text-center size-4 text-xs leading-[12px] rounded-full px-0.5 bg-danger text-white">
                {assists?.data?.value}
              </span>
            </div>
          ) : null}
        </div>
        <div className="text-center">
          {yellowCards ? (
            <div className="relative inline-block mx-auto">
              <YellowCard />
              <span className="absolute -top-1 -right-2 inline-block text-center size-4 text-xs leading-[12px] rounded-full px-0.5 bg-danger text-white">
                {yellowCards?.data?.value}
              </span>
            </div>
          ) : null}
        </div>
        <div className="text-center">
          {redCards ? (
            <div className="relative inline-block mx-auto">
              <RedCard />
              <span className="absolute -top-1 -right-2 inline-block text-center size-4 text-xs leading-[16px] rounded-full px-0.5 bg-danger text-white">
                {redCards?.data?.value}
              </span>
            </div>
          ) : null}
        </div>
        <div className="text-center">
          {yellowRedCards ? (
            <div className="relative inline-block mx-auto">
              <div className="inline-flex">
                <YellowCard />
                <RedCard className="absolute top-0 left-1" />
              </div>
              <span className="absolute -top-1 -right-2 inline-block text-center size-4 text-xs leading-[16px] rounded-full px-0.5 bg-danger text-white">
                {yellowRedCards?.data?.value}
              </span>
            </div>
          ) : null}
        </div>
        <div className="text-center">
          <div className="inline-block mx-auto">
            {ratingValue ? (
              <span
                className={clsx(
                  " px-2 py-0 text-sm font-semibold text-white rounded-full",
                  ratingColor
                )}
              >
                {ratingValue < 10
                  ? ratingValue.toFixed(1)
                  : ratingValue.toFixed(0)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopRow;
