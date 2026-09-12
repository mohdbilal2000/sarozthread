/**
 * Guards the one rule that matters most on this site: no page may ever present
 * hidden content.
 *
 * A version of this site shipped with the scroll-reveal effect keyed on an
 * empty dependency array in the root layout. The layout does not remount on a
 * client-side navigation, so every page reached by tapping a link rendered its
 * content at opacity 0 and never revealed it. Buyers saw a blank page and left.
 *
 * The fix was architectural: the stylesheet now reveals every block on a timer
 * by itself (see the Motion section of app/globals.css), and the observer in
 * src/components/Reveal.tsx only makes it happen sooner. This script proves
 * both halves — including the cases where the bundle never runs at all.
 *
 * Usage:
 *   npm run build && npx next start -p 3000 &
 *   npm i -D playwright-core        # not a project dependency
 *   node scripts/check-reveal.mjs   # or BASE=http://localhost:4000 node ...
 *
 * Exits non-zero on the first route that can show a visitor nothing.
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:3000';
const EXE = process.env.CHROME;        // set when not using a system chromium
const FAILSAFE_MS = 1600;              // keep in step with --reveal-failsafe

const ROUTES = [
  '/', '/capabilities', '/capabilities/printing', '/capabilities/embroidery',
  '/products', '/products/dresses', '/factory', '/quality', '/about',
  '/insights', '/faq', '/contact', '/lookbook', '/process', '/compliance', '/admin',
];

/**
 * A block counts as hidden only if it is genuinely on screen and still not
 * showing. `transform: none` is filled by the browser as an identity matrix,
 * so the matrix is compared rather than the keyword — and a [data-rise]
 * heading caught part way up is the animation running, not a stuck element.
 */
const probe = (onlyReveal = false) => {
  const identity = (t) => t === 'none' || /^matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)$/.test(t);
  const els = [...document.querySelectorAll(onlyReveal ? '[data-reveal]' : '[data-reveal],[data-rise]')];
  const onScreen = els.filter((e) => {
    const r = e.getBoundingClientRect();
    return r.height > 0 && r.top < innerHeight * 0.85 && r.bottom > 0;
  });
  const hidden = onScreen.filter((e) => {
    if (parseFloat(getComputedStyle(e).opacity) < 0.9) return true;
    const sp = e.matches('[data-rise]') ? e.querySelector('span') : null;
    return sp ? !identity(getComputedStyle(sp).transform) : false;
  });
  return {
    onScreen: onScreen.length,
    hidden: hidden.length,
    sample: hidden.slice(0, 2).map((e) => (e.textContent || '').trim().slice(0, 40)),
  };
};

let failures = 0;
const check = (label, r) => {
  const ok = r.hidden === 0;
  if (!ok) failures++;
  console.log(`${ok ? 'pass' : 'FAIL'}  ${label.padEnd(46)} ${JSON.stringify(r)}`);
};

const browser = await chromium.launch({
  ...(EXE ? { executablePath: EXE } : {}),
  args: ['--no-sandbox'],
});

// 1 — the guarantee: past the failsafe, nothing on screen may still be hidden.
console.log('\nfresh load, 390px');
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(FAILSAFE_MS + 700);
  check(route, await page.evaluate(probe));
}

// 2 — the enhancement: the observer reveals well before the failsafe fires.
console.log('\nobserver, sampled at 450ms');
for (const route of ['/', '/capabilities/printing', '/products', '/factory']) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
  check(`${route} @450ms`, await page.evaluate(probe, true));
}

// 3 — soft navigation through the mobile drawer: the exact original bug.
console.log('\nsoft navigation');
const tap = async (route) => {
  const burger = await page.$('button[aria-controls="mobile-nav"][aria-expanded="false"]');
  if (burger) await burger.click();
  await page.waitForTimeout(350);
  const link = await page.$(`#mobile-nav a[href="${route}"]`);
  if (!link) throw new Error(`no drawer link for ${route}`);
  await link.click();
  await page.waitForURL(`**${route}`, { timeout: 15000 });
};
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
for (const route of ['/capabilities', '/capabilities/printing', '/products', '/products/dresses', '/about', '/contact']) {
  await tap(route);
  await page.waitForTimeout(600);
  check(`tap ${route}`, await page.evaluate(probe, true));
}
await page.goBack();    await page.waitForTimeout(700); check('history back', await page.evaluate(probe, true));
await page.goForward(); await page.waitForTimeout(700); check('history forward', await page.evaluate(probe, true));
await page.close();

// 4 — the bundle never executes: broken deploy, blocking proxy, strict CSP.
console.log('\nbundle blocked');
const dead = await browser.newPage({ viewport: { width: 390, height: 844 } });
await dead.route('**/_next/static/chunks/**', (r) => r.abort());
for (const route of ['/capabilities/printing', '/products', '/']) {
  await dead.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  await dead.waitForTimeout(FAILSAFE_MS + 900);
  check(route, await dead.evaluate(probe));
}
await dead.close();

// 5 — JavaScript switched off entirely.
console.log('\njavascript disabled');
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
const nojs = await ctx.newPage();
for (const route of ['/capabilities/printing', '/products']) {
  await nojs.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  await nojs.waitForTimeout(500);
  check(route, await nojs.evaluate(probe));
}
await ctx.close();
await browser.close();

console.log(failures === 0
  ? '\nall pass — no route, and no failure mode, presents hidden content'
  : `\n${failures} failing checks`);
process.exit(failures ? 1 : 0);
