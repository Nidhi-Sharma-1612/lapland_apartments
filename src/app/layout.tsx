import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lapland Apartments | Direct Booking",
  description:
    "Stay in the best apartments in Rovaniemi. 150+ carefully selected apartments in the heart of Lapland — perfect for couples, families, and groups.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[--foreground]">
        {children}
      </body>
    </html>
  );
}
