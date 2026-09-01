"use client";

import { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Plane,
  ShoppingCart,
  Building2,
  Sparkles,
  Footprints,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

/** Ordered keyword → icon rules for the "nearby" info cards (e.g. "Rovaniemi
 * Airport", "Local Supermarkets") — purely cosmetic, falls back to a plain
 * pin icon for anything unrecognized. */
const INFO_ICON_RULES: [RegExp, LucideIcon][] = [
  [/airport/i, Plane],
  [/supermarket|shop|store|market/i, ShoppingCart],
  [/santa|village|attraction|museum/i, Sparkles],
  [/city|center|centre|downtown/i, Building2],
  [/walk|minute|distance/i, Footprints],
];

function matchInfoIcon(label: string): LucideIcon {
  const rule = INFO_ICON_RULES.find(([pattern]) => pattern.test(label));
  return rule ? rule[1] : MapPin;
}

export function LocationMapSection({
  info,
  title,
  location,
  address,
  lat,
  lng,
}: {
  info: { title: string; description: string }[];
  /** Apartment name — shown as the pin label / search-bar text instead of
   * raw coordinates. */
  title: string;
  /** Real per-listing area (e.g. "City center", "Ounasvaara") — falls back
   * to a generic label only when a listing has no bucket assigned. */
  location?: string;
  /** Real Hostaway street address (e.g. "Valtakatu 35, 96200 Rovaniemi,
   * Finland"). Undefined for mock/placeholder listings. */
  address?: string;
  lat?: number;
  lng?: number;
}) {
  const hasCoords = typeof lat === "number" && typeof lng === "number";
  // Plain `q=lat,lng` drops a normal Google-native pin. Adding a `(Label)`
  // suffix makes Google try to resolve it as a registered business instead
  // — for an address with no such listing that lookup fails, and clicking
  // the pin shows a "Place info couldn't load" error inside the embed. So
  // the embed stays label-free; only the external link (below) carries the
  // apartment name.
  const embedQuery = hasCoords ? `${lat},${lng}` : "Rovaniemi,Finland";
  const mapSrc = `https://www.google.com/maps?q=${embedQuery}&z=${hasCoords ? 16 : 12}&output=embed`;
  // The external "See on Google Maps" link uses a plain text search instead
  // of coordinates — Google always mirrors typed text verbatim in the
  // search bar, only numeric/place queries get overridden with a resolved
  // label. The real address geocodes far more reliably than a made-up
  // apartment name; fall back to name + area only when Hostaway has no
  // address on file.
  const searchText = address || [title, location, "Rovaniemi, Finland"].filter(Boolean).join(", ");
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchText)}`;
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div>
      {address && (
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-600">
          <MapPin className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />
          {address}
        </p>
      )}

      <div className="relative h-72 overflow-hidden rounded-2xl bg-zinc-100 sm:h-90 lg:h-95">
        {!mapLoaded && (
          <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-zinc-100">
            <MapPin className="h-8 w-8 text-zinc-300" aria-hidden />
          </div>
        )}

        {/* Non-interactive preview: Google's free embed (no API key) always
         * tries a live "place card" lookup when its pin is clicked, which
         * fails with "Place info couldn't load" for an address with no
         * registered business. Disabling pointer events on the iframe turns
         * it into a static preview and avoids that broken interaction —
         * the "See on Google Maps" button below is the one working,
         * fully-interactive path out to the real map. */}
        <iframe
          title="Apartment location map"
          src={mapSrc}
          onLoad={() => setMapLoaded(true)}
          className={`h-full w-full border-0 pointer-events-none transition-opacity duration-500 ${
            mapLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-linear-to-t from-black/50 via-black/10 to-transparent p-4 pt-10">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-green-dark"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            See on Google Maps
          </a>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {info.map((item) => {
          const Icon = matchInfoIcon(item.title);
          return (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="flex items-start gap-3 rounded-2xl border border-zinc-200 p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
