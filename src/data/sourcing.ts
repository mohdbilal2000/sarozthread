import { facility } from './company';

/**
 * The qualifier logic behind <SourcingQualifier>.
 *
 * This is the merchandiser's answer to the first question every sourcing
 * manager asks — "can you make my product, and are you the right factory for
 * it?" — written out as rules rather than left for a buyer to infer from six
 * capability cards.
 *
 * The important part is `verdict: 'no'`. A factory that says *knitwear is not
 * our floor* before an enquiry is written wins the dress order it can actually
 * deliver, and never loses three weeks of both sides' time on one it can't.
 * Every "no" here names who to go to instead, because the buyer remembers it.
 */

export type Verdict = 'core' | 'yes' | 'no';

export type SourcingCategory = {
  id: string;
  label: string;
  /** Matching product category page, when this is something we make. */
  href?: string;
  verdict: Verdict;
  /** The merchandiser's one-line answer. Written to be read aloud. */
  headline: string;
  detail: string;
  /** Which machines the style actually runs on. Concrete beats reassuring. */
  runsOn?: string;
};

export const sourcingCategories: SourcingCategory[] = [
  {
    id: 'dresses',
    label: 'Dresses',
    href: '/products/dresses',
    verdict: 'core',
    headline: 'This is the middle of our floor.',
    detail:
      'Tiered, panelled and gathered dresses are the single largest category we run, and the reason the machine list is weighted the way it is.',
    runsOn: `${facility.machines[0].count} single-needle lockstitch`,
  },
  {
    id: 'blouses-and-shirts',
    label: 'Blouses & shirts',
    href: '/products/blouses-and-shirts',
    verdict: 'core',
    headline: 'Core floor — and where our embroidery earns its keep.',
    detail:
      'Plackets, yokes and cuffs are the pieces buyers most often want decorated, and those run in house rather than going out to a job worker.',
    runsOn: `${facility.machines[0].count} single-needle lockstitch`,
  },
  {
    id: 'tunics-and-kaftans',
    label: 'Tunics & kaftans',
    href: '/products/tunics-and-kaftans',
    verdict: 'core',
    headline: 'Yes — high handwork content is the point of this factory.',
    detail:
      'Placement embroidery on voile and rayon is the work we are set up for. The more handwork in the style, the better we compare on price.',
    runsOn: 'Lockstitch + in-house embroidery',
  },
  {
    id: 'jumpsuits-and-co-ords',
    label: 'Jumpsuits & co-ords',
    href: '/products/jumpsuits-and-co-ords',
    verdict: 'core',
    headline: 'Yes — and we will cut a co-ord from one fabric lot.',
    detail:
      'Top and bottom cut from the same roll, so the two halves of a set still match after wash. That is a sourcing decision, not a finishing one.',
    runsOn: 'Lockstitch + overlock',
  },
  {
    id: 'resort-and-vacation',
    label: 'Resort & vacation',
    href: '/products/resort-and-vacation',
    verdict: 'core',
    headline: 'Yes — light wovens are what the floor is configured for.',
    detail:
      'Cotton and viscose resort styles in print or embroidery, developed from your tech pack or adapted from our range.',
    runsOn: 'Lockstitch + overlock',
  },
  {
    id: 'knitwear',
    label: 'Knitwear / jersey',
    verdict: 'no',
    headline: 'No — and you want a knit house, not us.',
    detail:
      'We are a woven factory. Jersey needs different machines, different needles and different handling, and a woven factory quoting it is guessing. Tiruppur is where that order belongs.',
  },
  {
    id: 'denim',
    label: 'Denim',
    verdict: 'no',
    headline: 'No — denim needs a laundry we do not have.',
    detail:
      'Denim lives or dies on the wash, and we have no denim laundry on site. Ask us and we would be subcontracting the part that matters most.',
  },
  {
    id: 'outerwear',
    label: 'Structured outerwear',
    verdict: 'no',
    headline: 'No — tailored and padded outerwear is not our floor.',
    detail:
      'Canvassing, padding and fusing for structured jackets and coats need a tailoring setup. Unstructured cotton jackets we will happily look at.',
  },
];

export type Decoration = {
  id: string;
  label: string;
  /** True when the work happens on our own floor rather than at a partner. */
  inHouse: boolean;
  note: string;
};

export const decorations: Decoration[] = [
  {
    id: 'embroidery',
    label: 'Embroidery',
    inHouse: true,
    note: 'In house. We control the schedule, so embroidery does not sit in a queue at a job worker while your delivery date moves.',
  },
  {
    id: 'print',
    label: 'Print',
    inHouse: false,
    note: 'Partner houses we have used for decades — and we say so rather than implying we print. Our QC, our liability, their machines.',
  },
  {
    id: 'handwork',
    label: 'Handwork & trims',
    inHouse: true,
    note: 'In house. Pintucks, lace insertion, tassels and beading — the detail that makes a garment look more expensive than it costs.',
  },
  {
    id: 'plain',
    label: 'Plain / no decoration',
    inHouse: true,
    note: 'We will quote it, but be aware: a plain woven dress is where a bigger, leaner factory beats us on price. Our advantage is handwork.',
  },
];

export type QuantityBand = {
  id: string;
  label: string;
  /** How the merchandiser actually responds to this quantity. */
  response: string;
  /** Whether this is a comfortable commercial fit. */
  fit: 'stretch' | 'good' | 'ideal';
};

export const quantityBands: QuantityBand[] = [
  {
    id: 'under-200',
    label: 'Under 200 / style',
    fit: 'stretch',
    response:
      'Below our comfortable run. We will look at it if the styling is repeatable or it is a first order that grows, but expect the per-piece price to reflect the setup.',
  },
  {
    id: '200-500',
    label: '200 – 500 / style',
    fit: 'good',
    response:
      'Workable. This is a normal development order and a sensible way to start a relationship before committing a season.',
  },
  {
    id: '500-2000',
    label: '500 – 2,000 / style',
    fit: 'ideal',
    response:
      'The sweet spot. Long enough to set a line properly and short enough that we can still hold your delivery date when something changes.',
  },
  {
    id: 'over-2000',
    label: '2,000+ / style',
    fit: 'ideal',
    response:
      'Comfortable. At this length tell us the colour and size breakdown early — that, not the total, is what decides the lead time.',
  },
];
