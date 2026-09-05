import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { company, clientPosition } from '@/data/company';
import { graph, breadcrumbs } from '@/lib/schema';

const trail = [
  { name: 'About', href: '/about' },
  { name: 'Clients & markets', href: '/about/clients' },
];

export const metadata: Metadata = {
  title: 'Clients & markets',
  description:
    'Saroz Threadz manufactures for global fashion brands across North America, South America, Europe and Asia, including Disney-licensed programmes. Named references available under NDA.',
  alternates: { canonical: '/about/clients' },
};

export default function ClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Clients & markets"
        title="Who we make for, and where it ships"
        lede={clientPosition.detail}
        trail={trail}
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div data-reveal>
            <AnswerBlock
              question="Which countries does Saroz Threadz export to?"
              answer="Saroz Threadz exports to buyers in North America, South America, Europe and Asia, and is a Government of India recognised export house. Export documentation and logistics coordination are handled in house from Jaipur rather than through an agent."
            />
            <p className="prose mt-12">
              Private-label manufacturing runs on discretion. Most of our buyers ask not to be named
              publicly, and we respect that — a factory that publishes its client list without
              permission is telling you what it will do with yours. References are provided to
              serious enquiries under NDA.
            </p>
            <Link href="/contact" className="link-arrow mt-9">
              Request references <ArrowRight />
            </Link>
          </div>

          <div data-reveal data-delay="80">
            <SpecTable caption="Position" rows={clientPosition.programmes} />
          </div>
        </div>
      </Section>

      <Section invert>
        <div className="shell">
          <h2 className="text-d1 max-w-[12ch]" data-reveal>
            Four continents.
          </h2>
          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {company.markets.map((m, i) => (
              <li key={m.region} className="bg-[var(--color-void)] p-8 lg:p-10" data-reveal data-delay={String(i * 70)}>
                <span className="text-num block text-[clamp(2rem,4vw,3rem)] text-signal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-d3 mt-6">{m.region}</h3>
                <p className="text-label mt-3 text-ash">{m.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
