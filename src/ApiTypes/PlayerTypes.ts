export const statTypes = {
    goals: 52,
    penaltiesScored: 111,
    penaltiesWon: 115,
    assists: 79,
    shotsOnTarget: 86,
    totalShots: 42,
    shotsBlocked: 58,
    hitWoodwork: 64,
    keyPasses: 117,
    longBalls: 122,
    longBallsWon: 123,
    throughBalls: 124,
    throughBallsWon: 125,
    totalCrosses: 98,
    accurateCrosses: 99,
    totalDuels: 105,
    duelsWon: 106,
    dribbleAttemps: 108,
    successfulDribbles: 109,
    offsides: 51,
    dispossessed: 94
  };

  export const goalKeeperTypeIds = {
    saves: 57,
    savesInsideBox: 104,
    penaltiesSaved: 113
  }
  
  export const foulTypeIds = {
  fouls: 56,
  foulsDrawn: 96,
  yellowCards: 84,
  redCards: 83
};


export const defensiveTypeIds = {
  clearances: 101,
  tackles: 78,
  interceptions: 100,
  dribbledPast: 110,
  blockedShots: 97,
  errorLeadToGoal: 571,
  penaltiesCommitted: 114,
  goalsConceded: 88,
  cleanSheets: 194
};

export const appearanceTypeIds = {
  rating: 118,
  appearances: 321,
  substitutions: 59,
  bench: 323,
  minutesPlayed: 119
};

export const allTypeIds = {
  Offensive: Object.values(statTypes),
  GoalKeeper: Object.values(goalKeeperTypeIds),
  Discipline: Object.values(foulTypeIds),
  Defensive: Object.values(defensiveTypeIds),
  Overall: Object.values(appearanceTypeIds),
};

