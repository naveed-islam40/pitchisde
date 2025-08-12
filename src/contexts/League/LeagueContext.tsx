import { createContext, useContext } from "react";

const LeagueContext = createContext(null);

export function LeagueProvider({ children, league }) {
  return (
    <LeagueContext.Provider value={league}>{children}</LeagueContext.Provider>
  );
}

export const useLeague = () => useContext(LeagueContext);
          