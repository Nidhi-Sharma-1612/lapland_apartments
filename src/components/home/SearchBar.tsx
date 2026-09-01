"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { BedroomsSelector } from "@/components/booking/BedroomsSelector";
import { GuestsSelector, type GuestCounts } from "@/components/booking/GuestsSelector";

export function SearchBar() {
  return (
    <Suspense fallback={<SearchBarSkeleton />}>
      <SearchBarForm />
    </Suspense>
  );
}

function SearchBarForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") ?? "");
  const [bedrooms, setBedrooms] = useState(Number(searchParams.get("bedrooms")) || 0);
  const [guests, setGuests] = useState<GuestCounts>(() => {
    const total = Number(searchParams.get("guests"));
    return { adults: total > 0 ? total : 1, children: 0 };
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (bedrooms > 0) params.set("bedrooms", String(bedrooms));
    params.set("guests", String(guests.adults + guests.children));
    router.push(`/apartments?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-xl sm:px-6 sm:py-5 lg:flex-row lg:items-stretch lg:gap-3 lg:px-8"
    >
      <DateRangePicker
        checkIn={checkIn}
        checkOut={checkOut}
        onChange={(nextCheckIn, nextCheckOut) => {
          setCheckIn(nextCheckIn);
          setCheckOut(nextCheckOut);
        }}
        className="lg:flex-2"
      />

      <BedroomsSelector value={bedrooms} onChange={setBedrooms} className="lg:flex-1" />

      <GuestsSelector value={guests} onChange={setGuests} className="lg:flex-1" />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-green-dark lg:flex-[1.2]"
      >
        <Search className="h-5 w-5" />
        Search Apartments
      </button>
    </form>
  );
}

function SearchBarSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-xl sm:px-6 sm:py-5 lg:flex-row lg:items-stretch lg:gap-3 lg:px-8">
      <div className="h-13.5 animate-pulse rounded-lg bg-[#F6F7F9] lg:flex-[1.4]" />
      <div className="h-13.5 animate-pulse rounded-lg bg-[#F6F7F9] lg:flex-1" />
      <div className="h-13.5 animate-pulse rounded-lg bg-[#F6F7F9] lg:flex-1" />
      <div className="h-13.5 animate-pulse rounded-xl bg-zinc-100 lg:flex-[1.2]" />
    </div>
  );
}
