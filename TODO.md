# Before launch

## 1. The numbers that win or lose orders

These are the fields sourcing managers screen on. Every one of them is currently
rendered as "on request" because we do not have a confirmed figure — which is
honest, but each one you can replace with a real number measurably improves both
conversion and the odds of being cited by an AI assistant answering *"who
manufactures embroidered dresses in India?"*.

Fill them in `src/data/company.ts` (the `facility` object) and they propagate to
every page, the FAQ, the schema and `llms.txt` automatically.

- [ ] **`moqPiecesPerStyle`** — minimum order quantity, even as a range or a
      "from X, depends on fabric and colour count". The single most-searched
      question about any factory.
- [ ] **`monthlyCapacityPieces`** — pieces per month, ideally with the style mix
      it assumes. The machine count implies it; stating it is far stronger.
- [ ] **`samplingLeadTimeDays`** — e.g. "proto in 14 days from approved tech
      pack". A concrete number converts better than "we'll agree a date".
- [ ] **`bulkLeadTimeDays`** — production window, and whether that is EXW or
      delivered.
- [ ] **`headcount`** — number of workers. A standard buyer-questionnaire field.

## 2. Credibility

- [ ] **Client names.** "Global fashion brands" is weak. One named brand that
      permits it is worth more than the rest of the page — and third-party
      recognition is one of the few things that genuinely lifts AI citations.
- [ ] **Certificate PDFs.** Linking a current SMETA report summary and BCI
      membership certificate turns a claim into evidence. Drop them in `public/`
      and link from `/compliance/`.
- [ ] **Founding year.** The site says "40+ years", matching the old page. If the
      actual year is known, add it and set `foundingDate` in
      `src/lib/schema.ts`.
- [ ] **CIN and GSTIN.** Standard in an Indian exporter's footer, and a small
      trust signal for first-time buyers.
- [ ] **Opening hours**, if the company wants them listed on `/contact/`.

## 3. Photography — the biggest single gap

The existing library is entirely lookbook: garments on a model against a dark
backdrop. There is not one wide shot of the 200,000 sq. ft. floor with the lines
running.

That is the image a buyer actually wants, and it is the one thing this site
claims but cannot show. A half-day with a photographer would fix it:

- [ ] Wide shot of the sewing floor, lines loaded
- [ ] The embroidery machines running (the main differentiator)
- [ ] The cutting room and the pattern/CAD room
- [ ] The QA and finishing area
- [ ] Worker facilities — canteen, rest area — to support the compliance page
- [ ] A portrait of Arun and the family. Buyers are choosing people.

Drop new images into `src/assets/site/` and reference them by filename via the
`SiteImage` component.

## 4. Technical

- [ ] Point `sarozthreadz.com` at the host — **the company already owns it**
      (registered 2024, paid through 2034, currently serving nothing).
- [ ] 301 redirect `sarozthreadzjaipur.com/factory/` → the new domain, so any
      existing links and search equity carry over.
- [ ] Verify the property in Google Search Console and submit
      `/sitemap-index.xml`.
- [ ] Add Plausible or Cloudflare Web Analytics — one script tag, no cookie
      banner, no change to the privacy page's claims.
- [ ] Decide on the contact form: keep the mailto fallback (works, private, free)
      or set `PUBLIC_FORM_ENDPOINT` to a hosted endpoint. See `.env.example`.
- [ ] Replace `public/favicon.svg` if the company has a real mark.
- [ ] Consider a git-based CMS (Keystatic is free, open source, and runs inside
      this Astro app) if the client wants to edit copy without a developer.

## 5. Content that compounds

`/insights/` is the part of the site that earns citations over time — original,
first-hand explanation of how manufacturing works, published consistently. Two
articles are live. Good next subjects, all drawn from questions buyers actually
ask:

- [ ] What SMETA actually audits, and what it does not
- [ ] Better Cotton vs organic vs recycled — what a brand is really buying
- [ ] How to write a tech pack a factory can quote from without follow-ups
- [ ] Why co-ord sets should be cut from one fabric lot
- [ ] Sampling to shipment: a realistic calendar for a 12-style collection
