import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { Container } from "@/components/layout/Container";
import { LogoMark } from "@/components/layout/LogoMark";
import { InstagramIcon, WhatsAppIcon } from "@/components/layout/SocialIcons";

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/358407240600", Icon: WhatsAppIcon },
  { label: "Instagram", href: "https://www.instagram.com/booklaplandfi", Icon: InstagramIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50">
      <Container className="flex flex-col items-center gap-8 py-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:text-left">
        <Link href="/" className="flex items-center gap-2 text-xl font-medium text-zinc-900">
          <LogoMark className="text-zinc-900" />
          Lapland Apartments
        </Link>

        <nav className="flex flex-col items-center gap-4 text-sm text-zinc-600 lg:flex-row">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              <Link href={link.href} className="transition-colors hover:text-zinc-900">
                {link.label}
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <span className="hidden text-zinc-300 lg:inline" aria-hidden>
                  /
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white transition-transform hover:scale-105"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Container>

      <div className="bg-brand-green text-white/70">
        <Container className="flex flex-col items-center gap-2 py-4 text-xs sm:flex-row sm:justify-between">
          <p>Copyright {year} Lapland Apartments</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden>/</span>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </Container>
        <Container className="flex items-center justify-center gap-2 border-t border-white/10 py-3 text-xs">
          <span>Design and developed by</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/company-logo.png" alt="Design by Dial" className="h-4 w-auto" />
        </Container>
      </div>
    </footer>
  );
}
