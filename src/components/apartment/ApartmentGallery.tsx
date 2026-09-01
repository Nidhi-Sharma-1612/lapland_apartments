"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

const THUMB_ROW_SIZE = 4;

export function ApartmentGallery({
  images,
  totalCount,
  title,
}: {
  images: string[];
  totalCount: number;
  title: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [main, second, third, ...thumbs] = images;
  // Real listings can carry 20-40+ photos — collapse to one row of
  // thumbnails until the guest asks to see the rest.
  const hasMoreThumbs = thumbs.length > THUMB_ROW_SIZE;
  const visibleThumbs = expanded ? thumbs : thumbs.slice(0, THUMB_ROW_SIZE);
  const remainingUnfetched = Math.max(totalCount - images.length, 0);
  const remaining = expanded
    ? remainingUnfetched
    : thumbs.length - visibleThumbs.length + remainingUnfetched;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollByImage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      {/* Mobile: single-image swipeable carousel */}
      <div className="relative lg:hidden">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl"
        >
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={title}
              className="aspect-4/3 w-full shrink-0 snap-start object-cover"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByImage(-1)}
          aria-label="Previous photo"
          className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByImage(1)}
          aria-label="Next photo"
          className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
          <ImageIcon className="h-4 w-4" aria-hidden />
          {totalCount}
        </span>
      </div>

      {/* Desktop: static bento grid */}
      <div className="hidden lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={main}
          alt={title}
          className="w-full rounded-2xl object-cover lg:h-full"
        />
        <div className="grid grid-cols-1 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={second} alt={title} className="w-full rounded-2xl object-cover lg:h-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={third} alt={title} className="w-full rounded-2xl object-cover lg:h-full" />
        </div>
      </div>

      <motion.div
        key={expanded ? "expanded" : "collapsed"}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-4 hidden grid-cols-4 gap-4 lg:grid"
      >
        {visibleThumbs.map((src, i) => {
          const isLast = i === visibleThumbs.length - 1;
          return (
            <motion.div
              key={src}
              variants={staggerItem}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={title} className="h-full w-full object-cover" />
              {isLast && !expanded && remaining > 0 && (
                <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
                  <ImageIcon className="h-4 w-4" aria-hidden />
                  {remaining}
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {hasMoreThumbs && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 hidden text-sm font-semibold text-zinc-900 underline underline-offset-4 lg:block"
        >
          {expanded ? "Show Less Photos" : `Show All ${totalCount} Photos`}
        </button>
      )}
    </div>
  );
}
