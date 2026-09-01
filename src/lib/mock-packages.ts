export type HolidayPackage = {
  id: string;
  title: string;
  description: string;
  nights: number;
  people: string;
  pricePerPerson: number;
  /** Most packages price "/ person"; one on the real site prices "/ 2
   * people" instead — render this verbatim rather than assuming. */
  priceUnit?: string;
  rating?: number;
  reviewCount?: number;
  bookingUrl: string;
  imageUrl: string;
  badge?: string;
};

/** Real multi-night packages from booklapland.com — distinct from the
 * single-day tours in mock-activities.ts (different pricing/duration
 * shape: nights + price per person for the whole stay, not an hourly
 * per-person activity price). */
export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: "full-arctic-experience-3-nights",
    title: "Full Arctic Experience in 3 Nights: Lapland Luxury Package",
    description:
      "A luxury 3-night Lapland itinerary combining aurora viewing, Arctic adventures, and premium accommodation in Rovaniemi.",
    nights: 3,
    people: "2 people",
    pricePerPerson: 3790,
    rating: 4.9,
    reviewCount: 2882,
    bookingUrl:
      "https://booklapland.com/full-arctic-experience-in-3-nights-lapland-luxury-package-in-rovaniemi/",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/05/skyviewigloos_northern_lights_igloo_tourpageimage-2048x1363-1-1024x682.webp",
    badge: "For Families and Couples",
  },
  {
    id: "igloo-city-holiday-3-nights",
    title: "Lapland Igloo & City Holiday – 3 Nights with Aurora, Huskies & Santa Claus",
    description:
      "Three nights split between a glass igloo under the northern lights and Rovaniemi city, with huskies and Santa Claus Village included.",
    nights: 3,
    people: "2 people",
    pricePerPerson: 1990,
    rating: 4.9,
    reviewCount: 2882,
    bookingUrl:
      "https://booklapland.com/lapland-igloo-city-holiday-3-nights-with-aurora-huskies-santa-claus/",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/05/skyviewlodge-miikahamalainen-1-57-1024x683-1.webp",
    badge: "For Families and Couples",
  },
  {
    id: "lapland-holiday-3-nights-reindeer-tours",
    title: "Lapland Holiday: 3 Nights in Rovaniemi + Northern Lights & Reindeer Tours",
    description:
      "Three nights in Rovaniemi combining northern lights hunting with a reindeer sleigh tour through the forest.",
    nights: 3,
    people: "2 people",
    pricePerPerson: 1590,
    rating: 4.9,
    reviewCount: 2882,
    bookingUrl:
      "https://booklapland.com/lapland-holiday-3-nights-in-rovaniemi-northern-lights-reindeer-tours/",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/05/06b5571c-d5fb-45a9-afa6-3b189b8ea40f-1024x683-1.webp",
    badge: "For Families and Couples",
  },
  {
    id: "lapland-luxury-holiday-5-nights",
    title: "Lapland Luxury Holiday: 5 Nights Igloo + Huskies, Reindeer & Aurora Tours",
    description:
      "Five luxury nights in an aurora igloo, with husky and reindeer safaris included throughout the stay.",
    nights: 5,
    people: "2 people",
    pricePerPerson: 5985,
    rating: 4.9,
    reviewCount: 2882,
    bookingUrl:
      "https://booklapland.com/lapland-luxury-holiday-5-nights-igloo-huskies-reindeer-aurora-tours/",
    imageUrl: "/images/hero-northern-lights.jpg",
    badge: "For Families and Couples",
  },
  {
    id: "arctic-igloo-city-escape-5-nights",
    title: "Arctic Igloo & City Escape – 5 Nights in Rovaniemi with Northern Lights",
    description:
      "Five nights split between an Arctic igloo and Rovaniemi city, with northern lights hunting included.",
    nights: 5,
    people: "2 people",
    pricePerPerson: 4449,
    rating: 4.9,
    reviewCount: 2882,
    bookingUrl:
      "https://booklapland.com/arctic-igloo-city-escape-5-nights-in-rovaniemi-with-northern-lights/",
    imageUrl: "/images/activity-kota-fireside.jpg",
    badge: "For Families",
  },
  {
    id: "lapland-holiday-5-nights-arctic-adventures",
    title: "Lapland Holiday: 5 Nights in Rovaniemi + Northern Lights & Arctic Adventures",
    description:
      "Five nights in Rovaniemi built around northern lights hunting and a mix of Arctic adventure activities.",
    nights: 5,
    people: "2 people",
    pricePerPerson: 2345,
    priceUnit: "/ 2 people",
    rating: 4.9,
    reviewCount: 2882,
    bookingUrl:
      "https://booklapland.com/lapland-holiday-5-nights-in-rovaniemi-northern-lights-arctic-adventures/",
    imageUrl: "/images/nearby-husky.jpg",
    badge: "For Families and Couples",
  },
];
