#!/usr/bin/env python3
"""
Static site generator for sarozthreadz.com.

There is no toolchain, no npm, no framework. This script stitches a shared
layout around per-page content and writes plain HTML to the repo root, so the
output can be served by any static host (Vercel, Netlify, Cloudflare Pages,
GitHub Pages, or an S3 bucket) with zero build step in CI.

    python3 build.py

Edit content here, re-run, commit the generated HTML.
"""

from pathlib import Path

ROOT = Path(__file__).parent
SITE_URL = "https://www.sarozthreadz.com"

COMPANY = "Saroz Threadz Pvt Ltd"
ADDRESS_LINES = [
    "Sitapura Industrial Area",
    "Garment Zone, Tonk Road",
    "Jaipur 302022, Rajasthan, India",
]
EMAIL_TRADE = "sarozthreadz.trade@gmail.com"
EMAIL_ARUN = "arun@sarozthreadz.com"
PHONE_DISPLAY = "+91 98293 14999"
PHONE_TEL = "+919829314999"
CONTACT_NAME = "Arun Lashkery"

NAV = [
    ("capabilities.html", "Capabilities"),
    ("collections.html", "Product Range"),
    ("responsibility.html", "Responsibility"),
    ("about.html", "About"),
    ("contact.html", "Contact"),
]


# --------------------------------------------------------------------------
# Layout
# --------------------------------------------------------------------------

def icon_arrow() -> str:
    return (
        '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">'
        '<path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.2" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg>'
    )


def nav_html(active: str, mobile: bool = False) -> str:
    out = []
    for href, label in NAV:
        current = ' aria-current="page"' if href == active else ""
        out.append(f'<a href="{href}"{current}>{label}</a>')
    if mobile:
        out.append(
            '<a class="btn" href="contact.html" style="text-transform:uppercase">'
            "Request a quote</a>"
        )
    return "\n        ".join(out)


def header_html(active: str) -> str:
    return f"""<header class="header">
    <div class="wrap header__inner">
      <a class="brand" href="index.html">
        <span class="brand__mark">Saroz&nbsp;Threadz</span>
        <span class="brand__sub">Jaipur</span>
      </a>
      <nav class="nav" aria-label="Primary">
        {nav_html(active)}
      </nav>
      <a class="btn header__cta" href="contact.html">Request a quote</a>
      <button class="nav-toggle" type="button" aria-expanded="false"
              aria-controls="drawer" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="drawer" id="drawer">
      <nav aria-label="Mobile">
        {nav_html(active, mobile=True)}
      </nav>
    </div>
  </header>"""


FOOTER = f"""<footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">Saroz Threadz</div>
          <p class="small" style="margin-top:1rem;max-width:32ch;color:rgba(240,236,229,.6)">
            Third-generation apparel manufacturing in Jaipur, India. Womenswear
            development and bulk production for global fashion brands.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="capabilities.html">Capabilities</a></li>
            <li><a href="collections.html">Product range</a></li>
            <li><a href="responsibility.html">Responsibility</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:{EMAIL_TRADE}">{EMAIL_TRADE}</a></li>
            <li><a href="mailto:{EMAIL_ARUN}">{EMAIL_ARUN}</a></li>
            <li><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></li>
          </ul>
        </div>
        <div>
          <h4>Factory</h4>
          <ul>
            {"".join(f"<li>{line}</li>" for line in ADDRESS_LINES)}
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>&copy; <span id="year">2026</span> {COMPANY}. All rights reserved.</span>
        <span>SMETA audited &middot; Better Cotton member &middot; Government of India recognised export house</span>
      </div>
    </div>
  </footer>"""


ORG_JSONLD = f"""{{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{COMPANY}",
  "alternateName": "Saroz Threadz",
  "url": "{SITE_URL}/",
  "description": "Third-generation womenswear manufacturer in Jaipur, India. Embroidery, printing and value-added detailing from sampling to bulk production.",
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "Sitapura Industrial Area, Garment Zone, Tonk Road",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302022",
    "addressCountry": "IN"
  }},
  "email": "{EMAIL_TRADE}",
  "telephone": "{PHONE_TEL}",
  "contactPoint": [{{
    "@type": "ContactPoint",
    "contactType": "sales",
    "name": "{CONTACT_NAME}",
    "email": "{EMAIL_ARUN}",
    "telephone": "{PHONE_TEL}",
    "availableLanguage": ["en", "hi"]
  }}],
  "areaServed": ["North America", "South America", "Europe", "Asia"],
  "knowsAbout": ["Apparel manufacturing", "Embroidery", "Garment printing", "Womenswear production"]
}}"""


def page(*, slug, title, description, body, active="", jsonld=None, og_image="assets/img/site/hero-poster.webp"):
    canonical = f"{SITE_URL}/" if slug == "index.html" else f"{SITE_URL}/{slug}"
    extra_jsonld = (
        f'\n  <script type="application/ld+json">{jsonld}</script>' if jsonld else ""
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="{canonical}">
  <meta name="theme-color" content="#16151a" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f7f4ef" media="(prefers-color-scheme: light)">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Saroz Threadz">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SITE_URL}/{og_image}">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/img/favicon.svg">

  <link rel="preload" href="assets/fonts/fraunces-normal-300_600-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/inter-normal-400-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/css/fonts.css">
  <link rel="stylesheet" href="assets/css/site.css">

  <script type="application/ld+json">{ORG_JSONLD}</script>{extra_jsonld}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  {header_html(active)}
  <main id="main">
{body}
  </main>
  {FOOTER}
  <script src="assets/js/site.js" defer></script>
  <script>document.getElementById('year').textContent=new Date().getFullYear();</script>
</body>
</html>
"""


# --------------------------------------------------------------------------
# Shared blocks
# --------------------------------------------------------------------------

CTA = """    <section class="cta">
      <div class="wrap cta__inner">
        <p class="eyebrow" style="color:rgba(255,255,255,.6)">Start a programme</p>
        <h2 class="h1">Send us a tech pack. We will come back with a costing and a sampling plan.</h2>
        <p>Tell us your category, quantities and delivery window, and we will come back
           with a costing, a sampling plan, and an honest view of whether we are the right
           factory for it.</p>
        <div class="cta__actions">
          <a class="btn btn--light" href="contact.html">Request a quote</a>
          <a class="btn btn--outline-light" href="capabilities.html">See capabilities</a>
        </div>
      </div>
    </section>"""


def stat(num, sup, label):
    sup_html = f"<span>{sup}</span>" if sup else ""
    return f"""<div class="stat">
            <div class="stat__num">{num}{sup_html}</div>
            <div class="stat__label">{label}</div>
          </div>"""


STATBAR = f"""    <section class="statbar">
      <div class="wrap" style="padding-inline:0">
        <div class="statbar__grid">
          {stat("40", "+", "Years in garment manufacturing")}
          {stat("200,000", "", "Sq. ft. of production floor")}
          {stat("655", "", "Sewing machines in house")}
          {stat("3", "rd", "Generation, family owned")}
        </div>
      </div>
    </section>"""


LOOKS = [
    ("hand-embroidered-tunic", "Hand-embroidered tunic", "Cotton voile &middot; placement embroidery"),
    ("printed-maxi-dress", "Printed maxi dress", "Rayon &middot; all-over print"),
    ("oversized-poplin-shirt", "Oversized poplin shirt", "Yarn-dyed cotton &middot; drop shoulder"),
    ("tiered-ruffle-dress", "Tiered ruffle dress", "Viscose georgette &middot; multi-panel"),
    ("embroidered-blouse", "Embroidered blouse", "Cotton &middot; contrast thread work"),
    ("printed-jumpsuit", "Printed jumpsuit", "Rayon &middot; strappy silhouette"),
    ("tiered-midi-dress", "Tiered midi dress", "Cotton dobby &middot; gathered tiers"),
    ("placket-embroidered-shirt", "Placket embroidery shirt", "Cotton &middot; centre-front detail"),
    ("cotton-flutter-top", "Flutter-sleeve top", "Cotton slub &middot; pintuck yoke"),
    ("block-print-dress", "Block-print dress", "Cotton &middot; hand-feel print"),
    ("ditsy-print-dress", "Ditsy print dress", "Viscose &middot; wrap front"),
    ("striped-embroidered-blouse", "Striped embroidered blouse", "Cotton &middot; tonal stripe"),
    ("pintuck-shirt-dress", "Pintuck shirt dress", "Cotton lawn &middot; pintuck panels"),
    ("floral-kaftan-dress", "Floral kaftan dress", "Rayon &middot; tiered volume"),
]


def look_grid(items, lazy_from=4):
    cells = []
    for i, (slug, name, detail) in enumerate(items):
        loading = "eager" if i < lazy_from else "lazy"
        cells.append(f"""<figure class="look">
            <img src="assets/img/lookbook/{slug}.webp" alt="{name} produced by Saroz Threadz"
                 width="900" height="1200" loading="{loading}" decoding="async">
            <figcaption class="look__meta">{name}<br><span style="opacity:.7">{detail}</span></figcaption>
          </figure>""")
    return "\n          ".join(cells)


# --------------------------------------------------------------------------
# Pages
# --------------------------------------------------------------------------

def home():
    body = f"""    <section class="hero">
      <div class="hero__media">
        <video src="assets/video/atelier.mp4" poster="assets/img/site/hero-poster.webp"
               autoplay muted loop playsinline preload="metadata"
               aria-label="Close-up of embroidery being stitched in the Saroz Threadz factory"></video>
      </div>
      <div class="wrap hero__inner">
        <p class="eyebrow">Jaipur, India &middot; 40+ years</p>
        <h1>Garments made the way the tech pack said they would be.</h1>
        <p class="hero__lede">
          Saroz Threadz is a third-generation, family-run womenswear manufacturer.
          Embroidery, printing and value-added detailing, taken from first sample
          to shipped bulk under one roof.
        </p>
        <div class="hero__actions">
          <a class="btn btn--light" href="contact.html">Request a quote</a>
          <a class="btn btn--outline-light" href="capabilities.html">Factory &amp; capacity</a>
        </div>
        <p class="hero__scroll">SMETA audited &middot; Better Cotton &middot; Disney-licensed programmes</p>
      </div>
    </section>

{STATBAR}

    <section class="section">
      <div class="wrap split">
        <div data-reveal>
          <p class="eyebrow">Who we are</p>
          <h2 class="h1">Forty years of one family answering for the same factory floor.</h2>
        </div>
        <div class="prose" data-reveal="80" style="font-size:var(--t-lg)">
          <p>
            Saroz Threadz Pvt Ltd has manufactured fashion garments in Jaipur for over
            four decades, now under its third generation. We specialise in womenswear
            with real handwork content &mdash; embroidery, print and the finishing detail
            that makes a garment look more expensive than it costs.
          </p>
          <p>
            Our factory operates in full compliance with international standards. We are
            SMETA audited, approved under the Better Cotton Initiative, authorised to work
            on licensed programmes including Disney, and recognised as an export house by
            the Government of India.
          </p>
          <p class="mt-2">
            <a class="link-arrow" href="about.html">Read our story {icon_arrow()}</a>
          </p>
        </div>
      </div>
    </section>

    <section class="section--tight" style="padding-top:0">
      <div class="wrap grid grid--2">
        <figure class="figure figure--wide" data-reveal>
          <img src="assets/img/site/artisan-at-machine.webp" width="1600" height="1067"
               loading="lazy" decoding="async"
               alt="A machinist finishing a garment at a sewing station">
          <figcaption>Finishing line &middot; Sitapura</figcaption>
        </figure>
        <figure class="figure figure--wide" data-reveal="120">
          <img src="assets/img/site/stitching-poster.webp" width="1600" height="900"
               loading="lazy" decoding="async"
               alt="Close-up of stitching detail on a white cotton garment">
          <figcaption>In-house embroidery</figcaption>
        </figure>
      </div>
    </section>

    <section class="section band">
      <div class="wrap">
        <div class="split" style="align-items:end">
          <div data-reveal>
            <p class="eyebrow">What we do</p>
            <h2 class="h1">Four disciplines, one accountable team.</h2>
          </div>
          <p class="prose" data-reveal="80">
            You brief one factory, not a chain of subcontractors. Cutting, sewing,
            embroidery, finishing and packing happen on our own floor; printing runs
            through printing houses we have used for decades.
          </p>
        </div>
        <div class="grid grid--4 mt-4">
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal>
            <span class="card__num">01</span>
            <h3 class="h3">Embroidery</h3>
            <p>In-house embroidery machines mean quality, timeline and revisions stay
               under our control instead of a vendor's queue.</p>
          </article>
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal="80">
            <span class="card__num">02</span>
            <h3 class="h3">Printing</h3>
            <p>Long-standing printing partners give consistent results across a wide
               range of fabrics, from cotton lawn to viscose georgette.</p>
          </article>
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal="160">
            <span class="card__num">03</span>
            <h3 class="h3">Pattern &amp; fit</h3>
            <p>CAD pattern development and grading, so fit revisions are fast and the
               bulk marker matches the approved sample.</p>
          </article>
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal="240">
            <span class="card__num">04</span>
            <h3 class="h3">Bulk production</h3>
            <p>655 machines across single-needle, overlock and flatlock, arranged for
               flexible line changes on short and mid-size runs.</p>
          </article>
        </div>
        <p class="mt-4" data-reveal>
          <a class="link-arrow" href="capabilities.html" style="color:#fff;border-color:rgba(255,255,255,.3)">
            Full machinery list {icon_arrow()}</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="split" style="align-items:end">
          <div data-reveal>
            <p class="eyebrow">Product range</p>
            <h2 class="h1">Womenswear built around handwork.</h2>
          </div>
          <p class="prose" data-reveal="80">
            Dresses, tunics, blouses, shirts and jumpsuits in cotton, rayon and viscose &mdash;
            developed to your design or from our seasonal range.
          </p>
        </div>
        <div class="lookbook mt-4" data-reveal>
          {look_grid(LOOKS[:8], lazy_from=0)}
        </div>
        <p class="mt-3" data-reveal>
          <a class="link-arrow" href="collections.html">See the full range {icon_arrow()}</a>
        </p>
      </div>
    </section>

    <section class="section--tight" style="background:var(--paper-2);border-block:1px solid var(--line)">
      <div class="wrap split split--even" style="align-items:center">
        <div data-reveal>
          <p class="eyebrow">Compliance</p>
          <h2 class="h2">Audited, not asserted.</h2>
          <p class="prose mt-2">
            Buyers should not have to take a factory's word for it. Our standards are
            third-party audited and our certifications are current.
          </p>
          <div class="certs mt-3">
            <img src="assets/img/site/logo-smeta.png" alt="Sedex SMETA audited" width="600" height="120" loading="lazy">
            <img src="assets/img/site/logo-bci.png" alt="Better Cotton Initiative member" width="600" height="200" loading="lazy">
          </div>
        </div>
        <div data-reveal="120">
          <ul class="stack" style="--stack-gap:.75rem">
            <li><span class="cert-chip">SMETA audited</span></li>
            <li><span class="cert-chip">Better Cotton Initiative</span></li>
            <li><span class="cert-chip">Disney licensed programmes</span></li>
            <li><span class="cert-chip">Government of India export house</span></li>
            <li><span class="cert-chip">Zero tolerance on child labour</span></li>
          </ul>
          <p class="mt-3">
            <a class="link-arrow" href="responsibility.html">How we work {icon_arrow()}</a>
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div data-reveal>
          <p class="eyebrow">Where we ship</p>
          <h2 class="h1">Working with brands across four continents.</h2>
          <p class="prose mt-2">
            We export to buyers in North America, South America, Europe and Asia,
            handling documentation, inspection and logistics coordination in house.
          </p>
        </div>
        <div data-reveal="80">
          <div class="regions">
            <div class="region"><strong>North America</strong><span>USA &middot; Canada</span></div>
            <div class="region"><strong>South America</strong><span>Export programmes</span></div>
            <div class="region"><strong>Europe</strong><span>EU &middot; UK</span></div>
            <div class="region"><strong>Asia</strong><span>Regional buyers</span></div>
          </div>
          <div class="quote mt-4">
            <blockquote>&ldquo;Long-term partnerships built on trust, consistency and reliability.&rdquo;</blockquote>
            <cite>{CONTACT_NAME} &middot; Business Contact</cite>
          </div>
        </div>
      </div>
    </section>

{CTA}"""
    return page(
        slug="index.html",
        title="Saroz Threadz — Womenswear Manufacturer in Jaipur, India",
        description=(
            "Third-generation garment manufacturer in Jaipur. 200,000 sq. ft., 655 machines, "
            "in-house embroidery, SMETA audited and Better Cotton approved. Sampling to bulk "
            "womenswear production for global brands."
        ),
        body=body,
        active="",
    )


def capabilities():
    body = f"""    <section class="pagehead">
      <div class="wrap">
        <p class="eyebrow">Capabilities</p>
        <h1>A 200,000 sq. ft. floor, arranged for garments that need handwork.</h1>
        <p class="lede">
          Most of what a buyer needs to know about a factory is the machine list, who
          controls the value-added processes, and what happens when a fit comment comes
          back. Here is all three.
        </p>
      </div>
    </section>

{STATBAR}

    <section class="section">
      <div class="wrap">
        <p class="eyebrow" data-reveal>Machinery</p>
        <h2 class="h1" data-reveal style="max-width:20ch">Sewing capacity, itemised.</h2>
        <div class="grid grid--3 mt-4">
          <div class="spec" data-reveal>
            <dt>Single-needle lockstitch</dt>
            <dd>600 <small>UBT machines &mdash; the backbone of our dress, blouse and shirt lines.</small></dd>
          </div>
          <div class="spec" data-reveal="80">
            <dt>Overlock</dt>
            <dd>45 <small>Four-thread and five-thread machines for seam construction and edge finishing.</small></dd>
          </div>
          <div class="spec" data-reveal="160">
            <dt>Flatlock</dt>
            <dd>10 <small>Flat machines for hems, covering stitches and comfort seams.</small></dd>
          </div>
          <div class="spec" data-reveal>
            <dt>Embroidery</dt>
            <dd>In house <small>Owned machines, so sampling, quality and timelines are not queued behind another factory's orders.</small></dd>
          </div>
          <div class="spec" data-reveal="80">
            <dt>Pattern making</dt>
            <dd>CAD <small>Digital pattern development, grading and marker making for fit accuracy and efficient revisions.</small></dd>
          </div>
          <div class="spec" data-reveal="160">
            <dt>Printing</dt>
            <dd>Partnered <small>Long-term, trusted printing houses with consistent results across cotton, rayon and viscose.</small></dd>
          </div>
        </div>
      </div>
    </section>

    <section class="section--tight" style="padding-top:0">
      <div class="wrap grid grid--2">
        <figure class="figure figure--wide" data-reveal>
          <img src="assets/img/site/hero-poster.webp" width="1600" height="900" loading="lazy"
               decoding="async" alt="Embroidery being stitched on patterned fabric">
          <figcaption>Embroidery &middot; in house</figcaption>
        </figure>
        <figure class="figure figure--wide" data-reveal="120">
          <img src="assets/img/site/cad-poster.webp" width="1600" height="900" loading="lazy"
               decoding="async" alt="Pattern development work at a laptop in the sampling room">
          <figcaption>CAD pattern development</figcaption>
        </figure>
      </div>
    </section>

    <section class="section band">
      <div class="wrap">
        <div class="split" style="align-items:end">
          <div data-reveal>
            <p class="eyebrow">Process</p>
            <h2 class="h1">From tech pack to container.</h2>
          </div>
          <p class="prose" data-reveal="80">
            Each stage has a named owner on our side. You are not passed between
            departments, and you are told early when something will not work.
          </p>
        </div>
        <div class="steps mt-4" style="--line:rgba(255,255,255,.14)">
          <div class="step" data-reveal>
            <div class="step__idx">01</div>
            <h3 class="h3">Enquiry &amp; costing</h3>
            <p>Send a tech pack, sketch or reference garment with target quantities. We
               come back with a costing, fabric options and an honest view of whether the
               construction suits our floor.</p>
          </div>
          <div class="step" data-reveal="60">
            <div class="step__idx">02</div>
            <h3 class="h3">Sampling</h3>
            <p>Pattern is drafted in CAD; a proto or fit sample follows. Embroidery and
               print strike-offs are developed alongside so approvals do not stack up at
               the end.</p>
          </div>
          <div class="step" data-reveal="120">
            <div class="step__idx">03</div>
            <h3 class="h3">Fit &amp; approval</h3>
            <p>Comments are worked into a revised pattern. Because grading and markers are
               digital, revisions are quick and the bulk marker matches the sample you signed.</p>
          </div>
          <div class="step" data-reveal="180">
            <div class="step__idx">04</div>
            <h3 class="h3">Bulk production</h3>
            <p>Fabric in-house, cutting, line loading and sewing with inline checks. Handwork
               runs parallel to the sewing lines rather than after them.</p>
          </div>
          <div class="step" data-reveal="240">
            <div class="step__idx">05</div>
            <h3 class="h3">Finishing &amp; QA</h3>
            <p>Pressing, trims, measurement checks and a final AQL inspection before packing.
               Third-party inspections are accommodated on request.</p>
          </div>
          <div class="step" data-reveal="300">
            <div class="step__idx">06</div>
            <h3 class="h3">Packing &amp; export</h3>
            <p>Cartoning to your pack plan, export documentation and logistics coordination
               from Jaipur to your nominated forwarder.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div data-reveal>
          <p class="eyebrow">Materials</p>
          <h2 class="h1">Fabrics we work with every day.</h2>
          <p class="prose mt-2">
            Our strength is light-to-mid weight wovens with decoration. If your programme
            sits outside that, we will say so rather than learn on your order.
          </p>
        </div>
        <div class="grid grid--pair" data-reveal="80">
          <div class="card">
            <h3 class="h3">Wovens</h3>
            <p>Cotton lawn, voile, poplin, dobby and slub; rayon and viscose including
               georgette and crepe; yarn-dyed stripes and checks; blended and printed bases.</p>
          </div>
          <div class="card">
            <h3 class="h3">Decoration</h3>
            <p>Machine embroidery, placement and all-over prints, pintucks, gathers,
               tiering, lace and trim insertion, tassels and hand-finished detailing.</p>
          </div>
          <div class="card">
            <h3 class="h3">Categories</h3>
            <p>Dresses, maxi and midi; tunics and kaftans; blouses and shirts; co-ord sets;
               jumpsuits; resort and vacation wear.</p>
          </div>
          <div class="card">
            <h3 class="h3">Sustainable options</h3>
            <p>Better Cotton sourcing available on request as a member of the Better Cotton
               Initiative, alongside recycled and organic-certified bases through our supply base.</p>
          </div>
        </div>
      </div>
    </section>

{CTA}"""
    return page(
        slug="capabilities.html",
        title="Capabilities & Factory — Saroz Threadz, Jaipur",
        description=(
            "200,000 sq. ft. facility with 600 single-needle lockstitch UBT machines, 45 overlock, "
            "10 flatlock, in-house embroidery and CAD pattern development. Tech pack to export."
        ),
        body=body,
        active="capabilities.html",
    )


def collections():
    body = f"""    <section class="pagehead">
      <div class="wrap">
        <p class="eyebrow">Product range</p>
        <h1>Womenswear developed to your design, or adapted from ours.</h1>
        <p class="lede">
          A selection of garments produced on our floor. Every piece here started as a
          tech pack or a reference sample &mdash; we develop to brand specification rather
          than sell a fixed catalogue.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="lookbook" data-reveal>
          {look_grid(LOOKS, lazy_from=6)}
        </div>
      </div>
    </section>

    <section class="section--tight band">
      <div class="wrap split" style="align-items:center">
        <div data-reveal>
          <p class="eyebrow">Development</p>
          <h2 class="h1">How a new style starts.</h2>
        </div>
        <div class="prose" data-reveal="80">
          <p>
            Send a tech pack, a sketch, or a garment you want re-engineered. We will
            confirm fabric, trims and embroidery approach, quote it, and agree a sampling
            date with you before we start.
          </p>
          <p class="mt-2">
            <a class="link-arrow" href="contact.html" style="color:#fff;border-color:rgba(255,255,255,.3)">
              Start a development {icon_arrow()}</a>
          </p>
        </div>
      </div>
    </section>

{CTA}"""
    return page(
        slug="collections.html",
        title="Product Range — Womenswear Manufacturing | Saroz Threadz",
        description=(
            "Dresses, tunics, blouses, shirts, co-ords and jumpsuits in cotton, rayon and viscose, "
            "with in-house embroidery and print. Developed to brand tech packs in Jaipur, India."
        ),
        body=body,
        active="collections.html",
        og_image="assets/img/lookbook/hand-embroidered-tunic.webp",
    )


def responsibility():
    body = f"""    <section class="pagehead">
      <div class="wrap">
        <p class="eyebrow">Responsibility</p>
        <h1>Compliance is a floor, not a marketing claim.</h1>
        <p class="lede">
          At Saroz Threadz, social responsibility is part of how the factory runs day to
          day. Our standards are third-party audited, and the people who own the business
          are the people on site.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="wrap grid grid--2">
        <div data-reveal>
          <div class="certs" style="margin-bottom:2.5rem">
            <img src="assets/img/site/logo-smeta.png" alt="Sedex SMETA audited" width="600" height="120" loading="lazy">
            <img src="assets/img/site/logo-bci.png" alt="Better Cotton Initiative member" width="600" height="200" loading="lazy">
          </div>
          <div class="spec">
            <dt>Ethical audit</dt>
            <dd>SMETA <small>Sedex Members Ethical Trade Audit &mdash; labour standards, health and safety, environment and business ethics.</small></dd>
          </div>
          <div class="spec mt-3">
            <dt>Cotton sourcing</dt>
            <dd>BCI approved <small>Approved under the Better Cotton Initiative, enabling Better Cotton programmes on request.</small></dd>
          </div>
          <div class="spec mt-3">
            <dt>Licensing</dt>
            <dd>Disney authorised <small>Authorised to work on licensed programmes, including Disney, under their compliance requirements.</small></dd>
          </div>
          <div class="spec mt-3">
            <dt>Export status</dt>
            <dd>Recognised export house <small>Recognised as an export house by the Government of India.</small></dd>
          </div>
        </div>
        <div data-reveal="120">
          <figure class="figure figure--tall">
            <img src="assets/img/site/sustainability.webp" width="1600" height="1067" loading="lazy"
                 decoding="async" alt="Hands holding a young plant in soil">
          </figure>
        </div>
      </div>
    </section>

    <section class="section band">
      <div class="wrap">
        <div class="split" style="align-items:end">
          <div data-reveal>
            <p class="eyebrow">On the floor</p>
            <h2 class="h1">What we hold ourselves to.</h2>
          </div>
          <p class="prose" data-reveal="80">
            These are not aspirations. They are conditions of employment and audit points
            that we are checked against.
          </p>
        </div>
        <div class="grid grid--duo mt-4">
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal>
            <span class="card__num">01</span>
            <h3 class="h3">No child labour</h3>
            <p>We maintain a strict zero-tolerance policy toward child labour and comply
               fully with Indian labour laws and regulations.</p>
          </article>
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal="80">
            <span class="card__num">02</span>
            <h3 class="h3">Facilities for women workers</h3>
            <p>Dedicated facilities for female workers, with rest areas and support
               structures built into how the floor is organised.</p>
          </article>
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal="160">
            <span class="card__num">03</span>
            <h3 class="h3">Health &amp; safety</h3>
            <p>Fire safety systems, on-site medical support, a canteen and rest areas
               across our facilities.</p>
          </article>
          <article class="card" style="background:transparent;border-color:rgba(255,255,255,.14)" data-reveal="240">
            <span class="card__num">04</span>
            <h3 class="h3">Community support</h3>
            <p>Beyond the factories, the family is actively involved in community
               development initiatives around Jaipur.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <figure class="figure figure--wide" data-reveal>
          <img src="assets/img/site/community.webp" width="1600" height="1067" loading="lazy"
               decoding="async" alt="Students working together during a community programme">
        </figure>
        <div data-reveal="80">
          <p class="eyebrow">Transparency &amp; accountability</p>
          <h2 class="h2">A financially stable, family-owned business.</h2>
          <p class="prose mt-2">
            Saroz Threadz has more than forty years in the fashion and apparel industry.
            The family's business activities span apparel manufacturing, hospitality and
            logistics and storage &mdash; a diversified foundation that keeps the garment
            business stable through the season cycle.
          </p>
          <p class="prose">
            We operate with transparency, accountability and integrity, supported by
            internationally recognised standards including SMETA and the Better Cotton
            Initiative. Our focus is on long-term partnerships built on trust, consistency
            and reliability.
          </p>
        </div>
      </div>
    </section>

{CTA}"""
    return page(
        slug="responsibility.html",
        title="Responsibility & Compliance — Saroz Threadz",
        description=(
            "SMETA audited, Better Cotton approved and Disney-licensed. Zero tolerance on child "
            "labour, dedicated facilities for women workers, fire safety and on-site medical support."
        ),
        body=body,
        active="responsibility.html",
        og_image="assets/img/site/sustainability.webp",
    )


def about():
    body = f"""    <section class="pagehead">
      <div class="wrap">
        <p class="eyebrow">About</p>
        <h1>Three generations, one factory floor, forty years of garments.</h1>
        <p class="lede">
          Saroz Threadz Pvt Ltd is a third-generation, family-run apparel manufacturing
          company based in Jaipur, India.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div class="sticky-col" data-reveal>
          <figure class="figure figure--tall">
            <img src="assets/img/site/artisan-at-machine.webp" width="1600" height="1067"
                 loading="lazy" decoding="async"
                 alt="A machinist at work in the Saroz Threadz factory">
            <figcaption>Sitapura Industrial Area &middot; Jaipur</figcaption>
          </figure>
        </div>
        <div class="prose" data-reveal="80" style="font-size:var(--t-lg)">
          <p>
            With over forty years of experience in the garment industry, we specialise in
            the development and production of fashion garments, with strong expertise in
            embroidery, printing and value-added detailing.
          </p>
          <p>
            Our factory operates in full compliance with international standards and is
            SMETA certified, Better Cotton Initiative approved, and authorised to work with
            licensed programmes including Disney. We are a recognised export house under
            the Government of India.
          </p>
          <p>
            We work closely with global fashion brands, offering reliable manufacturing
            solutions from sampling to bulk production &mdash; in North America, South
            America, Europe and Asia.
          </p>
          <p>
            The company is financially stable and family owned. Beyond apparel, the
            family's activities span hospitality and logistics and storage, giving the
            business a diversified foundation. We operate with transparency, accountability
            and integrity, and our focus is on long-term partnerships built on trust,
            consistency and reliability.
          </p>
          <div class="quote mt-4">
            <blockquote>&ldquo;Long-term partnerships built on trust, consistency and reliability.&rdquo;</blockquote>
            <cite>{CONTACT_NAME} &middot; Business Contact</cite>
          </div>
        </div>
      </div>
    </section>

    <section class="section--tight" style="background:var(--paper-2);border-block:1px solid var(--line)">
      <div class="wrap">
        <p class="eyebrow" data-reveal>At a glance</p>
        <div class="grid grid--3 mt-2">
          <div class="spec" data-reveal>
            <dt>Experience</dt>
            <dd>40+ years <small>Four decades of continuous garment manufacturing in Jaipur.</small></dd>
          </div>
          <div class="spec" data-reveal="60">
            <dt>Ownership</dt>
            <dd>Third generation <small>Family owned and family run, with the owners on site.</small></dd>
          </div>
          <div class="spec" data-reveal="120">
            <dt>Location</dt>
            <dd>Jaipur, India <small>Sitapura Industrial Area, Garment Zone, Tonk Road.</small></dd>
          </div>
          <div class="spec" data-reveal>
            <dt>Floor area</dt>
            <dd>200,000 sq. ft. <small>Cutting, sewing, embroidery, finishing and packing.</small></dd>
          </div>
          <div class="spec" data-reveal="60">
            <dt>Specialisation</dt>
            <dd>Womenswear <small>Wovens with embroidery, print and value-added detailing.</small></dd>
          </div>
          <div class="spec" data-reveal="120">
            <dt>Markets</dt>
            <dd>4 continents <small>North America, South America, Europe and Asia.</small></dd>
          </div>
        </div>
      </div>
    </section>

{CTA}"""
    return page(
        slug="about.html",
        title="About Saroz Threadz — Third-Generation Manufacturer in Jaipur",
        description=(
            "Saroz Threadz Pvt Ltd is a third-generation, family-run apparel manufacturer in "
            "Jaipur, India, with over 40 years in fashion garments and a 200,000 sq. ft. facility."
        ),
        body=body,
        active="about.html",
    )


def contact():
    mailto = (
        f"mailto:{EMAIL_TRADE}?subject=Manufacturing%20enquiry"
        "&body=Company%3A%0ABrand%3A%0ACategory%20(dresses%2C%20blouses%2C%20etc.)%3A%0A"
        "Estimated%20quantity%20per%20style%3A%0ANumber%20of%20styles%3A%0ATarget%20delivery%20window%3A%0A"
        "Fabric%20%2F%20decoration%20notes%3A%0A%0A(Please%20attach%20your%20tech%20pack.)"
    )
    body = f"""    <section class="pagehead">
      <div class="wrap">
        <p class="eyebrow">Contact</p>
        <h1>Tell us what you want made.</h1>
        <p class="lede">
          The fastest route to a costing is a tech pack, a target quantity and a delivery
          window. Email reaches us directly &mdash; there is no enquiry queue between you
          and the factory.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div data-reveal>
          <h2 class="h2">Direct contacts</h2>
          <dl class="contact-list mt-3">
            <div>
              <dt>Business contact</dt>
              <dd>{CONTACT_NAME}</dd>
              <dd class="mt-1"><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></dd>
              <dd class="mt-1"><a href="mailto:{EMAIL_ARUN}">{EMAIL_ARUN}</a></dd>
            </div>
            <div>
              <dt>Trade &amp; sampling enquiries</dt>
              <dd><a href="mailto:{EMAIL_TRADE}">{EMAIL_TRADE}</a></dd>
            </div>
            <div>
              <dt>Factory</dt>
              <dd style="font-size:var(--t-base);line-height:1.7">
                {COMPANY}<br>
                {"<br>".join(ADDRESS_LINES)}
              </dd>
            </div>
            <div>
              <dt>Time zone</dt>
              <dd style="font-size:var(--t-base)">India Standard Time (UTC+5:30)</dd>
            </div>
          </dl>
          <p class="mt-4">
            <a class="btn" href="{mailto}">Email us a brief</a>
          </p>
        </div>

        <div data-reveal="80">
          <div class="card">
            <h2 class="h3">Request a quote</h2>
            <p class="small mt-1">
              This form opens your email client with the details filled in, so nothing is
              stored on a third-party server and your tech pack stays between us.
            </p>
            <form class="mt-3" id="rfq" action="mailto:{EMAIL_TRADE}" method="post" enctype="text/plain" data-mailto="{EMAIL_TRADE}">
              <div class="field">
                <label for="f-company">Company</label>
                <input id="f-company" name="Company" type="text" autocomplete="organization" required>
              </div>
              <div class="field">
                <label for="f-name">Your name</label>
                <input id="f-name" name="Name" type="text" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="f-email">Email</label>
                <input id="f-email" name="Email" type="email" autocomplete="email" required>
              </div>
              <div class="field">
                <label for="f-category">Category</label>
                <select id="f-category" name="Category">
                  <option>Dresses</option>
                  <option>Tunics &amp; kaftans</option>
                  <option>Blouses &amp; shirts</option>
                  <option>Co-ord sets</option>
                  <option>Jumpsuits</option>
                  <option>Other womenswear</option>
                </select>
              </div>
              <div class="field">
                <label for="f-qty">Estimated quantity per style</label>
                <input id="f-qty" name="Quantity" type="text" placeholder="e.g. 500&ndash;2,000 pcs">
              </div>
              <div class="field">
                <label for="f-when">Target delivery window</label>
                <input id="f-when" name="Delivery" type="text" placeholder="e.g. SS27, ship by Nov 2026">
              </div>
              <div class="field">
                <label for="f-msg">Brief</label>
                <textarea id="f-msg" name="Brief"
                  placeholder="Fabric, decoration, number of styles, any compliance requirements."></textarea>
              </div>
              <button class="btn" type="submit">Send enquiry</button>
              <p class="form-note mt-2">
                Prefer to attach files? Email <a href="mailto:{EMAIL_TRADE}">{EMAIL_TRADE}</a> directly.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="section--tight" style="background:var(--paper-2);border-top:1px solid var(--line)">
      <div class="wrap center">
        <p class="eyebrow" style="justify-content:center">Visit</p>
        <h2 class="h2" style="max-width:24ch;margin-inline:auto">
          Buyers are welcome at the factory.
        </h2>
        <p class="prose mt-2" style="margin-inline:auto">
          Our factory is in Sitapura Industrial Area, a short drive from Jaipur
          International Airport. Let us know when you are travelling and we will arrange a
          floor walk-through and a sample review.
        </p>
        <p class="mt-3">
          <a class="link-arrow" href="https://www.google.com/maps/search/?api=1&amp;query=Sitapura+Industrial+Area+Garment+Zone+Tonk+Road+Jaipur+302022"
             target="_blank" rel="noopener noreferrer">Open in Maps {icon_arrow()}</a>
        </p>
      </div>
    </section>"""
    return page(
        slug="contact.html",
        title="Contact — Saroz Threadz, Jaipur",
        description=(
            f"Contact {CONTACT_NAME} at Saroz Threadz Pvt Ltd, Sitapura Industrial Area, Jaipur. "
            "Send a tech pack for costing and a sampling plan."
        ),
        body=body,
        active="contact.html",
    )


def not_found():
    body = """    <section class="section" style="min-height:60svh;display:grid;place-items:center">
      <div class="wrap center">
        <p class="eyebrow" style="justify-content:center">404</p>
        <h1 class="h1">That page has been unpicked.</h1>
        <p class="prose mt-2" style="margin-inline:auto">
          The page you were looking for is not here. Try the factory, the product range,
          or get in touch directly.
        </p>
        <p class="mt-3"><a class="btn" href="index.html">Back to the front page</a></p>
      </div>
    </section>"""
    return page(
        slug="404.html",
        title="Page not found — Saroz Threadz",
        description="The page you were looking for could not be found.",
        body=body,
    )


PAGES = {
    "index.html": home,
    "capabilities.html": capabilities,
    "collections.html": collections,
    "responsibility.html": responsibility,
    "about.html": about,
    "contact.html": contact,
    "404.html": not_found,
}

PRIORITY = {"index.html": "1.0", "capabilities.html": "0.9", "collections.html": "0.9",
            "contact.html": "0.8", "responsibility.html": "0.7", "about.html": "0.7"}


def write_sitemap():
    urls = []
    for slug, prio in PRIORITY.items():
        loc = f"{SITE_URL}/" if slug == "index.html" else f"{SITE_URL}/{slug}"
        urls.append(
            f"  <url><loc>{loc}</loc><changefreq>monthly</changefreq>"
            f"<priority>{prio}</priority></url>"
        )
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n",
        encoding="utf-8",
    )
    (ROOT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n", encoding="utf-8"
    )


def main():
    for slug, fn in PAGES.items():
        (ROOT / slug).write_text(fn(), encoding="utf-8")
        print(f"wrote {slug}")
    write_sitemap()
    print("wrote sitemap.xml, robots.txt")


if __name__ == "__main__":
    main()
