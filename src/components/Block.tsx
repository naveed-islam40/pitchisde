import { IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import type { HTMLProps } from "react";
import React from "react";

export interface BlockPropsCore {
  contentClassName?: string;
  title?: string | React.ReactNode;
  showNextButton?: boolean;
  padding?: boolean;
  centerTitle?: boolean;
  onNextClick?: () => void;
}

export type BlockProps = Omit<HTMLProps<HTMLDivElement>, "title"> &
  BlockPropsCore;

export function Block({
  className,
  contentClassName,
  title,
  children,
  showNextButton = true,
  padding = true,
  centerTitle = false,
  onNextClick,
  ...rest
}: BlockProps) {
  return (
    <div {...rest} className={clsx("app-block rounded-2xl", className)}>
      {title && (
        <div
          className={clsx(
            "relative flex items-center py-3 px-4",
            (centerTitle && "md:justify-center") || "justify-between"
          )}
        >
          <h2 className="text-lg font-semibold text-primary w-full">{title}</h2>
          {showNextButton && (
            <button
              onClick={onNextClick}
              className="p-1 rounded-lg bg-light hover:bg-primary/20"
            >
              <IconChevronRight className="text-primary size-6 " />
            </button>
          )}
        </div>
      )}
      <div className={clsx(padding && "px-4 pb-4 pt-2", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
