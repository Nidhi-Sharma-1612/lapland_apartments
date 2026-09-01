"use client";

import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function PerfectForList({
  items,
}: {
  items: { label: string; description: string }[];
}) {
  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="flex flex-col gap-3"
    >
      {items.map((item) => (
        <motion.li
          key={item.label}
          variants={staggerItem}
          className="flex gap-2 text-sm text-zinc-600"
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
            aria-hidden
          />
          <p>
            <span className="font-semibold text-zinc-900">{item.label}</span>{" "}
            {item.description}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
