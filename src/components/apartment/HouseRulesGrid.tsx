"use client";

import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function HouseRulesGrid({
  rules,
}: {
  rules: { title: string; description: string }[];
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2"
    >
      {rules.map((rule) => (
        <motion.div key={rule.title} variants={staggerItem} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
          <div>
            <h3 className="font-semibold text-zinc-900">{rule.title}</h3>
            <p className="mt-1 text-sm text-zinc-500">{rule.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
