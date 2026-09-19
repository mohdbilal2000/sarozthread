'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryNav, isActive } from '@/lib/site';
import { company } from '@/data/company';
import { ArrowRight, Chevron } from './Icons';

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const closeTimer = useRef<number | null>(null);

  // Route change closes everything.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // A short close delay stops the menu snapping shut while the pointer
  // crosses the gap between the trigger and the panel.
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* The contact rail. Cheer Sagar, Aman and BK all carry one, and a buyer
          who wants the phone number should never have to find a page for it. */}
      <div className="hidden border-b border-line bg-mist lg:block">
        <div className="shell flex items-center justify-between gap-6 py-2 text-[0.8125rem] text-body">
          <p>
            {company.address.street}, {company.address.locality} {company.address.postalCode},{' '}
            {company.address.region}, {company.address.country}
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${company.contact.tradeEmail}`} className="hover:text-accent">
              {company.contact.tradeEmail}
            </a>
            <a
              href={`tel:${company.contact.phoneE164}`}
              className="font-semibold text-ink hover:text-accent"
            >
              {company.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        stuck || openMenu ? 'border-line bg-canvas/92 backdrop-blur-xl' : 'border-transparent'
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="shell flex min-h-[4.5rem] items-center justify-between gap-6 lg:min-h-[5rem]">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${company.name} — home`}>
          <span className="block h-6 w-[3px] bg-accent transition-all duration-300 group-hover:h-8" />
          <span className="text-d3 !text-[1.05rem] leading-none text-ink sm:!text-[1.2rem]">
            Saroz&nbsp;Threadz
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {primaryNav.map((group) => {
            const active = isActive(group.href, pathname);
            const open = openMenu === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(group.label);
                }}
                onFocus={() => setOpenMenu(group.label)}
              >
                <Link
                  href={group.href}
                  aria-current={active ? 'page' : undefined}
                  aria-expanded={group.columns ? open : undefined}
                  className={`relative flex items-center gap-1.5 px-4 py-7 text-[0.875rem] font-medium tracking-[0.005em] transition-colors ${
                    active || open ? 'text-ink' : 'text-body hover:text-ink'
                  }`}
                >
                  {group.label}
                  {group.columns && (
                    <Chevron className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  )}
                  <span
                    className={`absolute inset-x-4 bottom-5 h-px origin-left bg-accent transition-transform duration-300 ${
                      active || open ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn hidden !px-6 !py-3.5 xl:inline-flex">
            Request a quote
            <ArrowRight />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-line-strong lg:hidden"
          >
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span className={`block h-px w-5 bg-ink transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mega menu ------------------------------------------------------- */}
      {primaryNav.map((group) =>
        group.columns ? (
          <div
            key={`panel-${group.label}`}
            hidden={openMenu !== group.label}
            onMouseEnter={cancelClose}
            className="absolute inset-x-0 top-full hidden border-y border-line bg-mist shadow-[0_24px_48px_-32px_rgb(28_23_18/0.35)] lg:block"
          >
            <div className="shell grid gap-10 py-12 lg:grid-cols-[1fr_2.2fr]">
              <div>
                <p className="kicker">{group.label}</p>
                <p className="text-d2 mt-5 max-w-[26ch] !text-[1.55rem]">
                  {group.summary}
                </p>
                <Link href={group.href} className="link-arrow mt-7">
                  All {group.label.toLowerCase()} <ArrowRight />
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-3">
                {group.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="text-label border-b border-line pb-3 text-muted">{col.heading}</p>
                    <ul className="mt-4 space-y-px">
                      {col.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="group flex items-baseline justify-between gap-4 border-l-2 border-transparent py-2.5 pl-3 transition-all hover:border-accent hover:bg-sand"
                          >
                            <span className="text-[0.9375rem] text-ink-soft transition-colors group-hover:text-ink">
                              {item.label}
                            </span>
                            {item.note && (
                              <span className="text-label shrink-0 text-muted">{item.note}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}

      {/* Mobile drawer --------------------------------------------------- */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto overscroll-contain border-t border-line bg-canvas lg:hidden"
      >
        <nav className="shell py-6" aria-label="Mobile">
          <ul className="divide-y divide-line border-y border-line">
            {primaryNav.map((group) => (
              <li key={group.label} className="py-5">
                <Link href={group.href} className="text-d3 block text-ink">
                  {group.label}
                </Link>
                {group.columns && (
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                    {group.columns.flatMap((c) => c.items).map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block py-1.5 text-sm text-body">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-5">
              <Link href="/insights" className="text-d3 block text-ink">
                Insights
              </Link>
            </li>
            <li className="py-5">
              <Link href="/faq" className="text-d3 block text-ink">
                FAQ
              </Link>
            </li>
          </ul>

          <Link href="/contact" className="btn mt-8 w-full">
            Request a quote <ArrowRight />
          </Link>

          <div className="mt-8 space-y-2 pb-10 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <a href={`tel:${company.contact.phoneE164}`} className="block">
              {company.contact.phoneDisplay}
            </a>
            <a href={`mailto:${company.contact.tradeEmail}`} className="block normal-case tracking-normal">
              {company.contact.tradeEmail}
            </a>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}
