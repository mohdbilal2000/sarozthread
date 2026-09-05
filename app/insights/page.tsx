import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { getInsights, formatDate } from '@/lib/insights';
import { graph, breadcrumbs } from '@/lib/schema';

const trail = [{ name: 'Insights', href: '/insights' }];

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Sourcing guides written from the factory floor: how MOQ and lead time are actually set, what in-house embroidery changes, and what to ask a garment supplier before you place an order.',
  alternates: { canonical: '/insights' },
};

export default async function InsightsPage() {
  const articles = await getInsights();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Insights"
        title="How this industry actually works"
        lede="Written by the people running the machines, not a content agency. These are the explanations we end up giving buyers on the phone, written down once."
        trail={trail}
      />

      <Section>
        <div className="shell">
          <ul className="border-t border-line">
            {articles.map((a, i) => (
              <li key={a.slug} data-reveal data-delay={String(Math.min(i * 60, 240))}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group grid gap-5 border-b border-line py-10 transition-colors hover:bg-carbon md:grid-cols-[1fr_2fr] md:gap-16 lg:py-14"
                >
                  <div>
                    <span className="text-label text-signal">{a.topic}</span>
                    <p className="text-label mt-3 text-ash">
                      {formatDate(a.published)} · {a.readingMinutes} min
                    </p>
                  </div>
                  <div>
                    <h2 className="text-d2 transition-colors group-hover:text-signal">{a.title}</h2>
                    <p className="mt-5 max-w-[62ch] text-smoke">{a.description}</p>
                    <span className="link-arrow mt-7 inline-flex !border-0 !pb-0 text-ash transition-colors group-hover:text-signal">
                      Read <ArrowRight />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <a href="/rss.xml" className="link-arrow mt-10">
            Subscribe by RSS <ArrowRight />
          </a>
        </div>
      </Section>
    </>
  );
}
