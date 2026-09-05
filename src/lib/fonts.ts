import localFont from 'next/font/local';

/**
 * Self-hosted, latin subset only. No Google Fonts request, so no third-party
 * call from EU visitors and one fewer render-blocking round trip.
 * Archivo is variable across both weight and width — the width axis is what
 * gives the display type its condensed, industrial set.
 */
export const archivo = localFont({
  src: '../../public/fonts/archivo.woff2',
  variable: '--font-archivo',
  display: 'swap',
  weight: '400 900',
  preload: true,
  fallback: ['Arial Narrow', 'system-ui', 'sans-serif'],
});

export const inter = localFont({
  src: '../../public/fonts/inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '400 600',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const plexMono = localFont({
  src: '../../public/fonts/ibm-plex-mono.woff2',
  variable: '--font-plex-mono',
  display: 'swap',
  weight: '400 500',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});
