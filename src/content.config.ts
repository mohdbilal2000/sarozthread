import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Insights: sourcing guides aimed at the questions buyers actually ask before
 * they contact a factory.
 *
 * This is the part of the site that earns citations over time. Original,
 * specific, first-hand explanation of how garment manufacturing works — written
 * by a factory rather than a content agency — is exactly the material AI answer
 * engines pull from, and it ranks for long-tail queries no brochure page can.
 */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** The buyer's question this article answers, verbatim. */
    question: z.string(),
    /** A self-contained answer, quotable on its own. Shown above the article. */
    answer: z.string(),
    topic: z.string(),
    readingMinutes: z.number().default(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
