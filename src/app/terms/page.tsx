import { PageHero } from "@/components/layout/PageHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <main className="flex flex-1 flex-col bg-white">
        <PageHero
          eyebrow="LEGAL"
          heading={<>Terms &amp; Conditions</>}
          description={<>Last updated August 31, 2026.</>}
        />

        <Container as="div" className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <LegalSection title="1. Booking &amp; Agreement">
              <p>
                By booking an apartment through Lapland Apartments, you enter
                into a direct rental agreement with us for the dates,
                property, and guest count confirmed at checkout. A booking is
                only guaranteed once payment has been processed and a
                confirmation email has been sent.
              </p>
            </LegalSection>

            <LegalSection title="2. Payments &amp; Pricing">
              <p>
                All prices are displayed in EUR and include applicable taxes
                and service fees unless stated otherwise. Payments are
                processed securely by our payment provider; we do not store
                your full card details on our servers.
              </p>
            </LegalSection>

            <LegalSection title="3. Cancellations &amp; Refunds">
              <p>
                Free cancellation is available up to 48 hours before check-in
                unless a listing states a different policy. Cancellations
                made after this window, or no-shows, are non-refundable.
                Refunds, when due, are returned to the original payment
                method within 5–10 business days.
              </p>
            </LegalSection>

            <LegalSection title="4. Check-In &amp; House Rules">
              <p>
                Standard check-in is from 15:00 and check-out by 11:00 unless
                otherwise noted on the apartment page. Guests agree to follow
                the house rules listed for each property, including any
                restrictions on smoking, pets, and maximum occupancy.
              </p>
            </LegalSection>

            <LegalSection title="5. Guest Responsibilities">
              <p>
                Guests are responsible for the apartment and its contents
                during their stay and agree to report any damage promptly.
                Reasonable wear and tear is expected; excessive damage may be
                charged to the payment method on file.
              </p>
            </LegalSection>

            <LegalSection title="6. Liability">
              <p>
                Lapland Apartments is not liable for indirect losses,
                including missed activities or travel disruptions outside
                our control (e.g. weather, flight delays). Our liability for
                any direct claim is limited to the amount paid for the
                booking in question.
              </p>
            </LegalSection>

            <LegalSection title="7. Contact">
              <p>
                Questions about these terms can be sent to{" "}
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
