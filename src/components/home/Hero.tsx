"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS, isNavLinkActive } from "@/lib/nav";
import { SearchBar } from "@/components/home/SearchBar";
import { Container } from "@/components/layout/Container";
import { LogoMark } from "@/components/layout/LogoMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

/** Mood tags, not real filters — purely to spark ideas before searching.
 * Kept deliberately non-interactive so they never imply they narrow results. */
const INSPIRATION_TAGS = [
  "City center",
  "Northern lights view",
  "Sauna",
  "Family friendly",
];

const AVATARS = [
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=47",
];

const HERO_IMAGE_URL = "/images/hero-northern-lights.jpg";

export function Hero({ apartmentCountDisplay }: { apartmentCountDisplay: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <section>
      <div className="relative mx-auto flex min-h-svh w-full flex-col overflow-hidden bg-[#0a1a22]">
        {/* Real aurora photo, one Ken Burns layer for every breakpoint —
            a looping zoom so the hero feels alive even though it's a
            still. */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.12 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
          aria-hidden
        />

        {/* Gradient + dark overlay on top of the video for text legibility,
            matching the site's aurora color language. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(9,20,26,0.1) 0%, rgba(9,20,26,0.25) 60%, rgba(9,20,26,0.55) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#130F0F]/15" aria-hidden />

        {/* Nav */}
        <Container className="relative z-10 flex items-center justify-between py-6 text-white lg:py-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl leading-8 font-medium tracking-normal"
          >
            <LogoMark />
            Lapland Apartments
          </Link>

          <nav className="hidden items-center gap-4 text-base leading-6 font-normal lg:flex">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors",
                    isNavLinkActive(pathname, link.href)
                      ? "font-semibold text-white"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-white/40" aria-hidden>
                    /
                  </span>
                )}
              </span>
            ))}
          </nav>

          <Link
            href="/apartments"
            className="hidden items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base leading-6 font-semibold text-brand-green transition-transform hover:scale-[1.03] lg:inline-flex"
          >
            Book Now
            <span aria-hidden>↗</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-white/30 p-2 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>

        {/* Headline + stats + search, centered together as one group so the
            gap between the headline and the booking widget stays fixed
            regardless of viewport height. */}
        <Container className="relative z-10 flex flex-1 flex-col justify-start gap-8 pt-12 pb-8 sm:gap-10 sm:pt-16 lg:gap-14 lg:pt-40">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl shrink-0 font-extralight text-white text-[40px] leading-11 tracking-[-0.02em] sm:text-[56px] sm:leading-15.5 lg:max-w-212.5 lg:text-[72px] lg:leading-20"
            >
              Stay in the Best{" "}
              <span className="lg:whitespace-nowrap">
                Apartments <span className="font-semibold">in Rovaniemi</span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex max-w-md shrink-0 flex-col gap-4 text-white"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex -space-x-4">
                  {AVATARS.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-12 w-12 rounded-full border-2 border-white object-cover sm:h-14 sm:w-14"
                      style={{ zIndex: AVATARS.length - i }}
                    />
                  ))}
                </div>
                <p className="flex flex-col gap-0.5 sm:block sm:gap-0 lg:whitespace-nowrap">
                  <span className="text-xl font-bold">5000+</span>
                  <span className="hidden sm:inline"> </span>
                  <span className="text-sm text-white/90 sm:text-base sm:text-white">
                    Happy Arctic Travelers
                  </span>
                </p>
              </div>
              <p className="text-base text-white/80">
                <span className="font-semibold text-white">
                  {apartmentCountDisplay} carefully selected apartments
                </span>{" "}
                in the heart of Lapland.
                <br />
                Perfect for{" "}
                <span className="font-semibold text-white">
                  couples, families,
                </span>{" "}
                and <span className="font-semibold text-white">groups</span>{" "}
                visiting Rovaniemi.
              </p>
            </motion.div>
          </div>

          {/* Search bar + inspiration tags */}
          <div>
            <SearchBar />
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {INSPIRATION_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>

        {/* Scroll cue: bobbing chevron + small label, pinned to the bottom
            of the hero regardless of how tall the content above it is. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/70 lg:flex lg:bottom-8"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </motion.div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </section>
  );
}
