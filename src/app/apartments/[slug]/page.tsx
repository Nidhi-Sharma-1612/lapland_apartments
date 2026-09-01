import { notFound } from "next/navigation";
import { getApartmentDetailBySlug } from "@/lib/hostaway/listings";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { ApartmentHero } from "@/components/apartment/ApartmentHero";
import { ApartmentTabs } from "@/components/apartment/ApartmentTabs";
import { ApartmentGallery } from "@/components/apartment/ApartmentGallery";
import { BookingCard } from "@/components/apartment/BookingCard";
import { AmenityPills } from "@/components/apartment/AmenityPills";
import { CollapsibleSection } from "@/components/apartment/CollapsibleSection";
import { ReadMoreText } from "@/components/apartment/ReadMoreText";
import { ImageInfoGrid } from "@/components/apartment/ImageInfoGrid";
import { ActivityLinkCards } from "@/components/apartment/ActivityLinkCards";
import { PerfectForList } from "@/components/apartment/PerfectForList";
import { LocationMapSection } from "@/components/apartment/LocationMapSection";
import { HouseRulesGrid } from "@/components/apartment/HouseRulesGrid";
import { SimilarApartments } from "@/components/apartment/SimilarApartments";
import { GuestReviews } from "@/components/home/GuestReviews";

export default async function ApartmentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const apartment = await getApartmentDetailBySlug(slug);
  if (!apartment) notFound();

  const search = await searchParams;
  const initialCheckIn = typeof search.checkIn === "string" ? search.checkIn : "";
  const initialCheckOut = typeof search.checkOut === "string" ? search.checkOut : "";
  const initialGuests = Number(search.guests) || 0;

  // Reconstructs the exact /apartments results page (filters, sort, page
  // number) the guest came from, so "Back to apartments" restores it as
  // they left it instead of resetting to a blank search.
  const backHref = (() => {
    const usp = new URLSearchParams();
    for (const key of ["location", "checkIn", "checkOut", "guests", "bedrooms", "sort", "page"]) {
      const value = search[key];
      if (typeof value === "string" && value) usp.set(key, value);
    }
    const qs = usp.toString();
    return qs ? `/apartments?${qs}` : "/apartments";
  })();

  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <ApartmentHero apartment={apartment} backHref={backHref} />
        <ApartmentTabs />

        <Container className="py-12">
          <div
            id="overview"
            className="scroll-mt-24 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:grid-rows-[auto_auto]"
          >
            <div className="order-1 flex flex-col gap-8 lg:col-span-2 lg:col-start-1 lg:row-start-1">
              <ApartmentGallery
                images={apartment.galleryImages}
                totalCount={apartment.totalImageCount}
                title={apartment.title}
              />
              <div id="highlights" className="scroll-mt-24">
                <AmenityPills items={apartment.topAmenities} />
              </div>
            </div>

            <div className="order-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
              <BookingCard
                apartment={apartment}
                initialCheckIn={initialCheckIn}
                initialCheckOut={initialCheckOut}
                initialGuests={initialGuests}
              />
            </div>

            <div className="order-3 flex flex-col gap-4 lg:col-span-2 lg:col-start-1 lg:row-start-2">
              {(apartment.description.atmosphere || apartment.description.interiorStyle) && (
                <CollapsibleSection id="description" title="Description">
                  <div className="flex flex-col gap-6">
                    {apartment.description.atmosphere && (
                      <div>
                        <h3 className="font-semibold text-zinc-900">Overview</h3>
                        <ReadMoreText text={apartment.description.atmosphere} />
                      </div>
                    )}
                    {apartment.description.interiorStyle && (
                      <div>
                        <h3 className="font-semibold text-zinc-900">About This Property</h3>
                        <ReadMoreText text={apartment.description.interiorStyle} />
                      </div>
                    )}
                  </div>
                </CollapsibleSection>
              )}

              <CollapsibleSection title="Perfect For">
                <PerfectForList items={apartment.perfectFor} />
              </CollapsibleSection>

              <CollapsibleSection title="Prime Location &amp; Nearby Attractions">
                <ImageInfoGrid items={apartment.nearbyAttractions} />
              </CollapsibleSection>

              <CollapsibleSection id="amenities" title="Amenities">
                <AmenityPills items={apartment.amenityCategories} limit={12} />
              </CollapsibleSection>

              <CollapsibleSection id="location-map" title="Location Map">
                <LocationMapSection
                  info={apartment.locationInfo}
                  title={apartment.title}
                  location={apartment.location}
                  address={apartment.address}
                  lat={apartment.lat}
                  lng={apartment.lng}
                />
              </CollapsibleSection>

              <CollapsibleSection id="rules" title="House Rules">
                <HouseRulesGrid rules={apartment.houseRules} />
              </CollapsibleSection>
            </div>
          </div>

          <section id="activities" className="scroll-mt-24 py-8">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Activities in Lapland
            </h2>
            <div className="mt-6">
              <ActivityLinkCards />
            </div>
          </section>
        </Container>

        <SimilarApartments excludeId={apartment.id} />
        <GuestReviews />
      </main>
      <Footer />
    </>
  );
}
