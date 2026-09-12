import Link from 'next/link';
import { ArrowRight } from './Icons';

/* --------------------------------------------------------------------------
   Kicker — the small monospace label above every section heading.
   -------------------------------------------------------------------------- */
export function Kicker({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}

/* --------------------------------------------------------------------------
   Section — the standard ruled band. `index` prints the section number in the
   margin, which is what gives long pages their engineering-document feel.
   -------------------------------------------------------------------------- */
export function Section({
  children,
  className = '',
  invert = false,
  id,
  tight = false,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
  id?: string;
  tight?: boolean;
}) {
  return (
    // Phones were inheriting close to desktop section padding, which left big
    // empty bands between blocks on a 390px screen. Desktop rhythm is
    // unchanged; the small end is tightened so a thumb reaches content.
    <section
      id={id}
      className={`ruled border-t border-line ${invert ? 'section-light' : ''} ${
        tight ? 'py-12 sm:py-14 lg:py-20' : 'py-16 sm:py-20 lg:py-32'
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* --------------------------------------------------------------------------
   SectionHead — index number, kicker, headline, optional lede, in one rhythm.
   -------------------------------------------------------------------------- */
export function SectionHead({
  index,
  kicker,
  title,
  lede,
  action,
}: {
  index?: string;
  kicker: string;
  title: string;
  lede?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
      <div data-reveal>
        {index && <span className="text-label mb-6 block text-ash">{index}</span>}
        <Kicker>{kicker}</Kicker>
        <h2 className="text-d1 mt-6 max-w-[14ch]">{title}</h2>
      </div>
      {(lede || action) && (
        <div data-reveal data-delay="80">
          {lede && <p className="prose text-lede">{lede}</p>}
          {action && (
            <Link href={action.href} className="link-arrow mt-8">
              {action.label} <ArrowRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   AnswerBlock — a question-shaped heading with a self-contained answer.
   This is the single highest-leverage pattern on the site for AI answer
   engines: the heading matches how a buyer phrases the question, and the
   answer beneath makes complete sense quoted on its own, with no pronouns
   pointing back at earlier paragraphs.
   -------------------------------------------------------------------------- */
export function AnswerBlock({
  question,
  answer,
  as: Tag = 'h2',
  className = '',
  children,
}: {
  question: string;
  answer: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`border-l-2 border-signal pl-6 lg:pl-10 ${className}`}>
      <Tag className="text-d2">{question}</Tag>
      <p className="answer-lede mt-6">{answer}</p>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   SpecTable — every stateable number in a real table. Tables and explicit
   statistics are what AI answer engines actually quote, so they get proper
   semantics: caption, th scope, no div soup.
   -------------------------------------------------------------------------- */
export function SpecTable({
  caption,
  rows,
  className = '',
}: {
  caption: string;
  rows: { label: string; value?: string }[];
  className?: string;
}) {
  const valued = rows.some((r) => r.value);
  return (
    <table className={className}>
      <caption>{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row" className={valued ? '' : '!w-full !text-chalk'}>
              {row.label}
            </th>
            {valued && <td>{row.value || '—'}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* --------------------------------------------------------------------------
   StatRow — the numbers, rendered as loudly as the design allows.
   -------------------------------------------------------------------------- */
export function StatRow({
  stats,
  className = '',
}: {
  stats: { value: string; sup?: string; label: string }[];
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 border-line md:grid-cols-4 ${className}`}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          data-reveal
          data-delay={String(i * 70)}
          className="border-b border-r border-line px-5 py-9 last:border-r-0 md:border-b-0 lg:px-8 lg:py-12"
        >
          <dd className="text-num text-[clamp(2.5rem,5vw,4.5rem)] text-white">
            {s.value}
            {s.sup && <span className="align-super text-[0.4em] text-signal">{s.sup}</span>}
          </dd>
          <dt className="text-label mt-4 text-ash">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/* --------------------------------------------------------------------------
   Breadcrumbs
   -------------------------------------------------------------------------- */
export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    // -my-1.5 keeps the visual position while the links themselves grow to a
    // size a thumb can actually hit (WCAG 2.2 target size).
    <nav aria-label="Breadcrumb" className="-my-1.5">
      <ol className="flex flex-wrap items-center gap-x-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
        <li>
          <Link href="/" className="inline-block py-1.5 transition-colors hover:text-white">
            Home
          </Link>
        </li>
        {trail.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            <span aria-hidden className="text-iron">
              /
            </span>
            {i === trail.length - 1 ? (
              <span aria-current="page" className="py-1.5 text-chalk">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="inline-block py-1.5 transition-colors hover:text-white">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* --------------------------------------------------------------------------
   PageHero — the standard interior-page opener.
   -------------------------------------------------------------------------- */
export function PageHero({
  kicker,
  title,
  lede,
  trail,
  aside,
}: {
  kicker: string;
  title: string;
  lede?: string;
  trail?: { name: string; href: string }[];
  aside?: React.ReactNode;
}) {
  // Pages like /capabilities/<slug> carry neither a lede nor an aside. Laying
  // out an empty two-column grid for them left a band of dead space under the
  // heading that read as a page that had failed to finish loading.
  const hasBody = Boolean(lede || aside);

  return (
    <section
      className={`ruled grain relative overflow-hidden border-b border-line pt-8 sm:pt-10 lg:pt-16 ${
        hasBody ? 'pb-12 sm:pb-14 lg:pb-24' : 'pb-9 sm:pb-11 lg:pb-16'
      }`}
    >
      <div className="shell">
        {trail && <Breadcrumbs trail={trail} />}
        <Kicker className="mt-7 sm:mt-9 lg:mt-10">{kicker}</Kicker>
        <h1 className="text-d1 mt-4 max-w-[18ch] sm:mt-5 lg:mt-6" data-rise>
          <span>{title}</span>
        </h1>
        {hasBody && (
          <div className="mt-8 grid gap-8 sm:gap-10 lg:mt-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            {lede && (
              <p className="prose text-lede" data-reveal data-delay="120">
                {lede}
              </p>
            )}
            {aside && (
              <div data-reveal data-delay="180">
                {aside}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   NumberedList — the process/feature list with hairline rules.
   -------------------------------------------------------------------------- */
export function NumberedList({
  items,
  headingLevel = 'h3',
}: {
  items: { title: string; body: string; aside?: string }[];
  /** Set to h2 when the list is the first content under the page h1. */
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <ol className="border-t border-line">
      {items.map((item, i) => (
        <li
          key={item.title}
          data-reveal
          data-delay={String(Math.min(i * 50, 250))}
          className="group grid gap-3 border-b border-line py-8 md:grid-cols-[5rem_1fr_1.3fr] md:gap-10 md:py-10"
        >
          <span className="text-label pt-1 text-signal">{String(i + 1).padStart(2, '0')}</span>
          <Heading className="text-d3 text-white">{item.title}</Heading>
          <div>
            <p className="text-[0.9375rem] text-smoke">{item.body}</p>
            {item.aside && (
              <p className="mt-4 border-l border-line pl-4 text-[0.9375rem] italic text-ash">
                {item.aside}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------------------
   Marquee — a moving ticker of facts. Duplicated content is aria-hidden so
   screen readers hear the list once.
   -------------------------------------------------------------------------- */
export function Marquee({ items }: { items: string[] }) {
  const Run = ({ hidden = false }: { hidden?: boolean }) => (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap px-8">
          <span className="text-label text-chalk">{item}</span>
          <span className="h-1.5 w-1.5 shrink-0 bg-signal" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line bg-carbon py-4">
      <div className="marquee">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
