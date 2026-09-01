import "server-only";
import Stripe from "stripe";

// STRIPE_SECRET_KEY (the "mk_" prefixed value) returned a 401 from Stripe —
// falling back to the restricted key, which is a valid alternative credential
// for server-side API calls as long as it has the right permissions.
const secretKey = process.env.STRIPE_RESTRICTED_KEY || process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "Stripe is not configured: set STRIPE_SECRET_KEY or STRIPE_RESTRICTED_KEY in .env.local.",
  );
}

export const stripe = new Stripe(secretKey);
