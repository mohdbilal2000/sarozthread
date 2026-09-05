import { getInsights } from '@/lib/insights';
import { SITE_URL } from '@/lib/site';
import { company } from '@/data/company';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const articles = await getInsights();

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escape(a.title)}</title>
      <link>${SITE_URL}/insights/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${a.slug}</guid>
      <description>${escape(a.description)}</description>
      <pubDate>${new Date(a.published).toUTCString()}</pubDate>
      <category>${escape(a.topic)}</category>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(company.name)} — Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>Sourcing and manufacturing guides written from the factory floor in Jaipur, India.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
