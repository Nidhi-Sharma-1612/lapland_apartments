import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const MOUNTAIN_IMAGE = "/images/cta-mountains.jpg";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 text-white sm:py-28 lg:py-36">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MOUNTAIN_IMAGE}
        alt="Starry aurora sky over Lapland"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl leading-tight font-extralight tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Find Your Perfect
            <br />
            <span className="font-medium">Lapland Stay</span>
          </h2>

          <p className="text-sm leading-6 text-white/85 sm:text-base sm:leading-7 lg:text-lg">
            <span className="font-semibold text-white">
              Book your Rovaniemi apartment today
            </span>{" "}
            and start planning your{" "}
            <span className="font-semibold text-white">
              unforgettable Arctic adventure
            </span>{" "}
            with our{" "}
            <span className="font-semibold text-white">local experts.</span>
          </p>

          <Link
            href="/apartments"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-brand-green transition-transform hover:scale-[1.03]"
          >
            Search Apartments
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
