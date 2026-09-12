/**
 * The build credit strap that closes every page.
 *
 * Green on black, one line, below the legal row — it reads as a maker's mark
 * on a finished piece rather than an advertisement inside the client's site.
 * Green is used nowhere else on the site, so it signs the work without
 * competing with Saroz Threadz' own signal orange.
 *
 * The group links are small and low-contrast by design, but they are real,
 * visible, crawlable links. Hiding links (display:none, zero-size text,
 * same-colour-on-same-colour) is a link scheme under Google's spam policies:
 * such links pass no value and put the whole domain at risk of a manual
 * action. A quiet, labelled row in the colophon is the version that actually
 * passes authority — which is the point of having them at all.
 */

const GROUP_LINKS = [
  { href: 'https://asiabylocals.com', label: 'Asia by Locals', title: 'Asia by Locals — local-led travel across Asia' },
  { href: 'https://guideindiatours.com', label: 'Guide India Tours', title: 'Guide India Tours — guided tours across India' },
  { href: 'https://akurock.com', label: 'Akurock', title: 'Akurock' },
];

function LeafMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        d="M14 2C7.5 2 3 4.8 3 9.5c0 1.3.4 2.4 1 3.3L2 15h2l1.4-1.7c.8.4 1.7.7 2.6.7 4 0 6-3.9 6-12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BuildCredit() {
  return (
    <div className="border-t border-line bg-void">
      <div className="shell flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <a
          href="https://techleaf.us"
          target="_blank"
          rel="noopener"
          title="TechLeaf — web engineering and AI search optimisation"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash transition-colors hover:text-leaf"
        >
          <LeafMark className="text-leaf-dim transition-colors group-hover:text-leaf" />
          <span>
            Designed &amp; built by{' '}
            <span className="text-leaf transition-colors group-hover:text-leaf">TechLeaf</span>
          </span>
        </a>

        <nav
          aria-label="Group and partner sites"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ash/70"
        >
          <span className="text-ash/60">Group</span>
          {GROUP_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              title={l.title}
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-leaf"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
