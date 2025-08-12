import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLProps, PropsWithChildren } from "react";
import { AccordionTrigger } from "./ui/accordion";

export function TitleStrip({
  title,
  icon,
  leagueId,
  matches,
}: {
  title: string;
  icon: string;
  matches?: any;
  leagueId?: string;
}) {
  const totalMatches = matches?.length;
  const ongoingStates = new Set([2, 3, 4, 6, 7, 9, 21, 22, 23, 25]);
  const ongoingMatches = matches?.filter((item) =>
    ongoingStates.has(item.state_id)
  ).length;

  return (
    <AccordionTrigger
      className={
        "w-full border-b group hover:no-underline px-4 group [&>svg]:size-6 [&>svg]:text-primary"
      }
    >
      <div className="flex flex-1 items-center ">
        <Image
          width={150}
          height={150}
          src={icon}
          className=" mr-3 h-8 w-8 object-contain"
          alt={`${title} Logo`}
        />
        <Link
          href={`/league/${leagueId}/overview`}
          className="hover:underline underline-offset-2"
        >
          <h1 className=" font-bold text-primary text-lg">{title}</h1>
        </Link>
        <div className="flex gap-x-2 ml-auto">
          <span
            className={clsx(
              "font-semibold text-sm inline-block rounded-full p-1 px-2 text-white leading-none group-[data-state=open]:hidden mr-2",
              ongoingMatches ? "bg-primary" : "bg-dark/50"
            )}
          >
            {ongoingMatches
              ? `${ongoingMatches}/${totalMatches}`
              : totalMatches}
          </span>
        </div>
      </div>
    </AccordionTrigger>
  );
}

export function TitleStripSimple({
  title = undefined,
  center = true,
  className,
  children,
}: PropsWithChildren & any) {
  return (
    <div
      style={{
        boxShadow: "0px 1px 2px 0px #00000040",
      }}
      className={clsx(
        "flex items-center bg-[#F2F2F2] px-4 py-4",
        center && "justify-center",
        className
      )}
    >
      {title && (
        <h1 className="text-xl font-bold text-x-bargreen xl:text-2xl">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

export function TitleStripRaw({
  className,
  style,
  children,
  ...rest
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...rest}
      style={{
        boxShadow: "0px 1px 2px 0px #00000040",
        ...style,
      }}
      className={clsx("bg-[#F2F2F2]", className)}
    >
      {children}
    </div>
  );
}
