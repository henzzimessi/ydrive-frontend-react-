import type { Shift } from "../types/shift";

type DayColumnProps = {
  label: string;
  shifts: Shift[];
};

const DayColumn = ({ label, shifts }: DayColumnProps) => (
  <section className="flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
      <span className="text-xs font-medium text-slate-400">
        {shifts.length} shift{shifts.length === 1 ? "" : "s"}
      </span>
    </div>

    <div className="flex flex-col gap-3">
      {shifts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-sm text-slate-400">
          No shifts yet.
        </p>
      ) : (
        shifts.map((shift) => (
          <div
            key={shift.id}
            className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700"
          >
            {shift.startTime} – {shift.endTime}
          </div>
        ))
      )}
    </div>
  </section>
);

export default DayColumn;
