# Lapland Apartments

A direct-booking vacation rental site for Rovaniemi, Finland — built with
Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Listings, pricing,
availability, and reviews are pulled live from Hostaway; payments are handled
through Stripe Checkout.

## Tech stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Payments:** Stripe (Checkout + webhooks)
- **PMS integration:** Hostaway API (listings, availability, reviews, reservations)

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
# Hostaway (listings, availability, reviews, reservations)
HOSTAWAY_CLIENT_ID=
HOSTAWAY_CLIENT_SECRET=

# Stripe (checkout + payment confirmation)
STRIPE_SECRET_KEY=
STRIPE_RESTRICTED_KEY=
STRIPE_WEBHOOK_SECRET=
```

Without Hostaway credentials configured, the site falls back to local mock
data (`src/lib/mock-*.ts`) so the UI can still be developed and previewed.

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
    stripe/             Stripe client
    mock-*.ts           Fallback content when Hostaway isn't configured
```

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```
