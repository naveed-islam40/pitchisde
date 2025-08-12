import { LazyExoticComponent, Suspense } from "react";
import { Spinner } from "@/components/Spinner";

import { lazy } from "react";

export default function loadable(
  Comp: LazyExoticComponent<any>,
  fallback?: NonNullable<React.ReactNode>
): React.ComponentType {
  if (fallback === undefined) fallback = <Spinner />;

  const LoadableComp = () => (
    <Suspense fallback={fallback}>
      <Comp />
    </Suspense>
  );
  const compName = Comp.name || "Component";
  LoadableComp.displayName = `Loadable(${compName})`;

  return LoadableComp;
}

export function lazyload(
  Comp: Parameters<typeof lazy>[0],
  fallback?: NonNullable<React.ReactNode>
): React.ComponentType {
  return loadable(lazy(Comp), fallback);
}
