import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/Icons';
import { capabilities } from '@/data/capabilities';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, service, faqPage } from '@/lib/schema';
import { siteImage } from '@/lib/images';

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.answer,
    alternates: { canonical: `/capabilities/${c.slug}` },
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) notFound();

  const pageFaqs = faqsForPage(`capabilities/${c.slug}`);
  const trail = [
    { name: 'Capabilities', href: '/capabilities' },
    { name: c.name, href: `/capabilities/${c.slug}` },
  ];
  const others = capabilities.filter((x) => x.slug !== c.slug);
  const img = siteImage(c.image);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            breadcrumbs(trail),
            service({ name: c.name, description: c.answer, url: `/capabilities/${c.slug}` }),
            faqPage(pageFaqs),
          ]),
        }}
      />

      <PageHero kicker="Capability" title={c.name} trail={trail} />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <div data-reveal>
              <AnswerBlock question={c.question} answer={c.answer} />
            </div>
            <p className="prose text-lede mt-12" data-reveal data-delay="60">
              {c.intro}
            </p>

            <ul className="mt-14 grid gap-px border border-line bg-line" data-reveal data-delay="100">
              {c.bullets.map((b, i) => (
                <li key={b.title} className="grid gap-3 bg-void p-7 md:grid-cols-[3rem_1fr] md:gap-6 lg:p-9">
                  <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-d3 !text-[1.15rem] text-white">{b.title}</h3>
                    <p className="mt-3 text-[0.9375rem] text-smoke">{b.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal data-delay="80">
            {img && (
              <Image
                src={img}
                alt={c.imageAlt}
                sizes="(min-width: 1024px) 34vw, 92vw"
                placeholder="blur"
                className="aspect-[4/5] w-full border border-line object-cover"
              />
            )}
            <div className="mt-10">
              <SpecTable caption={`${c.name} — at a glance`} rows={c.specs} />
            </div>
            <Link href="/contact" className="btn mt-9 w-full">
              Ask about {c.name.toLowerCase()} <ArrowRight />
            </Link>
          </aside>
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section tight>
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <h2 className="text-d2 max-w-[14ch]">Questions about {c.name.toLowerCase()}</h2>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}

      <Section tight>
        <div className="shell">
          <h2 className="text-d3">Other capabilities</h2>
          <ul className="mt-7 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/capabilities/${o.slug}`} className="tag">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/process" className="link-arrow mt-10">
            The full order process <ArrowRight />
          </Link>
        </div>
      </Section>
    </>
  );
}
