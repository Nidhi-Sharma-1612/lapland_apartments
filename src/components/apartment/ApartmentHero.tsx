import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  DoorOpen,
  Home,
  MapPin,
  ShowerHead,
  Star,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SearchBar } from "@/components/home/SearchBar";
import type { ApartmentDetail } from "@/lib/types";

export function ApartmentHero({
  apartment,
  backHref = "/apartments",
}: {
  apartment: ApartmentDetail;
  /** Reconstructs the exact search-results page (filters, sort, page) the
   * guest came from, so going back restores it instead of resetting it. */
  backHref?: string;
}) {
  return (
    <section className="relative">
      <Header />

      <div className="relative flex min-h-[520px] flex-col justify-end overflow-hidden lg:min-h-[560px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={apartment.heroImageUrl}
          alt={apartment.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/25" />
        <div className="absolute inset-0 bg-black/20" />

        <Container className="relative z-10 pb-20">
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-black/55"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to apartments
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              From €{apartment.pricePerNight} / night
            </span>
            <span className="flex items-center gap-2 text-white">
              <span className="font-semibold">
                {apartment.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </span>
              <span className="text-white/70">({apartment.reviewCount})</span>
            </span>
          </div>

          <h1 className="mt-4 text-4xl leading-tight font-semibold text-white sm:text-5xl lg:text-6xl">
            {apartment.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/85">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden />
              {apartment.guests} guests
            </span>
            {Boolean(apartment.bedroomsNumber) && (
              <span className="flex items-center gap-2">
                <DoorOpen className="h-4 w-4" aria-hidden />
                {apartment.bedroomsNumber} bedroom{apartment.bedroomsNumber === 1 ? "" : "s"}
              </span>
            )}
            {Boolean(apartment.bedsNumber) && (
              <span className="flex items-center gap-2">
                <BedDouble className="h-4 w-4" aria-hidden />
                {apartment.bedsNumber} bed{apartment.bedsNumber === 1 ? "" : "s"}
              </span>
            )}
            {Boolean(apartment.bathroomsNumber) && (
              <span className="flex items-center gap-2">
                <ShowerHead className="h-4 w-4" aria-hidden />
                {apartment.bathroomsNumber} bathroom{apartment.bathroomsNumber === 1 ? "" : "s"}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4" aria-hidden />
              Living area {apartment.livingAreaSqm} m²
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden />
              {apartment.location}
            </span>
            {typeof apartment.minNights === "number" && apartment.minNights > 1 && (
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Min {apartment.minNights} nights
              </span>
            )}
          </div>
        </Container>
      </div>

      {/* z-40, not z-10: this wraps the search bar's date/guest/bedroom
          popovers, and a parent's z-index caps how high its descendants can
          stack — at z-10 those popovers were rendering *behind*
          ApartmentTabs (a sibling section, sticky at z-30) no matter what
          z-index the popovers themselves used. */}
      <Container className="relative z-40 -mt-8 lg:-mt-10 mb-10">
        <SearchBar />
      </Container>
    </section>
  );
}
