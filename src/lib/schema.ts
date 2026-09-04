/**
 * JSON-LD builders.
 *
 * A note on what this does and does not buy us. Google has stated that no
 * special schema is required for AI Overviews or AI Mode, and studies through
 * 2026 found that bolting JSON-LD onto an already-visible page did not by
 * itself lift citation rates. So structured data is not the reason this site
 * will get cited — the content structure is.
 *
 * It is still worth doing properly, for three reasons that do hold up:
 *   1. Classic rich results (breadcrumbs, sitelinks, org knowledge panel).
 *   2. Entity disambiguation — one consistent, machine-readable statement of
 *      who this company is, tied together with stable @ids.
 *   3. It is nearly free once the data layer exists.
 *
 * Everything here is generated from src/data, so the markup can never contradict
 * the page copy.
 */

import { company, facility, certifications, formattedAddress } from '@/data/company';
import type { Faq } from '@/data/faq';

type Json = Record<string, unknown>;

/** Stable @id anchors so nodes across pages refer to the same entities. */
export const ids = (site: string) => ({
  org: `${site}/#organization`,
  website: `${site}/#website`,
  place: `${site}/#factory`,
});

export function organizationSchema(site: string): Json {
  const id = ids(site);
  return {
    '@type': ['Organization', 'Manufacturer'],
    '@id': id.org,
    name: company.legalName,
    alternateName: company.name,
    url: `${site}/`,
    description: company.descriptionShort,
    slogan: company.tagline,
    naics: '315240',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    email: company.contact.tradeEmail,
    telephone: company.contact.phoneE164,
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
    location: { '@id': id.place },
  };
}

export function placeSchema(site: string): Json {
  const id = ids(site);
  return {
    '@type': 'Place',
    '@id': id.place,
    name: `${company.name} factory`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    description: `${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft. garment manufacturing facility with ${facility.totalMachines} sewing machines in Sitapura Industrial Area, Jaipur.`,
  };
}

export function websiteSchema(site: string): Json {
  const id = ids(site);
  return {
    '@type': 'WebSite',
    '@id': id.website,
    url: `${site}/`,
    name: company.name,
    publisher: { '@id': id.org },
    inLanguage: 'en',
  };
}

export function breadcrumbSchema(
  site: string,
  trail: { name: string; href: string }[],
): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site}${item.href}`,
    })),
  };
}

export function faqSchema(items: Faq[]): Json | null {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(
  site: string,
  opts: { name: string; description: string; url: string },
): Json {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${site}${opts.url}`,
    provider: { '@id': ids(site).org },
    areaServed: company.markets.map((m) => ({ '@type': 'Place', name: m.region })),
    serviceType: 'Apparel manufacturing',
  };
}

export function howToSchema(
  site: string,
  steps: { name: string; text: string }[],
): Json {
  return {
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
    tool: { '@id': ids(site).org },
  };
}

export function articleSchema(
  site: string,
  opts: {
    title: string;
    description: string;
    url: string;
    published: Date;
    updated?: Date;
    image?: string;
  },
): Json {
  return {
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: `${site}${opts.url}`,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    ...(opts.image ? { image: `${site}${opts.image}` } : {}),
    author: { '@id': ids(site).org },
    publisher: { '@id': ids(site).org },
    isPartOf: { '@id': ids(site).website },
  };
}

/** Wraps nodes into one @graph — fewer script tags, explicit relationships. */
export function graph(_site: string, nodes: (Json | null)[]): string {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': nodes.filter((n): n is Json => n !== null),
    },
    null,
    0,
  );
}
