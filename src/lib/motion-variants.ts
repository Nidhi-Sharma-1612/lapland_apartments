import type { Variants } from "framer-motion";

/** Applied to a grid/flex container: staggers its motion children in as the
 * section scrolls into view. Pair with `staggerItem` on each card. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Shared viewport trigger: animate once, slightly before the element is
 * fully in view so the motion doesn't feel late. */
export const revealViewport = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" };
