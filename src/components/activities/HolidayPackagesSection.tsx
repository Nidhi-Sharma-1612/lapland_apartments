"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Moon, Star, Users } from "lucide-react";
import { HOLIDAY_PACKAGES } from "@/lib/mock-packages";
import { Container } from "@/components/layout/Container";

// Fallback for packages whose individual booking URL wasn't confirmed —
// each package prefers its own real bookingUrl when available (see
// mock-packages.ts) and only falls back to this general listing page.
const PACKAGES_URL = "https://booklapland.com/holiday-packages-lapland";

const COLLAPSED_COUNT = 3;

export function HolidayPackagesSection() {
  const [expanded, setExpanded] = useState(false);
  const packages = expanded ? HOLIDAY_PACKAGES : HOLIDAY_PACKAGES.slice(0, COLLAPSED_COUNT);
  const hasMore = HOLIDAY_PACKAGES.length > COLLAPSED_COUNT;

  return (
    <Container as="section" className="py-16">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900">Holiday Packages</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Multi-night Lapland itineraries bundling accommodation and experiences together.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Link
            key={pkg.id}
            href={pkg.bookingUrl || PACKAGES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {pkg.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {pkg.badge}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-semibold text-zinc-900">{pkg.title}</h3>

              {typeof pkg.rating === "number" && (
                <span className="mt-1.5 flex items-center gap-1 text-xs text-zinc-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  <span className="font-semibold text-zinc-900">{pkg.rating}</span>
                  {typeof pkg.reviewCount === "number" && <span>({pkg.reviewCount})</span>}
                </span>
              )}

              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-500">{pkg.description}</p>

              <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Moon className="h-4 w-4" aria-hidden />
                  {pkg.nights} nights
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" aria-hidden />
                  {pkg.people}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                <p className="text-sm font-semibold text-zinc-900">
                  From €{pkg.pricePerPerson}
                  <span className="font-normal text-zinc-500"> {pkg.priceUnit ?? "/ person"}</span>
                </p>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                  Book Now
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300"
          >
            {expanded ? "Show fewer packages" : `Show all ${HOLIDAY_PACKAGES.length} packages`}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>
      )}
    </Container>
  );
}
