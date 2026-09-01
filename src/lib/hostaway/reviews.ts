import "server-only";
import { hostawayFetch } from "./client";
import { isHostawayConfigured } from "./config";
import type { ReviewCard } from "@/lib/types";
import type { HostawayReview } from "./types";

const REVIEWS_TTL_MS = 6 * 60 * 60 * 1000;
const PAGE_SIZE = 200;
// Scanning the account's full review history (thousands of entries, mostly
// unpublished/pending) for every request isn't worth it — a bounded window
// of recent pages consistently turns up enough published, rated reviews to
// curate a good set from.
const PAGE_OFFSETS = [0, 200, 400, 600, 800];

const CHANNEL_SOURCE: Record<number, ReviewCard["source"]> = {
  2005: "airbnb",
  2002: "booking",
};

let reviewsCache: { data: ReviewCard[]; expiresAt: number } | null = null;
let reviewsRequest: Promise<ReviewCard[]> | null = null;

const REVIEW_COUNTS_TTL_MS = 6 * 60 * 60 * 1000;
const REVIEW_COUNTS_MAX_PAGES = 30; // safety cap (6000 reviews)
let reviewCountsCache: { data: Map<number, number>; expiresAt: number } | null = null;
let reviewCountsRequest: Promise<Map<number, number>> | null = null;

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

/** Airbnb reviews synced through Hostaway often start with a headline line
 * (e.g. "The best trip to date") followed by the full text — pull that out
 * as a title when it looks like one, rather than fabricating a headline. */
function splitTitleAndBody(text: string): { title?: string; body: string } {
  const [first, ...rest] = text.split("\n");
  const headline = first.trim();
  if (rest.length > 0 && headline.length > 0 && headline.length <= 60) {
    return { title: headline, body: rest.join(" ").trim() };
  }
  return { body: text.trim() };
}

async function fetchReviewsPage(offset: number): Promise<HostawayReview[]> {
  return hostawayFetch<HostawayReview[]>("/reviews", {
    noStore: true,
    searchParams: { limit: PAGE_SIZE, offset },
  });
}

/** Curated set of real, published guest reviews for the homepage/detail-page
 * carousel. Falls back to an empty array (caller supplies mock data) if
 * Hostaway isn't configured, no usable reviews are found, or the request
 * fails. */
export async function getFeaturedReviews(limit = 10): Promise<ReviewCard[]> {
  if (!isHostawayConfigured()) return [];
  if (reviewsCache && reviewsCache.expiresAt > Date.now()) return reviewsCache.data;
  if (reviewsRequest) return reviewsRequest;

  reviewsRequest = (async () => {
    try {
      const pages = await Promise.all(PAGE_OFFSETS.map(fetchReviewsPage));
      const all = pages.flat().filter(Boolean);

      const usable = all.filter(
        (r) =>
          r.status === "published" &&
          r.publicReview &&
          r.publicReview.trim().length > 0 &&
          typeof r.rating === "number" &&
          r.channelId !== undefined &&
          CHANNEL_SOURCE[r.channelId],
      );

      // Best-rated, most substantial reviews first; one per guest so the
      // carousel doesn't repeat a name.
      usable.sort(
        (a, b) =>
          (b.rating ?? 0) - (a.rating ?? 0) ||
          (b.publicReview?.length ?? 0) - (a.publicReview?.length ?? 0),
      );

      const cards: ReviewCard[] = [];
      const seenNames = new Set<string>();
      for (const r of usable) {
        const name = firstName(r.guestName || r.reviewerName || "Guest");
        if (seenNames.has(name)) continue;

        const { title, body } = splitTitleAndBody(r.publicReview ?? "");
        cards.push({
          source: CHANNEL_SOURCE[r.channelId!],
          rating: Math.round(((r.rating ?? 10) / 2) * 10) / 10,
          title,
          // Full text, not hard-cut here — a mid-sentence "…" from a fixed
          // character limit read as a broken/incomplete review. The card
          // clamps visually with CSS instead, so nothing is destructively
          // cut in the data itself.
          body,
          name,
          subtitle: r.externalListingName ? `Stayed at ${r.externalListingName}` : "Verified stay",
        });
        seenNames.add(name);
        if (cards.length >= limit) break;
      }

      reviewsCache = { data: cards, expiresAt: Date.now() + REVIEWS_TTL_MS };
      return cards;
    } catch (error) {
      console.error("[hostaway] Failed to fetch reviews:", error);
      return [];
    } finally {
      reviewsRequest = null;
    }
  })();

  return reviewsRequest;
}

/** Real per-listing published-review counts, keyed by Hostaway listing id.
 * `/listings` never populates `reviewsCount` (confirmed empty across the
 * account), so property cards showing "(0)" for every listing were reading
 * a field Hostaway simply doesn't send there — this counts published
 * reviews from `/reviews` instead, grouped by `listingMapId`. Pages through
 * up to `REVIEW_COUNTS_MAX_PAGES` (6000 reviews), which comfortably covers
 * this account's real review volume. */
export async function getReviewCountsByListing(): Promise<Map<number, number>> {
  if (!isHostawayConfigured()) return new Map();
  if (reviewCountsCache && reviewCountsCache.expiresAt > Date.now()) return reviewCountsCache.data;
  if (reviewCountsRequest) return reviewCountsRequest;

  reviewCountsRequest = (async () => {
    try {
      const counts = new Map<number, number>();
      for (let page = 0; page < REVIEW_COUNTS_MAX_PAGES; page++) {
        const batch = await fetchReviewsPage(page * PAGE_SIZE);
        if (!batch || batch.length === 0) break;
        for (const r of batch) {
          if (r.status !== "published" || !r.listingMapId) continue;
          counts.set(r.listingMapId, (counts.get(r.listingMapId) ?? 0) + 1);
        }
        if (batch.length < PAGE_SIZE) break;
      }
      reviewCountsCache = { data: counts, expiresAt: Date.now() + REVIEW_COUNTS_TTL_MS };
      return counts;
    } catch (error) {
      console.error("[hostaway] Failed to fetch review counts:", error);
      return new Map();
    } finally {
      reviewCountsRequest = null;
    }
  })();

  return reviewCountsRequest;
}
