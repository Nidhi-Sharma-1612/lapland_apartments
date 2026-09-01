import { addDays, parseISODate, toISODate } from "@/lib/date-utils";

/** Sums real per-night prices for a stay, falling back to a flat rate for any
 * night outside the fetched pricing window. Used both for the live estimate
 * shown in the booking widget (client) and the authoritative charge amount
 * computed server-side in the checkout route — same function, so the two
 * never drift apart. */
export function computeStayTotal(
  checkIn: string,
  checkOut: string,
  nightlyPrices: Record<string, number> | undefined,
  fallbackRate: number,
): number {
  const start = parseISODate(checkIn);
  const end = parseISODate(checkOut);
  if (!start || !end || end.getTime() <= start.getTime()) return 0;

  let total = 0;
  let cursor = start;
  while (cursor.getTime() < end.getTime()) {
    total += nightlyPrices?.[toISODate(cursor)] ?? fallbackRate;
    cursor = addDays(cursor, 1);
  }
  return Math.round(total * 100) / 100;
}
