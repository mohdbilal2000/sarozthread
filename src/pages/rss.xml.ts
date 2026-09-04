import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { company } from '@/data/company';

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('insights', ({ data }) => !data.draft);
  return rss({
    title: `${company.name} — Insights`,
    description:
      'Sourcing and manufacturing guides written from the factory floor in Jaipur, India.',
    site: context.site!,
    items: articles
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map((a) => ({
        title: a.data.title,
        description: a.data.description,
        pubDate: a.data.published,
        link: `/insights/${a.id}/`,
      })),
    customData: '<language>en</language>',
  });
};
