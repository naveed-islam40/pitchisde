import { CSSProperties, ReactNode, useEffect, useId, useState } from "react";
import { createRoot, type Root as ReactRoot } from "react-dom/client";

interface CacheValue {
  id: string;
  alive: number;
  container: HTMLElement;
  root: ReactRoot;
}

let renderedFilters = new Map<number, CacheValue>();
// @ts-ignore
// window.rf = renderedFilters;

function onMount(thisId: string, radius: number): string {
  let cacheValue = renderedFilters.get(radius);

  if (cacheValue) {
    cacheValue.alive++;
    return cacheValue.id;
  } else {
    let container = document.createElement("div");
    let root = createRoot(container);
    root.render(CreateFilterNode(thisId, radius));
    document.body.appendChild(container);

    renderedFilters.set(radius, {
      id: thisId,
      alive: 1,
      container,
      root,
    });
    return thisId;
  }
}

function onUmount(radius: number) {
  let cacheValue = renderedFilters.get(radius);

  if (cacheValue) {
    if (cacheValue.alive === 1) {
      let { root, container } = cacheValue;
      setTimeout(() => {
        root.unmount();
        container.remove();
      }, 0);

      renderedFilters.delete(radius);
    } else {
      cacheValue.alive--;
    }
  }
}

function CreateFilterNode(id: string, radius: number) {
  return (
    <svg
      data-hexagon="true"
      width={0}
      height={0}
      className="invisible absolute"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={radius}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

export function HexagonFilter({
  radius = 8,
  sideOffset = "25%",
  children,
}: {
  radius?: number;
  sideOffset?: number | string;

  // eslint-disable-next-line no-unused-vars
  children: (props: {
    style: CSSProperties;
    filterStyle: CSSProperties;
    id: string;
  }) => ReactNode;
}) {
  const thisId = useId();
  const [effectiveId, setEffectiveId] = useState(thisId);

  useEffect(() => {
    let id = onMount(thisId, radius);
    setEffectiveId(id);
    return () => {
      onUmount(radius);
    };
  }, [radius]);

  if (typeof sideOffset === "number") sideOffset = `${sideOffset}px`;

  let filterStyle: CSSProperties = { filter: `url(#${effectiveId})` };

  let style: CSSProperties = {
    ...filterStyle,
    clipPath: `polygon(
      ${sideOffset} 0,
      calc(100% - ${sideOffset}) 0,
      100% 50%,
      calc(100% - ${sideOffset}) 100%,
      ${sideOffset} 100%,
      0% 50%)
    `,
  };

  return children({ style, filterStyle, id: effectiveId });
}
