import type { APIRoute } from 'astro';

/**
 * Explicitly welcome AI crawlers.
 *
 * Being retrievable is the first of the three bars a page has to clear to be
 * cited in an AI answer — the other two being passage-level structure and
 * authority. A default robots.txt does not block these agents, but naming them
 * removes any ambiguity for the crawlers that check for a specific token, and
 * documents the decision for whoever maintains this next.
 *
 * Note the distinction: some of these agents fetch pages to answer a live user
 * question, others collect training data. This site allows both. If the company
 * ever wants to opt out of training while staying citable, disallow GPTBot,
 * ClaudeBot, Google-Extended, Applebot-Extended and CCBot, and keep
 * OAI-SearchBot, Claude-SearchBot, PerplexityBot and Googlebot allowed.
 */
const AI_AGENTS = [
  // Answer/search agents — these fetch a page to answer a user's question now.
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Bingbot',
  'DuckAssistBot',
  'MistralAI-User',
  // Crawlers that also build training corpora.
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

export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;

  const body = [
    '# Saroz Threadz Pvt Ltd — https://www.sarozthreadz.com',
    '# Womenswear manufacturing, Jaipur, India.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI answer engines and crawlers are explicitly welcome.',
    ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${origin}/sitemap-index.xml`,
    '',
    '# A plain-text summary of this site for language models:',
    `# ${origin}/llms.txt`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
