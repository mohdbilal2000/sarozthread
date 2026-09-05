'use client';

import { useEffect } from 'react';

/**
 * Adds the `in` class to [data-reveal] / [data-rise] elements as they enter the
 * viewport. Mounted once in the root layout.
 *
 * The animation itself is gated behind `html.js` in CSS, so a visitor without
 * JavaScript — or one whose script failed — sees all content immediately rather
 * than a blank page. The 2.5s sweep is a second belt-and-braces guarantee.
 */
export function Reveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-rise]'),
    );
    if (!targets.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          window.setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    targets.forEach((el) => io.observe(el));
    const sweep = window.setTimeout(() => targets.forEach((el) => el.classList.add('in')), 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(sweep);
    };
  }, []);

  return null;
}
