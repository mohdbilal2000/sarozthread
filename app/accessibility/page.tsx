import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'How the Saroz Threadz website is built to be usable by everyone, and what to do if something is not.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      kicker="Accessibility"
      title="Accessibility statement"
      updated="September 2026"
      trail={[{ name: 'Accessibility', href: '/accessibility' }]}
    >
      <h2>What we aim for</h2>
      <p>
        This site targets WCAG 2.2 Level AA. That is a target we test against, not a certification
        we have been awarded.
      </p>

      <h2>What is built in</h2>
      <ul>
        <li>One <code>h1</code> per page, with heading levels in order and no skipped levels.</li>
        <li>Semantic landmarks and a skip link as the first focusable element on every page.</li>
        <li>Every image carries alternative text; decorative graphics are hidden from assistive technology.</li>
        <li>Visible focus indicators throughout, and every interactive control reachable by keyboard.</li>
        <li>Navigation menus open on focus as well as hover, and close with Escape.</li>
        <li>FAQ accordions use native <code>&lt;details&gt;</code>, so they work without JavaScript.</li>
        <li>Scroll animations are gated behind a JavaScript check, so no content is ever hidden from a visitor whose script did not run, and they are switched off entirely under <code>prefers-reduced-motion</code>.</li>
        <li>Form fields have persistent labels, errors are announced through a live region, and validation runs on the server as well as in the browser.</li>
        <li>Tested at 390px, 768px and 1440px with no horizontal scrolling.</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>The site is published in English only.</li>
        <li>The hero video plays automatically. It is muted and carries no information not stated in the surrounding text, and it respects reduced-motion settings.</li>
        <li>Documents sent on request are PDFs supplied by third-party auditors, and we do not control their internal tagging.</li>
      </ul>

      <h2>Tell us if something does not work</h2>
      <p>
        If any part of this site is difficult to use, email{' '}
        <a href={`mailto:${company.contact.primaryEmail}`}>{company.contact.primaryEmail}</a> and
        describe what happened. We will fix it and reply. If you need information from this site in
        another format, ask and we will send it.
      </p>
    </LegalPage>
  );
}
