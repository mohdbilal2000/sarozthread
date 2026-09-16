import localFont from 'next/font/local';

/**
 * Self-hosted, latin subset only. No Google Fonts request, so no third-party
 * call from EU visitors and one fewer render-blocking round trip.
 *
 * Fraunces is the display face: a variable serif with an optical-size axis, so
 * a 6rem headline and a 1.2rem card title can share one file and still be
 * drawn correctly at both ends. Inter carries every piece of interface text —
 * navigation, labels, buttons, body copy.
 */
export const fraunces = localFont({
  src: '../../public/fonts/fraunces.woff2',
  variable: '--font-fraunces',
  display: 'swap',
  weight: '300 700',
  preload: true,
  fallback: ['Iowan Old Style', 'Palatino', 'Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

export const inter = localFont({
  src: '../../public/fonts/inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '400 600',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

/** Kept for code samples inside editorial prose only — never for interface text. */
export const plexMono = localFont({
  src: '../../public/fonts/ibm-plex-mono.woff2',
  variable: '--font-plex-mono',
  display: 'swap',
  weight: '400 500',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});
