# Before launch

## 1. The numbers that win or lose orders

These are the fields sourcing managers screen on. Each is currently rendered as
"quoted per style" or "on request" because we have no confirmed figure — which is
honest, but every one you can replace with a real number improves conversion and
the odds of being cited by an AI assistant answering *"who manufactures
embroidered dresses in India?"*.

Fill them in `src/data/company.ts` (the `facility` object) and they propagate to
every page, the FAQ, the schema and `llms.txt` automatically.

- [ ] **`moqPiecesPerStyle`** — even a range, or "from X, depends on fabric and
      colour count". The single most-searched question about any factory.
- [ ] **`monthlyCapacityPieces`** — pieces per month, ideally with the style mix
      it assumes.
- [ ] **`samplingLeadTimeDays`** — e.g. "proto in 14 days from approved tech
      pack". A concrete number converts better than "we'll agree a date".
- [ ] **`bulkLeadTimeDays`** — production window, and whether that is EXW or
      delivered.
- [ ] **`headcount`** — a standard buyer-questionnaire field.

## 2. Credibility

- [ ] **Client names.** "Global fashion brands" is weak. One named brand that
      permits it is worth more than the rest of the page — third-party
      recognition is one of the few things that genuinely lifts AI citations.
      `/about/clients` is built to hold them.
- [ ] **Certificate PDFs.** `/downloads` currently emails a request. Put the
      files in `public/documents/` and link them directly for the ones that can
      be public (Better Cotton membership, export house recognition). Keep the
      SMETA report request-only if you prefer.
- [ ] **Founding year.** The site says "40+ years", matching the old page. If the
      real year is known, add it and set `foundingDate` in `src/lib/schema.ts`.
- [ ] **CIN and GSTIN** for the footer — standard for an Indian exporter.
- [ ] **Leadership.** `/about/leadership` lists one person. Add the rest of the
      family and senior team in `src/data/company.ts` → `leadership`.

## 3. The concept gap — what Arun ji actually asked for

> *"design mein koi issue nahi hai — concept mein hai"* — 17 Sep, with screenshots
> of BK Fashions and Cheer Sagar attached.

His competitors lead with the things an Indian exporter is judged on, and the
site now has a slot for each. Three of them are still empty because only the
company can fill them:

- [ ] **A photograph of the building.** BK Fashions opens with their corporate
      block and "Since 1987". Our hero is a close-up of a needle.
- [ ] **A portrait of Arun.** The promoter's message on the home page currently
      runs beside a picture of the floor, because a stock photograph under his
      name would read as him. His own photograph is what the section is for.
- [ ] **The founding year.** `company.foundingYear` is null. "Since 19xx" under
      the wordmark is the cheapest standing a manufacturer can show — but it has
      to be the real year.
- [ ] **His own words.** `company.promoterMessage` is a draft written for him.
      One or two sentences in his voice are worth more than anything we write.
- [ ] **A short company film.** Both competitor sites carry one.
- [ ] **The remaining certification logos.** `CertificationStrip` shows real
      artwork for SMETA and Better Cotton and sets the other two as type. Drop a
      PNG into `src/assets/site/` and add it to `LOGOS` to upgrade one.

## 4. Photography — the biggest single gap

The existing library is entirely lookbook: garments on a model against a dark
backdrop. There is not one wide shot of the 200,000 sq. ft. floor with the lines
running. That is the image a buyer actually wants, and the one thing this site
claims but cannot show. A half-day with a photographer fixes it:

- [ ] Wide shot of the sewing floor, lines loaded
- [ ] The embroidery machines running — the main differentiator
- [ ] Cutting room, pattern/CAD room
- [ ] QA and finishing area
- [ ] Worker facilities — canteen, rest area — to support `/compliance`
- [ ] A portrait of Arun and the family. Buyers are choosing people.

Drop files into `src/assets/site/`, register them in `src/lib/images.ts`, and
reference them by name.

## 5. Technical

- [ ] Point `sarozthreadz.com` at Vercel — **the company already owns it**
      (registered 2024, paid through 2034, currently serving nothing).
- [ ] 301 `sarozthreadzjaipur.com/factory/` → the new domain so existing links
      and search equity carry over.
- [ ] Set `RESEND_API_KEY` + `ENQUIRY_TO` in Vercel so the contact form delivers
      by email. Until then it validates and tells buyers to email directly — safe,
      but a lost conversion every time. See `.env.example`.
- [ ] Verify in Google Search Console and submit `/sitemap.xml`.
- [ ] Add Plausible or Cloudflare Web Analytics — one script tag, no cookie
      banner, no change to the claims on `/privacy`.
- [ ] Replace `app/icon.svg` and `app/opengraph-image.jpg` if the company has a
      real logo.
- [ ] Consider a git-based CMS (Keystatic runs inside this Next app) if the
      client wants to edit copy without a developer.

## 6. Content that compounds

`/insights` is the part that earns citations over time — original, first-hand
explanation, published consistently. Two articles are live. Good next subjects,
all drawn from questions buyers actually ask:

- [ ] What SMETA actually audits, and what it does not
- [ ] Better Cotton vs organic vs recycled — what a brand is really buying
- [ ] How to write a tech pack a factory can quote from without follow-ups
- [ ] Why co-ord sets should be cut from one fabric lot
- [ ] Sampling to shipment: a realistic calendar for a 12-style collection

Add a `.mdx` file to `content/insights/` with the same front-matter fields as the
existing two — the listing, sitemap, RSS and schema pick it up automatically.
