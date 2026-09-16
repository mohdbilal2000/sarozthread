import Image from 'next/image';
import Link from 'next/link';
import { looks, productCategories } from '@/data/products';
import { ArrowRight } from './Icons';

import embroideredBlouse from '@/assets/lookbook/embroidered-blouse.jpg';
import tieredMidiDress from '@/assets/lookbook/tiered-midi-dress.jpg';
import printedMaxiDress from '@/assets/lookbook/printed-maxi-dress.jpg';
import cottonFlutterTop from '@/assets/lookbook/cotton-flutter-top.jpg';
import blockPrintDress from '@/assets/lookbook/block-print-dress.jpg';
import tieredRuffleDress from '@/assets/lookbook/tiered-ruffle-dress.jpg';
import placketEmbroideredShirt from '@/assets/lookbook/placket-embroidered-shirt.jpg';
import printedJumpsuit from '@/assets/lookbook/printed-jumpsuit.jpg';
import floralKaftanDress from '@/assets/lookbook/floral-kaftan-dress.jpg';
import pintuckShirtDress from '@/assets/lookbook/pintuck-shirt-dress.jpg';
import ditsyPrintDress from '@/assets/lookbook/ditsy-print-dress.jpg';
import handEmbroideredTunic from '@/assets/lookbook/hand-embroidered-tunic.jpg';
import oversizedPoplinShirt from '@/assets/lookbook/oversized-poplin-shirt.jpg';
import stripedEmbroideredBlouse from '@/assets/lookbook/striped-embroidered-blouse.jpg';

/** Static imports so next/image gets intrinsic dimensions and a blur placeholder. */
const IMAGES = {
  'embroidered-blouse': embroideredBlouse,
  'tiered-midi-dress': tieredMidiDress,
  'printed-maxi-dress': printedMaxiDress,
  'cotton-flutter-top': cottonFlutterTop,
  'block-print-dress': blockPrintDress,
  'tiered-ruffle-dress': tieredRuffleDress,
  'placket-embroidered-shirt': placketEmbroideredShirt,
  'printed-jumpsuit': printedJumpsuit,
  'floral-kaftan-dress': floralKaftanDress,
  'pintuck-shirt-dress': pintuckShirtDress,
  'ditsy-print-dress': ditsyPrintDress,
  'hand-embroidered-tunic': handEmbroideredTunic,
  'oversized-poplin-shirt': oversizedPoplinShirt,
  'striped-embroidered-blouse': stripedEmbroideredBlouse,
} as const;

export type LookSlug = keyof typeof IMAGES;

/** Look image by slug, for callers that lay out their own tiles. */
export const lookImage = (slug: string) => IMAGES[slug as LookSlug];

/** Maps a look's category name back to its product page. */
const categoryHref = (category: string) => {
  const match = productCategories.find((c) => c.name === category);
  return match ? `/products/${match.slug}` : '/products';
};

/**
 * The garment grid.
 *
 * Each look is a card that does a job rather than a tile that sits there: it
 * names the construction and fabric a buyer is actually assessing, and it is a
 * link into the category page where that style can be quoted. A photograph a
 * sourcing manager cannot act on is decoration.
 *
 * `feature` gives the first two looks a double span, so the grid has a focal
 * point instead of reading as an even wall of thumbnails.
 */
export function LookGrid({
  slugs,
  priorityCount = 0,
  columns = 4,
  feature = false,
  className = '',
}: {
  slugs: string[];
  priorityCount?: number;
  columns?: 3 | 4;
  feature?: boolean;
  className?: string;
}) {
  const cols = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  const items = slugs
    .map((slug) => ({ slug, meta: looks[slug], img: IMAGES[slug as LookSlug] }))
    .filter((i): i is { slug: string; meta: NonNullable<typeof i.meta>; img: typeof embroideredBlouse } =>
      Boolean(i.meta && i.img),
    );

  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-5 ${cols} ${className}`}>
      {items.map((item, i) => {
        const big = feature && i === 0;
        return (
          <li
            key={item.slug}
            className={big ? 'sm:col-span-2 sm:row-span-2' : ''}
            data-reveal
            data-delay={String(Math.min(i * 60, 300))}
          >
            <Link href={categoryHref(item.meta.category)} className="group card h-full">
              <div className={`media media-flush ${big ? 'aspect-square sm:aspect-auto sm:h-full' : 'aspect-[3/4]'}`}>
                <Image
                  src={item.img}
                  alt={`${item.meta.name} — ${item.meta.detail}, manufactured by Saroz Threadz in Jaipur`}
                  sizes={
                    big
                      ? '(min-width: 640px) 50vw, 100vw'
                      : columns === 3
                        ? '(min-width: 640px) 33vw, 50vw'
                        : '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'
                  }
                  placeholder="blur"
                  priority={i < priorityCount}
                />
                <div className="media-veil">
                  <span className="text-label block">{item.meta.category}</span>
                  <span className="mt-2 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                    Can you make this? <ArrowRight />
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4 py-3.5">
                <span className={`${big ? 'text-d3' : 'text-[0.9375rem] font-medium'} text-ink`}>
                  {item.meta.name}
                </span>
                <span className="mt-1 text-[0.8125rem] text-muted">{item.meta.detail}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
