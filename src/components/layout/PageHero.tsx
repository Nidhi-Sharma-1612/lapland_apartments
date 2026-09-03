import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";

const BANNER_IMAGE = "/images/why-stay-aurora.jpg";

/** Shared dark aurora banner for interior pages (Apartments, Activities,
 * About, Contact) that don't have their own Figma hero design — keeps the
 * homepage's gradient/typography language and background photo consistent
 * site-wide. */
export function PageHero({
  eyebrow,
  heading,
  description,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative text-white">
      <Header />

      <div
        className="relative bg-cover bg-top pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(9,20,26,0.45) 0%, rgba(9,20,26,0.65) 60%, rgba(9,20,26,0.85) 100%), url(${BANNER_IMAGE})`,
        }}
      >
        <div className="absolute inset-0 bg-[#130F0F]/[0.34]" aria-hidden />

        <Container className="relative z-10">
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70">
            {eyebrow}
          </span>

          <h1 className="mt-4 max-w-2xl text-4xl leading-tight font-extralight tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {heading}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-6 text-white/80 sm:leading-7">
            {description}
          </p>
        </Container>
      </div>

      {children && (
        // z-40: a parent's z-index caps how high its descendants (e.g. the
        // search bar's popovers) can stack against sibling sections below.
        <Container className="relative z-40 -mt-8 lg:-mt-10">
          {children}
        </Container>
      )}
    </section>
  );
}
