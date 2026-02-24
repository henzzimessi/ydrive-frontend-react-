// Weekly scheduler container: coordinates week navigation, validation, and shift state.
// UI composition stays in small components for clarity and reuse.
import { useEffect, useMemo, useState } from "react";
import ShiftForm from "./components/ShiftForm";
import WeekGrid from "./components/WeekGrid";
import WeekHeader from "./components/WeekHeader";
import type { DayKey, Shift, ShiftsByDay } from "./types/shift";
import {
  addDays,
  formatDayLabel,
  formatWeekRange,
  getMonday,
  getWeekDays,
  isDateInRange,
  toDayKey,
} from "./utils/date";
import { compareTimes, isEndAfterStart } from "./utils/time";
import { hasOverlap } from "./utils/shift";

const createShiftId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now());

const SchedulerPage = () => {
  const today = useMemo(() => new Date(), []);
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getMonday(today),
  );
  const [shiftsByDay, setShiftsByDay] = useState<ShiftsByDay>({});

  const days = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);
  const weekRangeLabel = useMemo(
    () => formatWeekRange(currentWeekStart),
    [currentWeekStart],
  );

  const dayLabels = useMemo(() => {
    const entries = days.map(
      (day) => [toDayKey(day), formatDayLabel(day)] as const,
    );
    return Object.fromEntries(entries);
  }, [days]);

  const defaultDayKey = useMemo(() => {
    const weekEnd = addDays(currentWeekStart, 6);
    const target = isDateInRange(today, currentWeekStart, weekEnd)
      ? today
      : currentWeekStart;
    return toDayKey(target);
  }, [currentWeekStart, today]);

  const [selectedDayKey, setSelectedDayKey] = useState<DayKey>(defaultDayKey);

  useEffect(() => {
    setSelectedDayKey(defaultDayKey);
  }, [defaultDayKey]);

  const getShiftError = (
    dayKey: DayKey,
    startTime: string,
    endTime: string,
  ): string | null => {
    if (!dayKey || !startTime || !endTime) {
      return null;
    }

    if (!isEndAfterStart(startTime, endTime)) {
      return "End time must be after start time.";
    }

    const existing = shiftsByDay[dayKey] ?? [];

    if (hasOverlap(existing, startTime, endTime)) {
      return "Shift overlaps with an existing shift.";
    }

    return null;
  };

  const handleAddShift = (
    dayKey: DayKey,
    startTime: string,
    endTime: string,
  ) => {
    const error = getShiftError(dayKey, startTime, endTime);

    if (error) {
      return;
    }

    const newShift: Shift = {
      id: createShiftId(),
      startTime,
      endTime,
    };

    setShiftsByDay((previous) => {
      const existing = previous[dayKey] ?? [];
      const next = [...existing, newShift].sort((a, b) =>
        compareTimes(a.startTime, b.startTime),
      );
      return {
        ...previous,
        [dayKey]: next,
      };
    });
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  };

  return (
    <div className="flex flex-col gap-6">
      <WeekHeader
        weekRangeLabel={weekRangeLabel}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />

      <ShiftForm
        days={days}
        selectedDayKey={selectedDayKey}
        onSelectedDayChange={setSelectedDayKey}
        onAddShift={handleAddShift}
        getShiftError={getShiftError}
        formatDayOption={formatDayLabel}
      />

      <WeekGrid days={days} dayLabels={dayLabels} shiftsByDay={shiftsByDay} />
    </div>
  );
};

export default SchedulerPage;
