import Link from 'next/link';
import { ArrowRight } from './Icons';

/**
 * A shared "this is built, not bluffed" panel for features that are scheduled
 * but not yet live.
 *
 * A page that says only "coming soon" costs trust. This one names the phase,
 * what the feature will do, and where to go in the meantime — so the page is
 * useful on the day it is read, not only on the day it ships.
 */
export function ComingSoon({
  phase,
  eta,
  title,
  lede,
  bullets,
  fallback,
}: {
  phase: string;
  eta: string;
  title: string;
  lede: string;
  bullets: string[];
  fallback?: { href: string; label: string };
}) {
  return (
    <div className="border border-line bg-mist p-6 sm:p-10" data-reveal>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1.5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
          {phase}
        </span>
        <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted">{eta}</span>
      </div>

      <h2 className="text-d2 mt-6 max-w-[18ch]">{title}</h2>
      <p className="prose mt-5 max-w-[60ch]">{lede}</p>

      <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 bg-mist p-4 text-sm text-ink-soft">
            <span className="mt-[0.45rem] block h-1.5 w-1.5 shrink-0 bg-accent" />
            {b}
          </li>
        ))}
      </ul>

      {fallback && (
        <Link href={fallback.href} className="link-arrow mt-8">
          {fallback.label} <ArrowRight />
        </Link>
      )}
    </div>
  );
}
