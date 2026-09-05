import fs from 'node:fs/promises';
import path from 'node:path';

export type Insight = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
  question: string;
  answer: string;
  topic: string;
  readingMinutes: number;
  draft: boolean;
  body: string;
};

const DIR = path.join(process.cwd(), 'content', 'insights');

/** Minimal front-matter parser — one small dependency avoided. */
function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] ?? '' };
}

export async function getInsights(): Promise<Insight[]> {
  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const items = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DIR, file), 'utf8');
      const { data, body } = parseFrontMatter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title ?? file,
        description: data.description ?? '',
        published: data.published ?? '1970-01-01',
        updated: data.updated,
        question: data.question ?? '',
        answer: data.answer ?? '',
        topic: data.topic ?? 'Insight',
        readingMinutes: Number(data.readingMinutes ?? 5),
        draft: data.draft === 'true',
        body,
      } satisfies Insight;
    }),
  );

  return items
    .filter((i) => !i.draft)
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  return (await getInsights()).find((i) => i.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
