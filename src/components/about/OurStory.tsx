"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { revealViewport } from "@/lib/motion-variants";

const STORY_IMAGE = "/images/about-our-story.jpg";

export function OurStory({ apartmentCountDisplay }: { apartmentCountDisplay: string }) {
  return (
    <Container as="section" className="py-16 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STORY_IMAGE}
            alt="A cozy Lapland Apartments interior"
            className="aspect-4/5 w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <span className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-500">
            OUR STORY
          </span>

          <h2 className="mt-4 text-3xl leading-tight font-medium tracking-[-0.02em] text-zinc-900 sm:text-4xl lg:text-5xl">
            Simple, comfortable
            <br className="hidden lg:block" />{" "}
            <span className="font-extralight">and</span> memorable
          </h2>

          <p className="mt-6 text-base leading-6 text-zinc-500 sm:leading-7">
            We believe a great stay is about more than just where you sleep.
            It&apos;s about feeling comfortable from the moment you arrive,
            having local support when you need it, and experiencing the best
            of Lapland while you&apos;re here.
          </p>
          <p className="mt-4 text-base leading-6 text-zinc-500 sm:leading-7">
            We carefully manage{" "}
            <span className="font-semibold text-zinc-900">
              {apartmentCountDisplay} apartments
            </span>{" "}
            and combine them with local experiences, recommendations and
            personal service — so you can spend less time planning and more
            time enjoying Lapland.
          </p>
          <p className="mt-4 text-base leading-6 text-zinc-500 sm:leading-7">
            Whether you&apos;re visiting for a weekend, a family holiday or a
            longer Arctic escape, our goal is simple: to make your stay easy,
            memorable and truly local.
          </p>
        </motion.div>
      </div>
    </Container>
  );
}
