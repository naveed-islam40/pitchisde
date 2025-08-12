import type { HTMLProps } from "react";
import { Block } from "./Block";

export function GoogleAds(props: HTMLProps<HTMLDivElement>) {
  return (
    <Block
      {...props}
      padding={false}
      contentClassName="flex justify-center p-4"
    >
      <img src="/mig/googleads.png" />
    </Block>
  );
}
