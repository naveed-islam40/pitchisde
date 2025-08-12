import Image from "next/image";

export default function SearchButton({ setOpen }) {
  return (
    <div
      onClick={() => {
        setOpen(true);
      }}
      className={`flex-1 relative flex items-center text-neutral-700 z-30 cursor-pointer`}
    >
      <div className="relative flex h-10 w-72 items-center text-black">
        <div className="bg-x-bargreen flex items-center self-stretch pl-7 pr-4 z-50">
          <Image
            width={32}
            height={32}
            src="/mig/icons/search.svg"
            className="h-5 object-contain"
            alt="Search Icon"
          />
        </div>
        <span className="text-gray-400">Search...</span>
      </div>
    </div>
  );
}
