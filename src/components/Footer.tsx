import Link from 'next/link';
import { company, formattedAddress, certifications } from '@/data/company';
import { footerNav, legalNav } from '@/lib/site';
import { ArrowRight } from './Icons';

export function Footer() {
  return (
    <footer className="section-dark border-t border-line">
      {/* Closing CTA rail */}
      <div className="border-b border-line">
        <div className="shell grid gap-8 py-14 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="kicker">Start a programme</p>
            <p className="text-d2 mt-5 max-w-[16ch] text-ink">Send us a tech pack.</p>
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
              <span className="block h-6 w-[3px] bg-accent" />
              <span className="text-d3 text-ink">Saroz Threadz</span>
            </div>
            <p className="mt-5 max-w-[34ch] text-sm text-muted">{company.descriptionShort}</p>
            <address className="mt-7 space-y-0.5 font-sans text-[0.8125rem] not-italic leading-relaxed text-body">
              {formattedAddress.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <div className="mt-7 space-y-1.5 text-sm">
              <a href={`mailto:${company.contact.tradeEmail}`} className="block text-ink-soft hover:text-accent">
                {company.contact.tradeEmail}
              </a>
              <a href={`tel:${company.contact.phoneE164}`} className="block text-ink-soft hover:text-accent">
                {company.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="text-label border-b border-line pb-3 text-muted">{col.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-body transition-colors hover:text-ink">
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
          <span>
            &copy; {new Date().getFullYear()} {company.legalName}
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
