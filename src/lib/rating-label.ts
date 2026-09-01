/** Booking.com-style rating labels, mapped onto our 0-5 star scale (the
 * site converts Hostaway's native 0-10 rating by halving it, so these
 * thresholds are Booking's own 9/8/7/6 bands divided by two). */
export function ratingLabel(rating: number): string {
  if (rating <= 0) return "New";
  if (rating >= 4.5) return "Wonderful";
  if (rating >= 4.0) return "Very Good";
  if (rating >= 3.5) return "Good";
  if (rating >= 3.0) return "Pleasant";
  return "Fair";
}
