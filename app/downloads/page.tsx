import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { documents, company } from '@/data/company';
import { graph, breadcrumbs } from '@/lib/schema';

const trail = [{ name: 'Documents', href: '/downloads' }];

export const metadata: Metadata = {
  title: 'Documents',
  description:
    'Factory profile, SMETA audit summary, Better Cotton membership and export house recognition for Saroz Threadz — available to buyers and compliance teams on request.',
  alternates: { canonical: '/downloads' },
};

export default function DownloadsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Documents"
        title="What your compliance team will ask for"
        lede="These are the documents a buyer's due-diligence process needs. We send them on request rather than posting audit reports publicly — they contain information that is ours and our workers' to control."
        trail={trail}
      />

      <Section>
        <div className="shell">
          <ul className="border-t border-line">
            {documents.map((doc, i) => (
              <li
                key={doc.name}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-[4rem_1fr_auto] md:items-center md:gap-10"
                data-reveal
                data-delay={String(i * 60)}
              >
                <span className="text-label text-signal">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="text-d3 !text-[1.2rem]">{doc.name}</h2>
                  <p className="mt-2 text-[0.9375rem] text-smoke">{doc.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-label text-ash">{doc.kind}</span>
                  <a
                    href={`mailto:${company.contact.tradeEmail}?subject=${encodeURIComponent(`Document request — ${doc.name}`)}`}
                    className="btn !px-5 !py-3"
                  >
                    Request
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <p className="prose mt-12 text-[0.9375rem]">
            Requests go straight to{' '}
            <a href={`mailto:${company.contact.tradeEmail}`}>{company.contact.tradeEmail}</a>. If you
            need a completed supplier questionnaire in your own template, send it over and we will
            fill it in.
          </p>
          <Link href="/compliance" className="link-arrow mt-9">
            What each certification covers <ArrowRight />
          </Link>
        </div>
      </Section>
    </>
  );
}
