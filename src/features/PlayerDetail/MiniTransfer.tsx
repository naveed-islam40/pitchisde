import { Block } from "@/components/Block";
import { formatNumber } from "@/utils/generics";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

function Row({ transfer }) {
  const { toteam, date, amount, type } = transfer;

  if (!toteam) return null;

  return (
    <div className="col-span-full grid grid-cols-subgrid items-center gap-x-8 font-medium text-fine">
      <div className="flex items-center gap-x-3">
        {toteam && (
          <Image
            width={250}
            height={250}
            src={toteam.image_path}
            className="w-7"
            alt={toteam.name}
          />
        )}
        <Link href={`/team/${toteam.id}/overview`}>{toteam?.name}</Link>
      </div>
      <span className="justify-self-center text-center">
        {dayjs(date).format("MMM YYYY")}
      </span>
      <span className="justify-self-center text-center">
        {type.name} <br />
        <span>{amount ? `€${formatNumber(transfer.amount)}` : ""}</span>
      </span>
    </div>
  );
}

export function MiniTransfer({ transfers }) {
  return (
    <Block title="Transfers" showNextButton={false}>
      <div className="grid grid-cols-[1fr,auto,auto] gap-y-4">
        {transfers
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((transfer) => (
            <Row key={transfer.id} transfer={transfer} />
          ))}
      </div>
    </Block>
  );
}
