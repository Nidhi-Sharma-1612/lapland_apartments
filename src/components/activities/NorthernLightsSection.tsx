"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { NORTHERN_LIGHTS_TOURS } from "@/lib/mock-northern-lights";
import { Container } from "@/components/layout/Container";

const COLLAPSED_COUNT = 3;

export function NorthernLightsSection() {
  const [expanded, setExpanded] = useState(false);
  const tours = expanded
    ? NORTHERN_LIGHTS_TOURS
    : NORTHERN_LIGHTS_TOURS.slice(0, COLLAPSED_COUNT);
  const hasMore = NORTHERN_LIGHTS_TOURS.length > COLLAPSED_COUNT;

  return (
    <Container as="section" className="py-16">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900">
          Northern Lights Tours
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Guided aurora hunts around Rovaniemi, from small group tours to fully
          private departures.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <Link
            key={tour.id}
            href={tour.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tour.imageUrl}
                alt={tour.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                {tour.badge}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {tour.location}
                {typeof tour.rating === "number" && (
                  <>
                    <span aria-hidden>•</span>
                    <Star
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                    <span className="font-semibold text-zinc-900">
                      {tour.rating}
                    </span>
                    {typeof tour.reviewCount === "number" && (
                      <span>({tour.reviewCount})</span>
                    )}
                  </>
                )}
              </span>

              <h3 className="mt-2 font-semibold text-zinc-900">{tour.title}</h3>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" aria-hidden />
                  {tour.groupSize}
                </span>
              </div>

              <div className="mt-4 flex flex-1 items-end justify-between border-t border-zinc-100 pt-4">
                <p className="text-lg font-semibold text-zinc-900">
                  €{tour.pricePerPerson}
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
            {expanded
              ? "Show fewer tours"
              : `Show all ${NORTHERN_LIGHTS_TOURS.length} tours`}
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
