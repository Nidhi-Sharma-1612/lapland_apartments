"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import type { ApartmentDetail } from "@/lib/types";
import { computeStayTotal } from "@/lib/booking-price";
import { rangeOverlapsBookedDates } from "@/lib/date-utils";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { GuestsSelector, type GuestCounts } from "@/components/booking/GuestsSelector";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type GuestDetails = { firstName: string; lastName: string; email: string; phone: string };
type FormErrors = Partial<Record<"dates" | keyof GuestDetails, string>>;

export function BookingCard({
  apartment,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 0,
}: {
  apartment: ApartmentDetail;
  /** Pre-filled from an active search (e.g. the homepage/apartments-page
   * search bar) carried over via the detail-page link's query string. */
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}) {
  const initialDatesAvailable = !rangeOverlapsBookedDates(
    initialCheckIn,
    initialCheckOut,
    apartment.bookedDates,
  );
  const [checkIn, setCheckIn] = useState(initialDatesAvailable ? initialCheckIn : "");
  const [checkOut, setCheckOut] = useState(initialDatesAvailable ? initialCheckOut : "");
  const [guests, setGuests] = useState<GuestCounts>({
    adults: initialGuests > 0 ? initialGuests : 1,
    children: 0,
  });
  const [details, setDetails] = useState<GuestDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.round(diff) : 0;
  }, [checkIn, checkOut]);

  const totalPrice =
    nights > 0 ? computeStayTotal(checkIn, checkOut, apartment.nightlyPrices, apartment.pricePerNight) : 0;

  function updateDetail(field: keyof GuestDetails, value: string) {
    setDetails((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!checkIn || !checkOut) nextErrors.dates = "Select your check-in and check-out dates.";
    if (!details.firstName.trim()) nextErrors.firstName = "Required";
    if (!details.lastName.trim()) nextErrors.lastName = "Required";
    if (!details.email.trim()) nextErrors.email = "Required";
    else if (!EMAIL_PATTERN.test(details.email)) nextErrors.email = "Enter a valid email address.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: apartment.slug,
          checkIn,
          checkOut,
          adults: guests.adults,
          children: guests.children,
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          phone: details.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      window.location.href = data.url;
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-3xl bg-cover bg-top p-6 text-white lg:sticky lg:top-24"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(6,14,18,0.55) 0%, rgba(8,17,15,0.8) 45%, #0a1a22 75%), url(/images/why-stay-aurora.jpg)",
      }}
    >
      <div>
        {nights > 0 ? (
          <p className="text-3xl font-semibold">
            €{Math.round((totalPrice / nights) * 100) / 100}
            <span className="text-base font-normal text-white/60"> / night</span>
          </p>
        ) : (
          <p className="text-3xl font-semibold">From €{apartment.pricePerNight}</p>
        )}
        <p className="mt-1 text-sm text-white/60">Includes taxes and service fees.</p>
      </div>

      <div className="flex flex-col gap-3">
        {!initialDatesAvailable && initialCheckIn && (
          <p className="text-xs text-amber-300">
            Your selected dates aren&apos;t available for this apartment — please choose new
            dates.
          </p>
        )}
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(nextCheckIn, nextCheckOut) => {
            setCheckIn(nextCheckIn);
            setCheckOut(nextCheckOut);
            setErrors((prev) => ({ ...prev, dates: undefined }));
          }}
          variant="dark"
          align="right"
          bookedDates={apartment.bookedDates}
        />
        {errors.dates && <p className="text-xs text-red-300">{errors.dates}</p>}

        <GuestsSelector
          value={guests}
          onChange={setGuests}
          variant="dark"
          maxGuests={apartment.guests}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-white/15 pt-5">
        <p className="text-sm font-semibold text-white/80">Your details</p>
        <div className="grid grid-cols-2 gap-3">
          <GuestField
            label="First name"
            value={details.firstName}
            onChange={(v) => updateDetail("firstName", v)}
            error={errors.firstName}
          />
          <GuestField
            label="Last name"
            value={details.lastName}
            onChange={(v) => updateDetail("lastName", v)}
            error={errors.lastName}
          />
        </div>
        <GuestField
          label="Email"
          type="email"
          value={details.email}
          onChange={(v) => updateDetail("email", v)}
          error={errors.email}
        />
        <GuestField
          label="Phone (optional)"
          type="tel"
          value={details.phone}
          onChange={(v) => updateDetail("phone", v)}
        />
      </div>

      <div className="flex items-center justify-between border-t border-white/15 pt-4">
        {nights > 0 ? (
          <>
            <span className="text-sm text-white/70">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
            <span className="text-2xl font-semibold">€{totalPrice}</span>
          </>
        ) : (
          <span className="text-sm text-white/70">Select dates to see the total price</span>
        )}
      </div>

      {submitError && <p className="text-sm text-red-300">{submitError}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-brand-green transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "submitting" ? "Redirecting to payment…" : "Book Now"}
        {status !== "submitting" && <span aria-hidden>↗</span>}
      </button>

      <ul className="flex flex-col gap-2 text-sm text-white/80">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            <span className="font-medium text-white">Free cancellation</span> (up to 48h
            before arrival)
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" aria-hidden />
          No Hidden Fees
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" aria-hidden />
          Secure payment via Stripe
        </li>
      </ul>
    </form>
  );
}

function GuestField({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="sr-only">{label}</label>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`rounded-lg border bg-white/5 px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white/40 ${
          error ? "border-red-400" : "border-white/15"
        }`}
      />
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
