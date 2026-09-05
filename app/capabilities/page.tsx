import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section, SpecTable } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { capabilities } from '@/data/capabilities';
import { facility } from '@/data/company';
import { graph, breadcrumbs, service } from '@/lib/schema';

const trail = [{ name: 'Capabilities', href: '/capabilities' }];

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'What Saroz Threadz can actually do: in-house embroidery, partner printing, CAD pattern making, sampling, bulk production on 655 machines, and inline plus final AQL quality control.',
  alternates: { canonical: '/capabilities' },
};

export default function CapabilitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            breadcrumbs(trail),
            ...capabilities.map((c) =>
              service({ name: c.name, description: c.answer, url: `/capabilities/${c.slug}` }),
            ),
          ]),
        }}
      />

      <PageHero
        kicker="Capabilities"
        title="What this factory can actually do"
        lede="Six processes, and a clear line between the five we own and the one we partner on. A factory that blurs that distinction is usually hiding a subcontractor."
        trail={trail}
        aside={
          <SpecTable
            caption="Ownership"
            rows={[
              { label: 'In house', value: `${facility.inHouse.length} processes` },
              { label: 'With partners', value: 'Printing only' },
              { label: 'Machines', value: String(facility.totalMachines) },
              { label: 'Sites', value: 'One' },
            ]}
          />
        }
      />

      <Section>
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {capabilities.map((c, i) => (
              <li key={c.slug} data-reveal data-delay={String((i % 2) * 70)}>
                <Link
                  href={`/capabilities/${c.slug}`}
                  className="group relative flex h-full flex-col bg-void p-8 transition-colors duration-300 hover:bg-carbon lg:p-12"
                >
                  <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-signal transition-transform duration-500 ease-[var(--ease-industrial)] group-hover:scale-y-100" />
                  <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="text-d2 mt-5 text-white">{c.name}</h2>
                  <p className="mt-6 flex-1 text-smoke">{c.answer}</p>
                  <span className="link-arrow mt-9 self-start !border-0 !pb-0 text-ash transition-colors group-hover:text-signal">
                    Read more <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section invert>
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d1 max-w-[13ch]">Owned, or partnered. Never vague.</h2>
            <p className="prose mt-8">
              Every process below is either done on our own floor in Sitapura or run through a
              long-standing partner under our quality control. Buyers get one point of
              accountability either way — you approve with us, you chase us, and we carry the risk.
            </p>
            <Link href="/factory" className="link-arrow mt-9">
              Factory &amp; machinery <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            <SpecTable
              caption="On our own floor"
              rows={facility.inHouse.map((p) => ({ label: p, value: 'In house' }))}
            />
            <div className="mt-12">
              <SpecTable
                caption="With partners"
                rows={facility.outsourced.map((p) => ({ label: p.process, value: p.note }))}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
