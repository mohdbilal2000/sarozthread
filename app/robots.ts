import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * AI crawlers are explicitly allowed.
 *
 * Being retrievable is the first of the three bars a page must clear to be
 * cited in an AI answer (the others being passage-level structure and
 * credibility). A default robots.txt does not block these agents, but naming
 * them removes ambiguity for crawlers that look for a specific token, and
 * documents the decision for whoever maintains this next.
 *
 * To opt out of training while staying citable: move GPTBot, ClaudeBot,
 * Google-Extended, Applebot-Extended, Bytespider, Amazonbot, Meta-ExternalAgent
 * and CCBot into a disallow rule, and leave the answer agents allowed.
 */
const ANSWER_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'DuckAssistBot',
  'MistralAI-User',
  'Bingbot',
];

const TRAINING_AGENTS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'Meta-ExternalAgent',
  'cohere-ai',
  'Diffbot',
  'Timpibot',
  'omgili',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ANSWER_AGENTS, allow: '/' },
      { userAgent: TRAINING_AGENTS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
