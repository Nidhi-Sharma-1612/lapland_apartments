/** Partial, defensive typing of the Hostaway `/v1/listings` payload.
 * Every field is optional — real accounts vary in which fields are
 * populated, and we don't want a missing field to break a build. */
export type HostawayListingImage = {
  url?: string;
  caption?: string | null;
  sortOrder?: number;
};

export type HostawayAmenity = {
  amenityId?: number;
  amenityName?: string;
};

export type HostawayListing = {
  id: number;
  name?: string;
  externalListingName?: string;
  internalListingName?: string;
  description?: string;
  /** A second, real (non-mock) description blob — Hostaway mirrors the same
   * text across these three channel-specific fields, so any one works as a
   * fallback for the others. */
  airbnbSummary?: string | null;
  homeawayPropertyDescription?: string | null;
  bookingcomPropertyDescription?: string | null;
  price?: number;
  currencyCode?: string;
  personCapacity?: number;
  bedroomsNumber?: number;
  bathroomsNumber?: number;
  bedsNumber?: number;
  squareMeters?: number;
  starRating?: number | null;
  /** Real, populated aggregate rating on a 0–10 scale — unlike `starRating`,
   * which is null on every listing we've observed. Preferred rating source. */
  averageReviewRating?: number | null;
  reviewsCount?: number | null;
  city?: string;
  street?: string;
  address?: string;
  publicAddress?: string;
  country?: string;
  lat?: number;
  lng?: number;
  checkInTimeStart?: number;
  checkInTimeEnd?: number | null;
  checkOutTime?: number;
  minNights?: number;
  cancellationPolicy?: string;
  houseRules?: string;
  maxPetsAllowed?: number | null;
  maxChildrenAllowed?: number | null;
  maxInfantsAllowed?: number | null;
  listingImages?: HostawayListingImage[];
  listingAmenities?: HostawayAmenity[];
  status?: string;
};

export type HostawayCalendarDay = {
  date: string;
  isAvailable?: number;
  status?: string;
  price?: number;
  minimumStay?: number;
};

export type HostawayReview = {
  id: number;
  listingMapId?: number;
  reviewerName?: string;
  guestName?: string;
  channelId?: number;
  status?: string;
  rating?: number | null;
  title?: string | null;
  publicReview?: string | null;
  externalListingName?: string;
};
