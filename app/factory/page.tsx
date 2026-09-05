import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable, StatRow } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/Icons';
import { company, facility, formattedAddress, mapsUrl } from '@/data/company';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, faqPage } from '@/lib/schema';
import { siteImage } from '@/lib/images';

const trail = [{ name: 'Factory', href: '/factory' }];

export const metadata: Metadata = {
  title: 'Factory & machinery',
  description:
    'Saroz Threadz operates a 200,000 sq. ft. facility in Sitapura Industrial Area, Jaipur, with 655 sewing machines: 600 single-needle lockstitch UBT, 45 overlock and 10 flatlock, plus in-house embroidery and CAD.',
  alternates: { canonical: '/factory' },
};

export default function FactoryPage() {
  const pageFaqs = faqsForPage('factory');
  const gallery = [
    { name: 'factory-floor', alt: 'Machinist working at a sewing station on the Saroz Threadz production floor', cap: 'Sewing' },
    { name: 'embroidery', alt: 'Embroidery being stitched onto patterned fabric', cap: 'Embroidery' },
    { name: 'cad', alt: 'Pattern development work in the Saroz Threadz sampling room', cap: 'Pattern room' },
    { name: 'quality', alt: 'A finished garment being checked at Saroz Threadz', cap: 'Finishing' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail), faqPage(pageFaqs)]) }}
      />

      <PageHero
        kicker="The factory"
        title="200,000 sq. ft. and a machine list we put in writing"
        lede="The machine mix tells a buyer what a factory is genuinely built for. Ours is weighted heavily to single-needle lockstitch, because light-to-mid-weight woven womenswear with handwork is what we do."
        trail={trail}
      />

      <StatRow
        className="border-b border-line"
        stats={[
          { value: facility.floorAreaSqFt.toLocaleString('en-US'), label: 'Sq. ft. production floor' },
          { value: String(facility.totalMachines), label: 'Sewing machines' },
          { value: '600', label: 'Single-needle lockstitch UBT' },
          { value: '1', label: 'Site, all processes' },
        ]}
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div data-reveal>
            <AnswerBlock
              question="What is your production capacity?"
              answer={`Saroz Threadz runs ${facility.totalMachines} machines across a ${facility.floorAreaSqFt.toLocaleString('en-US')} square foot facility in Jaipur: 600 single-needle lockstitch UBT machines, 45 four-thread and five-thread overlock machines, and 10 flatlock machines. Lines are arranged for flexible changeovers on short and mid-size runs.`}
            />
            <p className="prose mt-12">
              Monthly output depends entirely on the style mix. A heavily embroidered tiered dress
              and a plain blouse consume very different line time, so a single &ldquo;pieces per
              month&rdquo; figure would be misleading for one of them. We give a capacity figure
              against your actual styles and season instead.
            </p>
            <Link href="/contact" className="link-arrow mt-9">
              Ask for a capacity assessment <ArrowRight />
            </Link>
          </div>

          <div data-reveal data-delay="80">
            <SpecTable
              caption="Sewing machinery"
              rows={facility.machines.map((m) => ({ label: m.type, value: String(m.count) }))}
            />
            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ash">
              UBT: under-bed thread trimmer. Overlock covers both four- and five-thread machines.
            </p>
            <div className="mt-12">
              <SpecTable
                caption="Facility"
                rows={[
                  {
                    label: 'Floor area',
                    value: `${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft. (≈${facility.floorAreaSqM.toLocaleString('en-US')} sq. m.)`,
                  },
                  { label: 'Location', value: `${company.address.locality}, ${company.address.region}, India` },
                  { label: 'Monthly capacity', value: 'On request, against your style mix' },
                  { label: 'Minimum order quantity', value: 'Quoted per style' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <section className="border-t border-line">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g, i) => {
            const img = siteImage(g.name);
            if (!img) return null;
            return (
              <li key={g.name} className="group relative overflow-hidden bg-carbon" data-reveal data-delay={String(i * 80)}>
                <Image
                  src={img}
                  alt={g.alt}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-industrial)] group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/70 to-transparent px-5 pb-4 pt-14">
                  <span className="text-label text-white">{g.cap}</span>
                </figcaption>
              </li>
            );
          })}
        </ul>
      </section>

      <Section invert>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d1 max-w-[13ch]">In house, or with a partner. Always stated.</h2>
            <p className="prose mt-8">
              Every process on this list happens on our own floor except printing, which runs through
              printing houses in the Jaipur region we have worked with for decades. You still deal
              only with us: we manage the strike-offs, the colour approval and the quality risk.
            </p>
            <Link href="/capabilities" className="link-arrow mt-9">
              All capabilities <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            <SpecTable caption="In house" rows={facility.inHouse.map((p) => ({ label: p, value: 'Own floor' }))} />
            <div className="mt-12">
              <SpecTable
                caption="With partners"
                rows={facility.outsourced.map((o) => ({ label: o.process, value: o.note }))}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tight>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d2 max-w-[12ch]">Where we are</h2>
            <address className="text-lede mt-8 space-y-1 not-italic text-chalk">
              {formattedAddress.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <p className="prose mt-8">
              Sitapura Industrial Area is Jaipur&apos;s dedicated garment zone and sits a short drive
              from Jaipur International Airport. Buyers are welcome — give us notice and we will
              arrange a floor walk-through and a sample review.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn">
                Arrange a visit <ArrowRight />
              </Link>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Open in Maps
              </a>
            </div>
          </div>
          <div data-reveal data-delay="80">
            {siteImage('team') && (
              <Image
                src={siteImage('team')!}
                alt="The Saroz Threadz team at work in Jaipur"
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
            <h2 className="text-d2 max-w-[12ch]">Factory questions</h2>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}
    </>
  );
}
