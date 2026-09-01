import { Hero } from "@/components/home/Hero";
import { FeaturedApartments } from "@/components/home/FeaturedApartments";
import { WhyStayWithUs } from "@/components/home/WhyStayWithUs";
import { FeaturedActivities } from "@/components/home/FeaturedActivities";
import { GuestReviews } from "@/components/home/GuestReviews";
import { HowBookingWorks } from "@/components/home/HowBookingWorks";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { getPortfolioStats } from "@/lib/hostaway/listings";

export default async function Home() {
  const stats = await getPortfolioStats();

  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <Hero apartmentCountDisplay={stats.apartmentCountDisplay} />
        <FeaturedApartments apartmentCountDisplay={stats.apartmentCountDisplay} />
        <WhyStayWithUs apartmentCountDisplay={stats.apartmentCountDisplay} />
        <FeaturedActivities />
        <GuestReviews />
        <HowBookingWorks apartmentCountDisplay={stats.apartmentCountDisplay} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
