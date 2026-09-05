import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section, SpecTable } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { careerValues, openApplicationAreas } from '@/data/careers';
import { company } from '@/data/company';
import { graph, breadcrumbs } from '@/lib/schema';

const trail = [{ name: 'Careers', href: '/careers' }];

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Work at Saroz Threadz in Sitapura, Jaipur. A third-generation family-run garment factory with SMETA-audited conditions, on-site medical support and dedicated facilities for female workers.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Careers"
        title="Work where the owners are on the floor"
        lede="Saroz Threadz has manufactured in Jaipur for over forty years across three generations of the same family. We hire for the long term, and our working conditions are inside the scope of a third-party SMETA audit rather than a policy document."
        trail={trail}
      />

      <Section>
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {careerValues.map((v, i) => (
              <li key={v.title} className="bg-void p-8 lg:p-12" data-reveal data-delay={String(i * 70)}>
                <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-d3 mt-5">{v.title}</h2>
                <p className="mt-4 text-[0.9375rem] text-smoke">{v.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section invert>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d1 max-w-[13ch]">No vacancies listed. Applications still welcome.</h2>
            <p className="prose mt-8">
              We publish roles here when they are genuinely open — inventing listings wastes
              everyone&apos;s time. In the meantime, we read every open application against the
              functions that actually exist on this floor, and we keep good ones on file.
            </p>
            <p className="prose mt-5">
              Email your CV to{' '}
              <a href={`mailto:${company.contact.primaryEmail}`}>{company.contact.primaryEmail}</a>{' '}
              with the area you are interested in as the subject line.
            </p>
            <a href={`mailto:${company.contact.primaryEmail}?subject=${encodeURIComponent('Open application')}`} className="btn btn-solid-light mt-10">
              Send an application <ArrowRight />
            </a>
          </div>

          <div data-reveal data-delay="80">
            <SpecTable
              caption="Functions on this site"
              rows={openApplicationAreas.map((a) => ({ label: a }))}
            />
            <div className="mt-12">
              <SpecTable
                caption="Conditions"
                rows={[
                  { label: 'Ethical audit', value: 'SMETA (Sedex)' },
                  { label: 'Child labour', value: 'Zero tolerance' },
                  { label: 'On-site', value: 'Canteen, rest areas, medical support' },
                  { label: 'Fire safety', value: 'Systems installed and audited' },
                  { label: 'Women workers', value: 'Dedicated facilities' },
                ]}
              />
            </div>
            <Link href="/compliance" className="link-arrow mt-10">
              How conditions are audited <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
