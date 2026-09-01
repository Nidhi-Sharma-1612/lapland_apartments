import { getAllApartments } from "@/lib/hostaway/listings";
import { SimilarApartmentsView } from "@/components/apartment/SimilarApartmentsView";

export async function SimilarApartments({ excludeId }: { excludeId: string }) {
  const all = await getAllApartments();
  const apartments = all.filter((a) => a.id !== excludeId).slice(0, 4);
  return <SimilarApartmentsView apartments={apartments} />;
}
