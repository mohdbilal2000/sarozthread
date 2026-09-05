import type { StaticImageData } from 'next/image';
import cad from '@/assets/site/cad.jpg';
import community from '@/assets/site/community.jpg';
import embroidery from '@/assets/site/embroidery.jpg';
import factoryFloor from '@/assets/site/factory-floor.jpg';
import printing from '@/assets/site/printing.jpg';
import quality from '@/assets/site/quality.jpg';
import sampling from '@/assets/site/sampling.jpg';
import sustainability from '@/assets/site/sustainability.jpg';
import team from '@/assets/site/team.jpg';

/** Static imports keep next/image's intrinsic sizing and blur placeholders. */
const SITE_IMAGES: Record<string, StaticImageData> = {
  cad,
  community,
  embroidery,
  'factory-floor': factoryFloor,
  printing,
  quality,
  sampling,
  sustainability,
  team,
};

export const siteImage = (name: string): StaticImageData | undefined => SITE_IMAGES[name];
