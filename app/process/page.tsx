import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero, Section, NumberedList } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/Icons';
import { processSteps } from '@/data/process';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, howTo, faqPage } from '@/lib/schema';
import { siteImage } from '@/lib/images';

const trail = [{ name: 'How we work', href: '/process' }];

export const metadata: Metadata = {
  title: 'How we work',
  description:
    'The seven steps from first enquiry to shipped bulk production with Saroz Threadz: costing, sampling, fit approval, pre-production sample, bulk, final AQL inspection, and export from Jaipur.',
  alternates: { canonical: '/process' },
};

const NEEDS = [
  'The garment specification — tech pack, sketch, or a physical sample',
  'Estimated quantity per style and per colour',
  'The fabric quality you have in mind',
  'Your target delivery window',
];

export default function ProcessPage() {
  const pageFaqs = faqsForPage('process');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([breadcrumbs(trail), howTo(processSteps), faqPage(pageFaqs)]),
        }}
      />

      <PageHero
        kicker="How we work"
        title="Tech pack to container, in seven steps"
        lede="Each stage has a named owner on our side. You are not passed between departments, and you are told early when something will not work."
        trail={trail}
      />

      <Section>
        <div className="shell">
          <NumberedList
            headingLevel="h2"
            items={processSteps.map((s) => ({ title: s.name, body: s.text, aside: s.detail }))}
          />
        </div>
      </Section>

      <Section invert>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <div data-reveal>
            <h2 className="text-d1 max-w-[13ch]">What we need to quote.</h2>
            <p className="prose mt-8">
              The fastest route to a real number is four things. Send them together and you get a
              costing rather than a chain of follow-up questions.
            </p>
            <ol className="mt-10 border-t border-line">
              {NEEDS.map((need, i) => (
                <li key={need} className="flex gap-6 border-b border-line py-5">
                  <span className="text-label pt-1 text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lede">{need}</span>
                </li>
              ))}
            </ol>
            <Link href="/contact" className="btn mt-10">
              Send a brief <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            {siteImage('sampling') && (
              <Image
                src={siteImage('sampling')!}
                alt="A garment sample being stitched in the Saroz Threadz sampling room"
                sizes="(min-width: 1024px) 48vw, 92vw"
                placeholder="blur"
                className="aspect-[4/3] w-full border border-line object-cover"
              />
            )}
          </div>
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section tight>
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <div>
              <h2 className="text-d2 max-w-[14ch]">Questions about working together</h2>
              <Link href="/faq" className="link-arrow mt-8">
                All questions <ArrowRight />
              </Link>
            </div>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}
    </>
  );
}
