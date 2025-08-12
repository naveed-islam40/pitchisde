import { Dispatch, SetStateAction } from "react";

export interface TeamDisplay {
  name: string;
  logo: string;
  score: number;
  isWinner: boolean;
}

export interface League {
  name: string;
  logo: string;
}

export interface Match {
  id: string | number;
  team1: TeamDisplay;
  team2: TeamDisplay;
  date: string;
  league: League;
}

export interface RowProps {
  team1: TeamDisplay;
  team2: TeamDisplay;
  date: string;
  league: League;
}

export interface LeagueFilterProps {
  leagues: string[];
  selectedLeague: string;
  setSelectedLeague: Dispatch<SetStateAction<string>>;
  matches: Match[];
  homeOnly: boolean;
  setHomeOnly: Dispatch<SetStateAction<boolean>>;
}
