import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/Icons';
import { faqs, faqTopics, faqsByTopic } from '@/data/faq';
import { graph, breadcrumbs, faqPage } from '@/lib/schema';

const trail = [{ name: 'FAQ', href: '/faq' }];

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Answers on minimum order quantity, capacity, machinery, sampling, fabrics, certifications, export markets and how to start a manufacturing programme with Saroz Threadz in Jaipur.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail), faqPage(faqs)]) }}
      />

      <PageHero
        kicker="FAQ"
        title="Everything buyers ask, answered plainly"
        lede={`${faqs.length} questions, grouped by what you are trying to find out. Where we do not have a figure confirmed, the answer says so rather than guessing.`}
        trail={trail}
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-label border-b border-line pb-3 text-ash">Topics</p>
            <ul className="mt-5 space-y-1">
              {faqTopics.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="group flex items-baseline justify-between gap-3 border-l-2 border-transparent py-2 pl-3 text-[0.9375rem] text-smoke transition-all hover:border-signal hover:text-white"
                  >
                    {t.label}
                    <span className="text-label text-iron">{faqsByTopic(t.id).length}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="link-arrow mt-9">
              Ask something else <ArrowRight />
            </Link>
          </nav>

          <div className="space-y-20">
            {faqTopics.map((topic) => (
              <section key={topic.id} id={topic.id} className="scroll-mt-28">
                <h2 className="text-d2">{topic.label}</h2>
                <p className="mt-4 text-smoke">{topic.blurb}</p>
                <FaqAccordion items={faqsByTopic(topic.id)} className="mt-8" />
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
