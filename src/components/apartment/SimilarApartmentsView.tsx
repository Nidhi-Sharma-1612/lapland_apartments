"use client";

import { motion } from "framer-motion";
import type { Apartment } from "@/lib/types";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function SimilarApartmentsView({ apartments }: { apartments: Apartment[] }) {
  return (
    <Container as="section" className="pt-6 pb-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center lg:max-w-none">
        <span className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-500">
          SIMILAR APARTMENTS
        </span>

        <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] text-zinc-900 sm:text-4xl lg:text-5xl">
          Curated stays <span className="font-extralight">for </span> your
          unique Arctic
          <br />
          journey
          <span className="font-extralight">and</span> comfort
        </h2>

        <p className="max-w-2xl text-base leading-6 font-normal text-zinc-500 sm:leading-8 lg:max-w-none lg:text-lg">
          Explore other handpicked options in Rovaniemi that match your style,
          ensuring the
          <br className="hidden lg:block" /> same{" "}
          <span className="font-semibold text-zinc-700">
            premium comfort and perfect central location.
          </span>
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pr-5 pb-2 pl-8 scroll-pl-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0"
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
    </Container>
  );
}
