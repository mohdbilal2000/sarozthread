import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero, Section, SpecTable, StatRow } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/Icons';
import { company, facility } from '@/data/company';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, faqPage } from '@/lib/schema';
import { siteImage } from '@/lib/images';

const trail = [{ name: 'About', href: '/about' }];

export const metadata: Metadata = {
  title: 'About',
  description:
    'Saroz Threadz Pvt Ltd is a third-generation, family-run apparel manufacturer in Jaipur, India, with over 40 years in fashion garments and a 200,000 sq. ft. facility exporting to four continents.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const pageFaqs = faqsForPage('about');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail), faqPage(pageFaqs)]) }}
      />

      <PageHero
        kicker="The company"
        title="Three generations, one factory floor"
        lede={`${company.legalName} is a third-generation, family-run apparel manufacturing company based in Jaipur, India, with over ${company.yearsInBusiness} years in the garment industry.`}
        trail={trail}
      />

      <StatRow
        className="border-b border-line"
        stats={[
          { value: String(company.yearsInBusiness), sup: '+', label: 'Years in the industry' },
          { value: String(company.generation), sup: 'rd', label: 'Generation, family run' },
          { value: '4', label: 'Continents served' },
          { value: '1', label: 'Site, all processes' },
        ]}
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            {siteImage('factory-floor') && (
              <Image
                src={siteImage('factory-floor')!}
                alt="A machinist at work in the Saroz Threadz factory in Jaipur"
                sizes="(min-width: 1024px) 38vw, 92vw"
                placeholder="blur"
                className="aspect-[4/5] w-full border border-line object-cover"
              />
            )}
            <p className="text-label mt-4 text-ash">Sitapura Industrial Area · Jaipur</p>
          </div>

          <div className="prose text-lede" data-reveal data-delay="80">
            <p>
              With over forty years of experience in the garment industry, we specialise in the
              development and production of fashion garments, with strong expertise in embroidery,
              printing and value-added detailing.
            </p>
            <p>
              Our factory operates in full compliance with international standards and is SMETA
              certified, Better Cotton Initiative approved, and authorised to work with licensed
              programmes including Disney. We are a recognised export house under the Government of
              India.
            </p>
            <p>
              We work closely with global fashion brands, offering reliable manufacturing solutions
              from sampling to bulk production — in North America, South America, Europe and Asia.
            </p>
            <p>
              The company is financially stable and family owned. Beyond apparel, the family&apos;s
              activities span hospitality and logistics and storage, giving the business a
              diversified foundation. We operate with transparency, accountability and integrity,
              and our focus is on long-term partnerships built on trust, consistency and
              reliability.
            </p>
            <blockquote>
              Long-term partnerships built on trust, consistency and reliability.
            </blockquote>
            <p className="text-label !mt-6 text-ash">
              {company.contact.primaryName} — {company.contact.primaryRole}
            </p>
          </div>
        </div>
      </Section>

      <Section invert tight>
        <div className="shell">
          <h2 className="text-d2 max-w-[12ch]" data-reveal>
            At a glance
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-20" data-reveal data-delay="60">
            <SpecTable
              caption="The company"
              rows={[
                { label: 'Legal name', value: company.legalName },
                { label: 'Experience', value: `${company.yearsInBusiness}+ years` },
                { label: 'Ownership', value: 'Family owned, third generation' },
                { label: 'Specialisation', value: 'Woven womenswear with embroidery and print' },
                { label: 'Markets', value: company.markets.map((m) => m.region).join(', ') },
              ]}
            />
            <SpecTable
              caption="The factory"
              rows={[
                { label: 'Location', value: `${company.address.locality}, ${company.address.region}, India` },
                { label: 'Floor area', value: `${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft.` },
                { label: 'Sewing machines', value: String(facility.totalMachines) },
                { label: 'Embroidery', value: 'In house' },
                { label: 'Ethical audit', value: 'SMETA' },
              ]}
            />
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Link href="/about/leadership" className="btn btn-solid-light">
              Leadership <ArrowRight />
            </Link>
            <Link href="/about/clients" className="btn btn-outline !text-white !border-line-strong">
              Clients &amp; markets
            </Link>
          </div>
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section tight>
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <h2 className="text-d2 max-w-[12ch]">About the company</h2>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}
    </>
  );
}
