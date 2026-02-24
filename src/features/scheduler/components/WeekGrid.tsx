import type { Shift, ShiftsByDay } from "../types/shift";
import { toDayKey } from "../utils/date";
import DayColumn from "./DayColumn";

type WeekGridProps = {
  days: Date[];
  dayLabels: Record<string, string>;
  shiftsByDay: ShiftsByDay;
};

const WeekGrid = ({ days, dayLabels, shiftsByDay }: WeekGridProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
    {days.map((day) => {
      const dayKey = toDayKey(day);
      const shifts: Shift[] = shiftsByDay[dayKey] ?? [];

      return (
        <DayColumn key={dayKey} label={dayLabels[dayKey]} shifts={shifts} />
      );
    })}
  </div>
);

export default WeekGrid;
