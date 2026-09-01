export type NorthernLightsTour = {
  id: string;
  title: string;
  badge: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  duration: string;
  groupSize: string;
  pricePerPerson: number;
  bookingUrl: string;
  imageUrl: string;
  tripadvisorAward?: boolean;
};

/** Real northern lights tours, sourced from booklapland.com's own experiences
 * grid — title, badge, rating, review count, duration, group size, price and
 * booking URL all confirmed against the live site. */
export const NORTHERN_LIGHTS_TOURS: NorthernLightsTour[] = [
  {
    id: "northern-lights-pro-tour",
    title: "Northern Lights Pro Tour Guaranteed – Unlimited Distance",
    badge: "Best Rated Tour",
    location: "Rovaniemi",
    rating: 4.9,
    reviewCount: 878,
    duration: "4 - 12 hours",
    groupSize: "Max 8 guests per tour",
    pricePerPerson: 199,
    bookingUrl: "https://booklapland.com/northern-lights-pro-tour-guaranteed-unlimited-distance/",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/03/Northern-lights-guaranteed-our-choice1.png",
    tripadvisorAward: true,
  },
  {
    id: "northern-lights-group-tour",
    title: "Northern Lights Group Tour – Guaranteed View",
    badge: "Most Popular",
    location: "Rovaniemi",
    rating: 4.8,
    reviewCount: 802,
    duration: "4 - 6 hours",
    groupSize: "8 - 48 people",
    pricePerPerson: 139,
    bookingUrl: "https://booklapland.com/northern-lights-group-tour-guaranteed-view/",
    imageUrl:
      "https://booklapland.com/wp-content/uploads/2026/03/a0a58f5b-ad12-4077-86e1-852cb7d174bd.webp",
  },
  {
    id: "northern-lights-pro-tour-private",
    title: "Northern Lights Pro Tour Guaranteed – Unlimited Distance (Private)",
    badge: "Private",
    location: "Rovaniemi",
    rating: 4.9,
    reviewCount: 2882,
    duration: "4 - 12 hours",
    groupSize: "Up to 8 people",
    pricePerPerson: 1850,
    bookingUrl:
      "https://booklapland.com/northern-lights-pro-tour-guaranteed-unlimited-distance-private/",
    imageUrl: "https://booklapland.com/wp-content/uploads/2026/05/Northern-lights-private-tour.png",
  },
  {
    id: "saariselka-aurora-hunting-private",
    title: "Saariselkä: Aurora Hunting Guarantee Tour with Photography (Private)",
    badge: "Private",
    location: "Saariselkä",
    rating: 4.9,
    reviewCount: 2882,
    duration: "4 - 12 hours",
    groupSize: "Custom",
    pricePerPerson: 1850,
    bookingUrl:
      "https://booklapland.com/saariselka-aurora-hunting-guarantee-tour-with-photography-private/",
    imageUrl: "https://booklapland.com/wp-content/uploads/2026/05/carousel-picture-15.webp",
  },
  {
    id: "levi-aurora-hunting-private",
    title: "Levi: Northern Lights Pro Guaranteed Tour with Photos (Private)",
    badge: "Private",
    location: "Kittilä",
    duration: "8 hours 30 minutes",
    groupSize: "Custom",
    pricePerPerson: 1850,
    bookingUrl: "https://booklapland.com/levi-aurora-hunting-guarantee-tour-with-photography/",
    imageUrl: "https://booklapland.com/wp-content/uploads/2026/05/carousel-picture-4.webp",
  },
];
