'use server';

import { z } from 'zod';
import { company } from '@/data/company';

/**
 * Server Action for the quote request.
 *
 * Validation runs on the server, so it cannot be bypassed by disabling the
 * client script. Delivery is deliberately pluggable: set RESEND_API_KEY (or
 * FORM_WEBHOOK_URL) and enquiries are emailed/posted; with neither configured
 * the action still validates and returns a success state that tells the buyer
 * to email us, so the form is never a black hole.
 */

const schema = z.object({
  company: z.string().trim().min(1, 'Company is required').max(200),
  name: z.string().trim().min(1, 'Your name is required').max(200),
  email: z.email('That email address does not look right').max(200),
  country: z.string().trim().max(120).optional().or(z.literal('')),
  category: z.string().trim().max(120).optional().or(z.literal('')),
  quantity: z.string().trim().min(1, 'Quantity per style is required').max(120),
  delivery: z.string().trim().max(160).optional().or(z.literal('')),
  brief: z.string().trim().max(4000).optional().or(z.literal('')),
  // Honeypot. Real people never fill this in.
  website: z.string().max(0).optional().or(z.literal('')),
});

type Fields = z.infer<typeof schema>;

export type EnquiryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof Fields, string>>;
  /**
   * Whatever the buyer typed, echoed back on error. Uncontrolled inputs are
   * cleared when the action re-renders the form, so without this a mistyped
   * email address would wipe an entire brief. Never populated on success — the
   * form should come back empty once an enquiry has been sent.
   */
  values?: Partial<Record<keyof Fields, string>>;
};

const FIELD_NAMES = [
  'company',
  'name',
  'email',
  'country',
  'category',
  'quantity',
  'delivery',
  'brief',
] as const;

const readValues = (formData: FormData): EnquiryState['values'] =>
  Object.fromEntries(
    FIELD_NAMES.map((key) => [key, String(formData.get(key) ?? '')]),
  ) as EnquiryState['values'];

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: EnquiryState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Fields;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors,
      values: readValues(formData),
    };
  }

  const data = parsed.data;

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (data.website) return { status: 'success', message: 'Thank you — your enquiry is with us.' };

  const lines = [
    `Company:   ${data.company}`,
    `Name:      ${data.name}`,
    `Email:     ${data.email}`,
    `Country:   ${data.country || '—'}`,
    `Category:  ${data.category || '—'}`,
    `Quantity:  ${data.quantity}`,
    `Delivery:  ${data.delivery || '—'}`,
    '',
    'Brief:',
    data.brief || '—',
  ].join('\n');

  const subject = `Manufacturing enquiry — ${data.company}`;

  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? 'Saroz Threadz <enquiries@sarozthreadz.com>',
          to: [process.env.ENQUIRY_TO ?? company.contact.tradeEmail],
          reply_to: data.email,
          subject,
          text: lines,
        }),
      });
      if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    } else if (process.env.FORM_WEBHOOK_URL) {
      const response = await fetch(process.env.FORM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, ...data }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } else {
      // No delivery configured. Rather than pretend, tell the buyer exactly
      // where to send it — the enquiry is too valuable to swallow.
      return {
        status: 'success',
        message: `Thank you. Email delivery is not yet switched on for this site, so please send this brief to ${company.contact.tradeEmail} so it reaches us today.`,
      };
    }

    return {
      status: 'success',
      message: 'Thank you — your enquiry is with us. We reply to every brief.',
    };
  } catch (error) {
    console.error('Enquiry delivery failed', error);
    return {
      status: 'error',
      message: `Something went wrong sending that. Please email ${company.contact.tradeEmail} directly and we will pick it up.`,
      values: readValues(formData),
    };
  }
}
