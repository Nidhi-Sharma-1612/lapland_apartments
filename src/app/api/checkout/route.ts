import { NextResponse } from "next/server";
import { getApartmentDetailBySlug } from "@/lib/hostaway/listings";
import { isHostawayConfigured } from "@/lib/hostaway/config";
import { computeStayTotal } from "@/lib/booking-price";
import { addDays, parseISODate, toISODate } from "@/lib/date-utils";
import { stripe } from "@/lib/stripe/client";

type CheckoutRequestBody = {
  slug?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isHostawayConfigured()) {
    return NextResponse.json({ error: "Booking is not available right now." }, { status: 503 });
  }

  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { slug, checkIn, checkOut, firstName, lastName, email } = body;
  const adults = Number(body.adults) || 0;
  const children = Number(body.children) || 0;
  const phone = body.phone?.trim();

  if (!slug || !checkIn || !checkOut || !firstName || !lastName || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (adults < 1) {
    return NextResponse.json({ error: "At least one adult guest is required." }, { status: 400 });
  }

  const checkInDate = parseISODate(checkIn);
  const checkOutDate = parseISODate(checkOut);
  if (!checkInDate || !checkOutDate || checkOutDate.getTime() <= checkInDate.getTime()) {
    return NextResponse.json({ error: "Invalid date range." }, { status: 400 });
  }

  const apartment = await getApartmentDetailBySlug(slug);
  if (!apartment) {
    return NextResponse.json({ error: "Apartment not found." }, { status: 404 });
  }
  // `nightlyPrices` is only populated for real Hostaway-backed listings —
  // mock/placeholder listings (used as a browsing fallback) don't have a
  // real listing id, so a real reservation can't be created for them.
  if (!apartment.nightlyPrices) {
    return NextResponse.json({ error: "Booking is not available for this listing." }, { status: 503 });
  }

  const totalGuests = adults + children;
  if (totalGuests > apartment.guests) {
    return NextResponse.json(
      { error: `This apartment fits up to ${apartment.guests} guests.` },
      { status: 400 },
    );
  }

  const bookedSet = new Set(apartment.bookedDates ?? []);
  let cursor = checkInDate;
  while (cursor.getTime() < checkOutDate.getTime()) {
    if (bookedSet.has(toISODate(cursor))) {
      return NextResponse.json(
        { error: "Those dates are no longer available." },
        { status: 409 },
      );
    }
    cursor = addDays(cursor, 1);
  }

  const totalPrice = computeStayTotal(checkIn, checkOut, apartment.nightlyPrices, apartment.pricePerNight);
  if (totalPrice <= 0) {
    return NextResponse.json({ error: "Could not calculate a price for these dates." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: apartment.currency.toLowerCase(),
          product_data: {
            name: `${apartment.title} — ${checkIn} to ${checkOut}`,
          },
          unit_amount: Math.round(totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      listingId: apartment.id,
      slug: apartment.slug,
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
      firstName,
      lastName,
      email,
      phone: phone ?? "",
      totalPrice: String(totalPrice),
      currency: apartment.currency,
    },
    success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/booking/cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
