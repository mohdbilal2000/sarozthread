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
    <div className="border border-line bg-carbon p-6 sm:p-10" data-reveal>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-signal">
          <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
          {phase}
        </span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ash">{eta}</span>
      </div>

      <h2 className="text-d2 mt-6 max-w-[18ch]">{title}</h2>
      <p className="prose mt-5 max-w-[60ch]">{lede}</p>

      <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 bg-carbon p-4 text-sm text-chalk">
            <span className="mt-[0.45rem] block h-1.5 w-1.5 shrink-0 bg-signal" />
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
