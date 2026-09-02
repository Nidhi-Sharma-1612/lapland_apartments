"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Apartment } from "@/lib/types";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Container } from "@/components/layout/Container";
import { SortSelect } from "@/components/shared/SortSelect";
import { staggerItem } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/use-is-mobile";
import type { Variants } from "framer-motion";

const SORT_OPTIONS = [
  { value: "", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export type AppliedFilter = { label: string; href: string };
export type QuickLocation = { label: string; href: string; active: boolean };

/** A results grid can hold anywhere from 1 to 150+ real listings. The shared
 * `staggerContainer`/`revealViewport` pattern breaks at that scale: with
 * `whileInView` + `amount: 0.2`, a container many screens tall never gets
 * 20% of itself into the viewport at any scroll position, so its children
 * stay permanently hidden (opacity: 0) — confirmed live once the portfolio
 * grew past 100 listings. This grid animates in on mount instead (`animate`,
 * not `whileInView`) since it sits right below the page header anyway, and
 * caps the total stagger duration to ~1.5s regardless of item count so a
 * full page of cards doesn't cascade in over several seconds. Pagination
 * (see `Pagination` below) also keeps any single page to a manageable size. */
function gridContainerVariants(itemCount: number): Variants {
  const staggerChildren = itemCount > 0 ? Math.min(0.06, 1.5 / itemCount) : 0.06;
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren: 0.05 } },
  };
}

export function ApartmentsGrid({
  apartments,
  totalCount,
  pageSize,
  currentPage,
  totalPages,
  pageLinks,
  prevPageHref,
  nextPageHref,
  subheading,
  appliedFilters,
  clearAllHref,
  quickLocations,
  bookingQuery,
}: {
  /** Just the current page's slice — already paginated by the server. */
  apartments: Apartment[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  pageLinks: { page: number; href: string }[];
  prevPageHref: string;
  nextPageHref: string;
  subheading: string;
  appliedFilters: AppliedFilter[];
  clearAllHref: string;
  quickLocations: QuickLocation[];
  /** Query string (e.g. "?checkIn=...&guests=2") carried onto each
   * apartment's detail-page link so the active search pre-fills the
   * booking widget there instead of starting blank. */
  bookingQuery?: string;
}) {
  const pageStart = apartments.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const pageEnd = apartments.length > 0 ? pageStart + apartments.length - 1 : 0;

  // On small screens, reveal the current (up-to-24-item) server page 6 at a
  // time via "Show more" / "Show less", instead of a long single-column
  // scroll. Starts `false` (matching the server-rendered markup) and flips
  // after mount to avoid a hydration mismatch — real Pagination below still
  // handles jumping between server pages of `pageSize`.
  const MOBILE_STEP = 6;
  const isMobile = useIsMobile();
  const [mobileVisibleCount, setMobileVisibleCount] = useState(MOBILE_STEP);
  const [lastPageKey, setLastPageKey] = useState<string | null>(null);
  const pageKey = `${currentPage}-${apartments.map((a) => a.id).join(",")}`;
  if (pageKey !== lastPageKey) {
    setLastPageKey(pageKey);
    if (mobileVisibleCount !== MOBILE_STEP) setMobileVisibleCount(MOBILE_STEP);
  }

  const visibleApartments =
    isMobile && apartments.length > mobileVisibleCount
      ? apartments.slice(0, mobileVisibleCount)
      : apartments;
  const canShowMore = isMobile && mobileVisibleCount < apartments.length;
  const canShowLess = isMobile && mobileVisibleCount > MOBILE_STEP;

  return (
    <Container as="section" className="py-16">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900">
            {totalPages > 1
              ? `Showing ${pageStart}–${pageEnd} of ${totalCount} apartments`
              : `${totalCount} ${totalCount === 1 ? "apartment" : "apartments"} in Rovaniemi`}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{subheading}</p>
        </div>

        <SortSelect basePath="/apartments" options={SORT_OPTIONS} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {quickLocations.map((loc) => (
          <Link
            key={loc.label}
            href={loc.href}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              loc.active
                ? "border-brand-green bg-brand-green text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
            }`}
          >
            {loc.label}
          </Link>
        ))}
      </div>

      {appliedFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {appliedFilters.map((filter) => (
            <Link
              key={filter.label}
              href={filter.href}
              className="flex items-center gap-1.5 rounded-full bg-zinc-100 py-1.5 pl-3.5 pr-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200"
            >
              {filter.label}
              <X className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ))}
          <Link
            href={clearAllHref}
            className="text-sm font-semibold text-zinc-500 underline underline-offset-2 hover:text-zinc-700"
          >
            Clear all
          </Link>
        </div>
      )}

      {apartments.length > 0 ? (
        <>
          <motion.div
            key={pageKey}
            variants={gridContainerVariants(visibleApartments.length)}
            initial="hidden"
            animate="show"
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleApartments.map((apartment) => (
              <motion.div key={apartment.id} variants={staggerItem}>
                <PropertyCard apartment={apartment} hrefQuery={bookingQuery} />
              </motion.div>
            ))}
          </motion.div>

          {(canShowMore || canShowLess) && (
            <div className="mt-8 flex items-center justify-center gap-3 sm:hidden">
              {canShowMore && (
                <button
                  type="button"
                  onClick={() =>
                    setMobileVisibleCount((c) =>
                      Math.min(apartments.length, c + MOBILE_STEP),
                    )
                  }
                  className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300"
                >
                  Show more
                </button>
              )}
              {canShowLess && (
                <button
                  type="button"
                  onClick={() =>
                    setMobileVisibleCount((c) => Math.max(MOBILE_STEP, c - MOBILE_STEP))
                  }
                  className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300"
                >
                  Show less
                </button>
              )}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageLinks={pageLinks}
            prevPageHref={prevPageHref}
            nextPageHref={nextPageHref}
          />
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 py-16 text-center">
          <p className="font-semibold text-zinc-900">No apartments match your search.</p>
          <p className="max-w-sm text-sm text-zinc-500">
            Try a different location or fewer guests, or browse the full collection.
          </p>
          <Link
            href={clearAllHref}
            className="mt-2 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            View all apartments
          </Link>
        </div>
      )}
    </Container>
  );
}

/** Page numbers to render, with `"ellipsis"` markers for gaps — always shows
 * first, last, and a window around the current page rather than every page
 * when there are many (keeps the control usable at 7+ pages). */
function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const keep = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const page of sorted) {
    if (prev && page - prev > 1) result.push("ellipsis");
    result.push(page);
    prev = page;
  }
  return result;
}

function Pagination({
  currentPage,
  totalPages,
  pageLinks,
  prevPageHref,
  nextPageHref,
}: {
  currentPage: number;
  totalPages: number;
  pageLinks: { page: number; href: string }[];
  prevPageHref: string;
  nextPageHref: string;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const hrefByPage = new Map(pageLinks.map((l) => [l.page, l.href]));
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-1.5">
      <Link
        href={prevPageHref}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          isFirst
            ? "pointer-events-none border-zinc-100 text-zinc-300"
            : "border-zinc-200 text-zinc-600 hover:border-zinc-300",
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </Link>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-zinc-400">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={hrefByPage.get(page) ?? "/apartments"}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-brand-green text-white"
                : "text-zinc-600 hover:bg-zinc-100",
            )}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={nextPageHref}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          isLast
            ? "pointer-events-none border-zinc-100 text-zinc-300"
            : "border-zinc-200 text-zinc-600 hover:border-zinc-300",
        )}
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </nav>
  );
}
