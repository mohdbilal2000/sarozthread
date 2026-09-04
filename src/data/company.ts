/**
 * Single source of truth for every buyer-facing fact on the site.
 *
 * Pages, JSON-LD, llms.txt and the FAQ all read from here, so the company's
 * name, address and numbers can never drift apart across the site — entity
 * consistency is one of the few things that reliably moves the needle in both
 * classic search and AI answer engines.
 *
 * `null` means "we do not have this figure confirmed". The UI renders those as
 * "on request" rather than inventing a number. See TODO.md.
 */

export type Unconfirmed<T> = T | null;

export const company = {
  legalName: 'Saroz Threadz Pvt Ltd',
  name: 'Saroz Threadz',
  tagline: 'Womenswear manufacturing in Jaipur, India',
  descriptionShort:
    'Third-generation apparel manufacturer in Jaipur specialising in womenswear with embroidery, printing and value-added detailing, from sampling to bulk production.',
  yearsInBusiness: 40,
  generation: 3,

  address: {
    street: 'Sitapura Industrial Area, Garment Zone, Tonk Road',
    locality: 'Jaipur',
    region: 'Rajasthan',
    postalCode: '302022',
    country: 'India',
    countryCode: 'IN',
  },

  /** Sitapura Industrial Area, Jaipur — approximate, for the map link only. */
  geo: { lat: 26.7783, lng: 75.8347 },

  contact: {
    primaryName: 'Arun Lashkery',
    primaryRole: 'Business Contact',
    primaryEmail: 'arun@sarozthreadz.com',
    tradeEmail: 'sarozthreadz.trade@gmail.com',
    phoneDisplay: '+91 98293 14999',
    phoneE164: '+919829314999',
    whatsapp: '919829314999',
    timezone: 'Asia/Kolkata (UTC+5:30)',
  },

  markets: [
    { region: 'North America', detail: 'United States, Canada' },
    { region: 'South America', detail: 'Export programmes' },
    { region: 'Europe', detail: 'European Union, United Kingdom' },
    { region: 'Asia', detail: 'Regional buyers' },
  ],
} as const;

/** Everything a sourcing manager screens on, in one object. */
export const facility = {
  floorAreaSqFt: 200_000,
  floorAreaSqM: 18_580,

  machines: [
    {
      type: 'Single-needle lockstitch (UBT)',
      count: 600,
      note: 'Under-bed thread trimmer machines — the backbone of dress, blouse and shirt construction.',
    },
    {
      type: 'Overlock, four-thread and five-thread',
      count: 45,
      note: 'Seam construction and edge finishing on wovens.',
    },
    {
      type: 'Flatlock',
      count: 10,
      note: 'Hems, covering stitches and comfort seams.',
    },
  ],

  get totalMachines(): number {
    return this.machines.reduce((sum, m) => sum + m.count, 0);
  },

  inHouse: [
    'Cutting',
    'Sewing',
    'Embroidery',
    'CAD pattern making and grading',
    'Finishing and pressing',
    'Quality assurance',
    'Packing',
  ],
  outsourced: [
    { process: 'Printing', note: 'Long-term partner printing houses used for decades.' },
  ],

  /** Figures the client must confirm before launch — rendered as "on request". */
  monthlyCapacityPieces: null as Unconfirmed<number>,
  moqPiecesPerStyle: null as Unconfirmed<string>,
  samplingLeadTimeDays: null as Unconfirmed<string>,
  bulkLeadTimeDays: null as Unconfirmed<string>,
  headcount: null as Unconfirmed<number>,
} as const;

export type Certification = {
  code: string;
  name: string;
  body: string;
  what: string;
  logo?: string;
};

export const certifications: Certification[] = [
  {
    code: 'SMETA',
    name: 'SMETA audited',
    body: 'Sedex Members Ethical Trade Audit',
    what: 'A four-pillar ethical audit covering labour standards, health and safety, environment and business ethics.',
    logo: 'smeta',
  },
  {
    code: 'BCI',
    name: 'Better Cotton approved',
    body: 'Better Cotton Initiative',
    what: 'Approved to source and produce under the Better Cotton programme, the largest cotton sustainability initiative in the world.',
    logo: 'bci',
  },
  {
    code: 'DISNEY',
    name: 'Disney licensed programmes',
    body: 'The Walt Disney Company',
    what: 'Authorised to manufacture for licensed programmes, including Disney, under their supply-chain compliance requirements.',
  },
  {
    code: 'EXPORT_HOUSE',
    name: 'Recognised export house',
    body: 'Government of India',
    what: 'Recognised export house status under the Government of India, reflecting sustained export performance.',
  },
];

export const labourStandards = [
  {
    title: 'No child labour',
    detail:
      'A strict zero-tolerance policy toward child labour, with full compliance with Indian labour laws and regulations.',
  },
  {
    title: 'Facilities for women workers',
    detail:
      'Dedicated facilities for female workers, with rest areas and support structures built into how the floor is organised.',
  },
  {
    title: 'Health and safety',
    detail:
      'Fire safety systems, on-site medical support, a canteen and rest areas across our facilities.',
  },
  {
    title: 'Community support',
    detail:
      'Beyond the factories, the family is actively involved in community development initiatives around Jaipur.',
  },
];

/** Used in the footer, contact page and LocalBusiness JSON-LD. */
export const formattedAddress = [
  company.legalName,
  company.address.street,
  `${company.address.locality} ${company.address.postalCode}, ${company.address.region}`,
  company.address.country,
];

export const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    `${company.address.street}, ${company.address.locality} ${company.address.postalCode}`,
  );
