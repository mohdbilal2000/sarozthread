import Image from 'next/image';
import { looks } from '@/data/products';

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

export function LookGrid({
  slugs,
  priorityCount = 0,
  columns = 4,
  className = '',
}: {
  slugs: string[];
  priorityCount?: number;
  columns?: 3 | 4;
  className?: string;
}) {
  const cols = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  const items = slugs
    .map((slug) => ({ slug, meta: looks[slug], img: IMAGES[slug as LookSlug] }))
    .filter((i): i is { slug: string; meta: NonNullable<typeof i.meta>; img: typeof embroideredBlouse } =>
      Boolean(i.meta && i.img),
    );

  return (
    <ul className={`grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 ${cols} ${className}`}>
      {items.map((item, i) => (
        <li key={item.slug} className="group relative overflow-hidden bg-carbon">
          <Image
            src={item.img}
            alt={`${item.meta.name} — ${item.meta.detail}, manufactured by Saroz Threadz in Jaipur`}
            sizes={columns === 3 ? '(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'}
            placeholder="blur"
            priority={i < priorityCount}
            className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-industrial)] group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-void via-void/75 to-transparent px-4 pb-4 pt-14 opacity-0 transition-all duration-500 ease-[var(--ease-industrial)] group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-label block text-white">{item.meta.name}</span>
            <span className="mt-1 block text-[0.75rem] text-smoke">{item.meta.detail}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
