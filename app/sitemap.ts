import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';
import { getInsights } from '@/lib/insights';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const insights = await getInsights();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
    lastModified: Date = now,
  ) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });

  return [
    entry('/', 1.0, 'monthly'),
    entry('/capabilities', 0.9),
    ...capabilities.map((c) => entry(`/capabilities/${c.slug}`, 0.8)),
    entry('/products', 0.9),
    ...productCategories.map((p) => entry(`/products/${p.slug}`, 0.8)),
    entry('/factory', 0.9),
    entry('/quality', 0.8),
    entry('/compliance', 0.8),
    entry('/sustainability', 0.7),
    entry('/process', 0.8),
    entry('/about', 0.7),
    entry('/about/leadership', 0.5),
    entry('/about/clients', 0.6),
    entry('/careers', 0.4),
    entry('/lookbook', 0.7),
    entry('/downloads', 0.6),
    entry('/faq', 0.8),
    entry('/contact', 0.9),
    entry('/insights', 0.7, 'weekly'),
    ...insights.map((a) =>
      entry(`/insights/${a.slug}`, 0.6, 'yearly', new Date(a.updated ?? a.published)),
    ),
    entry('/privacy', 0.2, 'yearly'),
    entry('/terms', 0.2, 'yearly'),
    entry('/accessibility', 0.2, 'yearly'),
  ];
}
