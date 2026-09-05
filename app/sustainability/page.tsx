import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { materialOptions, practices, inProgress } from '@/data/sustainability';
import { graph, breadcrumbs } from '@/lib/schema';

const trail = [{ name: 'Sustainability', href: '/sustainability' }];

export const metadata: Metadata = {
  title: 'Sustainability',
  description:
    'What Saroz Threadz can evidence on sustainability: Better Cotton approval, organic and recycled bases on request, SMETA-audited labour standards, and an honest list of what we do not yet measure.',
  alternates: { canonical: '/sustainability' },
};

export default function SustainabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Sustainability"
        title="What we can evidence, and what we cannot"
        lede="Most factory sustainability pages claim more than they can prove. This one states what is audited, what is available on request, and — at the bottom — what we do not yet measure. Overstating this is a legal risk for a brand selling into the EU, and we would rather you found the gaps here than in a due-diligence questionnaire."
        trail={trail}
      />

      <Section>
        <div className="shell">
          <div data-reveal>
            <AnswerBlock
              question="Can you source sustainable materials?"
              answer="Saroz Threadz is approved under the Better Cotton Initiative, so Better Cotton programmes can be run on request. Organic-certified and recycled bases are available through our supply base, subject to the certification and transaction certificates the buyer requires."
            />
          </div>

          <ul className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
            {materialOptions.map((m, i) => (
              <li key={m.name} className="bg-void p-8 lg:p-10" data-reveal data-delay={String((i % 2) * 70)}>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-d3 !text-[1.2rem]">{m.name}</h2>
                  <span
                    className={`text-label shrink-0 border px-2.5 py-1 ${
                      m.status === 'Available'
                        ? 'border-signal text-signal'
                        : 'border-line text-ash'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="mt-5 text-[0.9375rem] text-smoke">{m.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section invert>
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 lg:items-end">
            <h2 className="text-d1 max-w-[13ch]" data-reveal>
              What one site actually saves.
            </h2>
            <p className="prose" data-reveal data-delay="80">
              The most defensible environmental claim a garment factory can make is structural, not
              aspirational: processes kept in house are truck movements that do not happen and
              handovers that cannot go wrong.
            </p>
          </div>
          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
            {practices.map((p, i) => (
              <li key={p.title} className="bg-[var(--color-void)] p-8 lg:p-10" data-reveal data-delay={String(i * 70)}>
                <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-d3 mt-5">{p.title}</h3>
                <p className="mt-4 text-[0.9375rem] text-smoke">{p.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <h2 className="text-d2 max-w-[14ch]">What we do not claim.</h2>
            <p className="prose mt-8">
              A sustainability page with no gaps is not a credible sustainability page. These are the
              things buyers ask for that we cannot currently evidence. If any of them is a hard
              requirement for your programme, tell us early rather than late.
            </p>
            <Link href="/contact" className="link-arrow mt-9">
              Discuss requirements <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            <ul className="border-t border-line">
              {inProgress.map((item) => (
                <li key={item} className="flex gap-5 border-b border-line py-6">
                  <span className="mt-2.5 h-px w-6 shrink-0 bg-signal" />
                  <p className="text-[0.9375rem] text-smoke">{item}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <SpecTable
                caption="What is audited today"
                rows={[
                  { label: 'Labour standards', value: 'SMETA (Sedex)' },
                  { label: 'Health & safety', value: 'SMETA scope' },
                  { label: 'Environment', value: 'SMETA scope' },
                  { label: 'Business ethics', value: 'SMETA scope' },
                  { label: 'Cotton programme', value: 'Better Cotton Initiative' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
