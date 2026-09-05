import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Section, AnswerBlock, Breadcrumbs } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { getInsight, getInsights, formatDate } from '@/lib/insights';
import { graph, breadcrumbs, article as articleSchema, faqPage } from '@/lib/schema';

export async function generateStaticParams() {
  return (await getInsights()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getInsight(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.description,
      publishedTime: new Date(a.published).toISOString(),
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getInsight(slug);
  if (!a) notFound();

  const others = (await getInsights()).filter((x) => x.slug !== a.slug);
  const trail = [
    { name: 'Insights', href: '/insights' },
    { name: a.title, href: `/insights/${a.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            breadcrumbs(trail),
            articleSchema({
              title: a.title,
              description: a.description,
              url: `/insights/${a.slug}`,
              published: new Date(a.published).toISOString(),
              updated: a.updated ? new Date(a.updated).toISOString() : undefined,
            }),
            a.question ? faqPage([{ q: a.question, a: a.answer, topic: 'working-with-us' }]) : null,
          ]),
        }}
      />

      <article>
        <header className="ruled grain relative border-b border-line pb-14 pt-10 lg:pb-20 lg:pt-16">
          <div className="shell max-w-[60rem]">
            <Breadcrumbs trail={trail} />
            <p className="kicker mt-10">{a.topic}</p>
            <h1 className="text-d1 mt-6">{a.title}</h1>
            <p className="text-label mt-8 text-ash">
              <time dateTime={new Date(a.published).toISOString()}>{formatDate(a.published)}</time>
              {' · '}
              {a.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="shell max-w-[60rem] py-14 lg:py-20">
          {/* The quotable summary, above the body. Self-contained on purpose:
              it is the passage most likely to be lifted whole into an answer. */}
          {a.question && (
            <div className="mb-16">
              <AnswerBlock question={a.question} answer={a.answer} />
            </div>
          )}

          <div className="prose">
            <MDXRemote source={a.body} />
          </div>

          <footer className="mt-16 border-t border-line pt-10">
            <p className="text-smoke">
              Written by the team at Saroz Threadz, a third-generation womenswear manufacturer in
              Jaipur, India.
            </p>
            <Link href="/contact" className="link-arrow mt-7">
              Ask us about your programme <ArrowRight />
            </Link>
          </footer>
        </div>
      </article>

      {others.length > 0 && (
        <Section tight>
          <div className="shell max-w-[60rem]">
            <h2 className="text-d3">More from the floor</h2>
            <ul className="mt-8 border-t border-line">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/insights/${o.slug}`} className="group block py-6">
                    <span className="text-d3 !text-[1.2rem] block transition-colors group-hover:text-signal">
                      {o.title}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] text-smoke">{o.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </>
  );
}
