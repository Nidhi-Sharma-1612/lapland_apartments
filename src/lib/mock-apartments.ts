import type { Apartment } from "@/lib/types";

/** Placeholder data matching the Figma homepage, with temporary stock
 * photos (Unsplash) standing in for the real listing photography. Replace
 * both with a real Hostaway listings fetch once the API integration lands. */
export const FEATURED_APARTMENTS: Apartment[] = [
  {
    id: "1",
    slug: "hostit-arctic-apartments-ii-1",
    title: "Hostit Arctic Apartments II",
    pricePerNight: 149,
    currency: "EUR",
    guests: 4,
    livingAreaSqm: 180,
    location: "City center",
    rating: 4.9,
    reviewCount: 468,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "2",
    slug: "hostit-arctic-apartments-ii-2",
    title: "Hostit Arctic Apartments II",
    pricePerNight: 240,
    currency: "EUR",
    guests: 5,
    livingAreaSqm: 180,
    location: "City center",
    rating: 4.8,
    reviewCount: 748,
    imageUrl:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "3",
    slug: "aurora-central-suite-ii",
    title: "Aurora Central Suite II",
    pricePerNight: 350,
    currency: "EUR",
    guests: 4,
    livingAreaSqm: 180,
    location: "City center",
    rating: 5.0,
    reviewCount: 327,
    imageUrl:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "4",
    slug: "master-suites-city-centre-2",
    title: "Master Suites City Centre 2",
    pricePerNight: 240,
    currency: "EUR",
    guests: 4,
    livingAreaSqm: 180,
    location: "City center",
    rating: 4.9,
    reviewCount: 346,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "5",
    slug: "kismet",
    title: "Kismet",
    pricePerNight: 149,
    currency: "EUR",
    guests: 4,
    livingAreaSqm: 180,
    location: "City center",
    rating: 4.9,
    reviewCount: 468,
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "6",
    slug: "aurora-chalet-ii-by-booklapland",
    title: "Aurora Chalet II By BookLapland",
    pricePerNight: 240,
    currency: "EUR",
    guests: 7,
    livingAreaSqm: 180,
    location: "City center",
    rating: 4.9,
    reviewCount: 346,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop",
  },
];

/** Extends the featured set with more placeholder listings for the full
 * /apartments browsing page. Replace with a real Hostaway listings fetch
 * once the API integration lands. */
export const ALL_APARTMENTS: Apartment[] = [
  ...FEATURED_APARTMENTS,
  {
    id: "7",
    slug: "northern-lights-loft",
    title: "Northern Lights Loft",
    pricePerNight: 189,
    currency: "EUR",
    guests: 3,
    livingAreaSqm: 95,
    location: "City center",
    rating: 4.8,
    reviewCount: 212,
    imageUrl:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "8",
    slug: "arctic-family-house",
    title: "Arctic Family House",
    pricePerNight: 275,
    currency: "EUR",
    guests: 6,
    livingAreaSqm: 210,
    location: "Ounasvaara",
    rating: 4.9,
    reviewCount: 189,
    imageUrl:
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "9",
    slug: "reindeer-view-studio",
    title: "Reindeer View Studio",
    pricePerNight: 129,
    currency: "EUR",
    guests: 2,
    livingAreaSqm: 60,
    location: "City center",
    rating: 4.7,
    reviewCount: 154,
    imageUrl:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "10",
    slug: "riverside-cabin-suite",
    title: "Riverside Cabin Suite",
    pricePerNight: 210,
    currency: "EUR",
    guests: 5,
    livingAreaSqm: 140,
    location: "City center",
    rating: 5.0,
    reviewCount: 98,
    imageUrl:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "11",
    slug: "aurora-loft-central",
    title: "Aurora Loft Central",
    pricePerNight: 165,
    currency: "EUR",
    guests: 4,
    livingAreaSqm: 110,
    location: "City center",
    rating: 4.8,
    reviewCount: 276,
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "12",
    slug: "polar-nights-penthouse",
    title: "Polar Nights Penthouse",
    pricePerNight: 320,
    currency: "EUR",
    guests: 6,
    livingAreaSqm: 165,
    location: "City center",
    rating: 4.9,
    reviewCount: 133,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop",
  },
];
