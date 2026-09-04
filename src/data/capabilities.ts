/**
 * Capability pages. Each entry becomes a route at /capabilities/<slug>/ and a
 * Service node in JSON-LD.
 *
 * `question` / `answer` are written for passage-level retrieval: the H1 area of
 * each page states the question a buyer actually types, and the answer that
 * follows is self-contained — it makes sense quoted on its own, with no
 * pronouns pointing back at earlier paragraphs. That is what gets a passage
 * lifted into an AI answer.
 */

export type Capability = {
  slug: string;
  name: string;
  /** Nav + card label. */
  short: string;
  /** The buyer's search phrasing. */
  question: string;
  /** Self-contained answer, ~40-60 words. */
  answer: string;
  intro: string;
  bullets: { title: string; detail: string }[];
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
};

export const capabilities: Capability[] = [
  {
    slug: 'embroidery',
    name: 'Embroidery',
    short: 'Embroidery',
    question: 'Do you do embroidery in house?',
    answer:
      'Yes. Saroz Threadz owns its embroidery machines and runs them on site in Jaipur. Because embroidery is not subcontracted, sample turnaround, stitch quality and delivery dates stay under our control rather than sitting in another factory’s queue.',
    intro:
      'Embroidery is the reason most brands come to us. It is the process that most often goes wrong when a factory subcontracts it — the sample comes back beautiful and the bulk comes back different. We removed that risk by owning the machines.',
    bullets: [
      {
        title: 'Placement and all-over embroidery',
        detail:
          'Yokes, plackets, cuffs, borders and full-panel work on wovens, developed from your artwork or ours.',
      },
      {
        title: 'Digitising and strike-offs',
        detail:
          'Artwork is digitised in house and stitched as a strike-off on the actual bulk fabric, so density and pucker are judged on the real base, not a substitute.',
      },
      {
        title: 'Run in parallel with sewing',
        detail:
          'Embroidery panels are scheduled alongside the sewing lines rather than after them, which is what keeps decorated styles on the same lead time as plain ones.',
      },
      {
        title: 'Hand-finished detailing',
        detail:
          'Tassels, thread work and finishing touches that Jaipur has a deep craft base for, added without shipping the garment across the city.',
      },
    ],
    specs: [
      { label: 'Ownership', value: 'In house, company owned' },
      { label: 'Applied to', value: 'Cotton, rayon, viscose and blended wovens' },
      { label: 'Typical placements', value: 'Yoke, placket, cuff, hem border, all-over panel' },
      { label: 'Artwork input', value: 'DST, EMB, AI, PDF or a physical reference sample' },
    ],
    image: 'embroidery',
    imageAlt: 'Embroidery being stitched onto patterned fabric on a machine at Saroz Threadz',
  },
  {
    slug: 'printing',
    name: 'Printing',
    short: 'Printing',
    question: 'What printing can you do on garments?',
    answer:
      'Saroz Threadz produces placement and all-over prints through long-term partner printing houses in Jaipur, a city with a centuries-old printing base. We manage the strike-off, colour approval and quality control ourselves, so the buyer deals with one factory rather than a chain of vendors.',
    intro:
      'We do not own a printing plant, and we say so. Printing is the one process we run through partners — the same houses, for decades. In exchange for not owning it we get access to a far wider range of techniques than a single in-house table could offer.',
    bullets: [
      {
        title: 'Placement and all-over prints',
        detail: 'Screen and rotary printing across cotton, rayon and viscose bases.',
      },
      {
        title: 'Jaipur’s print base',
        detail:
          'Jaipur and the surrounding Sanganer and Bagru belt is one of the oldest textile printing regions in the world. Our partners sit inside it.',
      },
      {
        title: 'Colour approval on your base',
        detail:
          'Strike-offs are run on the bulk fabric and matched to your standard before bulk printing is released.',
      },
      {
        title: 'One point of accountability',
        detail:
          'You approve with us, you chase us, and we carry the quality risk. Buyers never manage the print vendor directly.',
      },
    ],
    specs: [
      { label: 'Ownership', value: 'Long-term partner printing houses' },
      { label: 'Techniques', value: 'Screen and rotary; placement and all-over' },
      { label: 'Bases', value: 'Cotton lawn, voile, poplin, dobby; rayon; viscose' },
      { label: 'Colour standard', value: 'Strike-off on bulk fabric, approved before release' },
    ],
    image: 'printing',
    imageAlt: 'A printed cotton garment being finished at Saroz Threadz',
  },
  {
    slug: 'pattern-making-and-cad',
    name: 'Pattern making and CAD',
    short: 'Pattern & CAD',
    question: 'How do you handle pattern making and fit?',
    answer:
      'Patterns are drafted, graded and marked digitally on CAD at Saroz Threadz. Digital patterns mean fit comments are turned around quickly, grading is consistent across the size set, and the bulk marker is the same pattern the buyer approved at sample stage.',
    intro:
      'Most fit failures in bulk are not sewing failures. They are pattern failures — a manual re-draft between the approved sample and the cutting table that nobody wrote down. Working digitally end to end removes that gap.',
    bullets: [
      {
        title: 'Digital pattern development',
        detail: 'Patterns drafted in CAD from your tech pack, block or reference garment.',
      },
      {
        title: 'Grading across the size set',
        detail: 'Consistent grade rules applied across the full range, not eyeballed per size.',
      },
      {
        title: 'Fast revisions',
        detail:
          'Fit comments are applied to the digital pattern and re-cut, which is why fit rounds do not add weeks to a development.',
      },
      {
        title: 'Marker efficiency',
        detail:
          'Digital markers keep fabric consumption predictable, so the costing you were quoted is the costing that holds in bulk.',
      },
    ],
    specs: [
      { label: 'Method', value: 'CAD pattern development, grading and marker making' },
      { label: 'Input accepted', value: 'Tech pack, block pattern, or a reference garment' },
      { label: 'Output', value: 'Graded size set and production marker' },
      { label: 'Continuity', value: 'Approved sample pattern is the bulk pattern' },
    ],
    image: 'cad',
    imageAlt: 'Pattern development work at a laptop in the Saroz Threadz sampling room',
  },
  {
    slug: 'sampling-and-development',
    name: 'Sampling and development',
    short: 'Sampling',
    question: 'How does sampling work with your factory?',
    answer:
      'Send a tech pack, sketch or reference garment. Saroz Threadz confirms fabric, trims and decoration approach, quotes the style, then drafts the pattern and produces a proto or fit sample. Embroidery and print strike-offs are developed alongside the sample so approvals do not stack up at the end.',
    intro:
      'Development is where a factory shows you what it will be like to work with. We front-load the things that usually surprise buyers late — fabric availability, embroidery density, print colour — so the surprises happen at sample stage, when they are cheap.',
    bullets: [
      {
        title: 'Enquiry and costing',
        detail:
          'A costing, fabric options and an honest view of whether the construction suits our floor. We would rather decline a style than learn it on your order.',
      },
      {
        title: 'Proto and fit samples',
        detail: 'Pattern drafted in CAD, sample made, comments applied, sample re-issued.',
      },
      {
        title: 'Parallel decoration development',
        detail: 'Embroidery digitising and print strike-offs run at the same time as the garment.',
      },
      {
        title: 'Pre-production sample',
        detail:
          'A sealed PP sample in bulk fabric, bulk trims and bulk decoration before the line is loaded.',
      },
    ],
    specs: [
      { label: 'Accepted brief formats', value: 'Tech pack, sketch, or reference garment' },
      { label: 'Sample types', value: 'Proto, fit, size set, pre-production, shipment sample' },
      { label: 'Decoration', value: 'Digitising and strike-offs developed in parallel' },
      { label: 'Sampling lead time', value: 'On request' },
    ],
    image: 'sampling',
    imageAlt: 'A garment sample being stitched at Saroz Threadz',
  },
  {
    slug: 'bulk-production',
    name: 'Bulk production',
    short: 'Bulk production',
    question: 'What is your production capacity?',
    answer:
      'Saroz Threadz runs 655 machines across a 200,000 square foot facility in Jaipur: 600 single-needle lockstitch UBT machines, 45 four-thread and five-thread overlock machines, and 10 flatlock machines. Lines are arranged for flexible changeovers on short and mid-size runs rather than one long programme.',
    intro:
      'The machine mix tells you what a factory is actually built for. Ours is heavily weighted to single-needle lockstitch, which is what light-to-mid-weight woven womenswear with handwork needs — not a knit or outerwear floor pretending otherwise.',
    bullets: [
      {
        title: '600 single-needle lockstitch UBT',
        detail:
          'Under-bed trimmer machines, the right tool for dresses, blouses and shirts with detail work.',
      },
      {
        title: '45 overlock, four and five thread',
        detail: 'Seam construction and edge finishing across woven bases.',
      },
      {
        title: '10 flatlock',
        detail: 'Hems, covering stitches and comfort seams.',
      },
      {
        title: 'Built for changeovers',
        detail:
          'Lines are set up to switch styles without losing a week, which suits brands running many styles at moderate depth.',
      },
    ],
    specs: [
      { label: 'Floor area', value: '200,000 sq. ft. (approx. 18,580 sq. m.)' },
      { label: 'Total machines', value: '655' },
      { label: 'Single-needle lockstitch (UBT)', value: '600' },
      { label: 'Overlock (4 and 5 thread)', value: '45' },
      { label: 'Flatlock', value: '10' },
      { label: 'Monthly capacity', value: 'On request' },
      { label: 'Minimum order quantity', value: 'On request' },
    ],
    image: 'factory-floor',
    imageAlt: 'A machinist at work on the production floor at Saroz Threadz in Jaipur',
  },
  {
    slug: 'quality-assurance',
    name: 'Quality assurance',
    short: 'Quality',
    question: 'How do you control quality?',
    answer:
      'Quality is checked inline during sewing rather than only at the end. Saroz Threadz runs measurement checks, inline inspection during production and a final AQL inspection before packing, and accommodates third-party inspection agencies appointed by the buyer.',
    intro:
      'Final inspection catches defects. Inline inspection prevents them. A factory that only checks at the end is choosing to discover its problems when they are most expensive to fix — which is usually the point at which a shipment slips.',
    bullets: [
      {
        title: 'Inline inspection',
        detail: 'Checks during sewing, so a construction issue is caught on the line, not in the carton.',
      },
      {
        title: 'Measurement control',
        detail: 'Garments measured against the approved spec across the size set.',
      },
      {
        title: 'Final AQL inspection',
        detail: 'Statistical final inspection before packing, to your AQL standard.',
      },
      {
        title: 'Third-party inspection welcome',
        detail:
          'Buyer-appointed agencies — SGS, Bureau Veritas, Intertek or your own QA — are accommodated on site.',
      },
    ],
    specs: [
      { label: 'Inline checks', value: 'Yes, during sewing' },
      { label: 'Final inspection', value: 'AQL to the buyer’s standard' },
      { label: 'Third-party inspection', value: 'Accommodated on request' },
      { label: 'Ethical audit', value: 'SMETA (Sedex Members Ethical Trade Audit)' },
    ],
    image: 'quality',
    imageAlt: 'Finished garments being checked at Saroz Threadz',
  },
];

export const getCapability = (slug: string) => capabilities.find((c) => c.slug === slug);
