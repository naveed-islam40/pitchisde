import { createContext, useContext } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children, player }) {
  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
