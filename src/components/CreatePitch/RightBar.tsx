import Image from "next/image";
import React from "react";

const RightBar = () => {
  return (
    <div className="h-screen col-span-3 flex flex-col gap-4">
      {/* card 1  */}
      <div className="rounded-md bg-white shadow-x-0-0-20-0 flex justify-center">
        <Image
          src="/mig/icons/create_pitch.png"
          alt="add"
          width={200}
          height={200}
        />
      </div>
      <div className="rounded-md bg-white shadow-x-0-0-20-0 flex justify-center">
        <Image
          src="/mig/icons/create_pitch.png"
          alt="add"
          width={200}
          height={200}
        />
      </div>
      <div className="rounded-md bg-white shadow-x-0-0-20-0 flex justify-center">
        <Image
          src="/mig/icons/create_pitch.png"
          alt="add"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default RightBar;
