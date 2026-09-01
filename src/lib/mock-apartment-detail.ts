import type { ApartmentDetail } from "@/lib/types";

/** Placeholder detail content + stock photos matching the Figma apartment
 * page. Replace with a real Hostaway listing fetch once the API integration
 * lands. */
export const APARTMENT_DETAIL: ApartmentDetail = {
  id: "1",
  slug: "hostit-arctic-apartments-ii-1",
  title: "Hostit Arctic Apartments II",
  pricePerNight: 149,
  currency: "EUR",
  guests: 4,
  livingAreaSqm: 180,
  location: "City center",
  rating: 4.9,
  reviewCount: 468,
  heroImageUrl:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=2000&q=80&auto=format&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80&auto=format&fit=crop",
  ],
  totalImageCount: 12,
  topAmenities: [
    { icon: "sauna", label: "Sauna" },
    { icon: "balcony", label: "Balcony" },
    { icon: "location", label: "City center" },
    { icon: "parking", label: "Free parking" },
    { icon: "wifi", label: "WiFi" },
    { icon: "kitchen", label: "Fully equipped kitchen" },
  ],
  description: {
    atmosphere:
      "Step into a sanctuary of Arctic calm. Our apartments are more than just a place to sleep—they are your private retreat after a day of adventure. Relax in a warm, sun-drenched space where crisp Nordic air meets the cozy embrace of a high-end home. Whether watching the snowfall or enjoying a quiet morning coffee, experience pure, effortless serenity.",
    interiorStyle:
      'We embrace the "Modern Nordic" aesthetic: a perfect blend of minimalist design and functional luxury. Expect clean lines, natural wood textures, and a soft palette reflecting the Lapland landscape. Every detail, from premium lighting to high-quality textiles, is carefully selected to create a sophisticated yet "hygge" environment.',
  },
  perfectFor: [
    {
      label: "Couples:",
      description: "Looking for a romantic and stylish base for their Arctic getaway.",
    },
    {
      label: "Families:",
      description: 'Who value space, a fully equipped kitchen, and a "home away from home" feeling.',
    },
    {
      label: "Small Groups:",
      description: "Seeking a central location without compromising on privacy and comfort.",
    },
  ],
  nearbyAttractions: [
    {
      title: "Santa Village",
      description: "A quick 10-minute drive or shuttle ride.",
      // Real photo (the classic Santa Claus Village signpost).
      imageUrl: "/images/nearby-santa-village.jpg",
    },
    {
      title: "Arktikum Museum",
      description: "A short walk to explore Arctic history and science",
      // No real photo of the museum on file — Unsplash placeholder.
      imageUrl:
        "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=600&q=80&auto=format&fit=crop",
    },
    {
      title: "Local Dining",
      description: "The best restaurants and cafes at your doorstep.",
      // No real photo of local restaurants on file — Unsplash placeholder.
      imageUrl:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80&auto=format&fit=crop",
    },
    {
      title: "Safari Hubs",
      description: "Major tour departures within easy walking distance.",
      // Real photo — a snowmobile convoy, distinct from the Northern Lights
      // Tours photo used elsewhere on the page.
      imageUrl: "/images/nearby-safari-hubs.jpg",
    },
  ],
  amenityCategories: [
    { icon: "kitchen", label: "Kitchen" },
    { icon: "bathroom", label: "Bathroom" },
    { icon: "laundry", label: "Laundry" },
    { icon: "entertainment", label: "Entertainment" },
    { icon: "heating", label: "Heating" },
    { icon: "outdoor", label: "Outdoor features" },
  ],
  locationInfo: [
    {
      title: "City Center",
      description: "A 5-minute walk to top restaurants and shops.",
    },
    {
      title: "Santa Village",
      description: "A quick 10-minute drive to the magic.",
    },
    {
      title: "Rovaniemi Airport",
      description: "Easy 15-minute transfer from your doorstep.",
    },
    {
      title: "Local Supermarkets",
      description: "Only 3 minutes away for all your essentials.",
    },
  ],
  houseRules: [
    { title: "Check-in", description: "Available from 15:00 (3 PM)." },
    { title: "Check-out", description: "Please depart by 11:00 (11 AM)." },
    { title: "No Smoking", description: "Strictly prohibited inside the premises." },
    { title: "Pets Policy", description: "Please contact us before booking." },
  ],
  activities: [
    {
      title: "Snowmobile Safari",
      imageUrl:
        "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80&auto=format&fit=crop",
    },
    {
      title: "Northern Lights Tour",
      imageUrl:
        "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&q=80&auto=format&fit=crop",
    },
    {
      title: "Reindeer Farm Visit",
      imageUrl:
        "https://images.unsplash.com/photo-1774288744570-551f0c8fc00b?w=600&q=80&auto=format&fit=crop",
    },
    {
      title: "Husky Safari",
      imageUrl:
        "https://images.unsplash.com/photo-1647591413051-3662ec03bfe8?w=600&q=80&auto=format&fit=crop",
    },
  ],
};
