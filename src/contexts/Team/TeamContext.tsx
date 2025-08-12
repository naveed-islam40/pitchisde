import { createContext, useContext } from "react";

const TeamContext = createContext(null);

export function TeamProvider({ children, team }) {
  return <TeamContext.Provider value={team}>{children}</TeamContext.Provider>;
}

export const useTeam = () => useContext(TeamContext);
