// Wrapper per gli eventi custom di Vercel Analytics.
// Nota: gli eventi custom sono registrati solo sui piani Pro di Vercel;
// sul piano Hobby vengono ignorati senza errori — il codice resta pronto.

import { track } from "@vercel/analytics";

export function trackEvent(name: string, data?: Record<string, string>) {
  try {
    track(name, data);
  } catch {
    /* analytics non disponibile (dev locale, adblocker) — nessun problema */
  }
}
