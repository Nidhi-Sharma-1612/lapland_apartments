"use client";

import { Building2, MessageSquareText, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function StatsRow({
  apartmentCountDisplay,
  averageRatingDisplay,
  totalReviewCountDisplay,
}: {
  apartmentCountDisplay: string;
  averageRatingDisplay: string;
  totalReviewCountDisplay: string;
}) {
  const STATS = [
    { icon: Building2, value: apartmentCountDisplay, label: "Managed apartments" },
    { icon: Star, value: averageRatingDisplay, label: "Average guest rating" },
    { icon: MessageSquareText, value: totalReviewCountDisplay, label: "Real guest reviews" },
  ];

  return (
    <Container as="section" className="pb-16 lg:pb-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid grid-cols-1 gap-4 rounded-2xl border border-zinc-200 p-6 sm:grid-cols-3 lg:p-10"
      >
        {STATS.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            variants={staggerItem}
            className="flex flex-col items-center text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <p className="mt-3 text-3xl font-semibold text-brand-green sm:text-4xl">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
