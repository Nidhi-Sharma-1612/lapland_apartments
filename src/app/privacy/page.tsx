import { PageHero } from "@/components/layout/PageHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow="LEGAL"
          heading={<>Privacy Policy</>}
          description={<>Last updated August 31, 2026.</>}
        />

        <Container as="div" className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <LegalSection title="1. Information We Collect">
              <p>
                When you search, book, or contact us, we collect information
                such as your name, email address, phone number, and payment
                details, along with booking specifics like dates and guest
                count.
              </p>
            </LegalSection>

            <LegalSection title="2. How We Use Your Information">
              <p>
                We use your information to process bookings, communicate
                check-in details, respond to enquiries, and improve our
                apartments and activities. We do not sell your personal
                data to third parties.
              </p>
            </LegalSection>

            <LegalSection title="3. Payment Data">
              <p>
                Payments are handled by our third-party payment processor.
                Your card details are transmitted directly to them over an
                encrypted connection and are never stored on our own
                servers.
              </p>
            </LegalSection>

            <LegalSection title="4. Cookies">
              <p>
                We use essential cookies to keep the site and booking flow
                working correctly, and optional analytics cookies to
                understand how guests use the site. You can manage cookie
                preferences in your browser at any time.
              </p>
            </LegalSection>

            <LegalSection title="5. Data Sharing">
              <p>
                We share the minimum data necessary with the parties
                involved in fulfilling your stay — for example, our
                property-management system for check-in logistics and our
                payment processor for billing.
              </p>
            </LegalSection>

            <LegalSection title="6. Your Rights">
              <p>
                You may request access to, correction of, or deletion of
                your personal data at any time by contacting us. We will
                respond within 30 days.
              </p>
            </LegalSection>

            <LegalSection title="7. Contact">
              <p>
                For privacy questions or requests, reach us at{" "}
                <a
                  href="mailto:hello@laplandapartments.com"
                  className="font-semibold text-brand-green underline underline-offset-2"
                >
                  hello@laplandapartments.com
                </a>
                .
              </p>
            </LegalSection>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
