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

/**
 * Static imports so next/image gets intrinsic dimensions and a blur
 * placeholder. Shared by the lookbook grid and the product cards — one map,
 * so a new garment photo only has to be registered once.
 */
export const LOOK_IMAGES = {
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

export type LookSlug = keyof typeof LOOK_IMAGES;

export const lookImage = (slug: string) => LOOK_IMAGES[slug as LookSlug];
