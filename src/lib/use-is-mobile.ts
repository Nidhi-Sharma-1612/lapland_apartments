"use client";

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 639px)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True below Tailwind's `sm` breakpoint. Starts `false` (matching the
 * server-rendered markup) and flips after mount — via `useSyncExternalStore`
 * rather than a `useEffect` + `setState`, so there's no hydration mismatch
 * and no "setState synchronously in an effect" lint violation. */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
