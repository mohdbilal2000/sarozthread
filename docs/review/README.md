# Client review deck

`docs/saroz-threadz-new-website.pdf` — eight A4 pages for Arun, showing the new
site and linking to the working address it is served from.

## Regenerating

The fonts are read from `public/fonts/`, so the deck always sets in the site's
own typefaces.

```sh
# 1. screenshots — start the built site first
npm run build && npm start -- -p 3281
#    then drive a headless browser over the pages listed in deck.html
#    and write JPEGs into docs/review/shots/

# 2. the PDF
chrome --headless --no-pdf-header-footer \
  --print-to-pdf=docs/saroz-threadz-new-website.pdf \
  docs/review/deck.html
```

## Two things to keep true

- **The link.** Every mention of the review address appears on the cover and the
  closing page. It is a Vercel branch URL, not the company's address — the deck
  says so in both places, so nobody reads it as the finished site.
- **No pricing.** There are no figures, rates or payment terms anywhere in the
  deck, and there should not be.

Screenshots are captured at deviceScaleFactor 2 so they stay sharp in print.
Never screenshot an external site from inside this environment for the deck —
the proxy returns a TLS interstitial and you will paste a browser error into a
client document.
