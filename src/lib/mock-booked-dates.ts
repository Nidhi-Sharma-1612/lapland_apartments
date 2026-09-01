import { addDays, parseISODate, toISODate } from "@/lib/date-utils";

/** Generic placeholder unavailable-date ranges, used only where a real
 * per-listing calendar isn't available yet (e.g. the homepage search bar,
 * which isn't tied to a specific listing). Real listing pages use
 * `getBookedDates` from `@/lib/hostaway/calendar` instead. */
const BOOKED_RANGES: [string, string][] = [
  ["2026-09-04", "2026-09-08"],
  ["2026-09-14", "2026-09-17"],
  ["2026-09-23", "2026-09-26"],
  ["2026-10-01", "2026-10-05"],
  ["2026-10-11", "2026-10-13"],
  ["2026-10-20", "2026-10-24"],
];

export const MOCK_BOOKED_DATES: string[] = (() => {
  const dates: string[] = [];
  for (const [start, end] of BOOKED_RANGES) {
    let cursor = parseISODate(start);
    const last = parseISODate(end);
    if (!cursor || !last) continue;
    while (cursor.getTime() <= last.getTime()) {
      dates.push(toISODate(cursor));
      cursor = addDays(cursor, 1);
    }
  }
  return dates;
})();
