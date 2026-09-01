"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, isNavLinkActive } from "@/lib/nav";
import { LogoMark } from "@/components/layout/LogoMark";
import {
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/layout/SocialIcons";
import { cn } from "@/lib/utils";

const AURORA_IMAGE = "/images/why-stay-aurora.jpg";

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/358407240600", Icon: WhatsAppIcon },
  { label: "Instagram", href: "https://www.instagram.com/booklaplandfi", Icon: InstagramIcon },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 flex flex-col text-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AURORA_IMAGE}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-6 sm:px-8">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2 text-2xl leading-8 font-medium"
              >
                <LogoMark />
                Lapland Apartments
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-10 text-3xl font-normal">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "transition-colors",
                    isNavLinkActive(pathname, link.href)
                      ? "font-semibold text-white underline underline-offset-8"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-6 px-5 pb-10 sm:px-8">
              <Link
                href="/apartments"
                onClick={onClose}
                className="flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-brand-green"
              >
                Book Now
                <span aria-hidden>↗</span>
              </Link>

              <div className="flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
