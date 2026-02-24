// Date helpers for the weekly view (Monday–Sunday) and day formatting.
// Kept small and pure for easy testing and reuse.
const DAY_COUNT = 7;

export const getMonday = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  const day = normalized.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  normalized.setDate(normalized.getDate() + diff);
  return normalized;
};

export const addDays = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const getWeekDays = (weekStart: Date): Date[] =>
  Array.from({ length: DAY_COUNT }, (_, index) => addDays(weekStart, index));

export const toDayKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDayLabel = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);

export const formatWeekRange = (weekStart: Date): string => {
  const weekEnd = addDays(weekStart, DAY_COUNT - 1);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatter.format(weekStart)} – ${formatter.format(weekEnd)}`;
};

export const isDateInRange = (
  date: Date,
  rangeStart: Date,
  rangeEnd: Date,
): boolean => date >= rangeStart && date <= rangeEnd;
