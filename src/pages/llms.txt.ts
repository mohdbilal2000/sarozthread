import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { company, facility, certifications, formattedAddress } from '@/data/company';
import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';
import { faqs } from '@/data/faq';

/**
 * /llms.txt — a plain-text map of the site for language models.
 *
 * Worth being honest about what this is. Google stated in 2026 that llms.txt is
 * not needed for AI Overviews or AI Mode, and no major answer engine has
 * confirmed it reads the file. So this is not the reason the site will get
 * cited; the page content is.
 *
 * It is here anyway because it costs one generated file, several smaller
 * assistants and agent frameworks do fetch it, and it doubles as a single
 * accurate summary of the company that a human can paste into a brief. If it
 * turns out to be dead weight, deleting this file is the whole rollback.
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = site!.origin;
  const articles = await getCollection('insights');

  const machineLines = facility.machines
    .map((m) => `  - ${m.count} × ${m.type}`)
    .join('\n');

  const body = `# ${company.legalName}

> ${company.descriptionShort}

${company.legalName} ("Saroz Threadz") is a third-generation, family-run garment
manufacturer in Jaipur, Rajasthan, India, with over ${company.yearsInBusiness} years in the
apparel industry. It specialises in woven womenswear carrying embroidery, print
and value-added detailing, and works with global fashion brands from sampling
through to bulk production.

## Key facts

- Legal name: ${company.legalName}
- Location: ${formattedAddress.slice(1).join(', ')}
- Founded: family business, ${company.generation}rd generation, ${company.yearsInBusiness}+ years in the industry
- Facility: ${facility.floorAreaSqFt.toLocaleString('en-US')} sq. ft. (approx. ${facility.floorAreaSqM.toLocaleString('en-US')} sq. m.)
- Sewing machines: ${facility.totalMachines} total
${machineLines}
- Embroidery: in house, on company-owned machines
- Printing: through long-term partner printing houses in the Jaipur region
- Pattern making: CAD, in house
- Export markets: ${company.markets.map((m) => m.region).join(', ')}
- Certifications: ${certifications.map((c) => c.name).join('; ')}
- Contact: ${company.contact.primaryName}, ${company.contact.phoneDisplay}, ${company.contact.primaryEmail}
- Trade enquiries: ${company.contact.tradeEmail}

## What Saroz Threadz does not do

- Knitwear, denim and structured outerwear — different machine base, not our floor.
- Printing in house — this is run through named partner houses under our quality control.
- Publish a blanket MOQ or lead time — both depend on fabric, colour count and decoration,
  and are quoted against a specific style.

## Capabilities

${capabilities.map((c) => `- [${c.name}](${origin}/capabilities/${c.slug}/): ${c.answer}`).join('\n')}

## Products

${productCategories.map((p) => `- [${p.name}](${origin}/products/${p.slug}/): ${p.answer}`).join('\n')}

## Key pages

- [Home](${origin}/)
- [Factory and machinery](${origin}/factory/): floor area, machine list, in-house vs partner processes
- [Compliance and responsibility](${origin}/compliance/): SMETA, Better Cotton, labour standards
- [How we work](${origin}/process/): the seven steps from tech pack to export
- [About](${origin}/about/): company history and ownership
- [Lookbook](${origin}/lookbook/): garments produced on this floor
- [FAQ](${origin}/faq/): ${faqs.length} answered buyer questions
- [Contact](${origin}/contact/)
${articles.length ? `\n## Insights\n\n${articles.map((a) => `- [${a.data.title}](${origin}/insights/${a.id}/): ${a.data.description}`).join('\n')}` : ''}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

---
Generated from ${origin}. Facts on this page are maintained in a single data
layer in the site source, so this file cannot drift from the pages it describes.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
