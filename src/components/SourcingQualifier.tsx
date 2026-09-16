'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { sourcingCategories, decorations, quantityBands } from '@/data/sourcing';
import { company } from '@/data/company';
import { ArrowRight, Check } from './Icons';

/**
 * "Can you make this?" — the qualifier.
 *
 * Every other block on this site tells a buyer about the factory. This one
 * answers the question they actually arrived with, in their own terms, before
 * they have typed anything. Three taps produce a merchandiser's reply: yes this
 * is core floor, here are the machines it runs on, here is what that quantity
 * means commercially — or, just as usefully, no, and here is who to ask instead.
 *
 * The output is not decoration. It becomes the enquiry: the CTA carries the
 * selections into the contact form pre-filled, or into WhatsApp as a written
 * brief, because the buyer should never have to type what they just told us.
 */
export function SourcingQualifier() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [decorationIds, setDecorationIds] = useState<string[]>([]);
  const [bandId, setBandId] = useState<string | null>(null);

  const category = sourcingCategories.find((c) => c.id === categoryId) ?? null;
  const band = quantityBands.find((b) => b.id === bandId) ?? null;
  const chosenDecorations = decorations.filter((d) => decorationIds.includes(d.id));
  const makeable = category?.verdict !== 'no';

  const toggleDecoration = (id: string) =>
    setDecorationIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );

  /** The brief, written out the way a buyer would say it. */
  const brief = useMemo(() => {
    if (!category) return '';
    const parts = [`Category: ${category.label}`];
    if (chosenDecorations.length)
      parts.push(`Decoration: ${chosenDecorations.map((d) => d.label).join(', ')}`);
    if (band) parts.push(`Quantity: ${band.label}`);
    return parts.join('\n');
  }, [category, chosenDecorations, band]);

  const contactHref = category
    ? `/contact?category=${encodeURIComponent(category.label)}` +
      (band ? `&quantity=${encodeURIComponent(band.label)}` : '') +
      (brief ? `&brief=${encodeURIComponent(brief)}` : '')
    : '/contact';

  const whatsappHref = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(
    brief
      ? `Hello — I am sourcing the following and found you via your website.\n\n${brief}\n\nCould you tell me if this is something you can quote?`
      : 'Hello — I found you via your website and would like to discuss a programme.',
  )}`;

  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line shadow-[var(--shadow-card)] lg:grid-cols-[1.05fr_1fr]">
      {/* ---------------------------------------------------------------
          The three questions
          --------------------------------------------------------------- */}
      <div className="bg-canvas p-7 lg:p-10">
        <Step n="01" label="What are you making?" />
        <div className="mt-4 flex flex-wrap gap-2">
          {sourcingCategories.map((c) => (
            <Choice
              key={c.id}
              selected={categoryId === c.id}
              onClick={() => setCategoryId(categoryId === c.id ? null : c.id)}
            >
              {c.label}
            </Choice>
          ))}
        </div>

        {/* When the answer is "not our floor", steps 2 and 3 are meaningless.
            `inert` removes them from the tab order and the accessibility tree
            together — hiding them with aria-hidden alone would leave a keyboard
            user tabbing into controls a screen reader has been told are gone. */}
        <div className={makeable ? '' : 'opacity-35'} inert={!makeable}>
          <Step n="02" label="Decoration on the style?" className="mt-9" />
          <div className="mt-4 flex flex-wrap gap-2">
            {decorations.map((d) => (
              <Choice
                key={d.id}
                selected={decorationIds.includes(d.id)}
                onClick={() => toggleDecoration(d.id)}
              >
                {d.label}
              </Choice>
            ))}
          </div>

          <Step n="03" label="Quantity per style" className="mt-9" />
          <div className="mt-4 flex flex-wrap gap-2">
            {quantityBands.map((b) => (
              <Choice
                key={b.id}
                selected={bandId === b.id}
                onClick={() => setBandId(bandId === b.id ? null : b.id)}
              >
                {b.label}
              </Choice>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          The merchandiser's reply
          --------------------------------------------------------------- */}
      <div className="flex flex-col bg-mist p-7 lg:p-10" aria-live="polite">
        {!category ? (
          <div className="my-auto">
            <p className="text-label text-muted">The answer</p>
            <p className="answer-lede mt-4 text-balance">
              Pick a category and we will tell you straight away whether it belongs on our
              floor — including when it doesn&rsquo;t.
            </p>
            <p className="mt-5 text-[0.9375rem] text-body">
              No form, no wait. The same answer you would get if you called {company.contact.primaryName.split(' ')[0]}.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span
                className={`chip ${
                  category.verdict === 'no'
                    ? '!bg-clay !text-ink-soft'
                    : ''
                }`}
              >
                {category.verdict === 'no' ? 'Not our floor' : category.verdict === 'core' ? 'Core floor' : 'Yes'}
              </span>
              <span className="text-label text-muted">{category.label}</span>
            </div>

            <p className="answer-lede mt-5 text-balance">{category.headline}</p>
            <p className="mt-4 text-[0.9375rem] text-body">{category.detail}</p>

            {category.runsOn && (
              <p className="mt-5 flex items-center gap-2.5 text-[0.875rem] text-muted">
                <Check className="shrink-0 text-accent" />
                Runs on {category.runsOn}
              </p>
            )}

            {makeable && chosenDecorations.length > 0 && (
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {chosenDecorations.map((d) => (
                  <li key={d.id}>
                    <span className="text-label text-ink">
                      {d.label} —{' '}
                      <span className={d.inHouse ? 'text-accent' : 'text-muted'}>
                        {d.inHouse ? 'in house' : 'partner house'}
                      </span>
                    </span>
                    <p className="mt-1.5 text-[0.875rem] text-body">{d.note}</p>
                  </li>
                ))}
              </ul>
            )}

            {makeable && band && (
              <div className="mt-6 border-t border-line pt-6">
                <span className="text-label text-ink">{band.label}</span>
                <p className="mt-1.5 text-[0.875rem] text-body">{band.response}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3 pt-2">
              {makeable ? (
                <>
                  <Link href={contactHref} className="btn">
                    Send this brief <ArrowRight />
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Ask on WhatsApp
                  </a>
                </>
              ) : (
                category.href === undefined && (
                  <Link href="/products" className="btn btn-outline">
                    What we do make <ArrowRight />
                  </Link>
                )
              )}
            </div>

            {makeable && (
              <p className="mt-4 text-[0.8125rem] text-muted">
                Your selections travel with you — nothing to re-type.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ n, label, className = '' }: { n: string; label: string; className?: string }) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="text-label text-accent">{n}</span>
      <h3 className="text-d3">{label}</h3>
    </div>
  );
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-[var(--radius-pill)] border px-4 py-2 text-[0.875rem] transition-all duration-200 ${
        selected
          ? 'border-accent bg-accent text-canvas shadow-[var(--shadow-card)]'
          : 'border-line-strong bg-canvas text-ink-soft hover:-translate-y-px hover:border-accent hover:text-accent'
      }`}
    >
      {children}
    </button>
  );
}
