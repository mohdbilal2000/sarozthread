import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero, Section } from '@/components/blocks';
import { ComingSoon } from '@/components/ComingSoon';
import { ArrowRight } from '@/components/Icons';
import { productCategories, looks } from '@/data/products';
import { lookImage } from '@/lib/lookImages';

const trail = [{ name: 'Admin', href: '/admin' }];

/**
 * Preview of the Phase 2 admin panel.
 *
 * Every control here is deliberately inert — `disabled` on the real elements
 * rather than a screenshot, so the layout is the one that ships and the
 * keyboard/screen-reader behaviour is already correct. Nothing on this page
 * reads or writes data.
 *
 * noindex: an admin surface has no business in search results or in an AI
 * answer. It is also disallowed in robots.ts and absent from the sitemap.
 */
export const metadata: Metadata = {
  title: 'Admin panel — preview',
  description:
    'Preview of the Saroz Threadz product admin panel. Scheduled for Phase 2: add, edit and remove products without a developer.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/admin' },
};

const FIELDS = [
  { label: 'Product name', placeholder: 'e.g. Tiered ruffle dress', type: 'text' },
  { label: 'Category', placeholder: 'Dresses', type: 'text' },
  { label: 'Fabric', placeholder: 'Viscose georgette', type: 'text' },
  { label: 'Decoration', placeholder: 'Placement embroidery', type: 'text' },
];

const lookEntries = Object.entries(looks).slice(0, 8);

export default function AdminPage() {
  return (
    <>
      <PageHero
        kicker="Internal"
        title="Product admin panel"
        lede="A preview of the screen Saroz Threadz will use to add, update and remove products without touching code or waiting on a developer. Everything below is the real layout with the controls switched off."
        trail={trail}
      />

      <Section tight>
        <div className="shell">
          <ComingSoon
            phase="Phase 2"
            eta="Scheduled after the public site is signed off"
            title="Run the catalogue yourself"
            lede="Today every product and photograph lives in the code, which means a developer publishes each change. Phase 2 moves that to a password-protected panel: the team uploads a photograph, fills four fields, and the product page, the lookbook, the sitemap, the RSS feed and the structured data that AI assistants read all update themselves."
            bullets={[
              'Add a product — name, category, fabric, decoration, photographs',
              'Remove or hide a product without deleting its history',
              'Reorder the lookbook by dragging, on a phone or a laptop',
              'Draft, preview, then publish — nothing goes live by accident',
              'Enquiries from the contact form collected in one inbox',
              'Every change logged: who changed what, and when',
            ]}
            fallback={{ href: '/contact', label: 'Until then, send changes to us' }}
          />
        </div>
      </Section>

      {/* Add product — inert preview -------------------------------------- */}
      <Section tight>
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div data-reveal>
            <p className="kicker">Preview 01</p>
            <h2 className="text-d2 mt-5 max-w-[12ch]">Add a product</h2>
            <p className="prose mt-6">
              Four fields and a photograph. The panel writes the product page, the category
              listing, the sitemap entry and the Product structured data at the same time — so a
              new style is searchable and quotable by an AI assistant the moment it is published.
            </p>
          </div>

          <form aria-label="Add product (preview — not active)" data-reveal>
            <fieldset disabled className="border border-line bg-carbon p-5 sm:p-8">
              <legend className="sr-only">Add product</legend>

              <div className="grid gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <label key={f.label} className="block">
                    <span className="text-label block text-ash">{f.label}</span>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="mt-2 w-full border border-line bg-void px-4 py-3 text-sm text-chalk placeholder:text-ash disabled:cursor-not-allowed"
                    />
                  </label>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="text-label block text-ash">Description</span>
                <textarea
                  rows={3}
                  placeholder="Two or three lines a buyer would actually read."
                  className="mt-2 w-full resize-none border border-line bg-void px-4 py-3 text-sm text-chalk placeholder:text-ash disabled:cursor-not-allowed"
                />
              </label>

              <div className="mt-5 flex flex-col items-start gap-3 border border-dashed border-line-strong bg-void px-5 py-8 text-center sm:items-center">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-ash">
                  Drop photographs here
                </span>
                <span className="text-xs text-ash">JPG or PNG · resized and compressed automatically</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="btn cursor-not-allowed opacity-45" aria-hidden>
                  Publish product <ArrowRight />
                </span>
                <span className="btn btn-outline cursor-not-allowed opacity-45" aria-hidden>
                  Save as draft
                </span>
              </div>
            </fieldset>
            <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-ash">
              Preview only — these controls are switched off
            </p>
          </form>
        </div>
      </Section>

      {/* Manage products — inert preview ---------------------------------- */}
      <Section tight>
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5" data-reveal>
            <div>
              <p className="kicker">Preview 02</p>
              <h2 className="text-d2 mt-4">Manage products</h2>
            </div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-ash">
              {productCategories.length} categories · {lookEntries.length}+ styles
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {lookEntries.map(([slug, meta]) => {
              const img = lookImage(slug);
              return (
                <li key={slug} className="flex flex-col border border-line bg-carbon">
                  {img && (
                    <Image
                      src={img}
                      alt=""
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      className="aspect-[4/5] w-full object-cover opacity-80"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[0.9375rem] font-medium text-white">{meta.name}</span>
                    <span className="mt-1 text-xs text-ash">{meta.category}</span>
                    <span className="mt-1 text-xs text-smoke">{meta.detail}</span>
                    <div className="mt-4 flex gap-2 pt-1">
                      <span className="flex-1 cursor-not-allowed border border-line px-3 py-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ash">
                        Edit
                      </span>
                      <span className="flex-1 cursor-not-allowed border border-line px-3 py-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ash">
                        Remove
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-ash">
            Preview only — no product can be changed from this page
          </p>

          <div className="mt-12 border-t border-line pt-8">
            <Link href="/products" className="link-arrow">
              See the live product pages <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
