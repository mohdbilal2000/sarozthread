'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnquiry, type EnquiryState } from '@/app/contact/actions';
import { productCategories } from '@/data/products';
import { company } from '@/data/company';
import { ArrowRight } from './Icons';

const initial: EnquiryState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn w-full sm:w-auto" disabled={pending}>
      {pending ? 'Sending…' : 'Send enquiry'}
      {!pending && <ArrowRight />}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="text-label mb-2.5 block text-ash">
        {label}
        {required && <span className="ml-1 text-signal">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full border border-line bg-carbon px-4 py-3.5 text-[0.9375rem] text-white transition-colors placeholder:text-iron focus:border-signal focus:outline-none aria-[invalid=true]:border-signal';

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initial);
  const err = state.fieldErrors ?? {};
  // Echo back what was typed so a validation error never costs the buyer their
  // brief. `key` forces React to re-mount the inputs with the new defaults.
  const val = state.values ?? {};

  return (
    <form action={formAction} noValidate key={state.status === 'success' ? 'sent' : 'draft'}>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field id="company" label="Company" required error={err.company}>
          <input
            id="company"
            name="company"
            defaultValue={val.company ?? ''}
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(err.company)}
            aria-describedby={err.company ? 'company-error' : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="name" label="Your name" required error={err.name}>
          <input
            id="name"
            name="name"
            defaultValue={val.name ?? ''}
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(err.name)}
            aria-describedby={err.name ? 'name-error' : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Email" required error={err.email}>
          <input
            id="email"
            name="email"
            defaultValue={val.email ?? ''}
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(err.email)}
            aria-describedby={err.email ? 'email-error' : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="country" label="Country" error={err.country}>
          <input id="country" name="country" type="text" defaultValue={val.country ?? ''} autoComplete="country-name" className={inputClass} />
        </Field>
      </div>

      <Field id="category" label="Category" error={err.category}>
        <select
          id="category"
          name="category"
          className={inputClass}
          defaultValue={val.category || productCategories[0]?.name}
        >
          {productCategories.map((p) => (
            <option key={p.slug}>{p.name}</option>
          ))}
          <option>Other womenswear</option>
        </select>
      </Field>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field id="quantity" label="Quantity per style" required error={err.quantity}>
          <input
            id="quantity"
            name="quantity"
            defaultValue={val.quantity ?? ''}
            type="text"
            placeholder="e.g. 500–2,000 pcs"
            required
            aria-invalid={Boolean(err.quantity)}
            aria-describedby={err.quantity ? 'quantity-error' : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="delivery" label="Target delivery" error={err.delivery}>
          <input
            id="delivery"
            name="delivery"
            defaultValue={val.delivery ?? ''}
            type="text"
            placeholder="e.g. SS27, ship by Nov 2026"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="brief" label="Brief" error={err.brief}>
        <textarea
          id="brief"
          name="brief"
          rows={5}
          defaultValue={val.brief ?? ''}
          placeholder="Fabric, decoration, number of styles, compliance requirements, anything else we should know."
          className={`${inputClass} resize-y`}
        />
      </Field>

      <SubmitButton />

      <p
        role="status"
        aria-live="polite"
        className={`mt-5 text-[0.9375rem] ${state.status === 'error' ? 'text-signal' : 'text-chalk'}`}
      >
        {state.message}
      </p>

      <p className="mt-6 border-t border-line pt-5 text-[0.8125rem] text-ash">
        Submitted straight to our enquiry inbox — no third-party form service holds your tech pack.
        To attach files, email{' '}
        <a href={`mailto:${company.contact.tradeEmail}`} className="text-chalk hover:text-signal">
          {company.contact.tradeEmail}
        </a>{' '}
        directly.
      </p>
    </form>
  );
}
