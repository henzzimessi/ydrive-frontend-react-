export const timeToMinutes = (time: string): number | null => {
  if (!time) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
};

export const isEndAfterStart = (start: string, end: string): boolean => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  if (startMinutes === null || endMinutes === null) {
    return false;
  }

  return endMinutes > startMinutes;
};

export const compareTimes = (first: string, second: string): number => {
  const firstMinutes = timeToMinutes(first) ?? 0;
  const secondMinutes = timeToMinutes(second) ?? 0;
  return firstMinutes - secondMinutes;
};
