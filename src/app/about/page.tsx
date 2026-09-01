import { PageHero } from "@/components/layout/PageHero";
import { OurStory } from "@/components/about/OurStory";
import { StatsRow } from "@/components/about/StatsRow";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { getPortfolioStats } from "@/lib/hostaway/listings";

export default async function AboutPage() {
  const stats = await getPortfolioStats();

  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow="ABOUT US"
          heading={
            <>
              Your Local <span className="font-semibold">Lapland Experts</span>
            </>
          }
          description={
            <>
              We&apos;re a Rovaniemi-based team hand-managing every apartment
              on this site — no faceless platform, no middlemen.
            </>
          }
        />
        <OurStory apartmentCountDisplay={stats.apartmentCountDisplay} />
        <StatsRow
          apartmentCountDisplay={stats.apartmentCountDisplay}
          averageRatingDisplay={stats.averageRatingDisplay}
          totalReviewCountDisplay={stats.totalReviewCountDisplay}
        />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
