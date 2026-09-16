'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { company } from '@/data/company';
import { ArrowRight, WhatsApp } from './Icons';

/**
 * The action rail that follows the buyer down the page.
 *
 * A factory site loses enquiries in a specific way: the buyer reads four
 * screens, decides you are worth a conversation, and then has to scroll back
 * up to find out how to start one. This keeps both routes permanently in
 * reach — and puts WhatsApp first, because on an India-based export desk that
 * is where the conversation actually happens.
 *
 * Appears only after the hero has been passed, so it never competes with the
 * page's own primary call to action. On desktop it narrows to the WhatsApp
 * pill alone, since the header already carries a standing quote button.
 */
export function StickyEnquiry() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-[var(--ease-industrial)] lg:inset-x-auto lg:bottom-7 lg:right-7 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-stretch gap-px border-t border-line bg-line lg:gap-3 lg:border-0 lg:bg-transparent">
        <a
          href={`https://wa.me/${company.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2.5 bg-canvas px-5 py-4 text-[0.875rem] font-semibold text-ink transition-colors hover:text-accent lg:flex-none lg:rounded-[var(--radius-pill)] lg:border lg:border-line lg:py-3.5 lg:shadow-[var(--shadow-lift)]"
        >
          <WhatsApp className="shrink-0 text-accent" />
          WhatsApp
        </a>
        {/* Phone only. On desktop the header already carries a permanent quote
            button, and a second floating one would just collide with whatever
            call to action the section itself is offering. */}
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2.5 bg-accent px-5 py-4 text-[0.875rem] font-semibold text-canvas transition-colors hover:bg-accent-dim lg:hidden"
        >
          Send a tech pack
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
