import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/blocks';
import { LookGrid } from '@/components/LookGrid';
import { ArrowRight } from '@/components/Icons';
import { looks, productCategories } from '@/data/products';
import { graph, breadcrumbs } from '@/lib/schema';

const trail = [{ name: 'Lookbook', href: '/lookbook' }];

export const metadata: Metadata = {
  title: 'Lookbook',
  description:
    'Garments produced by Saroz Threadz in Jaipur — dresses, blouses, tunics and jumpsuits in cotton, rayon and viscose with in-house embroidery and partner-printed bases.',
  alternates: { canonical: '/lookbook' },
};

export default function LookbookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Lookbook"
        title="Garments off this floor"
        lede="Every piece here started as a tech pack or a reference sample. We develop to brand specification rather than selling a fixed catalogue, so treat this as evidence of capability, not a range to order from."
        trail={trail}
      />

      <Section>
        <div className="shell">
          <LookGrid slugs={Object.keys(looks)} priorityCount={4} />
        </div>
      </Section>

      <Section tight>
        <div className="shell">
          <h2 className="text-d3">Browse by category</h2>
          <ul className="mt-7 flex flex-wrap gap-2">
            {productCategories.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="tag">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/products" className="link-arrow mt-10">
            All product categories <ArrowRight />
          </Link>
        </div>
      </Section>
    </>
  );
}
