'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds the `in` class to [data-reveal] / [data-rise] elements as they enter the
 * viewport. Mounted once in the root layout.
 *
 * The animation itself is gated behind `html.js` in CSS, so a visitor without
 * JavaScript — or one whose script failed — sees all content immediately rather
 * than a blank page. The 2.5s sweep is a second belt-and-braces guarantee.
 *
 * `pathname` is a dependency for a reason: the root layout does NOT remount on
 * a client-side navigation, so an effect keyed on `[]` observed only the first
 * page's elements. Every page reached by clicking a link then rendered its
 * content at `opacity: 0` and never un-hid it — the "page is blank until you
 * reload" bug. A MutationObserver covers content that arrives after the route
 * commits (streamed Suspense boundaries, accordions, client components).
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supported = 'IntersectionObserver' in window;

    const show = (el: HTMLElement) => el.classList.add('in');
    const pending = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-reveal]:not(.in), [data-rise]:not(.in)',
        ),
      );

    if (reduced || !supported) {
      pending().forEach(show);
      // Still needed on later DOM insertions, otherwise they stay hidden.
      const mo = new MutationObserver(() => pending().forEach(show));
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const delay = Number(el.dataset.delay ?? 0);
          if (delay > 0) window.setTimeout(() => show(el), delay);
          else show(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    const observeAll = () => pending().forEach((el) => io.observe(el));
    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Failsafe: whatever the observer missed becomes visible anyway.
    const sweep = window.setTimeout(() => pending().forEach(show), 2500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(sweep);
    };
  }, [pathname]);

  return null;
}
