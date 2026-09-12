import Link from 'next/link';
import { company, formattedAddress, certifications } from '@/data/company';
import { footerNav, legalNav } from '@/lib/site';
import { ArrowRight } from './Icons';
import { BuildCredit } from './BuildCredit';

export function Footer() {
  return (
    <footer className="border-t border-line bg-carbon">
      {/* Closing CTA rail */}
      <div className="border-b border-line">
        <div className="shell grid gap-8 py-14 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="kicker">Start a programme</p>
            <p className="text-d2 mt-5 max-w-[16ch] text-white">Send us a tech pack.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className="btn">
              Request a quote <ArrowRight />
            </Link>
            <a href={`tel:${company.contact.phoneE164}`} className="btn btn-outline">
              {company.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-6 w-[3px] bg-signal" />
              <span className="text-d3 text-white">Saroz Threadz</span>
            </div>
            <p className="mt-5 max-w-[34ch] text-sm text-ash">{company.descriptionShort}</p>
            <address className="mt-7 space-y-0.5 font-mono text-xs not-italic leading-relaxed text-smoke">
              {formattedAddress.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <div className="mt-6 text-sm">
              <a
                href={`mailto:${company.contact.tradeEmail}`}
                className="block break-all py-2 text-chalk transition-colors hover:text-signal"
              >
                {company.contact.tradeEmail}
              </a>
              <a
                href={`tel:${company.contact.phoneE164}`}
                className="block py-2 text-chalk transition-colors hover:text-signal"
              >
                {company.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="text-label border-b border-line pb-3 text-ash">{col.heading}</p>
                {/* py-1.5 on the link rather than spacing on the list: the
                    gap becomes part of the tap target instead of dead space. */}
                <ul className="mt-3 space-y-0.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-1.5 text-sm text-smoke transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
          {certifications.map((c) => (
            <li key={c.code} className="tag">
              {c.name}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
          <span>
            &copy; {new Date().getFullYear()} {company.legalName}
          </span>
          <nav aria-label="Legal" className="-my-1.5 flex flex-wrap gap-x-6">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-block py-1.5 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <BuildCredit />
    </footer>
  );
}
