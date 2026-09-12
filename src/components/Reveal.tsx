'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Brings [data-reveal] blocks in as they scroll into view.
 *
 * This is an enhancement, never a dependency. The stylesheet reveals every
 * block on its own after --reveal-failsafe, so a bundle that fails to load, is
 * blocked by a proxy, or breaks on a future refactor costs the visitor a short
 * delay and nothing else. Read the Motion section of globals.css before
 * changing either side of that contract.
 *
 * Two things this file gets wrong easily, both of which shipped once:
 *
 *  1. `pathname` is a dependency. The root layout does NOT remount on a
 *     client-side navigation, so an effect keyed on [] observed only the first
 *     page's elements and left every page reached by tapping a link hidden.
 *  2. Content can arrive after the route commits — streamed boundaries,
 *     accordions, anything client-rendered — so a MutationObserver picks up
 *     what was not in the DOM the first time round.
 *
 * [data-rise] headings are deliberately absent: they are above the fold by
 * definition and animate straight from CSS, with no script involved.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    // No observer, or the visitor asked for less motion: the CSS failsafe (or
    // the reduced-motion rule) handles it. Doing nothing here is correct.
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pending = new Set<number>();

    const show = (el: HTMLElement) => el.classList.add('in');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const delay = Number(el.dataset.delay ?? 0);
          if (delay > 0) {
            const t = window.setTimeout(() => {
              pending.delete(t);
              show(el);
            }, delay);
            pending.add(t);
          } else {
            show(el);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    const observeAll = () =>
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.in)')
        .forEach((el) => io.observe(el));

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
