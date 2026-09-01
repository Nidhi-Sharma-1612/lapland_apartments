"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

const BOOKING_IMAGE = "/images/booking-apartment.jpg";

export function HowBookingWorks({ apartmentCountDisplay }: { apartmentCountDisplay: string }) {
  const STEPS = [
    {
      number: "01",
      title: "Choose your apartment",
      description: `Browse our ${apartmentCountDisplay} handpicked properties in Rovaniemi and find the one that fits your group size and style.`,
    },
    {
      number: "02",
      title: "Select your dates",
      description:
        "Check real-time availability, choose your travel dates, and see clear, transparent pricing instantly.",
    },
    {
      number: "03",
      title: "Confirm your stay",
      description:
        "Book securely online and receive your digital check-in instructions directly to your email.",
    },
  ];

  return (
    <Container as="section" className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center lg:max-w-none">
        <span className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-500">
          HOW BOOKING WORKS
        </span>

        <h2 className="text-2xl leading-tight font-medium tracking-[-0.02em] text-zinc-900 sm:text-4xl lg:text-5xl">
          Simple 3-step booking, instant confirmation
          <br className="hidden lg:block" />{" "}
          <span className="font-extralight">and </span>
          hassle-free arrivals
        </h2>

        <p className="max-w-2xl text-sm leading-6 font-normal text-zinc-500 sm:text-base sm:leading-8 lg:max-w-none lg:text-lg">
          Experience a seamless journey from choosing your perfect Lapland home
          <br className="hidden lg:block" /> to stepping through the front door
          with our{" "}
          <span className="font-semibold text-zinc-700">
            digital self check-in
          </span>
        </p>
      </div>

      <div className="mt-10 flex flex-col-reverse gap-8 sm:mt-12 sm:gap-10 lg:mt-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="flex flex-col"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={staggerItem}
              className={`flex items-start gap-4 py-5 sm:gap-6 sm:py-6 ${
                i < STEPS.length - 1 ? "border-b border-zinc-200" : ""
              }`}
            >
              <span className="text-3xl font-medium text-zinc-200 sm:text-5xl lg:text-7xl">
                {step.number}
              </span>
              <div>
                <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BOOKING_IMAGE}
            alt="A well-lit apartment dining area"
            className="aspect-4/3 w-full object-cover"
          />
        </motion.div>
      </div>
    </Container>
  );
}
