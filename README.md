# Saroz Threadz

The website for [Saroz Threadz Pvt Ltd](https://www.sarozthreadz.com), a
third-generation womenswear manufacturer in Jaipur, India.

**Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Vercel**

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

---

## Why this exists

The previous site was a Canva export: a ~200 KB JavaScript bundle rendering one
page client-side, with no crawlable text, one URL for everything, no metadata
and no sitemap. Every heading was locked inside a Canva design file.

For a factory whose buyers arrive by searching *"womenswear manufacturer Jaipur
embroidery"* — or increasingly by asking an AI assistant that question — that is
a commercial problem, not a cosmetic one.

## Design system

Bold industrial. The rules are enforced in `app/globals.css` and hold across
every page:

- **Zero border radius.** Nothing is soft.
- **Structure is drawn with 1px rules, never shadows.** The `.ruled` class bleeds
  vertical lines through every band so sections sit on a visible grid.
- **Numbers are the loudest thing on the page.** `text-num` and `StatRow` exist
  for that alone.
- **Monospace labels, sans prose, heavy condensed Archivo headlines.** Archivo is
  variable on both weight and width axes, which is what gives the display type
  its industrial set.
- **Orange is a signal, not a decoration** — it marks one thing per view.

Light sections use `.section-light`, which re-declares the palette tokens rather
than overriding rules one by one, so any component dropped inside just works.

> Note: the class is `section-light`, not `invert` — `invert` collides with
> Tailwind's `filter: invert()` utility, which silently darkens the whole band.

## Architecture

### One data layer, many surfaces

Every buyer-facing fact lives in `src/data/`. Pages, JSON-LD, `llms.txt`, the
sitemap and the RSS feed all read from it, so the machine-readable markup can
never contradict the visible copy, and the address in the footer can never drift
from the address in the schema.

| File | Holds |
| --- | --- |
| `company.ts` | Name, address, contact, markets, machinery, certifications, leadership, documents |
| `capabilities.ts` | Six capability pages, each with a question/answer pair |
| `products.ts` | Five product categories and the lookbook index |
| `faq.ts` | 28 answered questions, tagged by topic and by page |
| `process.ts` | The seven order steps, also used for HowTo schema |
| `quality.ts` | Six quality gates and the sample-type table |
| `sustainability.ts` | Material options, practices, and what we do *not* claim |
| `careers.ts` | Values and open application areas |

Facts the company has not confirmed are `null` in the data layer and render as
"on request" rather than being invented. See `TODO.md`.

### Routes (35)

```
/                                  Home
/capabilities  + 6 detail pages
/products      + 5 category pages
/factory       /quality      /compliance    /sustainability
/process       /about        /about/leadership  /about/clients
/careers       /lookbook     /downloads     /faq       /contact
/insights      + article pages
/privacy       /terms        /accessibility  404
/robots.txt    /sitemap.xml  /llms.txt      /rss.xml   /opengraph-image.jpg
```

Six capability pages and five category pages exist because a single "what we do"
page cannot rank for, or be cited on, eleven different queries. Eleven can.

## AI search (AEO / GEO)

What we built, and honestly what each part is worth.

**What actually drives citations.** Research through 2026 converges on three bars
a page must clear at once: it has to be *retrievable* by AI crawlers, *structured
for passage-level retrieval*, and *credible enough to quote*. Pages carrying
statistics, tables and structured lists show materially higher visibility in AI
answers than prose does.

The content is built around that, not around markup tricks:

- **`AnswerBlock`** — a question-shaped heading with a self-contained answer
  directly beneath it. The answer names the company, states one fact, and does
  not depend on the surrounding page for context, so it survives being quoted
  alone. The single highest-leverage pattern on the site.
- **`SpecTable`** — every number the factory can state sits in a real `<table>`
  with a `<caption>` and `<th scope>`, not buried in a sentence.
- **28 FAQ answers**, deliberately short. Long answers get paraphrased; short,
  specific ones get quoted verbatim.
- **`/insights/`** — original, first-hand explanation of how garment
  manufacturing works. This is the part that compounds.
- **`robots.ts`** names and allows the AI crawlers explicitly, with a comment
  documenting how to opt out of training while staying citable.

**What is worth less than the industry claims.** Google stated in 2026 that no
special schema is required for AI Overviews or AI Mode, and a study that year
found adding JSON-LD to already-visible pages did not measurably lift citation
rates. Google's own guidance calls out `llms.txt` as unnecessary.

We ship both anyway — they are nearly free once the data layer exists, and they
earn their keep elsewhere: JSON-LD for classic rich results and entity
disambiguation, `llms.txt` for the smaller agent frameworks that do fetch it and
as a single accurate summary a human can paste into a brief. But they are not
why this site will get cited. `src/lib/schema.ts` and `app/llms.txt/route.ts`
both say so in their headers, so nobody maintaining this later mistakes the
ornament for the engine.

Emitted per page: `Organization`+`Manufacturer`, `Place`, `WebSite`,
`BreadcrumbList`, plus `Service`, `FAQPage`, `HowTo` or `Article` where relevant
— one `@graph` with stable `@id`s.

## The contact form

A React Server Action (`app/contact/actions.ts`) with Zod validation that runs on
the server, so it cannot be bypassed by disabling the client script. Progressive
enhancement: `useActionState` + `useFormStatus` give inline errors and a pending
state, and the form still posts without JavaScript.

Delivery is pluggable — set `RESEND_API_KEY` or `FORM_WEBHOOK_URL`. With neither
configured the action still validates and tells the buyer exactly where to email
the brief, so an enquiry is never silently swallowed. See `.env.example`.

There is a honeypot field, and a tripped honeypot returns success so the bot
learns nothing.

## Performance and privacy

- Static prerendering for all 35 routes; only `llms.txt` and `rss.xml` are dynamic.
- Fonts self-hosted as latin-subset `woff2` via `next/font/local` — no Google
  Fonts request, so no third-party call from EU visitors.
- Images through `next/image` with static imports (intrinsic sizing, blur
  placeholders, AVIF/WebP).
- No cookies, no analytics, no trackers. Nothing needing a consent banner.
- Security headers in `next.config.ts`.

## Accessibility

Verified across 26 routes × 3 viewports (390 / 768 / 1440), and separately with
JavaScript disabled:

- One `<h1>` per page, no heading-level skips, semantic landmarks, skip link
- Alt text on every image; no control without an accessible name
- No horizontal overflow at any viewport; no console errors; no broken assets
- Mega menu opens on focus as well as hover and closes on Escape
- FAQ accordions are native `<details>` — they work with JavaScript off
- Scroll reveal is gated behind an `html.js` class, so nothing is ever hidden
  from a visitor whose script did not run; disabled under `prefers-reduced-motion`

There is a published statement at `/accessibility` listing known limitations.

## Deployment

Vercel, zero config — it detects Next.js and runs `npm run build`. Set the env
vars from `.env.example` in the project settings.

**Domain:** the company already owns `sarozthreadz.com` (registered 2024, paid
through 2034, on Cloudflare DNS) and it currently serves nothing. That is the
domain to use — no purchase needed. Point it at Vercel and 301 the old
`sarozthreadzjaipur.com/factory/` URL to it.

## Content sources

Every factual claim — 200,000 sq. ft., 600 single-needle lockstitch UBT machines,
45 overlock, 10 flatlock, SMETA, BCI, Disney licensing, Government of India
export house recognition, the Sitapura address and contact details — comes from
the client's existing site. Photography and the hero video are the client's own
assets, re-encoded.

Nothing was invented. There are no fabricated lead times, MOQs, opening hours,
client names or testimonials anywhere in this repository. `TODO.md` lists what
the client needs to confirm before launch.
