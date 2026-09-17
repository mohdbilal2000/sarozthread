/**
 * Guards the two rules that decide whether a page looks broken to a buyer:
 * no page may present hidden content, and every navigation must land at the
 * top of the page it went to.
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
 * The second rule had its own cause. `scroll-behavior: smooth` on <html> turns
 * the router's scrollTo(0, 0) into an animation, and anything that touches the
 * scroller while it runs — the mobile drawer releasing the body, a page growing
 * as its blocks reveal — interrupts it partway. Tapping through from a scrolled
 * page landed at y=376 and y=795 on the new page, which reads exactly like a
 * page that has not loaded until you refresh.
 *
 * Usage:
 *   npm run build && npx next start -p 3000 &
 *   npm i -D playwright-core            # not a project dependency
 *   node scripts/check-navigation.mjs   # or BASE=http://localhost:4000 node ...
 *
 * Exits non-zero on the first route that can show a visitor a broken page.
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

// 6 — every navigation must land at the top of the page it went to.
console.log('\nscroll position after navigating (0 is correct)');
const nav = await browser.newPage({ viewport: { width: 390, height: 844 } });
const drawerTap = async (route) => {
  const burger = await nav.$('button[aria-controls="mobile-nav"][aria-expanded="false"]');
  if (burger) await burger.click();
  await nav.waitForTimeout(300);
  await nav.click(`#mobile-nav a[href="${route}"]`);
  await nav.waitForURL(`**${route}`, { timeout: 15000 });
};
for (const [from, to, y] of [
  ['/', '/capabilities/printing', 2500],
  ['/', '/contact', 4000],
  ['/factory', '/products', 6000],
  ['/products', '/about', 3000],
  ['/faq', '/lookbook', 5000],
  ['/compliance', '/quality', 4500],
  ['/insights', '/process', 2000],
]) {
  await nav.goto(BASE + from, { waitUntil: 'networkidle' });
  await nav.waitForTimeout(700);
  await nav.evaluate((v) => window.scrollTo(0, v), y);
  await nav.waitForTimeout(600);
  await drawerTap(to);
  await nav.waitForTimeout(1400);
  const landed = await nav.evaluate(() => Math.round(window.scrollY));
  const ok = landed === 0;
  if (!ok) failures++;
  console.log(`${ok ? 'pass' : 'FAIL'}  ${`${from} → ${to}`.padEnd(46)} landed at y=${landed}`);
}

// 7 — anchor links must still reach their target, clear of the sticky header.
console.log('\nanchor links');
for (const [url, id] of [['/faq#compliance', 'compliance'], ['/faq#capacity', 'capacity']]) {
  await nav.goto(BASE + url, { waitUntil: 'networkidle' });
  await nav.waitForTimeout(1200);
  const top = await nav.evaluate((i) => {
    const el = document.getElementById(i);
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  }, id);
  // scroll-padding-top is 6rem; allow for the sticky header and rounding.
  const ok = top !== null && top >= -4 && top <= 140;
  if (!ok) failures++;
  console.log(`${ok ? 'pass' : 'FAIL'}  ${url.padEnd(46)} target ${top}px from the top`);
}
await nav.close();
await browser.close();

console.log(failures === 0
  ? '\nall pass — nothing hidden, every navigation lands at the top'
  : `\n${failures} failing checks`);
process.exit(failures ? 1 : 0);
