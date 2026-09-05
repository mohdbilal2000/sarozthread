import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable } from '@/components/blocks';
import { LookGrid } from '@/components/LookGrid';
import { ArrowRight } from '@/components/Icons';
import { productCategories } from '@/data/products';
import { facility } from '@/data/company';
import { graph, breadcrumbs, service } from '@/lib/schema';

export function generateStaticParams() {
  return productCategories.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productCategories.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} manufacturing in Jaipur`,
    description: p.answer,
    alternates: { canonical: `/products/${p.slug}` },
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = productCategories.find((x) => x.slug === slug);
  if (!p) notFound();

  const trail = [
    { name: 'Products', href: '/products' },
    { name: p.name, href: `/products/${p.slug}` },
  ];
  const others = productCategories.filter((x) => x.slug !== p.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            breadcrumbs(trail),
            service({
              name: `${p.name} manufacturing`,
              description: p.answer,
              url: `/products/${p.slug}`,
            }),
          ]),
        }}
      />

      <PageHero kicker="Product category" title={p.name} trail={trail} />

      <Section>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div data-reveal>
              <AnswerBlock question={p.question} answer={p.answer} />
            </div>
            <p className="prose text-lede" data-reveal data-delay="60">
              {p.intro}
            </p>
          </div>

          <div className="mt-16" data-reveal>
            <LookGrid slugs={p.looks} priorityCount={4} />
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-16" data-reveal>
            <SpecTable caption="Constructions" rows={p.constructions.map((c) => ({ label: c }))} />
            <SpecTable caption="Fabric base" rows={p.fabrics.map((f) => ({ label: f }))} />
            <SpecTable caption="Decoration" rows={p.decoration.map((d) => ({ label: d }))} />
          </div>
        </div>
      </Section>

      <Section invert tight>
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d1 max-w-[12ch]">Made on our own machines.</h2>
            <p className="prose mt-8">
              {p.name} are produced on the same floor as everything else we make:{' '}
              {facility.totalMachines} machines across{' '}
              {facility.floorAreaSqFt.toLocaleString('en-US')} square feet in Sitapura Industrial
              Area, Jaipur, with embroidery stitched in house.
            </p>
            <Link href="/factory" className="link-arrow mt-9">
              Factory &amp; machinery <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            <SpecTable
              caption="Production"
              rows={[
                { label: 'Floor area', value: `${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft.` },
                { label: 'Total machines', value: String(facility.totalMachines) },
                { label: 'Embroidery', value: 'In house' },
                { label: 'Printing', value: 'Long-term partner houses' },
                { label: 'Pattern making', value: 'CAD, in house' },
                { label: 'Minimum order quantity', value: 'Quoted per style' },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tight>
        <div className="shell">
          <h2 className="text-d3">Other categories</h2>
          <ul className="mt-7 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/products/${o.slug}`} className="tag">
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/lookbook" className="tag">
                Full lookbook
              </Link>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
