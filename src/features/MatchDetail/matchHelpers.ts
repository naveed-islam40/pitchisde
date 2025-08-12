import { Events, Period, ProcessedEvent, StatTag } from "@/types/matchTypes";

export const processPeriodEvents = (
  events: Events[],
  period: Period
): (Events | ProcessedEvent)[] => {
  const processed: (Events | ProcessedEvent)[] = [];
  const timeAdded = period.time_added;
  let addedTimeInserted = false;

  if (timeAdded > 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const currentExtra = event.extra_minute || 0;
      const nextEvent = events[i + 1];
      const nextExtra = nextEvent ? nextEvent.extra_minute || 0 : 0;

      processed.push(event);

      if (!addedTimeInserted && currentExtra > 0 && nextExtra === 0) {
        processed.push({
          type: "added_time",
          time: timeAdded,
          id: `added-${period.type_id}-${i}`,
        } as ProcessedEvent);
        addedTimeInserted = true;
      }
    }

    if (!addedTimeInserted && events.some((e) => (e.extra_minute || 0) > 0)) {
      processed.push({
        type: "added_time",
        time: timeAdded,
        id: `added-${period.type_id}-end`,
      } as ProcessedEvent);
    }
  } else {
    processed.push(...events);
  }

  return processed;
};

export const sortEvents = (events: Events[]) => {
  const sortedEvents = events?.sort((a, b) => {
    if (b.period_id !== a.period_id) return b.period_id - a.period_id;

    if (b.minute !== a.minute) return b.minute - a.minute;

    const aExtra = a.extra_minute || 0;
    const bExtra = b.extra_minute || 0;
    if (bExtra !== aExtra) return bExtra - aExtra;

    return b.sort_order - a.sort_order;
  });

  return sortedEvents;
};

export const getPeriodLabel = (typeId) => {
  switch (typeId) {
    case 1:
      return "HT";
    case 2:
      return "FT";
    case 3:
      return "AET";
    case 4:
      return "FTP";
    default:
      return "";
  }
};

export const groupEvents = (sortedEvents: Events[]) => {
  const groupedEvents = sortedEvents?.reduce((acc, event) => {
    const periodType = event.period.type_id;
    if (!acc[periodType]) {
      acc[periodType] = {
        period: event.period,
        events: [],
      };
    }
    acc[periodType].events.push(event);
    return acc;
  }, {});

  return groupedEvents;
};

export const getStatTags = (lineup: any) => {
  const tags: StatTag[] = [];

  if (!lineup.details) return tags;

  lineup.details.forEach((detail) => {
    const type = detail.type.developer_name;
    const value = detail.data?.value || 0;

    switch (type) {
      case "ASSISTS":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/assist.png",
            position: "top-left",
          })
        );
        break;

      case "GOALS":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/goal.png",
            position: "top-right",
          })
        );
        break;
      case "CAPTAIN":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/captain.png",
            position: "bottom-center",
          })
        );
        break;
      case "YELLOWCARDS":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/yellowCard.png",
            position: "middle-left",
          })
        );
        break;
      case "REDCARDS":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/redCard.png",
            position: "bottom-center",
          })
        );
        break;
      case "YELLOWREDCARDS":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/yellowRed.png",
            position: "bottom-center",
          })
        );
        break;
      case "OWN_GOALS":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/ownGoal.png",
            position: "bottom-center",
          })
        );
        break;
      case "PENALTY_SCORED":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/penaltyScore.png",
            position: "bottom-center",
          })
        );
        break;
      case "PENALTY_SAVED":
        tags.push(
          ...Array(value).fill({
            icon: "/mig/icons/penaltySave.png",
            position: "bottom-center",
          })
        );
        break;
      default:
        break;
    }
  });

  return tags;
};

export const getHomeLineUps = (lineups, homeFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === homeFormation.participant_id)
    .filter((lineup) => lineup.formation_field !== null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getHomeSubstitutes = (lineups, homeFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === homeFormation.participant_id)
    .filter((lineup) => lineup.formation_field === null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getAwayLineUps = (lineups, awayFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === awayFormation.participant_id)
    .filter((lineup) => lineup.formation_field !== null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getAwaySubstitutes = (lineups, awayFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === awayFormation.participant_id)
    .filter((lineup) => lineup.formation_field === null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getPlayerRating = (lineup) => {
  const ratingDetail = lineup?.details?.find(
    (detail) => detail.type.id === 118
  );
  return ratingDetail ? ratingDetail.data.value : null;
};

// Rating background color helper
export const getRatingColor = (rating) => {
  if (!rating) return "bg-gray-400";
  if (rating >= 7.5) return "bg-green-500";
  if (rating >= 6.5) return "bg-yellow-500";
  return "bg-orange-400";
};

export const getEventTags = (events: any[], playerId: number) => {
  const tags: { icon: string; minute: number }[] = [];

  events.forEach((event) => {
    if (event.type.code === "substitution") {
      // Substitution Out (Player being replaced)
      if (event.related_player_id === playerId) {
        tags.push({
          icon: "/mig/icons/sub-out.png",
          minute: event.minute,
        });

        // Check for injury
        if (event.injured) {
          tags.push({
            icon: "/mig/icons/injury.png",
            minute: event.minute,
          });
        }
      }
      // Substitution In (Player coming on)
      else if (event.player_id === playerId) {
        tags.push({
          icon: "/mig/icons/sub-in.png",
          minute: event.minute,
        });
      }
    }
  });

  return tags;
};

export const getSideLined = (sidelined, formation) => {
  return sidelined.filter(
    (line) => line.participant_id === formation.participant_id
  );
};
