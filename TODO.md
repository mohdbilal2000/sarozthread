# Before launch

Things the site asserts, implies, or needs that only the client can confirm.

## Confirm with Saroz Threadz

- [ ] **Founding year.** The site says "40+ years", matching the old page. If the real
      founding year is known, add it to the hero eyebrow, the About page and the
      `foundingDate` field in the JSON-LD block in `build.py`.
- [ ] **Sampling lead time.** Currently unstated. A concrete number ("proto in 14 days")
      converts far better than "we'll agree a date" — add it to the CTA copy if true.
- [ ] **MOQ.** Buyers screen on this. If there is a workable minimum per style/colour,
      put it on `capabilities.html`; if it genuinely varies, say what it depends on.
- [ ] **Monthly capacity.** Pieces per month is the other number every sourcing manager
      looks for. The machine count implies it, but stating it is stronger.
- [ ] **Client list / logos.** "Global fashion brands" is weak without names. Any brand
      that permits being named is worth more than the rest of the page.
- [ ] **Certificate copies.** Linking a current SMETA report summary or BCI membership
      certificate (PDF) turns a claim into evidence.
- [ ] **Opening hours** for the contact page, if they want them listed.
- [ ] **Company registration / CIN and GSTIN** — usual in the footer for an Indian
      exporter and a small trust signal.

## Technical

- [ ] Point the chosen domain at the host and set `SITE_URL` in `build.py` (currently
      `https://www.sarozthreadz.com`), then re-run `python3 build.py`.
- [ ] Replace `assets/img/favicon.svg` if the company has a real mark.
- [ ] Consider a proper form endpoint (Formspree, Web3Forms, or Vercel Functions) if the
      mailto RFQ proves awkward for buyers on corporate webmail.
- [ ] Add Plausible or Cloudflare Web Analytics — one script tag, no cookie banner.
- [ ] Better factory photography. The strongest asset the site is missing is a wide shot
      of the 200,000 sq. ft. floor with the lines running. The current photography is
      lookbook-led; buyers want to see the floor.
