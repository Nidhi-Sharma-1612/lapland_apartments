"use client";

import { Building2, Compass, ShieldCheck, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function WhyStayWithUs({ apartmentCountDisplay }: { apartmentCountDisplay: string }) {
  const FEATURES = [
    {
      icon: Compass,
      title: "Local Experts",
      description:
        "We operate directly in Rovaniemi and know Lapland inside out.",
    },
    {
      icon: Building2,
      title: `${apartmentCountDisplay} Apartments`,
      description: "From cozy studios to spacious family apartments.",
    },
    {
      icon: ShieldCheck,
      title: "Easy Self Check-In",
      description: "Flexible arrivals and smooth digital check-in.",
    },
    {
      icon: Sparkle,
      title: "Activities & Experiences",
      description: "We help you book unforgettable Lapland adventures.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#0a1a22] bg-cover bg-top py-14 text-white sm:py-16 lg:py-20"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(6,14,18,0.55) 0%, rgba(8,17,15,0.75) 55%, #0a1a22 100%), url(/images/why-stay-aurora.jpg)",
      }}
    >
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center lg:max-w-none">
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70">
            WHY STAY WITH US
          </span>

          <h2 className="text-2xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Local expertise, {apartmentCountDisplay} premium properties
            <br className="hidden lg:block" />{" "}
            <span className="font-extralight">and </span>seamless digital
            check-in
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-8 lg:max-w-none lg:text-lg">
            We are Rovaniemi specialists, offering carefully managed apartments
            <br className="hidden lg:block" /> and{" "}
            <span className="font-semibold text-white">
              unforgettable Arctic experiences.
            </span>
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
        >
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/0 p-6 transition-colors duration-300 hover:border-white/30 hover:bg-white/6 sm:gap-3 sm:p-6"
            >
              <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 group-hover:border-brand-green/60 group-hover:text-emerald-300"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </motion.span>
                <h3 className="text-xl font-semibold sm:text-lg">{title}</h3>
              </div>
              <p className="text-sm text-white/70">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
