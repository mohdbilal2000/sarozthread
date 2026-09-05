import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero, Section, AnswerBlock, SpecTable, NumberedList } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { qualityGates, sampleTypes } from '@/data/quality';
import { graph, breadcrumbs, service } from '@/lib/schema';

const trail = [{ name: 'Quality', href: '/quality' }];

export const metadata: Metadata = {
  title: 'Quality assurance',
  description:
    'How Saroz Threadz controls quality: fabric inward inspection, cutting checks, inline inspection during sewing, decoration checks against the approved strike-off, measurement control and final AQL inspection.',
  alternates: { canonical: '/quality' },
};

export default function QualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            breadcrumbs(trail),
            service({
              name: 'Garment quality assurance',
              description:
                'Inline and final AQL quality control on womenswear production, with third-party inspection accommodated.',
              url: '/quality',
            }),
          ]),
        }}
      />

      <PageHero
        kicker="Quality"
        title="Six gates, not one inspection at the end"
        lede="Final inspection detects defects. Inline inspection prevents them. A factory that only checks at the end has chosen to discover its problems at the point they are most expensive to fix — which is usually the point at which a shipment slips."
        trail={trail}
        aside={
          <SpecTable
            caption="Control points"
            rows={[
              { label: 'Quality gates', value: String(qualityGates.length) },
              { label: 'Inline inspection', value: 'Yes, during sewing' },
              { label: 'Final inspection', value: "AQL, to buyer's standard" },
              { label: 'Third-party audit', value: 'Accommodated on site' },
            ]}
          />
        }
      />

      <Section>
        <div className="shell">
          <div data-reveal>
            <AnswerBlock
              question="How do you control quality?"
              answer="Quality at Saroz Threadz is checked at six points, not one. Fabric is inspected on arrival, cutting is checked against the approved pattern, construction is inspected inline during sewing, decoration is checked against the approved strike-off, garments are measured across the size set, and a final AQL inspection runs before packing."
            />
          </div>

          <div className="mt-16">
            <NumberedList
              items={qualityGates.map((g) => ({ title: g.stage, body: g.what, aside: g.detail }))}
            />
          </div>
        </div>
      </Section>

      <Section invert>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d1 max-w-[12ch]">The sample is the contract.</h2>
            <p className="prose mt-8">
              Every stage of production is measured against an approved sample, and the
              pre-production sample is the one that matters. It is made in bulk fabric, bulk trims
              and bulk decoration, and sealed before a line is loaded. Everything after that is
              checked against it — including the final inspection.
            </p>
            <Link href="/process" className="link-arrow mt-9">
              The full order process <ArrowRight />
            </Link>
          </div>
          <div data-reveal data-delay="80">
            <SpecTable
              caption="Sample types"
              rows={sampleTypes.map((s) => ({ label: s.name, value: s.purpose }))}
            />
          </div>
        </div>
      </Section>

      <Section tight>
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="text-d2 max-w-[14ch]">Third-party inspection is welcome, not tolerated.</h2>
          </div>
          <div data-reveal data-delay="80">
            <p className="prose">
              Buyer-appointed inspection agencies — SGS, Bureau Veritas, Intertek, or a brand&apos;s
              own QA team — are accommodated on site. So are social compliance auditors. We make room
              for them rather than negotiating about access, which is the only posture that makes
              sense for a factory that is already SMETA audited.
            </p>
            <Link href="/compliance" className="link-arrow mt-9">
              Compliance &amp; certifications <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
