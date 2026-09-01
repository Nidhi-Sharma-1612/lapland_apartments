"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS, isNavLinkActive } from "@/lib/nav";
import { Container } from "@/components/layout/Container";
import { LogoMark } from "@/components/layout/LogoMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

/** Standard solid header for interior pages (not the homepage hero, which
 * renders its own transparent nav — see components/home/Hero.tsx). */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between py-6 text-white">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl leading-8 font-medium tracking-normal"
        >
          <LogoMark />
          Lapland Apartments
        </Link>

        <nav className="hidden items-center gap-4 text-base leading-6 font-normal lg:flex">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              <Link
                href={link.href}
                className={cn(
                  "transition-colors",
                  isNavLinkActive(pathname, link.href)
                    ? "font-semibold text-white"
                    : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <span className="text-white/40" aria-hidden>
                  /
                </span>
              )}
            </span>
          ))}
        </nav>

        <Link
          href="/apartments"
          className="hidden items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base leading-6 font-semibold text-brand-green transition-transform hover:scale-[1.03] lg:inline-flex"
        >
          Book Now
          <span aria-hidden>↗</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-white/30 p-2 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
