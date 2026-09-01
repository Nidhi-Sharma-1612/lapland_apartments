export type Apartment = {
  id: string;
  slug: string;
  title: string;
  pricePerNight: number;
  currency: string;
  guests: number;
  livingAreaSqm: number;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  bedroomsNumber?: number;
};

export type ApartmentDetail = Apartment & {
  heroImageUrl: string;
  galleryImages: string[];
  totalImageCount: number;
  topAmenities: { icon: string; label: string }[];
  description: {
    /** Real Hostaway listing description. Undefined if the listing has none
     * on file — no hardcoded filler text. */
    atmosphere?: string;
    /** Real secondary description (Hostaway's Airbnb/HomeAway/Booking.com
     * summary field, whichever is populated). Undefined if none exist. */
    interiorStyle?: string;
  };
  perfectFor: { label: string; description: string }[];
  nearbyAttractions: { title: string; description: string; imageUrl: string }[];
  amenityCategories: { icon: string; label: string }[];
  locationInfo: { title: string; description: string }[];
  houseRules: { title: string; description: string }[];
  activities: { title: string; imageUrl: string }[];
  /** ISO (YYYY-MM-DD) unavailable dates for the booking calendar. Undefined
   * for mock/placeholder listings, which fall back to generic demo data. */
  bookedDates?: string[];
  /** ISO (YYYY-MM-DD) date → real nightly price, for computing an accurate
   * stay total instead of a flat rate. Undefined for mock/placeholder listings. */
  nightlyPrices?: Record<string, number>;
  bathroomsNumber?: number;
  bedsNumber?: number;
  lat?: number;
  lng?: number;
  /** Real, human-readable street address from Hostaway (e.g. "Valtakatu 35,
   * 96200 Rovaniemi, Finland"). Undefined for mock/placeholder listings. */
  address?: string;
};

export type ReviewCard = {
  source: "airbnb" | "google" | "booking";
  /** Out of 5. */
  rating: number;
  title?: string;
  body: string;
  name: string;
  /** Secondary line under the guest's name — a country for curated mock
   * reviews, or the listing they stayed at for real Hostaway reviews (guest
   * country isn't part of the Hostaway review payload). */
  subtitle: string;
};
