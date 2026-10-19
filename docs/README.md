# Client documents

## `saroz-threadz-website-phase-plan.pdf`

The phase plan for Saroz Threadz — 15 pages, A4, in the site's own ivory/madder
identity and set in the site's own typefaces (Fraunces, Inter, IBM Plex Mono). It is deliberately visual: real
screenshots of the live build carry most of the argument, and every diagram is
drawn for a reader with no technical background.

Contents: what Phase 1 delivered (with the pages shown), the navigation fault
and its before/after, the product cards, the admin panel preview, what the
client wants the panel to do, why Next.js, how SEO / AEO / GEO work, the
commercial case, the four phases, the schedule and the five roles, and the six
things only the client can supply.

It carries no pricing, by design — it is the work, not the quote.

The palette variable NAMES in `deck.css` are still the old dark ones (`--void`,
`--carbon`, `--ash`). Read them as roles rather than colours: every rule and
every inline style in `deck.html` refers to them, so re-skinning the deck means
changing what they point at, not rewriting 52KB of markup.

### Regenerating it

`phase-plan/` holds the source:

- `deck.html` — one `<section class="page">` per A4 page
- `deck.css` — the design system, mirroring `app/globals.css`
- `shots/` — screenshots of the live site, JPEG

Screenshots were captured from a production build (`next build && next start`)
at 1440×900 for desktop and 390×844 for phones, with the reveal animations
forced to their finished state so nothing is caught mid-fade.

To rebuild the PDF, open `deck.html` in a browser and print to PDF at A4 with
background graphics on and **all four margins set to zero** — each section is
already a full A4 page and bleeds to the edge. Headless Chromium does the same
job: `page.pdf({format:'A4', printBackground:true, margin:0})`.

The admin screenshots come from `tools/admin-mock.html`, a static mockup in the
site's palette. It is not wired to anything and nothing depends on it; it exists
so the client can see what "you will run it yourself" looks like.

Every page is sized to fill exactly one sheet. After editing, check that no
section spills past its page and that none has opened a gap of dead space at the
bottom — both are visible immediately in the browser's print preview.
