import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Section, SectionHead, StatRow, Marquee, Kicker, SpecTable } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { LookGrid } from '@/components/LookGrid';
import { ArrowRight, ArrowDown, Check } from '@/components/Icons';
import { company, facility, certifications } from '@/data/company';
import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';
import { faqs } from '@/data/faq';
import { graph, faqPage } from '@/lib/schema';
import factoryFloor from '@/assets/site/factory-floor.jpg';
import embroideryImg from '@/assets/site/embroidery.jpg';
import cadImg from '@/assets/site/cad.jpg';

export const metadata: Metadata = {
  title: 'Saroz Threadz — Womenswear Manufacturer in Jaipur, India',
  description:
    'Third-generation womenswear manufacturer in Jaipur. 200,000 sq. ft., 655 machines, embroidery in house, SMETA audited and Better Cotton approved. Tech pack to bulk production for global brands.',
  alternates: { canonical: '/' },
};

const HOME_FAQ_KEYS = [
  'What garments do you manufacture?',
  'How many machines does the factory have?',
  'Is embroidery done in house or subcontracted?',
  'What is your minimum order quantity?',
  'What certifications does Saroz Threadz hold?',
  'How do I start working with Saroz Threadz?',
];

export default function HomePage() {
  const homeFaqs = faqs.filter((f) => HOME_FAQ_KEYS.includes(f.q));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([faqPage(homeFaqs)]) }}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative min-h-[92svh] overflow-hidden border-b border-line bg-void">
        <div className="absolute inset-0">
          <video
            src="/video/atelier.mp4"
            poster="/video/atelier-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Embroidery being stitched in the Saroz Threadz factory in Jaipur"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-void)_2%,rgb(7_7_8/0.5)_45%,rgb(7_7_8/0.75)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-void)_0%,rgb(7_7_8/0.55)_45%,transparent_75%)]" />
        </div>

        <div className="ruled relative flex min-h-[92svh] flex-col justify-end">
          <div className="shell pb-14 pt-32 lg:pb-20">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 animate-pulse bg-signal" />
              <p className="text-label text-chalk">
                Jaipur, India — Sitapura Garment Zone — Est. {company.yearsInBusiness}+ years
              </p>
            </div>

            <h1 className="text-mega mt-8 max-w-[13ch] text-white">
              <span className="block overflow-hidden" data-rise>
                <span>Garments</span>
              </span>
              <span className="block overflow-hidden" data-rise data-delay="90">
                <span>made <span className="text-signal">right</span></span>
              </span>
              <span className="block overflow-hidden" data-rise data-delay="180">
                <span>the first time</span>
              </span>
            </h1>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
              <p className="text-lede max-w-[46ch] text-chalk" data-reveal data-delay="260">
                A third-generation, family-run womenswear factory. Embroidery, printing and
                value-added detailing — from first sample to shipped bulk, under one roof.
              </p>
              <div className="flex flex-wrap gap-3 lg:justify-end" data-reveal data-delay="320">
                <Link href="/contact" className="btn">
                  Request a quote <ArrowRight />
                </Link>
                <Link href="/factory" className="btn btn-outline">
                  Factory &amp; capacity
                </Link>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-3 text-ash">
              <ArrowDown className="animate-bounce" />
              <span className="text-label">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          '200,000 SQ. FT.',
          '655 MACHINES',
          'EMBROIDERY IN HOUSE',
          'SMETA AUDITED',
          'BETTER COTTON APPROVED',
          'DISNEY LICENSED PROGRAMMES',
          'GOVT. OF INDIA EXPORT HOUSE',
          '4 CONTINENTS',
        ]}
      />

      {/* ================================================================
          NUMBERS
          ================================================================ */}
      <StatRow
        className="border-b border-line"
        stats={[
          { value: String(company.yearsInBusiness), sup: '+', label: 'Years manufacturing' },
          { value: facility.floorAreaSqFt.toLocaleString('en-US'), label: 'Sq. ft. of floor' },
          { value: String(facility.totalMachines), label: 'Sewing machines' },
          { value: String(company.generation), sup: 'rd', label: 'Generation, family owned' },
        ]}
      />

      {/* ================================================================
          POSITION
          ================================================================ */}
      <Section>
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div data-reveal>
              <span className="text-label mb-6 block text-ash">01 — Who we are</span>
              <h2 className="text-d1 max-w-[12ch]">
                One family. One floor. Forty years.
              </h2>
            </div>
            <div data-reveal data-delay="80">
              <p className="prose text-lede">
                {company.legalName} has manufactured fashion garments in Jaipur for over four
                decades, now under its third generation. We specialise in womenswear with real
                handwork content — embroidery, print, and the finishing detail that makes a garment
                look more expensive than it costs.
              </p>
              <p className="prose mt-6">
                Our factory operates in full compliance with international standards: SMETA audited,
                approved under the Better Cotton Initiative, authorised for licensed programmes
                including Disney, and recognised as an export house by the Government of India.
              </p>
              <Link href="/about" className="link-arrow mt-9">
                The company <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              { img: factoryFloor, alt: 'A machinist finishing a garment on the Saroz Threadz production floor', cap: 'Sewing floor' },
              { img: embroideryImg, alt: 'Close-up of embroidery being stitched onto patterned fabric', cap: 'Embroidery, in house' },
              { img: cadImg, alt: 'Pattern development work in the Saroz Threadz sampling room', cap: 'Pattern room' },
            ].map((item, i) => (
              <figure key={item.cap} className="group relative overflow-hidden bg-carbon" data-reveal data-delay={String(i * 90)}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-industrial)] group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/70 to-transparent px-5 pb-4 pt-14">
                  <span className="text-label text-white">{item.cap}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================
          CAPABILITIES
          ================================================================ */}
      <Section>
        <div className="shell">
          <SectionHead
            index="02 — What we do"
            kicker="Capabilities"
            title="Six disciplines. One accountable team."
            lede="You brief one factory, not a chain of subcontractors. Cutting, sewing, embroidery, pattern making, finishing and packing happen on our own floor. Printing runs through partner houses we have used for decades — and we say which is which."
            action={{ href: '/capabilities', label: 'All capabilities' }}
          />

          <ul className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <li key={c.slug} data-reveal data-delay={String((i % 3) * 70)}>
                <Link
                  href={`/capabilities/${c.slug}`}
                  className="group relative flex h-full flex-col bg-void p-8 transition-colors duration-300 hover:bg-carbon lg:p-10"
                >
                  <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-signal transition-transform duration-500 ease-[var(--ease-industrial)] group-hover:scale-y-100" />
                  <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-d3 mt-5 text-white">{c.name}</h3>
                  <p className="mt-4 flex-1 text-[0.9375rem] text-smoke">
                    {c.answer.split('. ').slice(0, 2).join('. ')}.
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash transition-colors group-hover:text-signal">
                    Detail <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ================================================================
          PRODUCTS
          ================================================================ */}
      <Section>
        <div className="shell">
          <SectionHead
            index="03 — What we make"
            kicker="Products"
            title="Woven womenswear, built around handwork."
            lede="Dresses, blouses and shirts, tunics and kaftans, jumpsuits and co-ords, resort. In cotton, rayon and viscose — developed to your tech pack or adapted from our range."
            action={{ href: '/products', label: 'All categories' }}
          />

          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {productCategories.map((p) => (
              <li key={p.slug} className="bg-void" data-reveal>
                <Link href={`/products/${p.slug}`} className="group block h-full p-7 transition-colors hover:bg-carbon">
                  <h3 className="text-d3 !text-[1.1rem] text-white">{p.name}</h3>
                  <p className="mt-3 text-[0.8125rem] text-ash">
                    {p.constructions.slice(0, 2).join(' · ')}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    View <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4" data-reveal>
            <LookGrid
              slugs={[
                'hand-embroidered-tunic',
                'printed-maxi-dress',
                'oversized-poplin-shirt',
                'tiered-ruffle-dress',
                'embroidered-blouse',
                'printed-jumpsuit',
                'tiered-midi-dress',
                'placket-embroidered-shirt',
              ]}
            />
          </div>

          <Link href="/lookbook" className="link-arrow mt-10">
            Full lookbook <ArrowRight />
          </Link>
        </div>
      </Section>

      {/* ================================================================
          COMPLIANCE
          ================================================================ */}
      <Section invert>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div data-reveal>
            <span className="text-label mb-6 block text-ash">04 — Compliance</span>
            <h2 className="text-d1 max-w-[11ch]">Audited, not asserted.</h2>
            <p className="prose mt-8">
              Buyers should not have to take a factory&apos;s word for it. Our standards are
              third-party audited, our certifications are current, and the documents are available to
              your compliance team.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/compliance" className="btn btn-solid-light">
                Compliance <ArrowRight />
              </Link>
              <Link href="/downloads" className="btn btn-outline !text-white !border-line-strong">
                Documents
              </Link>
            </div>
          </div>

          <ul className="grid gap-px bg-line" data-reveal data-delay="100">
            {certifications.map((c) => (
              <li key={c.code} className="flex gap-5 bg-void p-7">
                <Check className="mt-1.5 shrink-0 text-signal" />
                <div>
                  <h3 className="text-d3 !text-[1.05rem]">{c.name}</h3>
                  <p className="text-label mt-1.5 text-ash">{c.body}</p>
                  <p className="mt-3 text-[0.9375rem] text-smoke">{c.what}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ================================================================
          MARKETS
          ================================================================ */}
      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <span className="text-label mb-6 block text-ash">05 — Where we ship</span>
            <h2 className="text-d1 max-w-[12ch]">Brands on four continents.</h2>
            <p className="prose mt-8">
              We export to buyers in North America, South America, Europe and Asia, handling
              documentation, inspection and logistics coordination in house from Jaipur as a
              Government of India recognised export house.
            </p>
            <Link href="/about/clients" className="link-arrow mt-9">
              Clients &amp; markets <ArrowRight />
            </Link>
          </div>

          <div data-reveal data-delay="80">
            <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {company.markets.map((m) => (
                <li key={m.region} className="bg-void p-6">
                  <span className="text-d3 !text-[1rem] block text-white">{m.region}</span>
                  <span className="text-label mt-2 block text-ash">{m.detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <SpecTable
                caption="At a glance"
                rows={[
                  { label: 'Specialisation', value: 'Woven womenswear with embroidery and print' },
                  { label: 'Not our floor', value: 'Knitwear, denim, structured outerwear' },
                  { label: 'Printing', value: 'Long-term partner houses, our QC' },
                  { label: 'Minimum order quantity', value: 'Quoted per style — ask' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================
          FAQ
          ================================================================ */}
      <Section tight>
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div data-reveal>
            <Kicker>Common questions</Kicker>
            <h2 className="text-d2 mt-6 max-w-[12ch]">What buyers ask first.</h2>
            <Link href="/faq" className="link-arrow mt-8">
              All {faqs.length} answers <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            <FaqAccordion items={homeFaqs} />
          </div>
        </div>
      </Section>
    </>
  );
}
