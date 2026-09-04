import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; blurb?: string }[];
};

export const nav: NavItem[] = [
  {
    href: '/capabilities/',
    label: 'Capabilities',
    children: capabilities.map((c) => ({
      href: `/capabilities/${c.slug}/`,
      label: c.name,
      blurb: c.short,
    })),
  },
  {
    href: '/products/',
    label: 'Products',
    children: productCategories.map((p) => ({
      href: `/products/${p.slug}/`,
      label: p.name,
    })),
  },
  { href: '/factory/', label: 'Factory' },
  { href: '/compliance/', label: 'Compliance' },
  { href: '/process/', label: 'How we work' },
  { href: '/about/', label: 'About' },
];

export const utilityNav = [
  { href: '/faq/', label: 'FAQ' },
  { href: '/lookbook/', label: 'Lookbook' },
  { href: '/insights/', label: 'Insights' },
];

/** True when `href` is the current page or an ancestor of it. */
export const isActive = (href: string, pathname: string): boolean =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);
