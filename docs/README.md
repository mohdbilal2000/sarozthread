# Client documents

## `saroz-threadz-website-phase-plan.pdf`

The phase plan for Saroz Threadz — 14 pages, A4, in the site's own dark/orange
identity and set in the site's own typefaces. It is deliberately visual: real
screenshots of the live build carry most of the argument, and every diagram is
drawn for a reader with no technical background.

Contents: what Phase 1 delivered (with the pages shown), the navigation fault
and its before/after, the product cards, the admin panel preview, why Next.js,
how SEO / AEO / GEO work, the commercial case, the four phases, the schedule and
the five roles, and the six things only the client can supply.

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
already a full A4 page and bleeds to the edge.

Every page is sized to fill exactly one sheet. After editing, check that no
section spills past its page and that none has opened a gap of dead space at the
bottom — both are visible immediately in the browser's print preview.
