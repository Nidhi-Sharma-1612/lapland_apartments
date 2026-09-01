import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { finalizeCheckoutSession, type FinalizeResult } from "@/lib/stripe/finalize-checkout";

/** Verifies payment directly with Stripe (using our own API key, not
 * anything the browser sent) and creates the Hostaway reservation right
 * here — see `finalizeCheckoutSession`. Idempotent, so a refresh of this
 * page is safe and won't create a duplicate reservation. */
export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let result: FinalizeResult | null = null;
  if (session_id) {
    try {
      result = await finalizeCheckoutSession(session_id);
    } catch (error) {
      console.error("[booking/success] Failed to finalize checkout session:", error);
    }
  }

  const confirmed = result?.status === "created" || result?.status === "already-processed";

  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow={confirmed ? "BOOKING CONFIRMED" : "PAYMENT STATUS"}
          heading={confirmed ? "Payment received" : "Checking your payment"}
          description={
            confirmed
              ? "Thank you — your payment went through and your stay is being confirmed."
              : "We couldn't automatically confirm this booking. See below for what to do next."
          }
        />

        <Container className="flex flex-col items-center gap-6 py-16 text-center">
          {confirmed ? (
            <>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden />
              </span>
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold text-zinc-900">You&apos;re all set</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Your reservation has been created. You&apos;ll receive a
                  confirmation email with your booking details and check-in
                  instructions shortly.
                </p>
              </div>
            </>
          ) : (
            <>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                <AlertTriangle className="h-8 w-8 text-amber-600" aria-hidden />
              </span>
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold text-zinc-900">
                  {result?.status === "not-paid" ? "Payment not completed" : "We're on it"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {result?.status === "not-paid"
                    ? "It looks like checkout wasn't completed, so nothing was charged and no reservation was made."
                    : "If you were charged, your payment is safe — we just couldn't confirm the reservation automatically. Please contact us with your payment confirmation and we'll sort it out right away."}
                </p>
              </div>
            </>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            {!confirmed && result?.status !== "not-paid" && (
              <Link
                href="/contact"
                className="rounded-lg border border-zinc-300 px-8 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400"
              >
                Contact us
              </Link>
            )}
            <Link
              href="/apartments"
              className="rounded-lg bg-brand-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Browse more apartments
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
