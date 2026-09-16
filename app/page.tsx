import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Section, SectionHead, StatRow, Marquee, Kicker, SpecTable } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { LookGrid, lookImage } from '@/components/LookGrid';
import { ArrowRight, Check, WhatsApp } from '@/components/Icons';
import { company, facility, certifications } from '@/data/company';
import { productCategories } from '@/data/products';
import { faqs } from '@/data/faq';
import { graph, faqPage } from '@/lib/schema';
import { SourcingQualifier } from '@/components/SourcingQualifier';
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
      <section className="border-b border-line bg-canvas">
        <div className="grid lg:grid-cols-[1.02fr_1fr]">
          {/* Copy sits on ivory, not on top of the footage. The garment and the
              floor get their own uncovered half — the whole point of the light
              direction is that you can actually see the product. */}
          <div className="order-2 flex flex-col justify-center px-gutter py-14 lg:order-1 lg:min-h-[82svh] lg:py-20">
            <div className="mx-auto w-full max-w-[38rem] lg:mx-0">
              <p className="text-label flex items-center gap-3 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Jaipur, India &middot; Est. {company.yearsInBusiness}+ years
              </p>

              <h1 className="text-mega mt-6">
                <span className="block overflow-hidden" data-rise>
                  <span>Garments made</span>
                </span>
                <span className="block overflow-hidden" data-rise data-delay="90">
                  <span>right the</span>
                </span>
                <span className="block overflow-hidden" data-rise data-delay="180">
                  <span>
                    first <em className="not-italic text-accent">time</em>.
                  </span>
                </span>
              </h1>

              <p className="text-lede mt-7 max-w-[44ch]" data-reveal data-delay="260">
                A third-generation, family-run womenswear factory in Jaipur. Embroidery, printing and
                value-added detailing — from first sample to shipped bulk, under one roof.
              </p>

              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-delay="320">
                <Link href="/contact" className="btn">
                  Send a tech pack <ArrowRight />
                </Link>
                <a
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <WhatsApp /> WhatsApp {company.contact.primaryName.split(' ')[0]}
                </a>
              </div>

              <p className="mt-5 text-[0.875rem] text-muted" data-reveal data-delay="360">
                Enquiries go straight to {company.contact.primaryName}, who runs the floor — not to
                an agent, and not to a shared inbox.
              </p>

              <ul
                className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-7 sm:grid-cols-4"
                data-reveal
                data-delay="380"
              >
                {[
                  { v: '200,000', l: 'sq. ft. floor' },
                  { v: '655', l: 'machines' },
                  { v: 'In house', l: 'embroidery' },
                  { v: 'SMETA', l: 'audited' },
                ].map((s) => (
                  <li key={s.l}>
                    <span className="text-d3 block text-ink">{s.v}</span>
                    <span className="mt-1 block text-[0.8125rem] text-muted">{s.l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-1 min-h-[58svh] overflow-hidden border-b border-line lg:order-2 lg:min-h-[82svh] lg:border-b-0 lg:border-l">
            <video
              src="/video/atelier.mp4"
              poster="/video/atelier-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Embroidery being stitched in the Saroz Threadz factory in Jaipur"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(16_13_10/0.8),transparent)] px-6 pb-5 pt-16">
              <span className="text-label text-canvas">Embroidery floor, Sitapura</span>
            </figcaption>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          'Woven womenswear',
          'Embroidery in house',
          'SMETA audited',
          'Better Cotton approved',
          'Disney licensed programmes',
          'Govt. of India export house',
          'Buyers on four continents',
          'Third generation, family run',
        ]}
      />

      {/* ================================================================
          QUALIFIER — the first thing a buyer wants answered
          ================================================================ */}
      <Section id="can-you-make-this" tight>
        <div className="shell">
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-16">
            <span className="watermark" aria-hidden>
              ?
            </span>
            <div className="relative" data-reveal>
              <Kicker>Before you write an enquiry</Kicker>
              <h2 className="text-d1 mt-6 max-w-[15ch]">
                Can you <span className="text-accentuate">make</span> this?
              </h2>
            </div>
            <div data-reveal data-delay="80">
              <p className="prose text-lede">
                Most factory websites make you send an enquiry to find out. Three taps and you
                have the answer we would give you on the phone — including a straight no when the
                style belongs in someone else&rsquo;s factory.
              </p>
            </div>
          </div>

          <div className="mt-12" data-reveal data-delay="120">
            <SourcingQualifier />
          </div>
        </div>
      </Section>

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
              <span className="text-label mb-6 block text-muted">01 — Who we are</span>
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
              <figure key={item.cap} className="group relative overflow-hidden bg-mist" data-reveal data-delay={String(i * 90)}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-industrial)] group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(16_13_10/0.88),rgb(16_13_10/0.45)_55%,transparent)] px-5 pb-4 pt-14">
                  <span className="text-label text-canvas">{item.cap}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================
          THE ARGUMENT — why this factory rather than a cheaper quote
          ================================================================ */}
      <Section>
        <div className="shell">
          <SectionHead
            index="02 — Why us"
            kicker="The difference"
            title="Embroidery in house is not a detail. It is the whole argument."
            lede="Most Jaipur factories quoting your embroidered dress will send the embroidery out to a job worker. That single decision is what moves your delivery date — and it is the one thing you cannot see on a quote sheet."
            action={{ href: '/capabilities/embroidery', label: 'How our embroidery runs' }}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="card p-8 lg:p-10" data-reveal>
              <span className="chip !bg-clay !text-ink-soft">The usual arrangement</span>
              <h3 className="text-d2 mt-6">Embroidery goes out.</h3>
              <ul className="mt-7 space-y-4">
                {[
                  'Your styles join a queue you cannot see, behind another brand\u2019s order.',
                  'A delay at the job worker reaches you as a delay, with no warning and no recourse.',
                  'Quality is inspected after the fact \u2014 by which point the panels are cut.',
                  'Nobody owns the problem. The factory blames the job worker; you lose the season.',
                ].map((t) => (
                  <li key={t} className="flex gap-3.5 text-[0.9375rem] text-body">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-stone" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8 lg:p-10" data-reveal data-delay="90">
              <span className="chip">How we run it</span>
              <h3 className="text-d2 mt-6">Embroidery stays on our floor.</h3>
              <ul className="mt-7 space-y-4">
                {[
                  'We schedule it against your delivery date, not someone else\u2019s.',
                  'A sample correction happens the same day, in the same building.',
                  'QC sits between embroidery and sewing \u2014 a fault is caught before assembly.',
                  'One company is accountable for the garment, start to finish. That is us.',
                ].map((t) => (
                  <li key={t} className="flex gap-3.5 text-[0.9375rem] text-ink-soft">
                    <Check className="mt-1.5 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-6 text-[0.9375rem] text-body">
                Printing is the honest exception: it runs at partner houses we have used for
                decades, under our QC. We would rather tell you that than imply we print.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" data-reveal>
            <Link href="/capabilities" className="link-arrow">
              All six capabilities <ArrowRight />
            </Link>
            <span className="text-[0.875rem] text-muted">
              Cutting, sewing, embroidery, pattern making, finishing and packing \u2014 one floor, one team.
            </span>
          </div>
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

          {/* Category tiles carry the garment, not a paragraph about it. A
              sourcing manager scanning for "do they make my product" is
              matching a silhouette, and the first tile is given the weight. */}
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {productCategories.map((p, i) => {
              const img = lookImage(p.hero);
              return (
                <li
                  key={p.slug}
                  className={i === 0 ? 'lg:col-span-2' : ''}
                  data-reveal
                  data-delay={String(Math.min(i * 70, 280))}
                >
                  <Link href={`/products/${p.slug}`} className="group card h-full">
                    <div className={`media media-flush ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                      {img && (
                        <Image
                          src={img}
                          alt={`${p.name} manufactured by Saroz Threadz in Jaipur`}
                          sizes={i === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
                          placeholder="blur"
                        />
                      )}
                      <div className="media-veil">
                        <span className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                          See what we build into it <ArrowRight />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5 lg:p-6">
                      <h3 className={i === 0 ? 'text-d2' : 'text-d3'}>{p.name}</h3>
                      <p className="mt-2.5 text-[0.875rem] text-body">
                        {p.constructions.slice(0, i === 0 ? 3 : 2).join(' · ')}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4" data-reveal>
            <LookGrid
              feature
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
            <span className="text-label mb-6 block text-muted">04 — Compliance</span>
            <h2 className="text-d1 max-w-[11ch]">Audited, not asserted.</h2>
            <p className="prose mt-8">
              Buyers should not have to take a factory&apos;s word for it. Our standards are
              third-party audited, our certifications are current, and the documents are available to
              your compliance team.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/compliance" className="btn btn-invert">
                Compliance <ArrowRight />
              </Link>
              <Link href="/downloads" className="btn btn-outline">
                Documents
              </Link>
            </div>
          </div>

          <ul className="grid gap-px bg-line" data-reveal data-delay="100">
            {certifications.map((c) => (
              <li key={c.code} className="flex gap-5 bg-canvas p-7">
                <Check className="mt-1.5 shrink-0 text-accent" />
                <div>
                  <h3 className="text-d3 !text-[1.05rem]">{c.name}</h3>
                  <p className="text-label mt-1.5 text-muted">{c.body}</p>
                  <p className="mt-3 text-[0.9375rem] text-body">{c.what}</p>
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
            <span className="text-label mb-6 block text-muted">05 — Where we ship</span>
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
                <li key={m.region} className="bg-canvas p-6">
                  <span className="text-d3 !text-[1rem] block text-ink">{m.region}</span>
                  <span className="text-label mt-2 block text-muted">{m.detail}</span>
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
          WHO YOU DEAL WITH — a factory is people, and buyers pick people
          ================================================================ */}
      <Section tight>
        <div className="shell">
          <div className="card grid gap-8 p-8 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-14 lg:p-12">
            <div data-reveal>
              <Kicker>Who picks up</Kicker>
              <h2 className="text-d2 mt-6">
                You will be dealing with{' '}
                <span className="text-accentuate">{company.contact.primaryName.split(' ')[0]}</span>.
              </h2>
              <p className="mt-6 text-[0.9375rem] text-body">
                {company.contact.primaryName}, {company.contact.primaryRole.toLowerCase()} — third
                generation of the family that owns the floor. Not a sales agent, not a trading house
                passing your order on to a factory you never see.
              </p>
            </div>

            <div data-reveal data-delay="80">
              <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
                {[
                  { k: 'Reaches', v: 'The factory directly' },
                  { k: 'Working hours', v: company.contact.timezone },
                  { k: 'Fastest route', v: 'WhatsApp — how our desk runs' },
                  { k: 'For a costing', v: 'Tech pack, quantity, delivery window' },
                ].map((row) => (
                  <div key={row.k} className="bg-canvas p-5">
                    <dt className="text-label text-muted">{row.k}</dt>
                    <dd className="mt-2 text-[0.9375rem] text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <WhatsApp /> Message {company.contact.primaryName.split(' ')[0]}
                </a>
                <a href={`tel:${company.contact.phoneE164}`} className="btn btn-outline">
                  {company.contact.phoneDisplay}
                </a>
              </div>
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
