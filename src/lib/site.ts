import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';

/** Canonical origin. Overridable for preview deploys. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === 'production'
    ? 'https://www.sarozthreadz.com'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://www.sarozthreadz.com')
).replace(/\/$/, '');

export const abs = (path: string) => new URL(path, SITE_URL).toString();

export type NavGroup = {
  href: string;
  label: string;
  /** Rendered in the mega menu as a short positioning line. */
  summary?: string;
  columns?: {
    heading: string;
    items: { href: string; label: string; note?: string }[];
  }[];
};

export const primaryNav: NavGroup[] = [
  {
    href: '/capabilities',
    label: 'Capabilities',
    summary: 'Six processes. A clear line between what we own and what we partner on.',
    columns: [
      {
        heading: 'Make',
        items: capabilities
          .filter((c) =>
            ['embroidery', 'printing', 'bulk-production'].includes(c.slug),
          )
          .map((c) => ({ href: `/capabilities/${c.slug}`, label: c.name, note: c.short })),
      },
      {
        heading: 'Develop & control',
        items: capabilities
          .filter((c) =>
            ['pattern-making-and-cad', 'sampling-and-development', 'quality-assurance'].includes(
              c.slug,
            ),
          )
          .map((c) => ({ href: `/capabilities/${c.slug}`, label: c.name, note: c.short })),
      },
      {
        heading: 'Go deeper',
        items: [
          { href: '/factory', label: 'Factory & machinery', note: '200,000 sq. ft.' },
          { href: '/quality', label: 'Quality system', note: 'Inline + AQL' },
          { href: '/process', label: 'How we work', note: '7 steps' },
        ],
      },
    ],
  },
  {
    href: '/products',
    label: 'Products',
    summary: 'Woven womenswear built around handwork.',
    columns: [
      {
        heading: 'Categories',
        items: productCategories.map((p) => ({
          href: `/products/${p.slug}`,
          label: p.name,
        })),
      },
      {
        heading: 'See the work',
        items: [
          { href: '/lookbook', label: 'Lookbook', note: 'Garments off this floor' },
          { href: '/products', label: 'All categories' },
        ],
      },
    ],
  },
  {
    href: '/compliance',
    label: 'Responsibility',
    summary: 'Audited, not asserted.',
    columns: [
      {
        heading: 'Standards',
        items: [
          { href: '/compliance', label: 'Compliance', note: 'SMETA · BCI · Disney' },
          { href: '/sustainability', label: 'Sustainability', note: 'Materials & impact' },
          { href: '/quality', label: 'Quality assurance', note: 'Inline · AQL' },
        ],
      },
      {
        heading: 'Evidence',
        items: [
          { href: '/downloads', label: 'Documents', note: 'Audits & certificates' },
          { href: '/faq#compliance', label: 'Compliance FAQ' },
        ],
      },
    ],
  },
  {
    href: '/about',
    label: 'Company',
    summary: 'Third generation, one factory floor, forty years.',
    columns: [
      {
        heading: 'Who we are',
        items: [
          { href: '/about', label: 'About', note: 'The company' },
          { href: '/about/leadership', label: 'Leadership' },
          { href: '/about/clients', label: 'Clients & markets' },
          { href: '/careers', label: 'Careers' },
        ],
      },
      {
        heading: 'Read',
        items: [
          { href: '/insights', label: 'Insights', note: 'From the floor' },
          { href: '/faq', label: 'FAQ', note: '28 answers' },
        ],
      },
    ],
  },
];

export const footerNav = [
  {
    heading: 'Capabilities',
    items: capabilities.map((c) => ({ href: `/capabilities/${c.slug}`, label: c.name })),
  },
  {
    heading: 'Products',
    items: [
      ...productCategories.map((p) => ({ href: `/products/${p.slug}`, label: p.name })),
      { href: '/lookbook', label: 'Lookbook' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { href: '/about', label: 'About' },
      { href: '/about/leadership', label: 'Leadership' },
      { href: '/about/clients', label: 'Clients & markets' },
      { href: '/factory', label: 'Factory' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    heading: 'Responsibility',
    items: [
      { href: '/compliance', label: 'Compliance' },
      { href: '/sustainability', label: 'Sustainability' },
      { href: '/quality', label: 'Quality' },
      { href: '/downloads', label: 'Documents' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { href: '/process', label: 'How we work' },
      { href: '/insights', label: 'Insights' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export const legalNav = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/sitemap.xml', label: 'Sitemap' },
];

export const isActive = (href: string, pathname: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
