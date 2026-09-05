import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section, SpecTable } from '@/components/blocks';
import { LookGrid } from '@/components/LookGrid';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/Icons';
import { productCategories } from '@/data/products';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, faqPage } from '@/lib/schema';

const trail = [{ name: 'Products', href: '/products' }];

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Womenswear manufactured by Saroz Threadz in Jaipur: dresses, blouses and shirts, tunics and kaftans, jumpsuits and co-ords, resort wear — in cotton, rayon and viscose with embroidery and print.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  const pageFaqs = faqsForPage('products');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail), faqPage(pageFaqs)]) }}
      />

      <PageHero
        kicker="Products"
        title="Woven womenswear, to your specification"
        lede="Light-to-mid-weight cotton, rayon and viscose carrying embroidery, print or other value-added detail. Not knitwear, not denim, not outerwear — and we would rather tell you that than learn on your order."
        trail={trail}
        aside={
          <SpecTable
            caption="Scope"
            rows={[
              { label: 'Categories', value: String(productCategories.length) },
              { label: 'Fabric weight', value: 'Light to mid, wovens' },
              { label: 'Decoration', value: 'Embroidery, print, handwork' },
              { label: 'Not produced', value: 'Knits, denim, outerwear' },
            ]}
          />
        }
      />

      <Section>
        <div className="shell space-y-24 lg:space-y-32">
          {productCategories.map((p, i) => (
            <article key={p.slug} className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20" data-reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-d1 mt-4 max-w-[10ch]">
                  <Link href={`/products/${p.slug}`} className="transition-colors hover:text-signal">
                    {p.name}
                  </Link>
                </h2>
                <p className="prose mt-7">{p.answer}</p>
                <Link href={`/products/${p.slug}`} className="link-arrow mt-9">
                  {p.name} detail <ArrowRight />
                </Link>
              </div>
              <div>
                <LookGrid slugs={p.looks.slice(0, 4)} />
                <div className="mt-12 grid gap-10 sm:grid-cols-2">
                  <SpecTable caption="Fabrics" rows={p.fabrics.map((f) => ({ label: f }))} />
                  <SpecTable caption="Decoration" rows={p.decoration.map((d) => ({ label: d }))} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section tight>
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <h2 className="text-d2 max-w-[12ch]">Product questions</h2>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}
    </>
  );
}
