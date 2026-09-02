import "server-only";
import { cache } from "react";
import { hostawayFetch } from "./client";
import { getBookedDates, getNightlyPrices } from "./calendar";
import { getReviewCountsByListing } from "./reviews";
import { isHostawayConfigured } from "./config";
import { slugify } from "@/lib/slugify";
import { LOCATIONS } from "@/lib/locations";
import {
  ALL_APARTMENTS as MOCK_ALL_APARTMENTS,
  FEATURED_APARTMENTS as MOCK_FEATURED_APARTMENTS,
} from "@/lib/mock-apartments";
import { APARTMENT_DETAIL as MOCK_APARTMENT_DETAIL } from "@/lib/mock-apartment-detail";
import type { Apartment, ApartmentDetail } from "@/lib/types";
import type { HostawayListing } from "./types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop";
const DEFAULT_RATING = 4.8;

/** Rovaniemi's real listing data has no usable neighborhood/area field
 * (`city` is always "Rovaniemi"), so we bucket by geographic distance to two
 * reference points instead: the compact downtown core, and Ounasvaara — the
 * one genuinely separable outlying area across the river. Verified against
 * all 100 live listings: this cleanly isolates ~13 outlying properties
 * clustered east of the river (ski slopes/forest, higher longitude) from
 * the ~87 within the walkable core, with no ambiguous split. */
const CITY_CENTER_ANCHOR = { lat: 66.5001, lng: 25.7286 };
const OUNASVAARA_ANCHOR = { lat: 66.4917, lng: 25.7847 };

function squaredDistance(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  return (a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2;
}

function pickLocationBucket(listing: HostawayListing): string {
  if (typeof listing.lat === "number" && typeof listing.lng === "number") {
    const point = { lat: listing.lat, lng: listing.lng };
    return squaredDistance(point, OUNASVAARA_ANCHOR) < squaredDistance(point, CITY_CENTER_ANCHOR)
      ? "Ounasvaara"
      : "City center";
  }

  // Fallback for listings missing coordinates: substring match on address text.
  const haystack = `${listing.street ?? ""} ${listing.city ?? ""} ${listing.address ?? ""} ${listing.publicAddress ?? ""}`.toLowerCase();
  const match = LOCATIONS.find((loc) => loc.value && haystack.includes(loc.value.toLowerCase()));
  return match?.value || "City center";
}

function listingTitle(listing: HostawayListing): string {
  return (
    listing.externalListingName || listing.name || listing.internalListingName || `Apartment ${listing.id}`
  );
}

function listingImages(listing: HostawayListing): string[] {
  const urls = (listing.listingImages ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((img) => img.url)
    .filter((url): url is string => Boolean(url));
  return urls.length > 0 ? urls : [FALLBACK_IMAGE];
}

/** `starRating` is null on every listing we've observed on this account;
 * `averageReviewRating` (0–10 scale) is the real, populated aggregate score
 * — convert it to our 5-star scale instead of silently showing a fake
 * DEFAULT_RATING on every single card. */
function listingRating(listing: HostawayListing): number {
  if (typeof listing.averageReviewRating === "number" && listing.averageReviewRating > 0) {
    return Math.round((listing.averageReviewRating / 2) * 10) / 10;
  }
  if (typeof listing.starRating === "number" && listing.starRating > 0) {
    return listing.starRating;
  }
  return DEFAULT_RATING;
}

function mapListingToApartment(
  listing: HostawayListing,
  reviewCounts?: Map<number, number>,
): Apartment {
  const title = listingTitle(listing);
  const images = listingImages(listing);
  return {
    id: String(listing.id),
    slug: `${slugify(title)}-${listing.id}`,
    title,
    pricePerNight: Math.round(listing.price ?? 0),
    currency: listing.currencyCode || "EUR",
    guests: listing.personCapacity ?? 2,
    livingAreaSqm: listing.squareMeters ?? 0,
    location: pickLocationBucket(listing),
    rating: listingRating(listing),
    // `/listings` never populates `reviewsCount` — the real count comes
    // from tallying `/reviews` by listing instead (see getReviewCountsByListing).
    reviewCount: reviewCounts?.get(listing.id) ?? listing.reviewsCount ?? 0,
    imageUrl: images[0],
    bedroomsNumber: listing.bedroomsNumber,
    minNights: listing.minNights,
  };
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Hostaway's 4 cancellation-policy tiers are a fixed, platform-standard
 * naming (mirroring Airbnb's own tiers) rather than a per-listing custom
 * refund schedule — the tier name alone ("flexible", "strict", ...) doesn't
 * tell a guest what it actually means, so translate it into the standard
 * terms for that tier instead of just capitalizing the raw value. */
function describeCancellationPolicy(policy: string): string {
  switch (policy.toLowerCase()) {
    case "flexible":
      return "Full refund if cancelled at least 24 hours before check-in.";
    case "moderate":
      return "Full refund if cancelled at least 14 days before check-in. No refund after that.";
    case "firm":
      return "Full refund 30+ days before check-in. 50% refund 7–30 days before. No refund within 7 days of arrival.";
    case "strict":
      return "50% refund if cancelled at least 30 days before check-in. No refund after that.";
    default:
      return `${capitalize(policy)} cancellation policy.`;
  }
}

/** Prefers Hostaway's pre-formatted address fields; falls back to
 * assembling one from the individual street/city/country fields. Returns
 * `undefined` (not a fabricated placeholder) when none of these are set. */
function listingAddress(listing: HostawayListing): string | undefined {
  if (listing.publicAddress) return listing.publicAddress;
  if (listing.address) return listing.address;
  const parts = [listing.street, listing.city, listing.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : undefined;
}

/** Built from real per-listing fields (check-in/out times, cancellation
 * policy, and any pet/smoking amenity entries) rather than the generic mock
 * text — accurate per listing instead of one-size-fits-all. Falls back to
 * mock rules only if none of these fields are populated. */
function buildHouseRules(listing: HostawayListing): { title: string; description: string }[] {
  const rules: { title: string; description: string }[] = [];

  if (typeof listing.checkInTimeStart === "number") {
    const range =
      typeof listing.checkInTimeEnd === "number" ? ` – ${formatHour(listing.checkInTimeEnd)}` : "";
    rules.push({
      title: "Check-in",
      description: `Available from ${formatHour(listing.checkInTimeStart)}${range}.`,
    });
  }

  if (typeof listing.checkOutTime === "number") {
    rules.push({
      title: "Check-out",
      description: `Please depart by ${formatHour(listing.checkOutTime)}.`,
    });
  }

  if (listing.cancellationPolicy) {
    rules.push({
      title: "Cancellation Policy",
      description: describeCancellationPolicy(listing.cancellationPolicy),
    });
  }

  // Hostaway has no per-listing data for these across this entire account
  // (`maxPetsAllowed`/`maxChildrenAllowed`/`maxInfantsAllowed` are null on
  // every listing, and there's no field at all for smoking or events) — the
  // real booking site applies the same policy to every property, confirmed
  // against its own live House Rules panel. Prefer a real per-listing value
  // if Hostaway ever populates one; fall back to that confirmed policy.
  rules.push({
    title: "Pets",
    description: describeAllowance(listing.maxPetsAllowed, false),
  });
  rules.push({ title: "Smoking inside", description: "Not allowed." });
  rules.push({
    title: "Children",
    description: describeAllowance(listing.maxChildrenAllowed, true),
  });
  rules.push({
    title: "Infants",
    description: describeAllowance(listing.maxInfantsAllowed, true),
  });
  rules.push({ title: "Parties and events", description: "Not allowed." });

  return rules;
}

/** `undefined`/`null` means Hostaway has no per-listing value set — falls
 * back to `defaultAllowed`. `0` means explicitly not allowed; any other
 * number means allowed (up to that many). */
function describeAllowance(maxAllowed: number | null | undefined, defaultAllowed: boolean): string {
  if (maxAllowed == null) return defaultAllowed ? "Allowed." : "Not allowed.";
  return maxAllowed > 0 ? "Allowed." : "Not allowed.";
}

/** `listing.price` (`Apartment.pricePerNight`'s source) is a generic/base
 * rate set on the listing itself — it can drift far from what the listing
 * actually costs on real dates, since day-to-day pricing lives in the
 * calendar instead. Prefer the lowest real nightly rate found in the
 * calendar, so a "From €X" display reflects an actually-bookable price.
 * Falls back to the given apartment's base rate if no calendar data came
 * back (e.g. Hostaway request failed, or the listing has no upcoming
 * calendar entries). Shared by every place that shows a listing's price
 * outside of a specific selected date range (detail page headline, the
 * apartments grid, featured apartments) so they never drift apart. */
export async function withRealPricePerNight<T extends Apartment>(apartment: T): Promise<T> {
  const listingId = Number(apartment.id);
  if (!Number.isFinite(listingId)) return apartment;
  const nightlyPrices = await getNightlyPrices(listingId);
  const values = Object.values(nightlyPrices);
  if (values.length === 0) return apartment;
  return { ...apartment, pricePerNight: Math.min(...values) };
}

async function mapListingToApartmentDetail(listing: HostawayListing): Promise<ApartmentDetail> {
  const reviewCounts = await getReviewCountsByListing();
  const base = mapListingToApartment(listing, reviewCounts);
  const images = listingImages(listing);
  const amenityLabels = (listing.listingAmenities ?? [])
    .map((a) => a.amenityName)
    .filter((name): name is string => Boolean(name));

  let bookedDates: string[] = [];
  let nightlyPrices: Record<string, number> = {};
  try {
    [bookedDates, nightlyPrices] = await Promise.all([
      getBookedDates(listing.id),
      getNightlyPrices(listing.id),
    ]);
  } catch (error) {
    console.error(`[hostaway] Failed to fetch calendar for listing ${listing.id}:`, error);
  }

  // `listing.price` (used for `base.pricePerNight`) is a generic/base rate
  // set on the listing itself — it can drift far from what the listing
  // actually costs on real dates, since day-to-day pricing lives in the
  // calendar instead. Prefer the lowest real nightly rate we just fetched
  // for the "From €X" headline, so it reflects an actually-bookable price.
  const nightlyPriceValues = Object.values(nightlyPrices);
  const pricePerNight =
    nightlyPriceValues.length > 0 ? Math.min(...nightlyPriceValues) : base.pricePerNight;

  return {
    ...base,
    pricePerNight,
    heroImageUrl: images[0],
    galleryImages: images,
    totalImageCount: images.length,
    bedroomsNumber: listing.bedroomsNumber,
    bathroomsNumber: listing.bathroomsNumber,
    bedsNumber: listing.bedsNumber,
    lat: listing.lat,
    lng: listing.lng,
    address: listingAddress(listing),
    // Amenity "icon" keys don't come from Hostaway — AmenityPills falls back
    // to a generic icon for unrecognized keys, so this degrades gracefully.
    topAmenities: amenityLabels.slice(0, 6).map((label) => ({ icon: "default", label })),
    description: {
      atmosphere: listing.description || undefined,
      interiorStyle:
        listing.airbnbSummary ||
        listing.homeawayPropertyDescription ||
        listing.bookingcomPropertyDescription ||
        undefined,
    },
    perfectFor: MOCK_APARTMENT_DETAIL.perfectFor,
    nearbyAttractions: MOCK_APARTMENT_DETAIL.nearbyAttractions,
    amenityCategories:
      amenityLabels.length > 0
        ? amenityLabels.map((label) => ({ icon: "default", label }))
        : MOCK_APARTMENT_DETAIL.amenityCategories,
    locationInfo: MOCK_APARTMENT_DETAIL.locationInfo,
    houseRules: buildHouseRules(listing),
    activities: MOCK_APARTMENT_DETAIL.activities,
    bookedDates,
    nightlyPrices,
  };
}

const LISTINGS_TTL_MS = 60 * 60 * 1000;
const LISTINGS_PAGE_SIZE = 100;
const LISTINGS_MAX_PAGES = 20; // safety cap (2000 listings) against a pathological account
let rawListingsCache: { data: HostawayListing[]; expiresAt: number } | null = null;
let rawListingsRequest: Promise<HostawayListing[]> | null = null;

/** Pages through `/listings` until a page comes back short (the account has
 * 151+ listings, so a single `limit: 100` request was silently truncating
 * the portfolio — verified against the real account's own booking engine,
 * which shows "151 properties found"). */
async function fetchAllListings(): Promise<HostawayListing[]> {
  const all: HostawayListing[] = [];
  for (let page = 0; page < LISTINGS_MAX_PAGES; page++) {
    const offset = page * LISTINGS_PAGE_SIZE;
    const batch = await hostawayFetch<HostawayListing[]>("/listings", {
      noStore: true,
      searchParams: { limit: LISTINGS_PAGE_SIZE, offset },
    });
    if (!batch || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < LISTINGS_PAGE_SIZE) break;
  }
  return all;
}

/** Application-level cache for the bulk listings response, refreshed hourly.
 * Bypasses Next's Data Cache (`noStore: true`) because a real account's full
 * listings payload can exceed the 2MB per-item cache limit; this in-process
 * cache achieves the same goal (avoid refetching on every request) without
 * hitting that ceiling. Shared across all requests to this server process,
 * not just within one render. */
async function getRawListings(): Promise<HostawayListing[]> {
  if (rawListingsCache && rawListingsCache.expiresAt > Date.now()) {
    return rawListingsCache.data;
  }
  if (!rawListingsRequest) {
    rawListingsRequest = fetchAllListings()
      .then((data) => {
        rawListingsCache = { data, expiresAt: Date.now() + LISTINGS_TTL_MS };
        return rawListingsCache.data;
      })
      .finally(() => {
        rawListingsRequest = null;
      });
  }
  return rawListingsRequest;
}

/** Cached per-request so multiple components (grid, featured list, similar
 * apartments) reading listings in the same render don't trigger duplicate
 * Hostaway calls. Falls back to mock data if Hostaway isn't configured or
 * the request fails, so the site keeps working during setup or an outage. */
export const getAllApartments = cache(async (): Promise<Apartment[]> => {
  if (!isHostawayConfigured()) return MOCK_ALL_APARTMENTS;

  try {
    const listings = await getRawListings();
    if (!listings || listings.length === 0) return MOCK_ALL_APARTMENTS;
    const reviewCounts = await getReviewCountsByListing();
    return listings.map((listing) => mapListingToApartment(listing, reviewCounts));
  } catch (error) {
    console.error("[hostaway] Failed to fetch listings, falling back to mock data:", error);
    return MOCK_ALL_APARTMENTS;
  }
});

/** The homepage's first impression of the portfolio, so it's curated
 * (highest-rated, most-reviewed, photographed listings) rather than just
 * the first 6 in whatever order `/listings` happens to return. */
export const getFeaturedApartments = cache(async (): Promise<Apartment[]> => {
  const all = await getAllApartments();
  if (all === MOCK_ALL_APARTMENTS) return MOCK_FEATURED_APARTMENTS;
  const featured = [...all]
    .filter((a) => Boolean(a.imageUrl))
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 6);
  // Only 6 listings, so a real calendar fetch per card is cheap — same
  // "From €X" accuracy fix as the apartment detail page and the apartments
  // grid, so the homepage doesn't show a stale price the detail page then
  // contradicts.
  return Promise.all(featured.map(withRealPricePerNight));
});

export type PortfolioStats = {
  apartmentCount: number;
  /** Floored to the nearest 10 with a "+" suffix (e.g. 87 → "80+") — always
   * an honest "at least this many" claim that doesn't need updating every
   * time a listing is added or removed. */
  apartmentCountDisplay: string;
  averageRating: number | null;
  averageRatingDisplay: string;
  /** Sum of each listing's real published-review count (see
   * getReviewCountsByListing) — an honest, verifiable "guests hosted" proxy,
   * unlike a made-up round number. */
  totalReviewCount: number;
  /** Floored to the nearest 50 with a "+" suffix, same honesty rationale as
   * apartmentCountDisplay. */
  totalReviewCountDisplay: string;
};

/** Real portfolio-wide marketing stats ("150+ apartments", "4.9 rating"),
 * replacing what used to be hardcoded copy repeated across several pages. */
export const getPortfolioStats = cache(async (): Promise<PortfolioStats> => {
  const apartments = await getAllApartments();
  const apartmentCount = apartments.length;
  const rounded = Math.floor(apartmentCount / 10) * 10;
  const apartmentCountDisplay = rounded > 0 ? `${rounded}+` : String(apartmentCount);

  const ratings = apartments.map((a) => a.rating).filter((r) => r > 0);
  const averageRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((sum, r) => sum + r, 0) / ratings.length) * 10) / 10
      : null;

  const totalReviewCount = apartments.reduce((sum, a) => sum + a.reviewCount, 0);
  const roundedReviews = Math.floor(totalReviewCount / 50) * 50;
  const totalReviewCountDisplay =
    roundedReviews > 0 ? `${roundedReviews}+` : String(totalReviewCount);

  return {
    apartmentCount,
    apartmentCountDisplay,
    averageRating,
    averageRatingDisplay: averageRating !== null ? averageRating.toFixed(1) : "—",
    totalReviewCount,
    totalReviewCountDisplay,
  };
});

/** Mock apartments other than the one detailed record still need a working
 * detail page (rich content is generic, but the basic fields are real per
 * card) so browsing doesn't 404 while Hostaway is being configured. */
function mockDetailForSlug(slug: string): ApartmentDetail | null {
  if (slug === MOCK_APARTMENT_DETAIL.slug) return MOCK_APARTMENT_DETAIL;
  const apartment = MOCK_ALL_APARTMENTS.find((a) => a.slug === slug);
  if (!apartment) return null;
  const images = apartment.imageUrl ? [apartment.imageUrl] : MOCK_APARTMENT_DETAIL.galleryImages;
  return {
    ...MOCK_APARTMENT_DETAIL,
    ...apartment,
    heroImageUrl: images[0],
    galleryImages: images,
    totalImageCount: images.length,
  };
}

export const getApartmentDetailBySlug = cache(
  async (slug: string): Promise<ApartmentDetail | null> => {
    if (!isHostawayConfigured()) {
      return mockDetailForSlug(slug);
    }

    try {
      const listings = await getRawListings();
      const match = listings?.find((listing) => `${slugify(listingTitle(listing))}-${listing.id}` === slug);
      if (!match) return null;

      const detail = await hostawayFetch<HostawayListing>(`/listings/${match.id}`, {
        revalidate: 3600,
      });
      return await mapListingToApartmentDetail(detail ?? match);
    } catch (error) {
      console.error(`[hostaway] Failed to fetch listing "${slug}", falling back to mock data:`, error);
      return mockDetailForSlug(slug);
    }
  },
);
