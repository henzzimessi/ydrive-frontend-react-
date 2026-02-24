type WeekHeaderProps = {
  weekRangeLabel: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
};

const WeekHeader = ({
  weekRangeLabel,
  onPreviousWeek,
  onNextWeek,
}: WeekHeaderProps) => (
  <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        Weekly schedule
      </p>
      <h1 className="text-2xl font-semibold text-slate-900">
        {weekRangeLabel}
      </h1>
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        onClick={onPreviousWeek}
      >
        Previous
      </button>
      <button
        type="button"
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        onClick={onNextWeek}
      >
        Next
      </button>
    </div>
  </header>
);

export default WeekHeader;
