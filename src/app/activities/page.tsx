import { ACTIVITIES } from "@/lib/mock-activities";
import { PageHero } from "@/components/layout/PageHero";
import { ActivitiesGrid } from "@/components/activities/ActivitiesGrid";
import { NorthernLightsSection } from "@/components/activities/NorthernLightsSection";
import { HolidayPackagesSection } from "@/components/activities/HolidayPackagesSection";
import { SectionNav } from "@/components/activities/SectionNav";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";

const SECTIONS = [
  { id: "northern-lights", label: "Northern Lights Tours" },
  { id: "winter-activities", label: "Winter Activities" },
  { id: "holiday-packages", label: "Holiday Packages" },
];

export default function ActivitiesPage() {
  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow="OUR ACTIVITIES"
          heading={
            <>
              Arctic Adventures{" "}
              <span className="font-semibold">in Rovaniemi</span>
            </>
          }
          description={
            <>
              From <span className="font-semibold text-white">husky safaris</span>{" "}
              to chasing the northern lights, discover the experiences that
              make a Lapland stay unforgettable.
            </>
          }
        />
        <SectionNav sections={SECTIONS} />
        <div id="northern-lights" className="scroll-mt-16">
          <NorthernLightsSection />
        </div>
        <div id="winter-activities" className="scroll-mt-16">
          <ActivitiesGrid activities={ACTIVITIES} />
        </div>
        <div id="holiday-packages" className="scroll-mt-16">
          <HolidayPackagesSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
