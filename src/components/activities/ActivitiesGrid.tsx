"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Clock, Star, Users } from "lucide-react";
import type { Activity } from "@/lib/mock-activities";
import { Container } from "@/components/layout/Container";

const COLLAPSED_COUNT = 3;

export function ActivitiesGrid({ activities }: { activities: Activity[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleActivities = expanded ? activities : activities.slice(0, COLLAPSED_COUNT);
  const hasMore = activities.length > COLLAPSED_COUNT;

  return (
    <Container as="section" className="py-16">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900">Winter Activities</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Add an Arctic adventure to your stay — book alongside your apartment or on arrival.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleActivities.map((activity) => (
          <Link
            key={activity.id}
            href={activity.bookingUrl ?? "/contact"}
            target={activity.bookingUrl ? "_blank" : undefined}
            rel={activity.bookingUrl ? "noopener noreferrer" : undefined}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Clock className="h-3 w-3" aria-hidden />
                {activity.duration}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                {activity.category}
                {typeof activity.rating === "number" && (
                  <>
                    <span aria-hidden>•</span>
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    <span className="font-semibold text-zinc-900">{activity.rating}</span>
                    {typeof activity.reviewCount === "number" && (
                      <span>({activity.reviewCount})</span>
                    )}
                  </>
                )}
              </span>

              <h3 className="mt-2 font-semibold text-zinc-900">{activity.title}</h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-500">{activity.description}</p>

              {activity.groupSize && (
                <span className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                  {activity.groupSize}
                </span>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                <p className="text-sm font-semibold text-zinc-900">
                  From €{activity.pricePerPerson}
                  <span className="font-normal text-zinc-500"> / person</span>
                </p>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                  {activity.bookingUrl ? "Book Now" : "Enquire"}
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
            {expanded ? "Show fewer activities" : `Show all ${activities.length} activities`}
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
