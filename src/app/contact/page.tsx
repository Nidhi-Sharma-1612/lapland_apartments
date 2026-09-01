import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow="CONTACT US"
          heading={<>Contact Us</>}
          description={
            <>
              We believe a great stay is about more than just where you
              sleep — it&apos;s having local support when you need it. Reach
              out and our Rovaniemi-based team will get back to you
              personally.
            </>
          }
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
