import { useState } from "react";
import type { DayKey } from "../types/shift";
import { toDayKey } from "../utils/date";

type ShiftFormProps = {
  days: Date[];
  selectedDayKey: DayKey;
  onSelectedDayChange: (dayKey: DayKey) => void;
  onAddShift: (dayKey: DayKey, startTime: string, endTime: string) => void;
  getShiftError: (
    dayKey: DayKey,
    startTime: string,
    endTime: string,
  ) => string | null;
  formatDayOption: (date: Date) => string;
};

const ShiftForm = ({
  days,
  selectedDayKey,
  onSelectedDayChange,
  onAddShift,
  getShiftError,
  formatDayOption,
}: ShiftFormProps) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const error = getShiftError(selectedDayKey, startTime, endTime);
  const canSubmit = Boolean(selectedDayKey && startTime && endTime && !error);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    onAddShift(selectedDayKey, startTime, endTime);
    setStartTime("");
    setEndTime("");
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Day
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
            value={selectedDayKey}
            onChange={(event) => onSelectedDayChange(event.target.value)}
          >
            {days.map((day) => {
              const dayKey = toDayKey(day);
              return (
                <option key={dayKey} value={dayKey}>
                  {formatDayOption(day)}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Start time
          <input
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          End time
          <input
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
            required
          />
        </label>
      </div>

      {error ? (
        <p className="text-sm font-medium text-rose-500">{error}</p>
      ) : null}

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          disabled={!canSubmit}
        >
          Add shift
        </button>
      </div>
    </form>
  );
};

export default ShiftForm;
