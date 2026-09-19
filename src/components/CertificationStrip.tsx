import Image from 'next/image';
import Link from 'next/link';
import { certifications } from '@/data/company';
import { ArrowRight } from './Icons';
import logoSmeta from '@/assets/site/logo-smeta.png';
import logoBci from '@/assets/site/logo-bci.png';

const LOGOS: Record<string, typeof logoSmeta> = {
  smeta: logoSmeta,
  bci: logoBci,
};

/**
 * The compliance wall.
 *
 * Every exporter site a buyer compares us against carries one, and it is read
 * before the copy is: GOTS, BSCI, Sedex and Higg sitting in a row is how a
 * sourcing manager checks in two seconds that a factory can be put in front of
 * their compliance team at all. Ours said the same things in sentences, which
 * is worth less on a first pass however well written.
 *
 * A certification without a logo file still appears, set as a typographic
 * badge rather than being dropped — the accreditation is real whether or not
 * we hold the artwork, and a gap in the row reads as a gap in the compliance.
 * Drop a PNG into src/assets/site/ and add it to LOGOS to upgrade one.
 */
export function CertificationStrip({
  heading = 'Audited and accredited',
  className = '',
}: {
  heading?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-label text-muted">{heading}</p>
        <Link href="/compliance" className="link-arrow !border-0 !pb-0 text-[0.8125rem]">
          Certificates &amp; audit reports <ArrowRight />
        </Link>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {certifications.map((c) => {
          const logo = c.logo ? LOGOS[c.logo] : undefined;
          return (
            <li
              key={c.code}
              className="flex min-h-[7.5rem] flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-line bg-canvas px-4 py-6 text-center"
              data-reveal
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={`${c.body} logo`}
                  height={44}
                  className="h-11 w-auto object-contain"
                />
              ) : (
                <span className="text-d3 leading-none text-ink">{c.code.replace('_', ' ')}</span>
              )}
              <span className="text-[0.8125rem] leading-snug text-body">{c.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
