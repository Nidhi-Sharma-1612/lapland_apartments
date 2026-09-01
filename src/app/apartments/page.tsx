import { getAllApartments, getPortfolioStats } from "@/lib/hostaway/listings";
import { parseISODate, formatShortDate } from "@/lib/date-utils";
import { LOCATIONS } from "@/lib/locations";
import { ApartmentsPageHero } from "@/components/apartments/ApartmentsPageHero";
import { ApartmentsGrid } from "@/components/apartments/ApartmentsGrid";
import { Footer } from "@/components/layout/Footer";

const PAGE_SIZE = 24;

function buildHref(base: Record<string, string | undefined>, omit: string[] = []) {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(base)) {
    if (value && !omit.includes(key)) usp.set(key, value);
  }
  const qs = usp.toString();
  return qs ? `/apartments?${qs}` : "/apartments";
}

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const location = typeof params.location === "string" ? params.location : "";
  const guests = Number(params.guests) || 0;
  const bedrooms = Number(params.bedrooms) || 0;
  const checkInRaw = typeof params.checkIn === "string" ? params.checkIn : "";
  const checkOutRaw = typeof params.checkOut === "string" ? params.checkOut : "";
  const checkIn = checkInRaw ? parseISODate(checkInRaw) : null;
  const checkOut = checkOutRaw ? parseISODate(checkOutRaw) : null;
  const sort = typeof params.sort === "string" ? params.sort : "";

  const baseParams = {
    location: location || undefined,
    checkIn: checkInRaw || undefined,
    checkOut: checkOutRaw || undefined,
    guests: guests > 0 ? String(guests) : undefined,
    bedrooms: bedrooms > 0 ? String(bedrooms) : undefined,
    sort: sort || undefined,
  };

  const allApartments = await getAllApartments();
  const stats = await getPortfolioStats();

  let apartments = allApartments.filter((apartment) => {
    if (location && apartment.location !== location) return false;
    if (guests > 0 && apartment.guests < guests) return false;
    if (bedrooms > 0 && (apartment.bedroomsNumber ?? 0) < bedrooms) return false;
    return true;
  });

  if (sort === "price-asc") {
    apartments = [...apartments].sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sort === "price-desc") {
    apartments = [...apartments].sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (sort === "rating") {
    apartments = [...apartments].sort((a, b) => b.rating - a.rating);
  }

  const totalCount = apartments.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const requestedPage = Number(params.page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const pagedApartments = apartments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageHref = (page: number) =>
    buildHref({ ...baseParams, page: page > 1 ? String(page) : undefined });
  // Functions can't cross the server/client boundary — precompute the plain
  // href strings the client pagination control needs instead of passing
  // `pageHref` itself.
  const pageLinks = Array.from({ length: totalPages }, (_, i) => ({
    page: i + 1,
    href: pageHref(i + 1),
  }));
  const prevPageHref = pageHref(Math.max(1, currentPage - 1));
  const nextPageHref = pageHref(Math.min(totalPages, currentPage + 1));

  // Carried onto each apartment's detail-page link — as both the exact
  // "back to search results" URL and the values that pre-fill the booking
  // widget/search bar there — so leaving a listing and coming back restores
  // this results page (filters, sort, page) exactly as it was.
  const backToResultsHref = buildHref({ ...baseParams, page: currentPage > 1 ? String(currentPage) : undefined });
  const bookingQuery = backToResultsHref.includes("?") ? `?${backToResultsHref.split("?")[1]}` : "";

  const subheadingParts: string[] = [];
  if (location) subheadingParts.push(`in ${location}`);
  if (checkIn && checkOut) {
    subheadingParts.push(`${formatShortDate(checkIn)} – ${formatShortDate(checkOut)}`);
  }
  if (guests > 0) subheadingParts.push(`for ${guests} ${guests === 1 ? "guest" : "guests"}`);
  if (bedrooms > 0) subheadingParts.push(`with ${bedrooms}+ bedrooms`);

  const subheading =
    subheadingParts.length > 0
      ? `Showing results ${subheadingParts.join(", ")}.`
      : "Handpicked, professionally managed, and ready for instant booking.";

  const appliedFilters = [
    location && { label: location, href: buildHref(baseParams, ["location"]) },
    checkIn &&
      checkOut && {
        label: `${formatShortDate(checkIn)} – ${formatShortDate(checkOut)}`,
        href: buildHref(baseParams, ["checkIn", "checkOut"]),
      },
    guests > 0 && {
      label: `${guests} ${guests === 1 ? "guest" : "guests"}`,
      href: buildHref(baseParams, ["guests"]),
    },
    bedrooms > 0 && {
      label: `${bedrooms}+ bedrooms`,
      href: buildHref(baseParams, ["bedrooms"]),
    },
  ].filter((f): f is { label: string; href: string } => Boolean(f));

  const clearAllHref = buildHref({ sort: baseParams.sort });

  const quickLocations = LOCATIONS.map((loc) => ({
    label: loc.label,
    href: buildHref({ ...baseParams, location: loc.value || undefined }),
    active: loc.value === location,
  }));

  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <ApartmentsPageHero apartmentCountDisplay={stats.apartmentCountDisplay} />
        <ApartmentsGrid
          apartments={pagedApartments}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          totalPages={totalPages}
          pageLinks={pageLinks}
          prevPageHref={prevPageHref}
          nextPageHref={nextPageHref}
          subheading={subheading}
          appliedFilters={appliedFilters}
          clearAllHref={clearAllHref}
          quickLocations={quickLocations}
          bookingQuery={bookingQuery}
        />
      </main>
      <Footer />
    </>
  );
}
