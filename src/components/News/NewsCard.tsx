import clsx from "clsx";
import Image from "next/image";

const shadowVariants = {
  dense: "0px 2px 10px 0px #00000040",
  thin: "0px 1px 5px 0px #00000040",
};

type ShadowKey = keyof typeof shadowVariants;

export function NewsCard({
  fill = false,

  title,
}: {
  fill?: boolean;
  shadow?: ShadowKey;
  title?: string;
}) {
  return (
    <div
      className={clsx("rounded-[20px] font-medium", !fill && "max-w-[300px]")}
    >
      <Image
        width={512}
        height={600}
        src="/mig/news/news1.png"
        className="w-full max-w-full rounded-[10px]"
        alt={"news"}
      />
      <p className="mt-2.5">{title}</p>
      <p className="text-right text-xs text-x-grey-1">26 minutes ago</p>
    </div>
  );
}
