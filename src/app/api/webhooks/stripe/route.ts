import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { finalizeCheckoutSession } from "@/lib/stripe/finalize-checkout";

/** Dormant unless STRIPE_WEBHOOK_SECRET is set (it isn't, currently — no
 * access to the Stripe Dashboard to create a webhook endpoint). The primary
 * path that creates a Hostaway reservation is `/booking/success`, which
 * verifies payment directly with Stripe using our own API key. This route
 * is a bonus safety net for later: a webhook covers the case where a guest
 * pays but closes the tab before the success page loads, which the success
 * page alone can't catch. Both paths call the same idempotent function, so
 * enabling this later is just a matter of setting the env var. */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature ?? "", webhookSecret);
  } catch (error) {
    console.error("[stripe webhook] Signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await finalizeCheckoutSession(session.id);
  }

  return NextResponse.json({ received: true });
}
