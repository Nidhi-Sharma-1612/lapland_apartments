import { getFeaturedReviews } from "@/lib/hostaway/reviews";
import { MOCK_REVIEWS } from "@/lib/mock-reviews";
import { GuestReviewsView } from "@/components/home/GuestReviewsView";

export async function GuestReviews() {
  const reviews = await getFeaturedReviews();
  return <GuestReviewsView reviews={reviews.length > 0 ? reviews : MOCK_REVIEWS} />;
}
