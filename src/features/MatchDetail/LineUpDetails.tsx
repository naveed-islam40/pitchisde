import {
  calculateAverageRating,
  calculateTeamAverageAge,
} from "@/utils/generics";
import Image from "next/image";
import { FaShirt } from "react-icons/fa6";
import PlayerCard from "./lineups/PlayerCard";
import Sidelined from "./lineups/Sidelined";
import SoccerLineup from "./lineups/SoccerLineup";
import {
  getAwayLineUps,
  getAwaySubstitutes,
  getHomeLineUps,
  getHomeSubstitutes,
  getRatingColor,
  getSideLined,
} from "./matchHelpers";

const LineUpDetails = ({
  formations,
  lineups,
  metadata,
  participants,
  coaches,
  events,
  activeToggle,
  sidelined,
}: any) => {
  const homeFormation = formations.find(
    (formation) => formation.location === "home"
  );
  const awayFormation = formations.find(
    (formation) => formation.location === "away"
  );

  if (!homeFormation || !awayFormation) return;

  const homeLineups = getHomeLineUps(lineups, homeFormation);
  const homeSubstitutes = getHomeSubstitutes(lineups, homeFormation);

  const awayLineups = getAwayLineUps(lineups, awayFormation);
  const awaySubstitutes = getAwaySubstitutes(lineups, awayFormation);

  const homeFormationArray = homeFormation.formation.split("-");
  const homePlayersHeight = 100 / homeFormationArray.length - 5;

  const awayFormationArray = awayFormation.formation.split("-");
  const awayPlayersHeight = 100 / awayFormationArray.length - 5;

  const homeParticipantLogo = participants[0].image_path;
  const awayParticipantLogo = participants[1].image_path;

  const HomeshirtMetadata = metadata.find((item) => item?.type_id === 161);

  const AwayshirtMetadata = metadata.find((item) => item?.type_id === 162);

  const homeShirt = HomeshirtMetadata?.values?.participant;
  const awayShirt = AwayshirtMetadata?.values?.participant;

  const homeManager = coaches[0].display_name;
  const homeManagerImg = coaches[0].image_path;
  const awayManager = coaches[1].display_name;
  const awayManagerImg = coaches[1].image_path;

  const homeTeamId = homeFormation.participant_id;
  const awayTeamId = awayFormation.participant_id;

  const homeAverageRating = calculateAverageRating(lineups, homeTeamId);
  const awayAverageRating = calculateAverageRating(lineups, awayTeamId);

  const homeAverageAge = calculateTeamAverageAge(
    lineups.filter((lineup) => lineup.team_id === homeTeamId)
  );
  const awayAverageAge = calculateTeamAverageAge(
    lineups.filter((lineup) => lineup.team_id === awayTeamId)
  );

  return (
    <>
      <div className="bg-[#00973c] p-6">
        <div className="flex gap-6 mt-3">
          <div className="md:w-8/12">
            {/* Top manager and shirts part  */}
            <div className="flex items-center justify-between w-full mb-2 ">
              <div className="flex items-center gap-2">
                <Image
                  src={homeParticipantLogo}
                  alt="home_log"
                  width={512}
                  height={512}
                  className="w-12  object-cover h-auto"
                />
                <span className="text-white font-semibold">
                  {homeFormation.formation}
                </span>
                <FaShirt className="w-12 h-auto" style={{ color: homeShirt }} />
                <span
                  className={`px-2 rounded-full text-xs text-white ${getRatingColor(
                    homeAverageRating
                  )}`}
                >
                  {(activeToggle === "rating" || activeToggle === "country") &&
                    (homeAverageRating ?? "N/A")}
                </span>
                <span className="px-2 bg-gray-600 rounded-full text-xs -ml-3 text-white">
                  {activeToggle === "age" && (homeAverageAge ?? "N/A")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-white font-semibold text-right">
                    {homeManager}
                  </p>
                  <p className="text-white text-sm font-normal text-right">
                    Manager
                  </p>
                </div>
                <div>
                  <Image
                    width={512}
                    height={512}
                    unoptimized
                    src={homeManagerImg}
                    alt="Manager"
                    className="rounded-full w-12  object-cover h-auto"
                  />
                </div>
              </div>
            </div>

            <SoccerLineup
              homeLineups={homeLineups}
              awayLineups={awayLineups}
              events={events}
              activeToggle={activeToggle}
              awayFormationArray={awayFormationArray}
              awayPlayersHeight={awayPlayersHeight}
              homeFormationArray={homeFormationArray}
              homePlayersHeight={homePlayersHeight}
            />

            <div className="flex items-center mt-2 justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  src={awayParticipantLogo}
                  alt="away_log"
                  width={30}
                  height={30}
                  className="w-12 h-auto"
                />
                <span className="text-white font-semibold">
                  {awayFormation.formation}
                </span>
                <FaShirt className="w-12 h-auto" style={{ color: awayShirt }} />
                <span
                  className={`px-2 rounded-full text-xs text-white ${getRatingColor(
                    awayAverageRating
                  )}`}
                >
                  {(activeToggle === "rating" || activeToggle === "country") &&
                    (awayAverageRating ?? "N/A")}
                </span>
                <span className="px-2 bg-gray-600 rounded-full text-xs -ml-3 text-white">
                  {activeToggle === "age" && (awayAverageAge ?? "N/A")}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-white font-semibold text-right">
                      {awayManager}
                    </p>
                    <p className="text-white text-sm font-normal text-right">
                      Manager
                    </p>
                  </div>
                  <div>
                    <Image
                      width={512}
                      height={512}
                      unoptimized
                      src={awayManagerImg}
                      alt="Manager"
                      className="rounded-full w-12 bg-white object-cover h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative md:w-4/12 flex-col flex justify-between my-14">
            <PlayerCard
              substitutes={homeSubstitutes}
              events={events}
              activeToggle={activeToggle}
            />
            <PlayerCard
              substitutes={awaySubstitutes}
              events={events}
              activeToggle={activeToggle}
            />
          </div>
        </div>
      </div>
      {/* Side Lined Players */}
      <div className="w-full">
        <div className="flex items-center justify-center py-3">
          <span className="text-[#00401A] font-semibold text-center  w-full text-lg">
            Sidelined
          </span>
        </div>

        <div className=" grid grid-cols-2">
          <Sidelined sidelined={getSideLined(sidelined, homeFormation)} />
          <Sidelined sidelined={getSideLined(sidelined, awayFormation)} />
        </div>
      </div>
    </>
  );
};

export default LineUpDetails;
