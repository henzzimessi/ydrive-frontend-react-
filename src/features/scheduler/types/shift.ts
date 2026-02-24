export type DayKey = string;

export type Shift = {
  id: string;
  startTime: string;
  endTime: string;
};

export type ShiftsByDay = Record<DayKey, Shift[]>;
