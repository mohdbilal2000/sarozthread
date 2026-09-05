import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Saroz Threadz handles information submitted through this website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy"
      title="What this site does with your information"
      updated="September 2026"
      trail={[{ name: 'Privacy', href: '/privacy' }]}
    >
      <h2>The short version</h2>
      <p>
        This website sets no cookies, runs no advertising trackers, and loads no third-party fonts or
        scripts. Nothing you do on these pages is shared with an analytics vendor or an ad network.
        There is no consent banner because there is nothing to consent to.
      </p>

      <h2>The enquiry form</h2>
      <p>
        The quote request form submits directly to our own server, which validates it and forwards it
        to our enquiry inbox. It is not routed through a third-party form service. We collect only
        the fields on the form: your company, name, email, country, product category, quantities,
        delivery window and brief.
      </p>

      <h2>What we do with enquiries</h2>
      <p>
        Information you send us is used to quote and to run your order. We do not sell it and we do
        not share it outside the company, except with the partner printing houses and freight
        forwarders needed to execute an order you have placed. Tech packs and specifications are
        treated as confidential.
      </p>

      <h2>Retention</h2>
      <p>
        Enquiries are kept for as long as there is a live commercial conversation, and for our
        statutory record-keeping period once an order has shipped. Enquiries that do not lead
        anywhere are deleted on request.
      </p>

      <h2>Hosting and logs</h2>
      <p>
        The site is served by our hosting provider, which keeps standard server logs including IP
        addresses for security and abuse prevention. We do not use those logs to profile visitors.
      </p>

      <h2>Your rights</h2>
      <p>
        To ask what we hold about you, to correct it, or to have it deleted, email{' '}
        <a href={`mailto:${company.contact.primaryEmail}`}>{company.contact.primaryEmail}</a>. We
        respond within 30 days.
      </p>
    </LegalPage>
  );
}
