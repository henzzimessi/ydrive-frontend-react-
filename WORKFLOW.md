# Weekly Scheduler – Implementation Workflow (React)

> Date: February 24, 2026

## 1) Requirements Checklist (All Covered)

- Render a 7‑day week view (Monday–Sunday).
- Navigate between weeks (previous/next).
- Clearly display the currently selected week range.
- Add multiple shifts per day.
- Each shift has start time and end time.
- Shifts render immediately after adding.
- Shifts are displayed in chronological order.
- Prevent overlapping shifts within the same day.
- End time must be after start time.
- Form prevents invalid submission (disabled submit).
- Responsive layout (desktop grid, mobile stack).
- Frontend‑only, local state only, no persistence.
- No edit/delete and no drag‑and‑drop required.

## 2) Proposed Data Model

**Type Definitions**

- `Shift`: `{ id: string, startTime: string, endTime: string }`
- `DayKey`: `YYYY-MM-DD`
- `ShiftsByDay`: `Record<DayKey, Shift[]>`

**State**

- `currentWeekStart: Date` (always Monday)
- `shiftsByDay: ShiftsByDay`
- `selectedDayKey: DayKey` (for the add‑shift form)
- `formState: { startTime: string, endTime: string, error?: string }`

## 3) Date & Week Utilities

- `getMonday(date)` → returns Monday of the given date.
- `getWeekDays(weekStart)` → returns 7 dates (Mon–Sun).
- `formatWeekRange(weekStart)` → returns “MMM d – MMM d, yyyy”.
- `toDayKey(date)` → formats date to `YYYY-MM-DD`.

## 4) UI Structure (Component Plan)

- `App`
  - `WeekHeader`
    - Previous / Next buttons
    - Current week range display
  - `WeekGrid`
    - 7 `DayColumn` components
      - Day label (e.g., “Mon 24”)
      - Shift list (chronological)
      - “No shifts” empty state
  - `ShiftForm`
    - Day selector (if not bound to a single column)
    - Start time / End time inputs
    - Add Shift button (disabled if invalid)

## 5) Step‑by‑Step Implementation Workflow

1. **Scaffold** React app if needed (Vite recommended).
2. **Build date utilities** and week calculation helpers.
3. **Implement week navigation** with previous/next buttons.
4. **Render week grid** (7 columns, Monday–Sunday order).
5. **Create shift form** and local form state.
6. **Validate inputs** (end > start, no overlap).
7. **Insert shifts sorted** by start time.
8. **Render shifts** immediately in each day column.
9. **Add responsive styling** (CSS grid → stacked on mobile).
10. **UX polish** (disabled submit, error messages, empty state).

## 6) Validation Logic (Exact Rules)

### End After Start

- Convert times to minutes: `HH:MM → minutes`.
- `endMinutes > startMinutes` must be true.

### Overlap Prevention (Same Day)

Reject if any existing shift overlaps:

- Overlap condition:
  - `newStart < existingEnd && newEnd > existingStart`

## 7) Sorting Logic

- Insert using `Array.sort` by `startTime` (minutes).
- Always render in ascending order.

## 8) UX Expectations

- Add button disabled until:
  - Day selected
  - Start & end provided
  - End > start
  - No overlap error
- Inline error messages for overlap or invalid time.
- Empty state label: “No shifts yet”.
- Keyboard‑friendly form (labels and `aria` attributes).

## 9) Responsive Layout Guidance

- Desktop: 7‑column grid using `display: grid`.
- Tablet: 2–3 columns.
- Mobile: stacked day cards.

## 10) Acceptance Checklist (What to Verify Before Submission)

- [ ] Week view always shows Monday–Sunday in order.
- [ ] Prev/Next updates the week correctly.
- [ ] Week range display is accurate.
- [ ] Adding shift updates UI instantly.
- [ ] Multiple shifts per day supported.
- [ ] Shifts sorted by start time.
- [ ] End time must be after start time.
- [ ] Overlaps are blocked in same day.
- [ ] Form cannot submit invalid data.
- [ ] Layout works on desktop and mobile.

## 11) Optional Enhancements (If Time Allows)

- Use `date-fns` for date formatting utilities.
- Add subtle color tags per day.
- Animate shift entry for clarity.

---

✅ This workflow intentionally covers **every required feature** and includes the exact validation logic to ensure correct behavior and a clean UX.
