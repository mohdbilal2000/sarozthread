/**
 * JSON-LD builders.
 *
 * Worth being precise about what this earns. Google stated in 2026 that no
 * special schema is required for AI Overviews or AI Mode, and a study that year
 * found adding JSON-LD to already-visible pages did not measurably lift
 * citation rates. Structured data is therefore not why this site will be cited
 * — the content structure is (see components/AnswerBlock and SpecTable).
 *
 * It still earns its place: classic rich results, entity disambiguation via
 * stable @ids, and it is nearly free once the data layer exists.
 *
 * Everything here is generated from src/data, so markup cannot contradict copy.
 */
import { company, facility, certifications, formattedAddress } from '@/data/company';
import type { Faq } from '@/data/faq';
import { SITE_URL, abs } from '@/lib/site';

type Json = Record<string, unknown>;

export const ID = {
  org: `${SITE_URL}/#organization`,
  site: `${SITE_URL}/#website`,
  place: `${SITE_URL}/#factory`,
} as const;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: company.address.street,
  addressLocality: company.address.locality,
  addressRegion: company.address.region,
  postalCode: company.address.postalCode,
  addressCountry: company.address.countryCode,
};

export const organization = (): Json => ({
  '@type': ['Organization', 'Manufacturer'],
  '@id': ID.org,
  name: company.legalName,
  alternateName: company.name,
  url: `${SITE_URL}/`,
  description: company.descriptionShort,
  slogan: company.tagline,
  naics: '315240',
  address: postalAddress,
  email: company.contact.tradeEmail,
  telephone: company.contact.phoneE164,
  logo: abs('/icon.svg'),
  image: abs('/opengraph-image'),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      name: company.contact.primaryName,
      email: company.contact.primaryEmail,
      telephone: company.contact.phoneE164,
      areaServed: company.markets.map((m) => m.region),
      availableLanguage: ['en', 'hi'],
    },
  ],
  areaServed: company.markets.map((m) => ({ '@type': 'Place', name: m.region })),
  knowsAbout: [
    'Apparel manufacturing',
    'Womenswear manufacturing',
    'Garment embroidery',
    'Garment printing',
    'CAD pattern making',
    'Apparel export from India',
  ],
  hasCredential: certifications.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    name: c.name,
    credentialCategory: 'certification',
    recognizedBy: { '@type': 'Organization', name: c.body },
  })),
  location: { '@id': ID.place },
});

export const place = (): Json => ({
  '@type': 'Place',
  '@id': ID.place,
  name: `${company.name} factory`,
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lng },
  description: `${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft. garment manufacturing facility with ${facility.totalMachines} sewing machines in Sitapura Industrial Area, Jaipur.`,
});

export const website = (): Json => ({
  '@type': 'WebSite',
  '@id': ID.site,
  url: `${SITE_URL}/`,
  name: company.name,
  publisher: { '@id': ID.org },
  inLanguage: 'en',
});

export const breadcrumbs = (trail: { name: string; href: string }[]): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', href: '/' }, ...trail].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.href),
  })),
});

export const faqPage = (items: Faq[]): Json | null =>
  items.length
    ? {
        '@type': 'FAQPage',
        mainEntity: items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

export const service = (opts: { name: string; description: string; url: string }): Json => ({
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  url: abs(opts.url),
  provider: { '@id': ID.org },
  areaServed: company.markets.map((m) => ({ '@type': 'Place', name: m.region })),
  serviceType: 'Apparel manufacturing',
});

export const howTo = (steps: { name: string; text: string }[]): Json => ({
  '@type': 'HowTo',
  name: `How to place a manufacturing order with ${company.name}`,
  description: `The steps from first enquiry to shipped bulk production with ${company.legalName}, ${formattedAddress[2]}.`,
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
  supply: { '@type': 'HowToSupply', name: 'Tech pack, sketch or reference garment' },
  tool: { '@id': ID.org },
});

export const article = (opts: {
  title: string;
  description: string;
  url: string;
  published: string;
  updated?: string;
}): Json => ({
  '@type': 'Article',
  headline: opts.title,
  description: opts.description,
  url: abs(opts.url),
  datePublished: opts.published,
  dateModified: opts.updated ?? opts.published,
  author: { '@id': ID.org },
  publisher: { '@id': ID.org },
  isPartOf: { '@id': ID.site },
});

export const jobPosting = (opts: {
  title: string;
  description: string;
  employmentType: string;
}): Json => ({
  '@type': 'JobPosting',
  title: opts.title,
  description: opts.description,
  employmentType: opts.employmentType,
  hiringOrganization: { '@id': ID.org },
  jobLocation: { '@id': ID.place },
  directApply: false,
});

/** One @graph per page — fewer script tags, explicit relationships. */
export const graph = (nodes: (Json | null)[]) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter((n): n is Json => n !== null),
  });
