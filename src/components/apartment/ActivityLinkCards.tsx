"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

const ACTIVITY_LINKS = [
  {
    title: "Northern Lights Tours",
    description: "Chase the aurora with an expert guide.",
    href: "https://booklapland.fi/aurora-hunting/",
    imageUrl: "/images/activity-northern-lights.jpg",
  },
  {
    title: "Winter Activities",
    description: "Husky safaris, snowmobiling, and more Arctic adventures.",
    href: "https://booklapland.fi/other-tours/",
    imageUrl: "/images/activity-winter.jpg",
  },
];

export function ActivityLinkCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {ACTIVITY_LINKS.map((activity) => (
        <motion.a
          key={activity.title}
          variants={staggerItem}
          href={activity.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl sm:h-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <div className="relative z-10 flex items-end justify-between gap-4 p-6">
            <div>
              <h3 className="text-xl font-semibold text-white">{activity.title}</h3>
              <p className="mt-1 text-sm text-white/80">{activity.description}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-5 w-5" aria-hidden />
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
