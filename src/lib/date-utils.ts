export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parses a "YYYY-MM-DD" string into a local Date (avoids the UTC-parsing
 * off-by-one-day bug that `new Date(isoString)` has in negative-UTC-offset
 * timezones). */
export function parseISODate(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** True if any night of the [checkIn, checkOut) stay falls on a booked
 * date. Shared by the booking widget (to reject a pre-filled but no-longer-
 * available range) and the apartments search (to filter results by real
 * per-listing availability), so both agree on exactly the same logic. */
export function rangeOverlapsBookedDates(
  checkIn: string,
  checkOut: string,
  bookedDates: string[] | undefined,
): boolean {
  if (!checkIn || !checkOut || !bookedDates?.length) return false;
  const start = parseISODate(checkIn);
  const end = parseISODate(checkOut);
  if (!start || !end) return false;

  const bookedSet = new Set(bookedDates);
  let cursor = start;
  while (cursor.getTime() < end.getTime()) {
    if (bookedSet.has(toISODate(cursor))) return true;
    cursor = addDays(cursor, 1);
  }
  return false;
}

export const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Monday-first calendar grid for a given month: 42 cells (6 weeks),
 * `null` for the leading/trailing days outside the month. */
export function getMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startWeekday = (first.getDay() + 6) % 7; // 0 = Monday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
