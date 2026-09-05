import type { Metadata } from 'next';
import { PageHero, Section, SpecTable } from '@/components/blocks';
import { FaqAccordion } from '@/components/FaqAccordion';
import { EnquiryForm } from '@/components/EnquiryForm';
import { company, formattedAddress, mapsUrl } from '@/data/company';
import { faqsForPage } from '@/data/faq';
import { graph, breadcrumbs, faqPage } from '@/lib/schema';

const trail = [{ name: 'Contact', href: '/contact' }];

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${company.contact.primaryName} at ${company.legalName}, Sitapura Industrial Area, Jaipur. Send a tech pack for a costing and a sampling plan. Phone ${company.contact.phoneDisplay}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const pageFaqs = faqsForPage('contact');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail), faqPage(pageFaqs)]) }}
      />

      <PageHero
        kicker="Contact"
        title="Tell us what you want made"
        lede="The fastest route to a costing is a tech pack, a target quantity and a delivery window. Enquiries reach the factory directly — there is no queue between you and the people who run it."
        trail={trail}
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div data-reveal>
            <h2 className="text-d2 max-w-[12ch]">Direct contacts</h2>

            <dl className="mt-10 border-t border-line">
              <div className="border-b border-line py-6">
                <dt className="text-label text-ash">Business contact</dt>
                <dd className="text-lede mt-3 text-white">{company.contact.primaryName}</dd>
                <dd className="mt-2">
                  <a href={`tel:${company.contact.phoneE164}`} className="font-mono text-[0.9375rem] text-chalk hover:text-signal">
                    {company.contact.phoneDisplay}
                  </a>
                </dd>
                <dd className="mt-1">
                  <a href={`mailto:${company.contact.primaryEmail}`} className="font-mono text-[0.9375rem] text-chalk hover:text-signal">
                    {company.contact.primaryEmail}
                  </a>
                </dd>
              </div>
              <div className="border-b border-line py-6">
                <dt className="text-label text-ash">Trade &amp; sampling</dt>
                <dd className="mt-3">
                  <a href={`mailto:${company.contact.tradeEmail}`} className="font-mono text-[0.9375rem] text-chalk hover:text-signal">
                    {company.contact.tradeEmail}
                  </a>
                </dd>
              </div>
              <div className="border-b border-line py-6">
                <dt className="text-label text-ash">Factory</dt>
                <dd className="mt-3">
                  <address className="space-y-0.5 not-italic leading-relaxed text-chalk">
                    {formattedAddress.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>
                </dd>
              </div>
              <div className="border-b border-line py-6">
                <dt className="text-label text-ash">Time zone</dt>
                <dd className="mt-3 text-chalk">{company.contact.timezone}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${company.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                WhatsApp
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Open in Maps
              </a>
            </div>

            <div className="mt-14 border-t border-line pt-10">
              <h3 className="text-d3">Visiting the factory</h3>
              <p className="prose mt-5">
                Sitapura Industrial Area is Jaipur&apos;s garment zone, a short drive from Jaipur
                International Airport. Let us know when you are travelling and we will arrange a
                floor walk-through and a sample review.
              </p>
            </div>
          </div>

          <div data-reveal data-delay="80">
            <div className="border border-line bg-carbon p-7 lg:p-10">
              <h2 className="text-d3">Request a quote</h2>
              <p className="mt-4 text-[0.9375rem] text-smoke">
                The four required fields are what we need to give you a real number rather than a
                range.
              </p>
              <div className="mt-9">
                <EnquiryForm />
              </div>
            </div>

            <div className="mt-10">
              <SpecTable
                caption="What speeds this up"
                rows={[
                  { label: 'Specification', value: 'Tech pack, sketch or sample' },
                  { label: 'Quantity', value: 'Per style and per colour' },
                  { label: 'Fabric', value: 'Quality or swatch reference' },
                  { label: 'Timing', value: 'Target delivery window' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section tight>
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
            <h2 className="text-d2 max-w-[12ch]">Before you write</h2>
            <FaqAccordion items={pageFaqs} />
          </div>
        </Section>
      )}
    </>
  );
}
