import { formatNumber } from "@/utils/generics";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaCircleChevronRight } from "react-icons/fa6";

function TransferCell({ transfer, teamId }) {
  if (!transfer) return null;

  const { player, fromteam, toteam, type_id, position, type } = transfer;

  if (type_id === 9688) return null; // if type is end of loan

  const transferOut = fromteam.id === teamId;
  return (
    <Link
      href={`/player/${player.id}`}
      className=" app-block py-4 rounded-xl text-dark  hover:bg-neutral-50 transition-all duration-200"
    >
      <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full bg-dark/30">
        <Image
          width={200}
          height={200}
          src={player.image_path}
          className=" object-cover"
          alt={player.name}
          title={player.name}
        />
      </div>

      <h5 className="mt-2 block text-center text-xl font-semibold leading-tight text-dark hover:underline text-nowrap">
        {player.name}
        <br />
        <span className="text-sm text-center">{position?.name}</span>
      </h5>

      <div className="flex justify-center items-center gap-x-2 my-2">
        {!transferOut && (
          <Image
            width={150}
            height={150}
            src={fromteam.image_path}
            className="w-7"
            alt={fromteam.name}
            title={`Transfer from ${fromteam.name}`}
          />
        )}
        <FaCircleChevronRight
          className={clsx(
            "size-5",
            transferOut ? "fill-red-500" : "fill-green-500"
          )}
        />
        {toteam && (
          <Image
            width={150}
            height={150}
            src={toteam.image_path}
            className="w-7"
            alt={toteam.name}
            title={`Transfer to ${toteam.name}`}
          />
        )}
      </div>
      <h5 className="text-center font-extrabold text-2xl">
        {transfer.amount ? `${formatNumber(transfer.amount)} (€)` : null}
      </h5>
      <h6 className="font-medium text-center">{type?.name}</h6>
    </Link>
  );
}

export default TransferCell;
