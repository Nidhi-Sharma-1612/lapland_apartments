"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export type Section = { id: string; label: string };

export function SectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-100 bg-white/90 backdrop-blur">
      <Container className="flex items-center gap-2 overflow-x-auto py-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              activeId === section.id
                ? "border-brand-green bg-brand-green text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300",
            )}
          >
            {section.label}
          </a>
        ))}
      </Container>
    </div>
  );
}
