import Image from 'next/image';
import Link from 'next/link';
import type { ProductCategory } from '@/data/products';
import { lookImage } from '@/lib/lookImages';
import { ArrowRight } from './Icons';

/**
 * One product category, at a glance.
 *
 * The long-form sections further down the page are for a buyer who has already
 * decided to read. This grid is for the one who has not: every category visible
 * in a single screen on desktop, and two-up on a phone — a full-width card per
 * screen would have made "at a glance" a scroll.
 *
 * The whole card is the click target (a stretched overlay on the heading link)
 * rather than nested anchors, which keeps one link per card for a screen reader
 * and one destination for a crawler.
 */
export function ProductCard({
  product,
  index,
  priority = false,
}: {
  product: ProductCategory;
  index: number;
  priority?: boolean;
}) {
  const img = lookImage(product.hero);
  const tags = [...product.fabrics.slice(0, 2), ...product.decoration.slice(0, 1)];

  return (
    <li className="group relative flex flex-col border border-line bg-carbon transition-colors duration-500 focus-within:border-line-strong hover:border-line-strong">
      <div className="relative overflow-hidden bg-steel">
        {img && (
          <Image
            src={img}
            alt={`${product.name} manufactured by Saroz Threadz in Jaipur, India`}
            sizes="(min-width: 1024px) 33vw, 50vw"
            placeholder="blur"
            priority={priority}
            className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-industrial)] group-hover:scale-[1.05]"
          />
        )}
        <span className="text-label absolute left-0 top-0 bg-void/85 px-2.5 py-1.5 text-signal backdrop-blur-sm sm:px-3 sm:py-2">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">
        <h3 className="text-d3 !text-[0.9375rem] leading-tight text-white sm:!text-[1.15rem] lg:!text-[1.25rem]">
          <Link href={`/products/${product.slug}`} className="transition-colors group-hover:text-signal">
            {/* Stretched hit area — the card, not just the words. */}
            <span className="absolute inset-0 z-10" aria-hidden />
            {product.name}
          </Link>
        </h3>

        {/* Two lines on a phone, three once there is room for them. */}
        <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-smoke sm:mt-3 sm:line-clamp-3 sm:text-sm">
          {product.intro}
        </p>

        <ul
          className="mt-3 flex flex-wrap gap-1.5 sm:mt-5"
          aria-label={`${product.name} — fabrics and decoration`}
        >
          {tags.map((t, i) => (
            <li
              key={t}
              /* The third tag only earns its space once the card is wider. */
              className={`border border-line px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.08em] text-ash sm:px-2.5 sm:text-[0.625rem] sm:tracking-[0.1em] ${
                i === 2 ? 'hidden sm:block' : ''
              }`}
            >
              {t}
            </li>
          ))}
        </ul>

        {/* mt-auto pins the call to action to the card floor, so every card in a
            row ends on the same line however long its title wrapped. */}
        <span className="link-arrow mt-auto pt-4 !text-[0.5625rem] text-chalk transition-colors group-hover:text-signal sm:pt-6 sm:!text-[0.6875rem]">
          View category <ArrowRight />
        </span>
      </div>
    </li>
  );
}

export function ProductCardGrid({
  products,
  className = '',
}: {
  products: ProductCategory[];
  className?: string;
}) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6 ${className}`}>
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} priority={i < 3} />
      ))}
    </ul>
  );
}
