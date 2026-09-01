export type ActivityCategory = "Winter Adventure" | "Aurora & Nature" | "Wildlife & Culture";
export type ActivityDifficulty = "Easy" | "Moderate" | "Adventurous";

export type Activity = {
  id: string;
  title: string;
  description: string;
  duration: string;
  pricePerPerson: number;
  category: ActivityCategory;
  difficulty: ActivityDifficulty;
  imageUrl: string;
  /** Real rating/review count and a real external booking link — confirmed
   * against booklapland.com's own listing pages. */
  rating?: number;
  reviewCount?: number;
  bookingUrl?: string;
  /** Real group-size text confirmed from booklapland.com's listing page. */
  groupSize?: string;
};

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  "Winter Adventure",
  "Aurora & Nature",
  "Wildlife & Culture",
];

/** The real "Winter Activities" lineup from booklapland.com, in the exact
 * order shown on the live site — title, price, duration, group size, rating,
 * booking URL and listing photo are all confirmed against the live site. */
export const ACTIVITIES: Activity[] = [
  {
    id: "arctic-spa-infinity-pool",
    title: "Rovaniemi: Arctic Spa with Lapland's Only Infinity Pool",
    description:
      "Soak in Lapland's only infinity pool, with views out over the snow — a relaxing counterpoint to a day of Arctic adventure.",
    duration: "2 hours",
    pricePerPerson: 129,
    category: "Wildlife & Culture",
    difficulty: "Easy",
    imageUrl: "https://booklapland.com/wp-content/uploads/2026/07/IMG_4357-1024x576.webp",
    groupSize: "Maximum 16 people",
    bookingUrl: "https://booklapland.com/rovaniemi-arctic-spa-with-laplands-only-infinity-pool/",
  },
  {
    id: "korouoma-frozen-waterfalls-adventure",
    title: "Korouoma Frozen Waterfalls Adventure & Wilderness BBQ Lunch",
    description:
      "A guided trek to the towering frozen waterfalls of Korouoma Canyon, finished off with a wilderness BBQ lunch by the fire.",
    duration: "6 - 7 hours",
    pricePerPerson: 139,
    category: "Winter Adventure",
    difficulty: "Adventurous",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/04/DSC01472-2048x1365-1-1024x683.webp",
    rating: 4.9,
    reviewCount: 2882,
    groupSize: "2 - 8 people",
    bookingUrl: "https://booklapland.com/korouoma-frozen-waterfalls-adventure/",
  },
  {
    id: "riisitunturi-snow-monsters-hike",
    title: "Riisitunturi Snow Monsters Winter Hike from Rovaniemi",
    description:
      "A full-day hike among Riisitunturi's famous snow-draped \"snow monster\" trees, deep in the fells above Rovaniemi.",
    duration: "8 - 9 hours",
    pricePerPerson: 179,
    category: "Aurora & Nature",
    difficulty: "Moderate",
    imageUrl: "https://booklapland.com/wp-content/uploads/2026/04/DSC_0703-2-1024x683-1.webp",
    rating: 4.9,
    reviewCount: 2882,
    groupSize: "2 - 8 people",
    bookingUrl: "https://booklapland.com/riisitunturi-snow-monsters-winter-hike/",
  },
  {
    id: "ranua-wildlife-park",
    title: "Ranua Arctic Wildlife Park with Hot BBQ Lunch & Transfers",
    description:
      "Meet Arctic species like lynx, wolverine and snowy owl up close at Ranua Zoo, with a hot BBQ lunch and return transfers included.",
    duration: "5 - 6 hours",
    pricePerPerson: 149,
    category: "Wildlife & Culture",
    difficulty: "Easy",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/04/kuva_2025-06-10_121923282-1024x575-1.png",
    rating: 4.9,
    reviewCount: 52,
    groupSize: "2 - 8 people",
    bookingUrl: "https://booklapland.com/ranua-wildlife-zoo-park/",
  },
  {
    id: "santa-claus-village",
    title: "Santa Claus Village Experience & Arctic Circle Crossing",
    description:
      "Cross the Arctic Circle, meet Santa Claus himself, and send a postcard stamped from the official village.",
    duration: "3 - 4 hours",
    pricePerPerson: 49,
    category: "Wildlife & Culture",
    difficulty: "Easy",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/04/kuva_2025-06-10_124702117-1024x575-1.png",
    rating: 4.9,
    reviewCount: 2880,
    groupSize: "8 - 48 people",
    bookingUrl: "https://booklapland.com/santa-claus-village-experience/",
  },
  {
    id: "santa-claus-village-tour",
    title: "Santa Claus Village & Arctic Circle Crossing Tour",
    description:
      "A guided visit to Santa Claus Village and the official Arctic Circle line, with time to explore the workshops and reindeer paddocks.",
    duration: "3 - 4 hours",
    pricePerPerson: 169,
    category: "Wildlife & Culture",
    difficulty: "Easy",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/04/kuva_2025-06-10_124638423-1024x575-1.png",
    rating: 5,
    reviewCount: 2,
    groupSize: "2 - 8 people",
    bookingUrl: "https://booklapland.com/santa-claus-village-tour/",
  },
  {
    id: "polar-explorer-icebreaker-cruise",
    title: "Polar Explorer Icebreaker Cruise and Lunch",
    description:
      "Sail the frozen Bay of Bothnia aboard a real icebreaker ship, with a chance to float in the sea in a survival suit and a lunch on board.",
    duration: "8 hours 30 minutes",
    pricePerPerson: 425,
    category: "Winter Adventure",
    difficulty: "Moderate",
    imageUrl: "https://booklapland.com/wp-content/uploads/2026/04/booklapland-13.png",
    rating: 4.4,
    reviewCount: 155,
    groupSize: "1 - 48 people",
    bookingUrl:
      "https://booklapland.com/polar-explorer-icebreaker-cruise-and-lunch-with-shuttle-bus-transportation-from-rovaniemi/",
  },
  {
    id: "santas-ice-karting",
    title: "Santa's Ice Karting 12.00",
    description:
      "Race go-karts fitted with studded tyres around a purpose-built ice track just outside Rovaniemi — no experience needed.",
    duration: "1 hour 30 minutes",
    pricePerPerson: 95,
    category: "Winter Adventure",
    difficulty: "Adventurous",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/04/booklapland-11-1024x597-1.png",
    groupSize: "Minimum of 1 people",
    bookingUrl: "https://booklapland.com/santas-ice-karting-12-00/",
  },
  {
    id: "kuoksa-husky-reindeer-adventure",
    title: "Kuoksa Husky & Reindeer Adventure",
    description:
      "Combine a husky sled ride with a visit to a reindeer farm on a single Arctic day out from Rovaniemi.",
    duration: "5 hours",
    pricePerPerson: 389,
    category: "Winter Adventure",
    difficulty: "Adventurous",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/04/kuva_2025-06-10_134520562-1024x575-1.png",
    groupSize: "2 - 16 people",
    bookingUrl: "https://booklapland.com/kuoksa-husky-reindeer-adventure/",
  },
];
