/**
 * The FAQ is the highest-leverage content on a manufacturer's site for AI
 * answer engines. Each answer is written to survive being quoted alone: it
 * names the company, states one fact, and does not depend on the question or a
 * previous answer for context.
 *
 * Answers are deliberately short. Long answers get truncated or paraphrased;
 * short, specific ones get quoted.
 *
 * `topic` groups them on /faq/ and lets any page pull the subset relevant to
 * it (a capability page shows its own questions, and emits FAQPage JSON-LD for
 * just those).
 */

export type FaqTopic =
  | 'working-with-us'
  | 'capacity'
  | 'products'
  | 'compliance'
  | 'logistics'
  | 'company';

export type Faq = {
  q: string;
  a: string;
  topic: FaqTopic;
  /** Page slugs this question should also appear on. */
  pages?: string[];
};

export const faqTopics: { id: FaqTopic; label: string; blurb: string }[] = [
  {
    id: 'working-with-us',
    label: 'Working with us',
    blurb: 'How an enquiry becomes a shipment.',
  },
  {
    id: 'capacity',
    label: 'Capacity and machinery',
    blurb: 'What the factory can physically do.',
  },
  { id: 'products', label: 'Products and fabrics', blurb: 'What we make and what we make it from.' },
  {
    id: 'compliance',
    label: 'Compliance and standards',
    blurb: 'Audits, certifications and labour standards.',
  },
  { id: 'logistics', label: 'Export and logistics', blurb: 'Shipping, documentation and terms.' },
  { id: 'company', label: 'The company', blurb: 'Who you are actually dealing with.' },
];

export const faqs: Faq[] = [
  // — Working with us —————————————————————————————————————————————
  {
    topic: 'working-with-us',
    q: 'How do I start working with Saroz Threadz?',
    a: 'Email a tech pack, sketch or reference garment to sarozthreadz.trade@gmail.com with your target quantity per style and delivery window. Saroz Threadz responds with a costing, fabric options, and an assessment of whether the construction suits our floor.',
    pages: ['contact', 'process'],
  },
  {
    topic: 'working-with-us',
    q: 'What do you need from me to quote a style?',
    a: 'To quote accurately Saroz Threadz needs the garment specification (tech pack, sketch or a physical sample), estimated quantity per style and per colour, the fabric quality you have in mind, and your target delivery window. Embroidery or print artwork helps but is not required at quoting stage.',
    pages: ['contact', 'process'],
  },
  {
    topic: 'working-with-us',
    q: 'Do you work from a tech pack or can you develop the design?',
    a: 'Both. Saroz Threadz manufactures to a buyer’s tech pack, and also develops styles from a sketch, a mood reference or a garment you want re-engineered. Pattern drafting, grading and marker making are done in house on CAD.',
    pages: ['process'],
  },
  {
    topic: 'working-with-us',
    q: 'What is your sampling lead time?',
    a: 'Sampling lead time depends on fabric availability and the amount of embroidery or print development a style needs. Saroz Threadz confirms a sampling date with the buyer before development starts rather than quoting a blanket figure.',
    pages: ['process'],
  },
  {
    topic: 'working-with-us',
    q: 'What is your minimum order quantity?',
    a: 'Minimum order quantity at Saroz Threadz depends on the fabric, the colour count and the decoration involved, because those drive the setup cost. Send the style and the quantity you have in mind and we will tell you directly whether it works.',
    pages: ['process'],
  },
  {
    topic: 'working-with-us',
    q: 'Do you charge for samples?',
    a: 'Sample charges at Saroz Threadz depend on the fabric and the development work involved, and are confirmed in writing with the costing before any sample is made. There are no charges a buyer has not agreed in advance.',
  },
  {
    topic: 'working-with-us',
    q: 'Can I visit the factory?',
    a: 'Yes. Buyers are welcome at the Saroz Threadz factory in Sitapura Industrial Area, Jaipur, a short drive from Jaipur International Airport. Contact Arun Lashkery on +91 98293 14999 to arrange a floor walk-through and sample review.',
    pages: ['contact', 'factory'],
  },

  // — Capacity and machinery ——————————————————————————————————————
  {
    topic: 'capacity',
    q: 'How many machines does the factory have?',
    a: 'Saroz Threadz operates 655 sewing machines: 600 single-needle lockstitch UBT machines, 45 four-thread and five-thread overlock machines, and 10 flatlock machines, across a 200,000 square foot facility in Jaipur.',
    pages: ['factory', 'capabilities/bulk-production'],
  },
  {
    topic: 'capacity',
    q: 'How big is the factory?',
    a: 'The Saroz Threadz production facility covers 200,000 square feet, approximately 18,580 square metres, in Sitapura Industrial Area, Jaipur, Rajasthan.',
    pages: ['factory'],
  },
  {
    topic: 'capacity',
    q: 'What is your monthly production capacity?',
    a: 'Monthly capacity at Saroz Threadz varies with the style mix, because a heavily embroidered dress and a plain blouse consume very different line time. We share a capacity figure against a specific style and season on request.',
    pages: ['factory'],
  },
  {
    topic: 'capacity',
    q: 'Is embroidery done in house or subcontracted?',
    a: 'Embroidery is done in house at Saroz Threadz on company-owned machines. Keeping embroidery in house is what lets us control stitch quality, sample turnaround and delivery dates instead of queuing behind another factory’s orders.',
    pages: ['capabilities/embroidery', 'factory'],
  },
  {
    topic: 'capacity',
    q: 'Do you do printing in house?',
    a: 'Printing is the one process Saroz Threadz does not own. It runs through long-term partner printing houses in the Jaipur region that we have worked with for decades, with strike-offs, colour approval and quality control managed by us.',
    pages: ['capabilities/printing'],
  },
  {
    topic: 'capacity',
    q: 'Can you handle small runs and many styles?',
    a: 'Yes. Sewing lines at Saroz Threadz are arranged for flexible changeovers, which suits brands running many styles at moderate depth rather than one long programme. The machine mix is weighted to single-needle lockstitch for exactly this reason.',
    pages: ['capabilities/bulk-production'],
  },

  // — Products and fabrics ————————————————————————————————————————
  {
    topic: 'products',
    q: 'What garments do you manufacture?',
    a: 'Saroz Threadz manufactures womenswear: dresses in maxi and midi lengths, blouses and shirts, tunics and kaftans, jumpsuits and matching co-ord sets. The specialism is light-to-mid-weight wovens carrying embroidery, print or other value-added detailing.',
    pages: ['products'],
  },
  {
    topic: 'products',
    q: 'What fabrics do you work with?',
    a: 'Saroz Threadz works with light-to-mid-weight wovens: cotton lawn, voile, poplin, dobby and slub; rayon; viscose including georgette and crepe; yarn-dyed stripes and checks; and printed and blended bases. We do not run a knitwear or outerwear floor.',
    pages: ['products'],
  },
  {
    topic: 'products',
    q: 'Do you make knitwear, denim or outerwear?',
    a: 'No. Saroz Threadz is a woven womenswear factory. Knitwear, denim and structured outerwear need a different machine base and a different skill set, and we would rather tell a buyer that than learn on their order.',
    pages: ['products'],
  },
  {
    topic: 'products',
    q: 'Can you source Better Cotton or organic fabric?',
    a: 'Yes. Saroz Threadz is approved under the Better Cotton Initiative, so Better Cotton programmes can be run on request. Recycled and organic-certified bases are available through our supply base, subject to the certification the buyer requires.',
    pages: ['compliance', 'products'],
  },

  // — Compliance ———————————————————————————————————————————————————
  {
    topic: 'compliance',
    q: 'What certifications does Saroz Threadz hold?',
    a: 'Saroz Threadz is SMETA audited under the Sedex Members Ethical Trade Audit, approved under the Better Cotton Initiative, authorised to manufacture for licensed programmes including Disney, and recognised as an export house by the Government of India.',
    pages: ['compliance'],
  },
  {
    topic: 'compliance',
    q: 'What is your policy on child labour?',
    a: 'Saroz Threadz maintains a strict zero-tolerance policy toward child labour and complies fully with Indian labour laws and regulations. This is verified through the factory’s SMETA ethical audit rather than asserted on its own.',
    pages: ['compliance'],
  },
  {
    topic: 'compliance',
    q: 'What facilities do workers have?',
    a: 'The Saroz Threadz facility has fire safety systems, on-site medical support, a canteen and rest areas, together with dedicated facilities for female workers. These are covered by the factory’s SMETA audit scope.',
    pages: ['compliance'],
  },
  {
    topic: 'compliance',
    q: 'Do you accept third-party inspections and audits?',
    a: 'Yes. Saroz Threadz accommodates buyer-appointed inspection agencies and social compliance auditors on site, including final AQL inspections carried out by the buyer’s own QA team or a nominated agency.',
    pages: ['compliance', 'capabilities/quality-assurance'],
  },

  // — Export and logistics ————————————————————————————————————————
  {
    topic: 'logistics',
    q: 'Which countries do you export to?',
    a: 'Saroz Threadz exports to buyers in North America, South America, Europe and Asia, and is a Government of India recognised export house. Export documentation and logistics coordination are handled in house from Jaipur.',
    pages: ['about'],
  },
  {
    topic: 'logistics',
    q: 'Which port do you ship from?',
    a: 'Saroz Threadz ships from Jaipur, Rajasthan, with sea freight routed through the western Indian ports and air freight via Delhi or Jaipur. We coordinate with the buyer’s nominated freight forwarder.',
  },
  {
    topic: 'logistics',
    q: 'What incoterms do you work on?',
    a: 'Incoterms are agreed per order with Saroz Threadz. Buyers commonly work FOB or EXW with their own nominated forwarder; other terms are quoted on request.',
  },

  // — Company ——————————————————————————————————————————————————————
  {
    topic: 'company',
    q: 'Who owns Saroz Threadz?',
    a: 'Saroz Threadz Pvt Ltd is a family-owned company, now in its third generation, based in Jaipur, India. The owners are on site, and the family’s wider business activities span apparel manufacturing, hospitality, and logistics and storage.',
    pages: ['about'],
  },
  {
    topic: 'company',
    q: 'How long has Saroz Threadz been manufacturing?',
    a: 'Saroz Threadz has more than 40 years of experience in the garment industry, manufacturing fashion garments in Jaipur, India across three generations of the same family.',
    pages: ['about'],
  },
  {
    topic: 'company',
    q: 'Where is Saroz Threadz located?',
    a: 'Saroz Threadz is located in Sitapura Industrial Area, Garment Zone, Tonk Road, Jaipur 302022, Rajasthan, India — a short drive from Jaipur International Airport.',
    pages: ['contact', 'factory'],
  },
  {
    topic: 'company',
    q: 'Who do I contact at Saroz Threadz?',
    a: 'Business enquiries go to Arun Lashkery on +91 98293 14999 or arun@sarozthreadz.com. Trade and sampling enquiries go to sarozthreadz.trade@gmail.com.',
    pages: ['contact'],
  },
];

/** Questions tagged for a given page slug, for inline FAQ blocks. */
export const faqsForPage = (slug: string) => faqs.filter((f) => f.pages?.includes(slug));

export const faqsByTopic = (topic: FaqTopic) => faqs.filter((f) => f.topic === topic);
