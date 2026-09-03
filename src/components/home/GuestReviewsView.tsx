"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { ReviewCard } from "@/lib/types";
import { Container } from "@/components/layout/Container";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

export function GuestReviewsView({ reviews }: { reviews: ReviewCard[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * (el.clientWidth / 1.2),
      behavior: "smooth",
    });
  };

  // Auto-rotate through reviews, pausing on hover/focus and looping back to
  // the start once the end is reached. Skipped entirely for users who
  // prefer reduced motion.
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({
        left: atEnd ? 0 : el.scrollLeft + el.clientWidth / 1.2,
        behavior: "smooth",
      });
    }, 4500);

    return () => clearInterval(id);
  }, [isPaused]);

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
            GUEST REVIEWS
          </span>

          <h2 className="text-2xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Trusted by families, adventurous couples{" "}
            <span className="font-extralight">and </span>
            <br />
            groups from around the world
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-8 lg:max-w-none lg:text-lg">
            See why our guests rate their Lapland stay as a five-star experience
            <br className="hidden lg:block" /> through verified reviews{" "}
            <span className="font-semibold text-white">
              from real guests.
            </span>
          </p>
        </div>
      </Container>

      <motion.div
        ref={scrollerRef}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pt-2 pb-6 scroll-pl-6 sm:mt-14 sm:gap-6 sm:px-10 sm:scroll-pl-10 lg:px-[max(3rem,calc((100%-80rem)/2))] lg:scroll-pl-[max(3rem,calc((100%-80rem)/2))]"
      >
        {reviews.map((review, i) => (
          <motion.div
            key={`${review.name}-${i}`}
            variants={staggerItem}
            className="flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-105 sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <SourceLogo source={review.source} />
                <span className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => {
                    // Whole-rounding here would show a real 4.5 (e.g. a
                    // Hostaway 9/10) identically to a perfect 5.0 — clip a
                    // partial star instead so the difference is visible.
                    const fill = Math.min(1, Math.max(0, review.rating - starIndex));
                    return (
                      <span key={starIndex} className="relative h-4 w-4">
                        <Star className="absolute inset-0 h-4 w-4 fill-transparent text-white/30" aria-hidden />
                        {fill > 0 && (
                          <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                          >
                            <Star className="h-4 w-4 fill-current" aria-hidden />
                          </span>
                        )}
                      </span>
                    );
                  })}
                </span>
              </div>

              <div className="mt-4 min-h-7">
                {review.title && <h3 className="text-lg font-semibold">{review.title}</h3>}
              </div>
              <div className="thin-scrollbar mt-3 h-36 overflow-y-auto pr-3">
                <p className="text-sm leading-6 text-white/70">{review.body}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium">{review.name}</p>
              <p className="text-sm text-white/60">{review.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Container className="relative z-10">
        <div
          className="mt-2 flex justify-center gap-3 sm:mt-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous reviews"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next reviews"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 transition-transform hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </Container>
    </section>
  );
}

function SourceLogo({ source }: { source: ReviewCard["source"] }) {
  if (source === "google") return <GoogleLogo />;
  if (source === "booking") return <BookingLogo />;
  return <AirbnbLogo />;
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.55c-.13 1.08-.85 2.72-2.44 3.82l-.02.15 3.55 2.7.25.02c2.26-2.05 3.61-5.07 3.61-8.36Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.05 7.93-2.86l-3.78-2.87c-1.01.7-2.38 1.19-4.15 1.19-3.17 0-5.86-2.05-6.82-4.89l-.14.01-3.7 2.78-.05.13C3.25 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.18 14.57a7.4 7.4 0 0 1-.41-2.44c0-.85.15-1.67.4-2.44l-.01-.16-3.75-2.83-.12.06A11.94 11.94 0 0 0 0 12.13c0 1.93.47 3.76 1.29 5.37l3.89-2.93Z"
      />
      <path
        fill="#EB4335"
        d="M12 4.8c2.25 0 3.77.96 4.64 1.77l3.38-3.28C17.94 1.24 15.24 0 12 0 7.31 0 3.25 2.7 1.29 6.63l3.88 2.93C6.14 6.85 8.83 4.8 12 4.8Z"
      />
    </svg>
  );
}

function AirbnbLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#FF5A5F" className="h-6 w-6" aria-hidden>
      <path d="M12 2c.7 0 1.3.36 1.66.97 2.1 3.53 4.34 7.2 5.2 9.06.62 1.32.9 2.28.9 3.13 0 3.15-2.5 5.66-5.6 5.66-1.28 0-2.47-.44-3.4-1.17a5.7 5.7 0 0 1-3.4 1.17c-3.1 0-5.6-2.51-5.6-5.66 0-.85.28-1.81.9-3.13.86-1.86 3.1-5.53 5.2-9.06A1.93 1.93 0 0 1 12 2Zm0 3.3c-1.86 3.16-3.6 6.16-4.3 7.7-.5 1.08-.66 1.7-.66 2.16 0 1.68 1.34 3.02 3 3.02.9 0 1.71-.4 2.27-1.03a13 13 0 0 1-.86-1.62c-.34-.78-.5-1.5-.5-2.2 0-1.4.98-2.53 2.05-2.53s2.05 1.13 2.05 2.53c0 .7-.16 1.42-.5 2.2-.22.5-.5 1.06-.86 1.62a3 3 0 0 0 2.27 1.03c1.66 0 3-1.34 3-3.02 0-.46-.16-1.08-.66-2.16-.7-1.54-2.44-4.54-4.3-7.7Z" />
    </svg>
  );
}

function BookingLogo() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#003580] text-[11px] font-black text-white">
      B
    </span>
  );
}
