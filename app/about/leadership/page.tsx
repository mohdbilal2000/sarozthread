import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/blocks';
import { ArrowRight } from '@/components/Icons';
import { company, leadership } from '@/data/company';
import { graph, breadcrumbs } from '@/lib/schema';
import { siteImage } from '@/lib/images';

const trail = [
  { name: 'About', href: '/about' },
  { name: 'Leadership', href: '/about/leadership' },
];

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'The people who run Saroz Threadz. A third-generation family business where the owners are on site and buyers deal with them directly rather than an account-management layer.',
  alternates: { canonical: '/about/leadership' },
};

export default function LeadershipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbs(trail)]) }}
      />

      <PageHero
        kicker="Leadership"
        title="The owners are in the building"
        lede="This is a family business in its third generation, not a managed asset. When you raise a problem, it reaches someone with the authority to fix it on the same day."
        trail={trail}
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div data-reveal>
            {siteImage('team') && (
              <Image
                src={siteImage('team')!}
                alt="The Saroz Threadz team at work in Jaipur"
                sizes="(min-width: 1024px) 42vw, 92vw"
                placeholder="blur"
                className="aspect-[4/5] w-full border border-line object-cover"
              />
            )}
          </div>

          <div data-reveal data-delay="80">
            <ul className="border-t border-line">
              {leadership.map((person) => (
                <li key={person.name} className="border-b border-line py-10">
                  <h2 className="text-d2">{person.name}</h2>
                  <p className="text-label mt-3 text-signal">{person.role}</p>
                  <p className="text-label mt-1 text-ash">{person.focus}</p>
                  <p className="prose mt-6">{person.bio}</p>
                  <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.8125rem]">
                    <a href={`mailto:${person.email}`} className="text-chalk hover:text-signal">
                      {person.email}
                    </a>
                    <a href={`tel:${company.contact.phoneE164}`} className="text-chalk hover:text-signal">
                      {person.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <p className="prose mt-10 text-[0.9375rem]">
              Additional leadership profiles will be published as the company provides them. In the
              meantime, every enquiry reaches {company.contact.primaryName} directly.
            </p>
            <Link href="/contact" className="btn mt-9">
              Get in touch <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
