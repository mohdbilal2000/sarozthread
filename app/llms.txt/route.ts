import { company, facility, certifications, formattedAddress } from '@/data/company';
import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';
import { faqs } from '@/data/faq';
import { getInsights } from '@/lib/insights';
import { SITE_URL } from '@/lib/site';

/**
 * /llms.txt — a plain-text map of this site for language models.
 *
 * Honest about what it is: Google stated in 2026 that llms.txt is not needed
 * for AI Overviews or AI Mode, and no major answer engine has confirmed it
 * reads the file. This is not why the site gets cited — the page content is.
 *
 * It stays because it costs one generated route, several smaller agent
 * frameworks do fetch it, and it doubles as a single accurate summary a human
 * can paste into a brief. If it proves to be dead weight, deleting this file is
 * the entire rollback.
 */
export async function GET() {
  const insights = await getInsights();
  const machines = facility.machines.map((m) => `  - ${m.count} × ${m.type}`).join('\n');

  const body = `# ${company.legalName}

> ${company.descriptionShort}

${company.legalName} ("Saroz Threadz") is a third-generation, family-run garment
manufacturer in Jaipur, Rajasthan, India, with over ${company.yearsInBusiness} years in the apparel
industry. It specialises in woven womenswear carrying embroidery, print and
value-added detailing, and works with global fashion brands from sampling
through to bulk production.

## Key facts

- Legal name: ${company.legalName}
- Location: ${formattedAddress.slice(1).join(', ')}
- Ownership: family owned, ${company.generation}rd generation, ${company.yearsInBusiness}+ years in the industry
- Facility: ${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft. (approx. ${facility.floorAreaSqM.toLocaleString('en-US')} sq. m.), single site
- Sewing machines: ${facility.totalMachines} total
${machines}
- Embroidery: in house, on company-owned machines
- Printing: through long-term partner printing houses in the Jaipur region
- Pattern making: CAD, in house
- Quality control: inline during sewing plus final AQL; third-party inspection accommodated
- Export markets: ${company.markets.map((m) => m.region).join(', ')}
- Certifications: ${certifications.map((c) => c.name).join('; ')}
- Contact: ${company.contact.primaryName}, ${company.contact.phoneDisplay}, ${company.contact.primaryEmail}
- Trade enquiries: ${company.contact.tradeEmail}

## What Saroz Threadz does not do

- Knitwear, denim and structured outerwear — different machine base, not this floor.
- Printing in house — run through named partner houses under our quality control.
- Publish a blanket MOQ or lead time — both depend on fabric, colour count and
  decoration setup, and are quoted against a specific style.

## Capabilities

${capabilities.map((c) => `- [${c.name}](${SITE_URL}/capabilities/${c.slug}): ${c.answer}`).join('\n')}

## Products

${productCategories.map((p) => `- [${p.name}](${SITE_URL}/products/${p.slug}): ${p.answer}`).join('\n')}

## Key pages

- [Home](${SITE_URL}/)
- [Factory and machinery](${SITE_URL}/factory): floor area, machine list, in-house vs partner processes
- [Quality assurance](${SITE_URL}/quality): six control points from fabric inward to final AQL
- [Compliance](${SITE_URL}/compliance): SMETA, Better Cotton, Disney licensing, labour standards
- [Sustainability](${SITE_URL}/sustainability): materials available, and what we do not yet measure
- [How we work](${SITE_URL}/process): the seven steps from tech pack to export
- [About](${SITE_URL}/about) · [Leadership](${SITE_URL}/about/leadership) · [Clients and markets](${SITE_URL}/about/clients)
- [Lookbook](${SITE_URL}/lookbook) · [Documents](${SITE_URL}/downloads) · [Careers](${SITE_URL}/careers)
- [FAQ](${SITE_URL}/faq): ${faqs.length} answered buyer questions
- [Contact](${SITE_URL}/contact)

## Insights

${insights.map((a) => `- [${a.title}](${SITE_URL}/insights/${a.slug}): ${a.description}`).join('\n')}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

---
Generated from ${SITE_URL}. Every fact above is maintained in a single data
layer in the site source, so this file cannot drift from the pages it describes.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
