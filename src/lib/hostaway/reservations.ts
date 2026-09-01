import "server-only";
import { hostawayFetch } from "./client";

export type CreateReservationInput = {
  listingId: number;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  totalPrice: number;
  currency: string;
  /** Stripe PaymentIntent id — recorded in the guest note for traceability,
   * mirroring the "** THIS RESERVATION HAS BEEN PRE-PAID **" pattern already
   * present on real reservations in this Hostaway account. */
  paymentReference: string;
};

/** Creates a real reservation in Hostaway. Only ever called from the Stripe
 * webhook handler after a payment has actually succeeded — never from a
 * client-facing request, since a reservation here represents a real booking
 * the host will see and prepare for. */
export async function createHostawayReservation(
  input: CreateReservationInput,
): Promise<{ id: number }> {
  const nights = Math.round(
    (new Date(input.checkOut).getTime() - new Date(input.checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return hostawayFetch<{ id: number }>("/reservations", {
    method: "POST",
    noStore: true,
    body: {
      listingMapId: input.listingId,
      channelId: 2000, // Direct booking
      status: "new",
      arrivalDate: input.checkIn,
      departureDate: input.checkOut,
      nights,
      guestFirstName: input.firstName,
      guestLastName: input.lastName,
      guestEmail: input.email,
      phone: input.phone,
      numberOfGuests: input.adults + input.children,
      adults: input.adults,
      children: input.children,
      totalPrice: input.totalPrice,
      currency: input.currency,
      paymentStatus: "Paid",
      guestNote: `** THIS RESERVATION HAS BEEN PRE-PAID VIA STRIPE **\nStripe payment reference: ${input.paymentReference}`,
    },
  });
}
