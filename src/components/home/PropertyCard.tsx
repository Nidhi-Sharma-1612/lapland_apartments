import Link from "next/link";
import { ArrowUpRight, CalendarDays, Home, MapPin, Star, Users } from "lucide-react";
import type { Apartment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ratingLabel } from "@/lib/rating-label";

export function PropertyCard({
  apartment,
  className = "",
  hrefQuery = "",
}: {
  apartment: Apartment;
  className?: string;
  /** Query string (e.g. "?checkIn=...&guests=2") appended to the detail-page
   * links so an active search's dates/guests carry over and pre-fill the
   * booking widget there. */
  hrefQuery?: string;
}) {
  const href = `/apartments/${apartment.slug}${hrefQuery}`;

  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <Link
        href={href}
        className="relative block aspect-684/328 overflow-hidden rounded-2xl bg-zinc-200 shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
      >
        {apartment.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={apartment.imageUrl}
            alt={apartment.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            {apartment.title}
          </div>
        )}

        <span className="absolute left-6 top-6 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur">
          From €{apartment.pricePerNight} / night
        </span>
      </Link>

      <h3 className="mt-4 text-2xl font-semibold text-zinc-900">
        <Link href={href}>{apartment.title}</Link>
      </h3>

      <div className="my-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600">
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" aria-hidden />
          {apartment.guests} guests
        </span>
        <span className="flex items-center gap-1.5">
          <Home className="h-4 w-4" aria-hidden />
          Living area {apartment.livingAreaSqm} m²
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" aria-hidden />
          {apartment.location}
        </span>
        {typeof apartment.minNights === "number" && apartment.minNights > 1 && (
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden />
            Min {apartment.minNights} nights
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-col items-start gap-3 border-t border-zinc-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
          {apartment.reviewCount > 0 && (
            <span className="font-medium text-zinc-700">
              {ratingLabel(apartment.rating)}
            </span>
          )}
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-semibold text-zinc-900">
              {apartment.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.round(apartment.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-zinc-200 text-zinc-200",
                  )}
                  aria-hidden
                />
              ))}
            </span>
            <span className="text-zinc-500">({apartment.reviewCount})</span>
          </span>
        </span>

        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold whitespace-nowrap text-zinc-900 underline underline-offset-4"
        >
          View apartment
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
