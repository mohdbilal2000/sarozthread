'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Lands hash links on their target, clear of the sticky header.
 *
 * Two things defeat the browser's own hash scrolling here. The display face is
 * condensed and loads with font-display: swap, so the first paint is measured
 * in the fallback and everything above the target moves once the real face
 * arrives — /faq#compliance was scrolling to the right place and then having
 * 112px of text grow above it. And the header is sticky, so the raw anchor
 * position sits underneath it.
 *
 * Re-running the scroll after document.fonts.ready fixes the first; reading
 * scroll-padding-top off the root element fixes the second without duplicating
 * the 6rem in two places.
 *
 * Progressive enhancement: with no script the browser still jumps to the
 * anchor, just less precisely. Nothing here can hide content.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const offset = () => {
      const pad = getComputedStyle(document.documentElement).scrollPaddingTop;
      const n = Number.parseFloat(pad);
      return Number.isFinite(n) ? n : 0;
    };

    const land = () => {
      if (cancelled) return;
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - offset();
      window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: 'auto' });
    };

    const schedule = () => {
      if (!window.location.hash) return;
      // Once after layout, and again once the webfonts have actually swapped.
      timers.push(window.setTimeout(land, 0));
      timers.push(window.setTimeout(land, 300));
      document.fonts?.ready.then(land).catch(() => {});
    };

    schedule();
    window.addEventListener('hashchange', schedule);

    return () => {
      cancelled = true;
      window.removeEventListener('hashchange', schedule);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
