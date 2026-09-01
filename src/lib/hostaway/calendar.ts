import "server-only";
import { hostawayFetch } from "./client";
import type { HostawayCalendarDay } from "./types";

const CALENDAR_TTL_MS = 15 * 60 * 1000;
const CALENDAR_WINDOW_DAYS = 365;

const calendarCache = new Map<number, { data: HostawayCalendarDay[]; expiresAt: number }>();
const calendarRequests = new Map<number, Promise<HostawayCalendarDay[]>>();

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Shared cached fetch of a listing's raw calendar days over the next year,
 * refreshed every 15 minutes (availability/pricing changes more often than
 * listing details, but doesn't need to be real-time for browsing). Both
 * `getBookedDates` and `getNightlyPrices` derive from this single fetch. */
async function getCalendarDays(listingId: number): Promise<HostawayCalendarDay[]> {
  const cached = calendarCache.get(listingId);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const existing = calendarRequests.get(listingId);
  if (existing) return existing;

  const request = hostawayFetch<HostawayCalendarDay[]>(`/listings/${listingId}/calendar`, {
    searchParams: {
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date(Date.now() + CALENDAR_WINDOW_DAYS * 24 * 60 * 60 * 1000)),
    },
    revalidate: 900,
  })
    .then((days) => {
      const data = days ?? [];
      calendarCache.set(listingId, { data, expiresAt: Date.now() + CALENDAR_TTL_MS });
      return data;
    })
    .finally(() => {
      calendarRequests.delete(listingId);
    });

  calendarRequests.set(listingId, request);
  return request;
}

/** ISO (YYYY-MM-DD) dates that are unavailable for a listing over the next year. */
export async function getBookedDates(listingId: number): Promise<string[]> {
  const days = await getCalendarDays(listingId);
  return days.filter((d) => d.isAvailable === 0).map((d) => d.date);
}

/** ISO (YYYY-MM-DD) date → real nightly price for a listing over the next
 * year, used to compute an accurate stay total instead of a flat rate. */
export async function getNightlyPrices(listingId: number): Promise<Record<string, number>> {
  const days = await getCalendarDays(listingId);
  const prices: Record<string, number> = {};
  for (const day of days) {
    if (typeof day.price === "number") prices[day.date] = day.price;
  }
  return prices;
}
