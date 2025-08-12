import { format, addDays, isToday, parse, isValid } from "date-fns";
import numeral from "numeral";

export interface WeekDay {
  weekday: string;
  month: string;
  day: string;
  date: string;
  active: boolean;
}

export function getWeekDays(inputDate: string | Date = new Date()) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = typeof inputDate === "string" ? new Date(inputDate) : inputDate;

  return Array.from({ length: 5 }, (_, i) => {
    const date = addDays(today, i - 2);
    const weekday = isToday(date) ? "Today" : daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const day = format(date, "dd");
    const formattedDate = format(date, "yyyy-MM-dd");
    const active = isToday(date);

    return { weekday, month, day, date: formattedDate, active };
  });
}

export function toQueryString(params: object): string {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
}

export function formatNumber(number: number) {
  return numeral(number).format("0.0a").toUpperCase();
}

export function formatDate(inputDate: any) {
  const date = parse(inputDate, "M/d/yyyy", new Date());
  if(!isValid(date)) return "";
  return format(date, "d MMMM yyyy");
}

export const calculateAverageRating = (
  lineups: any[],
  teamId: number
): number => {
  const ratings = lineups
    .filter((lineup) => lineup.team_id === teamId) // Filter by team ID
    .flatMap(
      (lineup) =>
        lineup.details
          .filter((detail: any) => detail.type.id === 118) // Filter by rating type
          .map((detail: any) => detail.data.value) // Extract rating value
    );

  if (ratings.length === 0) return 0; // Handle case where no ratings are found

  const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = totalRating / ratings.length;

  // Round to 2 decimal places
  return parseFloat(averageRating.toFixed(2));
};

export const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const calculateTeamAverageAge = (lineups) => {
  // Filter out any lineups without a valid date of birth
  const validPlayers = lineups
    .filter((lineup) => lineup.player)
    .filter((lineup) => lineup.player.date_of_birth);

  // Calculate ages and average
  const ages = validPlayers.map((lineup) =>
    calculateAge(lineup.player.date_of_birth)
  );
  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;

  return averageAge ? averageAge.toFixed(1) : "N/A";
};
