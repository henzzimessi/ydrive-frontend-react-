// Shift helpers focused on time-based conflict detection.
// Logic lives here to keep UI components lean.
import type { Shift } from "../types/shift";
import { timeToMinutes } from "./time";

export const hasOverlap = (
  existing: Shift[],
  start: string,
  end: string,
): boolean => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  if (startMinutes === null || endMinutes === null) {
    return false;
  }

  return existing.some((shift) => {
    const shiftStart = timeToMinutes(shift.startTime) ?? 0;
    const shiftEnd = timeToMinutes(shift.endTime) ?? 0;
    return startMinutes < shiftEnd && endMinutes > shiftStart;
  });
};
