# Lapland Apartments

A direct-booking vacation rental site for Rovaniemi, Finland — built with
Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Listings, pricing,
availability, and reviews are pulled live from Hostaway; payments are handled
through Stripe Checkout, with a real Hostaway reservation created once a
payment succeeds.

## Features

- **Live listings** — search, filter (location, guests, bedrooms, dates),
  sort, and paginate real Hostaway inventory. Searching with dates filters
  out listings that aren't actually available for that range and shows the
  real nightly rate for those exact dates, not a generic base price.
- **Apartment detail pages** — real photos, amenities, description, house
  rules, minimum-stay requirement, and location, all sourced from Hostaway
  per listing (falling back to a smaller set of confirmed values where
  Hostaway has no per-listing data, e.g. pet/smoking/events policy).
- **Booking + payment** — a booking widget with live availability and
  pricing, Stripe Checkout for payment, and an idempotent confirmation flow
  that creates the real Hostaway reservation only after Stripe confirms the
  payment succeeded (see `finalizeCheckoutSession`).
- **Real guest reviews**, aggregated and star-rated per listing.
- **Activities & holiday packages** — real tours and multi-night packages
  sourced from booklapland.com, linking out to their own booking pages.
- Falls back to local mock data everywhere above when Hostaway isn't
  configured, so the UI stays fully browsable during setup.

## Tech stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Payments:** Stripe (Checkout + a webhook safety net)
- **PMS integration:** Hostaway API (listings, calendar/pricing, reviews, reservations)

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

Create a `.env.local` file with:

```bash
# Hostaway (listings, availability, pricing, reviews, reservations)
HOSTAWAY_CLIENT_ID=
HOSTAWAY_CLIENT_SECRET=

# Stripe (checkout + payment confirmation)
STRIPE_SECRET_KEY=
STRIPE_RESTRICTED_KEY=       # fallback if STRIPE_SECRET_KEY lacks permissions

# Optional — enables the webhook safety net (see "Payment flow" below).
# The primary confirmation path works without it.
STRIPE_WEBHOOK_SECRET=
```

Without Hostaway credentials configured, the site falls back to local mock
data (`src/lib/mock-*.ts`) so the UI can still be developed and previewed.

### Payment flow

`/booking/success` is the primary confirmation path: it verifies the
payment directly with Stripe (using our own API key, not anything the
browser sent) and creates the Hostaway reservation right there. It's
idempotent, so a page refresh can't create a duplicate reservation.

`/api/webhooks/stripe` calls the same idempotent function as a safety net,
for the rare case a guest pays and closes the tab before the success page
loads. It stays dormant (returns 503) until `STRIPE_WEBHOOK_SECRET` is set
up in the Stripe Dashboard — not required to launch, since the success page
handles confirmation on its own.

## Project structure

```
src/
  app/                  Routes (App Router)
    page.tsx            Home
    apartments/         Listing search + [slug] detail pages
    activities/         Northern Lights tours, winter activities, holiday packages
    about/ contact/      Static content pages
    booking/            Post-checkout success/cancelled pages
    terms/ privacy/      Legal pages
    api/checkout/        Creates a Stripe Checkout session
    api/webhooks/        Stripe webhook → creates the Hostaway reservation
  components/           UI components, grouped by page/section
  lib/
    hostaway/           Hostaway API client + data mapping
    stripe/             Stripe client + checkout finalization
    mock-*.ts           Fallback content when Hostaway isn't configured
```

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```

## Deployment

Deploys as a standard Next.js app (e.g. on [Vercel](https://vercel.com/new)).
Set the environment variables above in your hosting provider's dashboard, and
point the Stripe webhook endpoint at `/api/webhooks/stripe` once you set one
up (optional — see "Payment flow" above).
