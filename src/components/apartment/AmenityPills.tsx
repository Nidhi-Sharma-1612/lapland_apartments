"use client";

import {
  ArrowUpDown,
  Baby,
  Car,
  ChefHat,
  Flame,
  KeyRound,
  LandPlot,
  PawPrint,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Star,
  Tv,
  Wifi,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

const ICONS: Record<string, LucideIcon> = {
  sauna: Flame,
  balcony: LandPlot,
  location: LandPlot,
  parking: Car,
  wifi: Wifi,
  kitchen: ChefHat,
  bathroom: ShowerHead,
  laundry: ShieldCheck,
  entertainment: Star,
  heating: Flame,
  outdoor: LandPlot,
};

/** Ordered keyword → icon rules, checked against a real Hostaway amenity
 * name (e.g. "Air conditioning", "Smoke detector"). Falls back to the exact
 * `icon` key map above (for mock data) and finally a generic icon. */
const LABEL_RULES: [RegExp, LucideIcon][] = [
  [/wifi|wireless|internet/i, Wifi],
  [/\btv\b|cable/i, Tv],
  [/elevator/i, ArrowUpDown],
  [/air condition/i, Snowflake],
  [/heating|sauna/i, Flame],
  [/wash(ing)? machine|laundry/i, ShieldCheck],
  [/hair dryer/i, Wind],
  [/smoke detector|carbon monoxide|fire extinguisher|first aid/i, ShieldCheck],
  [/shower|bidet|toilet|bathroom/i, ShowerHead],
  [
    /kitchen|oven|stove|dishwasher|microwave|refrigerator|freezer|utensil|dining|kettle|coffee|spice|cooking/i,
    ChefHat,
  ],
  [/parking/i, Car],
  [/balcony|view|outdoor/i, LandPlot],
  [/pet/i, PawPrint],
  [/contactless|private entrance/i, KeyRound],
  [/child|infant/i, Baby],
];

function matchIconByLabel(label: string): LucideIcon | null {
  const rule = LABEL_RULES.find(([pattern]) => pattern.test(label));
  return rule ? rule[1] : null;
}

export function AmenityPills({
  items,
  limit,
}: {
  items: { icon: string; label: string }[];
  /** When set and `items` exceeds it, only show `limit` pills until the
   * guest expands to see the rest — real Hostaway listings can carry 20-40+
   * amenities, which otherwise pushes the whole page down before the guest
   * gets to booking. */
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = typeof limit === "number" && items.length > limit;
  const visibleItems = shouldTruncate && !expanded ? items.slice(0, limit) : items;

  return (
    <div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="flex flex-wrap gap-3"
      >
        {visibleItems.map((item) => {
          const Icon = matchIconByLabel(item.label) ?? ICONS[item.icon] ?? Tv;
          return (
            <motion.span
              key={item.label}
              variants={staggerItem}
              className="flex items-center gap-2.5 rounded-2xl border border-zinc-200 px-5 py-3.5 text-sm font-medium text-zinc-700"
            >
              <Icon className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
              {item.label}
            </motion.span>
          );
        })}
      </motion.div>

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-sm font-semibold text-zinc-900 underline underline-offset-4"
        >
          {expanded ? "Show Less" : `Show All ${items.length} Amenities`}
        </button>
      )}
    </div>
  );
}
