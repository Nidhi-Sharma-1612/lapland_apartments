"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

const TABS = [
  { label: "Overview", href: "#overview" },
  { label: "Highlights", href: "#highlights" },
  { label: "Description", href: "#description" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location Map", href: "#location-map" },
  { label: "Rules", href: "#rules" },
  { label: "Activities", href: "#activities" },
];

export function ApartmentTabs() {
  const [active, setActive] = useState(TABS[0].href);

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <Container>
        <nav className="flex items-center gap-8 overflow-x-auto py-4">
          {TABS.map((tab) => {
            const isActive = tab.href === active;
            return (
              <a
                key={tab.href}
                href={tab.href}
                onClick={() => setActive(tab.href)}
                className={`shrink-0 border-b-2 pb-1 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
