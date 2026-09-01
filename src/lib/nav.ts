export const NAV_LINKS = [
  { label: "Apartments", href: "/apartments" },
  { label: "Activities", href: "/activities" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** True for the exact page and any of its sub-routes (e.g. "/apartments"
 * stays highlighted on "/apartments/some-slug"). */
export function isNavLinkActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
