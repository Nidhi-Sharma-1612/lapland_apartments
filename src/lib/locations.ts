export type LocationOption = { value: string; label: string; description: string };

/** Values match the `location` field used across the apartment inventory
 * (see `pickLocationBucket` in `lib/hostaway/listings.ts`), so selecting one
 * here filters real results on /apartments.
 *
 * Only two buckets: Rovaniemi's compact downtown core sits directly on the
 * Kemijoki river, so "city center" and "riverside" aren't geographically
 * distinct areas for real listings — a separate riverside filter would put
 * core downtown streets in it almost arbitrarily. Ounasvaara, across the
 * river, is the one genuinely separable outlying area. */
export const LOCATIONS: LocationOption[] = [
  { value: "", label: "Any location", description: "Search all of Rovaniemi" },
  {
    value: "City center",
    label: "City Center",
    description: "Walk to restaurants, shops & sights",
  },
  {
    value: "Ounasvaara",
    label: "Ounasvaara",
    description: "Ski slopes & forest views",
  },
];
