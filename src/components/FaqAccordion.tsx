import type { Faq } from '@/data/faq';
import { Plus } from './Icons';

/**
 * Native <details> rather than a JS accordion: it works with JavaScript off,
 * it is keyboard-operable and screen-reader-correct for free, and the answer
 * text is in the DOM for crawlers whether or not it is expanded.
 */
export function FaqAccordion({ items, className = '' }: { items: Faq[]; className?: string }) {
  if (!items.length) return null;
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
            <h3 className="text-d3 !text-[clamp(1rem,0.95rem+0.35vw,1.25rem)] !normal-case text-white transition-colors group-hover:text-signal">
              {f.q}
            </h3>
            <Plus className="mt-1.5 shrink-0 text-ash transition-transform duration-300 group-open:rotate-45 group-hover:text-signal" />
          </summary>
          <p className="max-w-[72ch] pb-7 pr-10 text-smoke">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
