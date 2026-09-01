import type { ReviewCard } from "@/lib/types";

/** Curated placeholder reviews shown when Hostaway isn't configured or
 * returns no usable reviews. Replace with real Hostaway reviews once the
 * API integration lands — see `getFeaturedReviews` in `@/lib/hostaway/reviews`. */
export const MOCK_REVIEWS: ReviewCard[] = [
  {
    source: "airbnb",
    rating: 5,
    title: "Unforgettable family Christmas!",
    body: "The apartment was incredibly spacious and perfectly located near the city center. The kids loved the bunk beds, and having a fully equipped kitchen made our stay so much easier. The team even helped us book a reindeer farm visit. Highly recommend for families!",
    name: "Sophie",
    subtitle: "United Kingdom",
  },
  {
    source: "google",
    rating: 5,
    title: "Romantic and cozy with a private sauna",
    body: "We booked this for our anniversary and it exceeded every expectation. Falling asleep to the sound of snow outside, then warming up in our own sauna before dinner — it felt like a private retreat, not a rental.",
    name: "Marc",
    subtitle: "France",
  },
  {
    source: "airbnb",
    rating: 5,
    title: "Seamless experience and great location",
    body: "The digital check-in was so smooth, even arriving late at night felt effortless. We were a group of 6 and had plenty of space. Being in the heart of the city meant we could walk to all the best restaurants and the sights. Local experts indeed!",
    name: "Lukas",
    subtitle: "Germany",
  },
  {
    source: "google",
    rating: 5,
    title: "Northern lights right from the window",
    body: "We could not believe our luck — the aurora appeared on our very first night and we watched it from the living room. The place was spotless, warm, and had everything we needed for a week-long stay.",
    name: "Anna",
    subtitle: "Netherlands",
  },
  {
    source: "airbnb",
    rating: 5,
    title: "Perfect base for a girls' ski trip",
    body: "Four of us stayed for a long weekend and the apartment handled it easily — plenty of space to dry gear, a proper kitchen for group breakfasts, and a five-minute walk to the slopes. Would book again in a heartbeat.",
    name: "Emma",
    subtitle: "Ireland",
  },
  {
    source: "google",
    rating: 5,
    title: "The husky safari they arranged was the highlight",
    body: "We mentioned to the team we wanted to see huskies and within a day they'd booked us onto a safari that fit perfectly around our stay. The apartment itself was warm, quiet, and exactly as pictured.",
    name: "Tomás",
    subtitle: "Spain",
  },
  {
    source: "airbnb",
    rating: 5,
    title: "Worked remotely for two weeks, loved it",
    body: "Reliable wifi, a proper desk by the window, and being able to step outside for a walk in the snow on lunch breaks made this the best 'workation' I've had. Would happily come back every winter.",
    name: "Yuki",
    subtitle: "Japan",
  },
  {
    source: "google",
    rating: 5,
    title: "First time seeing snow — unforgettable",
    body: "Everything about this trip felt taken care of, from the smooth check-in instructions to how genuinely helpful the team was when we asked about things to do. A brilliant introduction to Lapland.",
    name: "Oliver",
    subtitle: "Australia",
  },
];
