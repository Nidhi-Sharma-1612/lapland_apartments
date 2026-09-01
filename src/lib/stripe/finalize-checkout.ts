import "server-only";
import { stripe } from "./client";
import { createHostawayReservation } from "@/lib/hostaway/reservations";

export type FinalizeResult =
  | { status: "created"; reservationId: number }
  | { status: "already-processed"; reservationId: number }
  | { status: "not-paid" }
  | { status: "invalid-metadata" }
  | { status: "error" };

/** The single place a Hostaway reservation is actually created. Verifies
 * payment by asking Stripe directly with our own API key — not by trusting
 * anything the browser sends — so this is safe to call from a page a guest's
 * browser lands on after checkout, even without a webhook signing secret.
 * Idempotent: safe to call more than once for the same session (e.g. the
 * guest refreshes the success page) via the PaymentIntent metadata check. */
export async function finalizeCheckoutSession(sessionId: string): Promise<FinalizeResult> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });

  if (session.payment_status !== "paid") {
    return { status: "not-paid" };
  }

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? await stripe.paymentIntents.retrieve(session.payment_intent)
      : session.payment_intent;

  if (!paymentIntent) {
    return { status: "error" };
  }

  if (paymentIntent.metadata?.hostaway_reservation_id) {
    return {
      status: "already-processed",
      reservationId: Number(paymentIntent.metadata.hostaway_reservation_id),
    };
  }

  const meta = session.metadata ?? {};
  const listingId = Number(meta.listingId);
  if (!listingId || !meta.checkIn || !meta.checkOut || !meta.email) {
    console.error("[stripe] checkout session metadata incomplete:", sessionId, meta);
    return { status: "invalid-metadata" };
  }

  try {
    const reservation = await createHostawayReservation({
      listingId,
      checkIn: meta.checkIn,
      checkOut: meta.checkOut,
      adults: Number(meta.adults) || 1,
      children: Number(meta.children) || 0,
      firstName: meta.firstName || "Guest",
      lastName: meta.lastName || "",
      email: meta.email,
      phone: meta.phone || undefined,
      totalPrice: Number(meta.totalPrice) || 0,
      currency: meta.currency || "EUR",
      paymentReference: paymentIntent.id,
    });

    await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: { hostaway_reservation_id: String(reservation.id) },
    });

    return { status: "created", reservationId: reservation.id };
  } catch (error) {
    // Payment already succeeded at this point — this is a "needs a human"
    // failure, not something a retry will fix on its own. There's no
    // alerting/paging system in this project, so a loud server log is the
    // extent of the failure path for now.
    console.error(
      `[stripe] PAYMENT SUCCEEDED BUT RESERVATION CREATION FAILED — manual follow-up needed. session=${sessionId} paymentIntent=${paymentIntent.id}`,
      { metadata: meta, error },
    );
    return { status: "error" };
  }
}
