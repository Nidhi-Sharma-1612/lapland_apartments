import { getFeaturedApartments } from "@/lib/hostaway/listings";
import { FeaturedApartmentsView } from "@/components/home/FeaturedApartmentsView";

export async function FeaturedApartments({
  apartmentCountDisplay,
}: {
  apartmentCountDisplay: string;
}) {
  const apartments = await getFeaturedApartments();
  return (
    <FeaturedApartmentsView apartments={apartments} apartmentCountDisplay={apartmentCountDisplay} />
  );
}
