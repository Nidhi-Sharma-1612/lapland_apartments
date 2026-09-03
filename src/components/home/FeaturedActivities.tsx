"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

const ACTIVITIES = [
  {
    title: "Northern Lights Tours",
    description:
      "Join a guided chase into the Arctic wilderness to capture nature's most spectacular light show.",
    href: "https://booklapland.fi/aurora-hunting/",
    imageUrl: "/images/activity-northern-lights.jpg",
  },
  {
    title: "Winter Activities",
    description: "We work closely with local operators – find all activities through us.",
    href: "https://booklapland.fi/other-tours/",
    imageUrl: "/images/nearby-snowmobile.jpg",
  },
  {
    title: "Holiday Packages",
    description: "Want help planning your entire trip? We'd love to help!",
    href: "https://booklapland.fi/holiday-packages-lapland/",
    imageUrl: "/images/featured-santa-village.jpg",
  },
  {
    title: "SkyView Igloo Resort",
    description: "Glass-ceiling igloos with front-row views of the aurora, just outside Rovaniemi.",
    href: "https://skyviewigloos.com/",
    imageUrl:
      "https://skyviewigloos.com/wp-content/uploads/2026/05/blue-moment-skyview-igloo-resort-rovaniemi-lapland-finland.webp",
  },
];

export function FeaturedActivities() {
  return (
    <Container as="section" className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center lg:max-w-none">
        <span className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-500">
          FEATURED ACTIVITIES
        </span>

        <h2 className="text-2xl leading-tight font-medium tracking-[-0.02em] text-zinc-900 sm:text-4xl lg:text-5xl">
          Official hometown of Santa Claus, gateway to the
          <br className="hidden lg:block" /> Arctic{" "}
          <span className="font-extralight">and </span>northern lights capital
        </h2>

        <p className="max-w-2xl text-sm leading-6 font-normal text-zinc-500 sm:text-base sm:leading-8 lg:max-w-none lg:text-lg">
          Rovaniemi is the official hometown of Santa Claus and the gateway
          <br className="hidden lg:block" /> to{" "}
          <span className="font-semibold text-zinc-700">
            the Arctic wilderness.
          </span>
        </p>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-5 pb-2 pl-8 scroll-pl-8 sm:mt-10 md:hidden"
      >
        {ACTIVITIES.map((activity) => (
          <motion.div
            key={activity.title}
            variants={staggerItem}
            className="aspect-4/5 w-[80vw] shrink-0 snap-start"
          >
            <ActivityTile
              href={activity.href}
              title={activity.title}
              description={activity.description}
              imageUrl={activity.imageUrl}
              showArrow
              external
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Tablet and up: a clean 2x2 grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-10 hidden md:grid md:grid-cols-2 md:gap-4 md:mt-12 lg:gap-6"
      >
        {ACTIVITIES.map((activity) => (
          <motion.div key={activity.title} variants={staggerItem} className="aspect-video">
            <ActivityTile
              href={activity.href}
              title={activity.title}
              description={activity.description}
              imageUrl={activity.imageUrl}
              showArrow
              external
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center sm:mt-14">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          Explore Activities
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Container>
  );
}

function ActivityTile({
  href,
  title,
  description,
  imageUrl,
  showArrow = false,
  className = "",
  external = false,
}: {
  href: string;
  title: string;
  description?: string;
  imageUrl: string;
  showArrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

      {showArrow && (
        <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 sm:top-6 sm:right-6 sm:h-12 sm:w-12">
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </span>
      )}

      <div className="relative z-10 p-4 text-white sm:p-5 lg:p-6">
        <h3 className="text-base font-medium sm:text-lg lg:text-2xl">{title}</h3>
        {description && (
          <p className="mt-2 max-w-sm text-xs text-white/80 sm:text-sm">{description}</p>
        )}
      </div>
    </Link>
  );
}
