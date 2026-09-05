/**
 * Product category pages at /products/<slug>/.
 *
 * These exist for a specific reason: buyers and AI answer engines both search
 * by category and geography ("dress manufacturer Jaipur", "who manufactures
 * embroidered blouses in India"). A single "Products" page cannot rank for or
 * be cited on six different queries. Six pages can.
 */

export type ProductCategory = {
  slug: string;
  name: string;
  question: string;
  answer: string;
  intro: string;
  constructions: string[];
  fabrics: string[];
  decoration: string[];
  /** Lookbook image slugs shown on the category page. */
  looks: string[];
  hero: string;
};

export const productCategories: ProductCategory[] = [
  {
    slug: 'dresses',
    name: 'Dresses',
    question: 'Who manufactures womens dresses in Jaipur?',
    answer:
      'Saroz Threadz manufactures womens dresses in Jaipur, India — maxi, midi and short dresses in cotton, rayon and viscose, with in-house embroidery and partner-printed bases. Dresses are the single largest category on our floor and the one our 600 single-needle lockstitch machines are configured for.',
    intro:
      'Tiered, gathered and panelled dresses with real construction content are what this factory is built around. If a style has more than four panels and something stitched onto it, it is in our comfort zone.',
    constructions: [
      'Maxi and midi lengths',
      'Tiered and multi-panel skirts',
      'Gathered and elasticated waists',
      'Button-through shirt dresses',
      'Wrap and surplice fronts',
      'Puff, flutter and bishop sleeves',
    ],
    fabrics: ['Cotton lawn and voile', 'Cotton dobby and slub', 'Rayon', 'Viscose georgette and crepe'],
    decoration: ['Placement embroidery', 'All-over and placement prints', 'Pintucks and lace insertion'],
    looks: [
      'tiered-midi-dress',
      'printed-maxi-dress',
      'tiered-ruffle-dress',
      'block-print-dress',
      'ditsy-print-dress',
      'pintuck-shirt-dress',
    ],
    hero: 'printed-maxi-dress',
  },
  {
    slug: 'blouses-and-shirts',
    name: 'Blouses and shirts',
    question: 'Can you manufacture embroidered blouses and shirts?',
    answer:
      'Yes. Saroz Threadz manufactures womens blouses and shirts in Jaipur with embroidery stitched on our own machines — placket, yoke, cuff and all-over placements on cotton, rayon and viscose wovens, from tech pack through to bulk.',
    intro:
      'Blouses are where in-house embroidery pays for itself. A placket that is a millimetre out is visible on every unit, and it is not something you want to discover after the panels have left a subcontractor.',
    constructions: [
      'Button-through and popover shirts',
      'Oversized and drop-shoulder fits',
      'Mandarin, camp and classic collars',
      'Pintuck and panelled fronts',
      'Sleeveless and flutter-sleeve tops',
    ],
    fabrics: ['Cotton poplin and lawn', 'Yarn-dyed stripes and checks', 'Cotton slub', 'Rayon and viscose'],
    decoration: ['Placket and yoke embroidery', 'Tonal thread work', 'Pintucks and lace trims'],
    looks: [
      'embroidered-blouse',
      'placket-embroidered-shirt',
      'oversized-poplin-shirt',
      'striped-embroidered-blouse',
      'cotton-flutter-top',
      'pintuck-shirt-dress',
    ],
    hero: 'embroidered-blouse',
  },
  {
    slug: 'tunics-and-kaftans',
    name: 'Tunics and kaftans',
    question: 'Do you make tunics and kaftans for export?',
    answer:
      'Saroz Threadz manufactures tunics and kaftans in Jaipur for export to North America, South America, Europe and Asia. Loose-fit resort silhouettes in lightweight cotton and viscose, with hand-feel prints and embroidery, are a long-standing part of our range.',
    intro:
      'Resort and vacation silhouettes suit both our fabric base and our decoration strengths — volume, drape and something worth looking at up close.',
    constructions: [
      'Straight and A-line tunics',
      'Kaftan and caftan silhouettes',
      'Tie-front and tasselled necklines',
      'Side-slit and stepped hems',
    ],
    fabrics: ['Cotton voile', 'Rayon', 'Viscose georgette', 'Lightweight blended wovens'],
    decoration: ['Neckline and border embroidery', 'All-over prints', 'Tassels and hand finishing'],
    looks: ['hand-embroidered-tunic', 'floral-kaftan-dress', 'block-print-dress', 'printed-maxi-dress'],
    hero: 'hand-embroidered-tunic',
  },
  {
    slug: 'jumpsuits-and-co-ords',
    name: 'Jumpsuits and co-ords',
    question: 'Do you produce jumpsuits and matching co-ord sets?',
    answer:
      'Yes. Saroz Threadz produces jumpsuits, playsuits and matching two-piece co-ord sets in Jaipur. Co-ords are cut from a single fabric lot so the top and bottom match in shade, which is the failure point when a buyer splits the set across two factories.',
    intro:
      'The trap with co-ords is shade variation between the two halves. Cutting both pieces from the same lot, on the same floor, is the whole answer — and it is only possible if one factory makes the set.',
    constructions: [
      'Strappy and sleeveless jumpsuits',
      'Wide-leg and tapered trousers',
      'Matching top and skirt sets',
      'Matching top and trouser sets',
    ],
    fabrics: ['Rayon', 'Cotton', 'Viscose', 'Printed lightweight wovens'],
    decoration: ['All-over prints', 'Placement embroidery', 'Contrast trims'],
    looks: ['printed-jumpsuit', 'floral-kaftan-dress', 'ditsy-print-dress'],
    hero: 'printed-jumpsuit',
  },
  {
    slug: 'resort-and-vacation',
    name: 'Resort and vacation',
    question: 'Do you manufacture resort and vacation wear?',
    answer:
      'Yes. Saroz Threadz manufactures resort and vacation wear in Jaipur — kaftans, cover-ups, beach dresses and lightweight co-ords in cotton voile, rayon and viscose. Lightweight decorated wovens are the core of our floor, which is exactly what the resort category is built from.',
    intro:
      'Resort is not a separate capability for us, it is our default fabric weight and our default decoration. Volume, drape and something worth looking at up close.',
    constructions: [
      'Kaftans and cover-ups',
      'Beach and holiday dresses',
      'Wide-leg co-ord sets',
      'Tie-front and drawstring details',
      'Tasselled and fringed hems',
    ],
    fabrics: ['Cotton voile', 'Cotton lawn', 'Rayon', 'Viscose georgette'],
    decoration: ['All-over prints', 'Border embroidery', 'Tassels and hand finishing'],
    looks: ['floral-kaftan-dress', 'hand-embroidered-tunic', 'printed-maxi-dress', 'block-print-dress'],
    hero: 'floral-kaftan-dress',
  },
];

export const getProductCategory = (slug: string) =>
  productCategories.find((p) => p.slug === slug);

/** Full lookbook, used on /lookbook/ and to resolve category `looks`. */
export const looks: Record<string, { name: string; detail: string; category: string }> = {
  'hand-embroidered-tunic': {
    name: 'Hand-embroidered tunic',
    detail: 'Cotton voile, placement embroidery',
    category: 'Tunics and kaftans',
  },
  'printed-maxi-dress': {
    name: 'Printed maxi dress',
    detail: 'Rayon, all-over print',
    category: 'Dresses',
  },
  'oversized-poplin-shirt': {
    name: 'Oversized poplin shirt',
    detail: 'Yarn-dyed cotton, drop shoulder',
    category: 'Blouses and shirts',
  },
  'tiered-ruffle-dress': {
    name: 'Tiered ruffle dress',
    detail: 'Viscose georgette, multi-panel',
    category: 'Dresses',
  },
  'embroidered-blouse': {
    name: 'Embroidered blouse',
    detail: 'Cotton, tonal thread work, bishop sleeve',
    category: 'Blouses and shirts',
  },
  'printed-jumpsuit': {
    name: 'Printed jumpsuit',
    detail: 'Rayon, strappy silhouette',
    category: 'Jumpsuits and co-ords',
  },
  'tiered-midi-dress': {
    name: 'Tiered midi dress',
    detail: 'Cotton dobby, gathered tiers',
    category: 'Dresses',
  },
  'placket-embroidered-shirt': {
    name: 'Placket embroidery shirt',
    detail: 'Cotton, centre-front detail',
    category: 'Blouses and shirts',
  },
  'cotton-flutter-top': {
    name: 'Flutter-sleeve top',
    detail: 'Cotton slub, pintuck yoke',
    category: 'Blouses and shirts',
  },
  'block-print-dress': {
    name: 'Block-print dress',
    detail: 'Cotton, hand-feel print',
    category: 'Dresses',
  },
  'ditsy-print-dress': {
    name: 'Ditsy print dress',
    detail: 'Viscose, wrap front',
    category: 'Dresses',
  },
  'striped-embroidered-blouse': {
    name: 'Striped embroidered blouse',
    detail: 'Cotton, tonal stripe',
    category: 'Blouses and shirts',
  },
  'pintuck-shirt-dress': {
    name: 'Pintuck shirt dress',
    detail: 'Cotton lawn, pintuck panels',
    category: 'Dresses',
  },
  'floral-kaftan-dress': {
    name: 'Floral kaftan dress',
    detail: 'Rayon, tiered volume',
    category: 'Tunics and kaftans',
  },
};
