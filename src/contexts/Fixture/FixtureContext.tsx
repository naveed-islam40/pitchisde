import { createContext, useContext } from "react";

const FixtureContext = createContext(null);

export function FixtureProvider({ children, fixture }) {
  return (
    <FixtureContext.Provider value={fixture}>
      {children}
    </FixtureContext.Provider>
  );
}

export const useFixture = () => useContext(FixtureContext);
