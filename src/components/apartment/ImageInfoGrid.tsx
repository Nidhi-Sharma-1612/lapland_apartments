"use client";

import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function ImageInfoGrid({
  items,
}: {
  items: { title: string; description?: string; imageUrl: string }[];
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={staggerItem}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <h3 className="mt-3 font-semibold text-zinc-900">{item.title}</h3>
          {item.description && (
            <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
