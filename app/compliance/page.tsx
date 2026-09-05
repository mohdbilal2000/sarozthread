import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight, Check } from '@/components/Icons';
import { certifications, labourStandards } from '@/data/company';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, faqPage } from '@/lib/schema';
import { siteImage } from '@/lib/images';

const trail = [{ name: 'Compliance', href: '/compliance' }];

export const metadata: Metadata = {
  title: 'Compliance & certifications',
  description:
    'Saroz Threadz is SMETA audited, Better Cotton Initiative approved, authorised for Disney-licensed programmes, and a Government of India recognised export house. Zero tolerance on child labour.',
  alternates: { canonical: '/compliance' },
};

export default function CompliancePage() {
  const pageFaqs = faqsForPage('compliance');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail), faqPage(pageFaqs)]) }}
      />

      <PageHero
        kicker="Compliance"
        title="Compliance is a floor, not a marketing claim"
        lede="Social responsibility at Saroz Threadz is part of how the factory runs day to day. Our standards are third-party audited, the certifications are current, and the documents go to your compliance team on request."
        trail={trail}
        aside={
          <div className="flex flex-wrap gap-2">
            {certifications.map((c) => (
              <span key={c.code} className="tag">
                {c.name}
              </span>
            ))}
          </div>
        }
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <div data-reveal>
              <AnswerBlock
                question="What certifications does Saroz Threadz hold?"
                answer="Saroz Threadz is SMETA audited under the Sedex Members Ethical Trade Audit, approved under the Better Cotton Initiative, authorised to manufacture for licensed programmes including Disney, and recognised as an export house by the Government of India."
              />
            </div>

            <ul className="mt-14 grid gap-px border border-line bg-line" data-reveal data-delay="80">
              {certifications.map((c) => (
                <li key={c.code} className="flex gap-5 bg-void p-7 lg:p-9">
                  <Check className="mt-1.5 shrink-0 text-signal" />
                  <div>
                    <h3 className="text-d3 !text-[1.15rem] text-white">{c.name}</h3>
                    <p className="text-label mt-2 text-ash">{c.body}</p>
                    <p className="mt-3 text-[0.9375rem] text-smoke">{c.what}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal data-delay="100">
            {siteImage('sustainability') && (
              <Image
                src={siteImage('sustainability')!}
                alt="Hands holding a young plant in soil"
                sizes="(min-width: 1024px) 40vw, 92vw"
                placeholder="blur"
                className="aspect-[4/5] w-full border border-line object-cover"
              />
            )}
            <div className="mt-10">
              <SpecTable
                caption="Audit summary"
                rows={[
                  { label: 'Ethical audit', value: 'SMETA (Sedex)' },
                  { label: 'Cotton programme', value: 'Better Cotton Initiative' },
                  { label: 'Licensed programmes', value: 'Disney authorised' },
                  { label: 'Export status', value: 'Recognised export house' },
                  { label: 'Third-party inspection', value: 'Accommodated on request' },
                ]}
              />
            </div>
            <Link href="/downloads" className="btn mt-9 w-full">
              Request documents <ArrowRight />
            </Link>
          </aside>
        </div>
      </Section>

      <Section invert>
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 lg:items-end">
            <h2 className="text-d1 max-w-[12ch]" data-reveal>
              What we hold ourselves to.
            </h2>
            <p className="prose" data-reveal data-delay="80">
              These are not aspirations. They are conditions of employment and audit points we are
              checked against, inside the scope of our SMETA audit.
            </p>
          </div>
          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
            {labourStandards.map((s, i) => (
              <li key={s.title} className="bg-[var(--color-void)] p-8 lg:p-10" data-reveal data-delay={String(i * 70)}>
                <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-d3 mt-5">{s.title}</h3>
                <p className="mt-4 text-[0.9375rem] text-smoke">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tight>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            {siteImage('community') && (
              <Image
                src={siteImage('community')!}
                alt="Students working together during a community programme supported by the family"
                sizes="(min-width: 1024px) 48vw, 92vw"
                placeholder="blur"
                className="aspect-[4/3] w-full border border-line object-cover"
              />
            )}
          </div>
          <div data-reveal data-delay="80">
            <h2 className="text-d2 max-w-[16ch]">A financially stable, family-owned business.</h2>
            <p className="prose mt-8">
              Saroz Threadz has more than forty years in the fashion and apparel industry. The
              family&apos;s business activities span apparel manufacturing, hospitality, and
              logistics and storage — a diversified foundation that keeps the garment business stable
              through the season cycle.
            </p>
            <p className="prose mt-5">
              We operate with transparency, accountability and integrity, supported by
              internationally recognised standards including SMETA and the Better Cotton Initiative.
            </p>
            <Link href="/sustainability" className="link-arrow mt-9">
              Sustainability <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section tight>
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <h2 className="text-d2 max-w-[12ch]">Compliance questions</h2>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}
    </>
  );
}
