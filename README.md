# Saroz Threadz

The website for [Saroz Threadz Pvt Ltd](https://www.sarozthreadz.com), a
third-generation womenswear manufacturer in Jaipur, India.

Built with [Astro 7](https://astro.build) and Tailwind CSS 4. Ships as static
HTML, no server required.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run check      # TypeScript + Astro diagnostics
```

---

## Why this exists

The previous site was a Canva export: a ~200 KB JavaScript bundle rendering a
single page client-side, with no crawlable text, one URL for everything, no
metadata and no sitemap. Every heading was locked inside a Canva design file.

For a factory whose buyers arrive by searching *"womenswear manufacturer
Jaipur embroidery"* — or increasingly by asking an AI assistant that same
question — that is a commercial problem, not a cosmetic one.

## Architecture

### One data layer, many surfaces

Every buyer-facing fact lives in `src/data/`. Pages, JSON-LD, `llms.txt`, the
FAQ and the RSS feed all read from it, so the machine-readable markup can never
contradict the visible copy, and the address in the footer can never drift from
the address in the schema.

| File | Holds |
| --- | --- |
| `company.ts` | Name, address, contact, markets, machinery, certifications |
| `capabilities.ts` | Six capability pages, each with a question/answer pair |
| `products.ts` | Four product categories and the lookbook index |
| `faq.ts` | 28 answered questions, tagged by topic and by page |
| `process.ts` | The seven order steps, also used for HowTo schema |

Facts the company has not confirmed are `null` in the data layer and render as
"on request" rather than being invented. See `TODO.md`.

### Routes

```
/                            Home
/capabilities/               Hub + 6 detail pages
/products/                   Hub + 4 category pages
/factory/                    Floor area, machine list, in-house vs partner
/compliance/                 Certifications, labour standards, CSR
/process/                    Tech pack → export, with HowTo schema
/about/                      Company story
/faq/                        28 questions, grouped by topic
/lookbook/                   Full garment gallery
/insights/                   Articles + individual posts
/contact/                    Direct contacts + RFQ form
/privacy/  /404
/robots.txt  /llms.txt  /rss.xml  /sitemap-index.xml
```

Six capability pages and four category pages exist because a single "what we
do" page cannot rank for, or be cited on, ten different queries. Ten pages can.

## AI search (AEO / GEO)

What we built, and honestly what each part is worth:

**What actually drives citations.** Research through 2026 converges on three
bars a page must clear simultaneously: it has to be *retrievable* by AI
crawlers, *structured for passage-level retrieval*, and *credible enough to
quote*. Pages with statistics, tables and structured lists show materially
higher visibility in AI answers than prose.

So the content is built around that, not around markup tricks:

- **`AnswerBlock`** — a question-shaped heading with a self-contained answer
  directly beneath it. The answer names the company, states one fact, and does
  not depend on the surrounding page for context, so it survives being quoted
  alone. This is the single highest-leverage pattern on the site.
- **`SpecTable`** — every number the factory can state lives in a real `<table>`
  with a `<caption>` and `<th scope>`, not buried in a sentence.
- **28 FAQ answers**, each written short and specific. Long answers get
  paraphrased; short ones get quoted.
- **`/insights/`** — original, first-hand explanation of how garment
  manufacturing actually works. This is the part that compounds.
- **`robots.txt`** explicitly names and allows the AI crawlers, with a comment
  documenting how to opt out of training while staying citable.

**What is worth less than the industry claims.** Google stated in 2026 that no
special schema is required for AI Overviews or AI Mode, and a study that year
found adding JSON-LD to already-visible pages did not measurably lift citation
rates. Google's own guidance also calls out `llms.txt` as unnecessary.

We ship both anyway, because they are nearly free once the data layer exists and
they still earn their keep elsewhere — JSON-LD for classic rich results and
entity disambiguation, `llms.txt` for the smaller agent frameworks that do fetch
it, and as a single accurate summary a human can paste into a brief. But they
are not why this site will get cited. The content is. `src/lib/schema.ts` and
`src/pages/llms.txt.ts` both say so in their headers, so nobody maintaining this
later mistakes the ornament for the engine.

Emitted per page: `Organization`+`Manufacturer`, `Place`, `WebSite`,
`BreadcrumbList`, plus `Service`, `FAQPage`, `HowTo` or `Article` where
relevant — all in one `@graph` with stable `@id`s.

## The contact form

By default the RFQ form opens the visitor's own mail client with the fields
filled in. No third-party form service, no account, nothing stored anywhere, and
buyers' tech packs never pass through a vendor's inbox. It also cannot break.

To switch to a hosted endpoint, set `PUBLIC_FORM_ENDPOINT` (see `.env.example`
for Web3Forms and Formspree, both free). The form posts via `fetch` with inline
success and error states, falls back to the mail client if the request fails,
and has a honeypot field either way.

## Performance and privacy

- Static HTML, zero client-side framework. The only JavaScript is ~3 KB for the
  nav drawer, scroll reveal and the form.
- Fonts self-hosted as subset `woff2` — no Google Fonts request, so no
  third-party call from EU visitors.
- Images processed at build by `sharp` into responsive WebP via `astro:assets`.
- No cookies, no analytics, no trackers. Nothing needing a consent banner.
- CSP, HSTS and frame options set in `vercel.json`.

## Accessibility

Verified across 16 routes × 3 viewports (390 / 768 / 1440), and separately with
JavaScript disabled:

- One `<h1>` per page, no heading-level skips, semantic landmarks, skip link
- Alt text on every image; visible focus rings; keyboard-operable dropdowns
- No horizontal overflow at any viewport; no console errors; no broken assets
- `prefers-reduced-motion` respected
- Scroll-reveal is gated behind an `html.js` class, so nothing is ever hidden
  from a visitor whose JavaScript did not run
- Light and dark themes, both explicitly painted

## Deployment

Any static host. `vercel.json` is included; `npm run build` outputs to `dist/`.

Set `SITE_URL` to override the canonical origin for preview deploys. The
production origin is set in `astro.config.mjs`.

**Domain note:** the company already owns `sarozthreadz.com` (registered 2024,
paid through 2034, on Cloudflare DNS) and it currently serves nothing. That is
the domain to use — no purchase needed. Point it at the host and 301 the old
`sarozthreadzjaipur.com/factory/` URL to it.

## Content sources

Every factual claim — 200,000 sq. ft., 600 single-needle lockstitch UBT
machines, 45 overlock, 10 flatlock, SMETA, BCI, Disney licensing, Government of
India export house recognition, the Sitapura address and the contact details —
comes from the client's existing site. Photography and the hero video are the
client's own assets, re-encoded.

Nothing was invented. There are no fabricated lead times, MOQs, opening hours,
client names or testimonials anywhere in this repository. `TODO.md` lists what
the client needs to confirm before launch.
