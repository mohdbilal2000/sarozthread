import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms governing use of the Saroz Threadz website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms"
      title="Terms of use"
      updated="September 2026"
      trail={[{ name: 'Terms', href: '/terms' }]}
    >
      <h2>About this site</h2>
      <p>
        This website is operated by {company.legalName}, {company.address.locality},{' '}
        {company.address.region}, India. Using it means accepting these terms.
      </p>

      <h2>Information on this site</h2>
      <p>
        Machine counts, floor area, certifications and capability descriptions are published in good
        faith and kept current. They are provided for information and do not by themselves form a
        contract. Anything commercially binding — price, quantity, lead time, minimums,
        specification — is what appears in a written quotation or order confirmation issued by us,
        not what appears on this page.
      </p>

      <h2>Product images</h2>
      <p>
        Garments shown were produced by us, generally to a buyer&apos;s specification. They evidence
        capability. They are not an offer to sell those designs, and any design owned by a customer
        remains theirs.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, photography and design of this site belong to {company.legalName} unless stated
        otherwise. Third-party certification marks belong to their respective owners and appear here
        to indicate our own certification status.
      </p>

      <h2>Confidentiality of enquiries</h2>
      <p>
        Tech packs, specifications and commercial information you send us are treated as
        confidential and used only to quote and execute your order. We are happy to sign your NDA
        before you send anything sensitive.
      </p>

      <h2>Liability</h2>
      <p>
        We do not accept liability for loss arising from reliance on general information published
        on this site. Nothing here limits liability that cannot lawfully be limited.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, with the courts of Jaipur, Rajasthan having
        jurisdiction. Contracts for manufacturing are governed by the terms agreed in the relevant
        order.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{' '}
        <a href={`mailto:${company.contact.primaryEmail}`}>{company.contact.primaryEmail}</a>.
      </p>
    </LegalPage>
  );
}
