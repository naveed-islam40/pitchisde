export function groupFixturesByDate(array) {
  const grouped = array.reduce((acc, obj) => {
    const key = obj?.starting_at?.split(" ")[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((key) => ({
      date: key,
      matches: grouped[key],
    }));
}

// [groupFixturesByWeek]

export function groupFixturesByWeek(data) {
  const unsortedFixturesByWeek = {};

  if (!Array.isArray(data) || data.length === 0) return {};

  const getWeekStart = (dateStr) => {
    const date = new Date(dateStr.replace(" ", "T"));
    const day = date.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;

    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);

    return monday.toISOString().split("T")[0];
  };

  for (const stageObj of data) {
    if (!stageObj.rounds) continue;

    for (const round of stageObj.rounds) {
      if (!round.fixtures) continue;

      for (const fixture of round.fixtures) {
        const weekRange = getWeekStart(fixture.starting_at);
        if (!unsortedFixturesByWeek[weekRange]) {
          unsortedFixturesByWeek[weekRange] = [];
        }
        unsortedFixturesByWeek[weekRange].unshift(fixture);
      }
    }
  }

  const sortedWeeks = Object.keys(unsortedFixturesByWeek).sort().reverse();

  const fixturesByWeek = {};
  for (const week of sortedWeeks) {
    fixturesByWeek[week] = unsortedFixturesByWeek[week];
  }

  return fixturesByWeek;
}

export function groupByMatchWeeks(data) {
  if (!Array.isArray(data) || data.length === 0) return {};

  const grouped = {};

  for (const stage of data) {
    if (stage.games_in_current_week && stage?.aggregates?.length > 0) {
      for (const fixtures of stage?.aggregates) {
        if (!grouped["Current Week Matches"]) {
          grouped["Current Week Matches"] = [];
        }
        grouped["Current Week Matches"].push(...fixtures?.fixtures);
      }
    }
  }

  // Sort the fixtures by starting_at datetime (ascending)
  if (grouped["Current Week Matches"]) {
    grouped["Current Week Matches"].sort(
      (a, b) =>
        new Date(b.starting_at).getTime() - new Date(a.starting_at).getTime()
    );
  }

  return grouped;
}

export function groupFixturesByStage(data) {
  if (!Array.isArray(data) || data.length === 0) return [];
  
  const fixtures: any = [];
  for (const aggregate of data) {
    for (const fixture of aggregate?.fixtures) {
      fixtures.push(fixture);
    }
  }

  return fixtures;
}
