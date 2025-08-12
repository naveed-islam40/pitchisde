import { useCreatePitch } from "@/contexts/CreatePitch/CreatePitchContext";
import { generateFormationFromString } from "@/helpers/generateFormation";
import Image from "next/image";
import { useState } from "react";
import ManagerModal from "./Pitch/ManagerModal";
import PlayerModal from "./Pitch/PlayerModal";
import TeamModal from "./Pitch/TeamModal";

const Pitch = () => {
  const { title, subtitle, selectedFormation, selectedOption } =
    useCreatePitch();
  const formation = generateFormationFromString(selectedFormation || "3-1-4-2");
  const [players, setPlayers] = useState({
    GK: {
      name: "GK",
      position: "GK",
      image: "/add.svg",
    },
  });

  console.log("formation", formation);

  return (
    <div className="bg-[#EFEFEF] h-full col-span-6 rounded-md shadow-y-0-0-18-0">
      {/* card 1  */}
      <div className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-[#006428] font-bold text-2xl italic min-w-[100px] max-w-[200px]">
            {title}
          </h1>
          <h1 className="text-[#006428] text-base italic pt-2">{subtitle}</h1>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-x-2 justify-center mt-3">
            <TeamModal />
            <TeamModal />
          </div>
          <p>28 Apr 2025</p>
        </div>
        <h1 className="text-[#006428] text-2xl font-normal text-center pt-3">
          create<span className="italic font-bold uppercase">Pitchside</span>
        </h1>
      </div>
      {/* card 2  */}
      <div className="bg-[#333] flex justify-between mt-3 py-2 px-4">
        <div className="flex">
          <Image
            src="/mig/icons/create_pitch.png"
            alt="add"
            width={72}
            height={72}
            className="cursor-pointer object-cover"
          />
          <Image
            src="/mig/icons/create_pitch.png"
            alt="add"
            width={72}
            height={72}
            className="cursor-pointer object-cover"
          />
          <Image
            src="/mig/icons/create_pitch.png"
            alt="add"
            width={72}
            height={72}
            className="cursor-pointer object-cover"
          />
        </div>
        <div>
          <Image
            src="/pitchside-logo-white.png"
            alt="add"
            width={150}
            height={150}
          />
        </div>
        <div className="flex">
          <Image
            src="/mig/icons/create_pitch.png"
            alt="add"
            width={72}
            height={72}
            className="cursor-pointer object-cover"
          />
          <Image
            src="/mig/icons/create_pitch.png"
            alt="add"
            width={72}
            height={72}
            className="cursor-pointer object-cover"
          />
          <Image
            src="/mig/icons/create_pitch.png"
            alt="add"
            width={72}
            height={72}
            className="cursor-pointer object-cover"
          />
        </div>
      </div>
      {/* card 3 */}
      <div className="bg-[#FFFFFF]">
        <div className="relative w-full aspect-[5.2/4] bg-cover bg-center bg-no-repeat">
          <Image
            src="/mig/positions/pitch.png"
            alt="add"
            width={2000}
            height={2000}
            className="w-full h-full object-cover"
          />
          {formation.positions.map((pos, i) => (
            <button
              key={i}
              className="absolute text-white text-xl transition-all duration-500 ease-in-out"
              style={{
                top: `${pos.y * 100}%`,
                left: `${pos.x * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PlayerModal />
            </button>
          ))}

          <div className="absolute bottom-4 left-20 flex gap-4">
            <div className="flex gap-2">
              <Image
                src="/mig/icons/pitch_svg.svg"
                alt="add"
                width={20}
                height={20}
              />
              {selectedOption.includes("Formation") && (
                <div>
                  <h1 className="text-base font-bold italic text-white">
                    {selectedFormation || "3-1-4-2"}
                  </h1>
                  <h1 className="text-base font-bold italic text-white">
                    Formation
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-1 right-12 text-white flex items-center gap-2">
            <div>
              <h1 className="text-lg font-bold">Ruben Amorim</h1>
              <p className="text-base font-normal text-end">Manager</p>
            </div>
            <div>
              <ManagerModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitch;
