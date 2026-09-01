import { PageHero } from "@/components/layout/PageHero";
import { SearchBar } from "@/components/home/SearchBar";

export function ApartmentsPageHero({
  apartmentCountDisplay,
}: {
  apartmentCountDisplay: string;
}) {
  return (
    <PageHero
      eyebrow="OUR APARTMENTS"
      heading={
        <>
          All Apartments <span className="font-semibold">in Rovaniemi</span>
        </>
      }
      description={
        <>
          Browse our{" "}
          <span className="font-semibold text-white">
            {apartmentCountDisplay} handpicked properties
          </span>{" "}
          and find your perfect base for an unforgettable Arctic stay.
        </>
      }
    >
      <SearchBar />
    </PageHero>
  );
}
