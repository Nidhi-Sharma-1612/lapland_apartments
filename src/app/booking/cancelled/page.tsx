import Link from "next/link";
import { XCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

export default function BookingCancelledPage() {
  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow="BOOKING CANCELLED"
          heading="No charge was made"
          description="You cancelled checkout before completing payment — your card was not charged."
        />

        <Container className="flex flex-col items-center gap-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
            <XCircle className="h-8 w-8 text-zinc-500" aria-hidden />
          </span>
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-zinc-900">Checkout was cancelled</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Your dates weren&apos;t reserved and no payment was taken. You can
              pick up where you left off any time.
            </p>
          </div>
          <Link
            href="/apartments"
            className="rounded-lg bg-brand-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Back to apartments
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
