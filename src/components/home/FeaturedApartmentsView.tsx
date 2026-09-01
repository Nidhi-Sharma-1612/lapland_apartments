"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Apartment } from "@/lib/types";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function FeaturedApartmentsView({
  apartments,
  apartmentCountDisplay,
}: {
  apartments: Apartment[];
  apartmentCountDisplay: string;
}) {
  return (
    <Container as="section" className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center lg:max-w-none">
        <span className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-500">
          FEATURED APARTMENTS
        </span>

        <h2 className="text-2xl leading-tight font-medium tracking-[-0.02em] text-zinc-900 sm:text-4xl lg:text-5xl">
          Premium city studios, family apartments
          <br className="hidden lg:block" />{" "}
          <span className="font-extralight">and </span>northern lights retreats
        </h2>

        <p className="max-w-2xl text-sm leading-6 font-normal text-zinc-500 sm:text-base sm:leading-8 lg:max-w-none lg:text-lg">
          From cozy studios to spacious family homes, find your perfect base
          among
          <br className="hidden lg:block" /> our{" "}
          <span className="font-medium text-zinc-700">
            {apartmentCountDisplay} carefully selected properties
          </span>{" "}
          in Rovaniemi.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-8 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pr-5 pb-2 pl-8 scroll-pl-8 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-12 lg:gap-x-8 lg:gap-y-12"
      >
        {apartments.map((apartment) => (
          <motion.div
            key={apartment.id}
            variants={staggerItem}
            className="w-[80vw] shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <PropertyCard apartment={apartment} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center sm:mt-14 lg:mt-16">
        <Link
          href="/apartments"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          View All Apartments
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Container>
  );
}
