/**
 * Sustainability. Deliberately conservative: this page states only what the
 * company can evidence today, and marks the rest as work in progress rather
 * than claiming it. Overstating here is a legal and reputational risk for an
 * exporter selling into the EU.
 */
export const materialOptions = [
  {
    name: 'Better Cotton',
    status: 'Available' as const,
    detail:
      'Saroz Threadz is approved under the Better Cotton Initiative, so Better Cotton programmes can be run on request. Better Cotton operates on a mass-balance basis rather than physical traceability.',
  },
  {
    name: 'Organic-certified cotton',
    status: 'On request' as const,
    detail:
      'Available through our supply base, subject to the certification the buyer requires and the transaction certificates that come with it.',
  },
  {
    name: 'Recycled fibres',
    status: 'On request' as const,
    detail: 'Recycled and blended bases sourced against the buyer’s specification.',
  },
  {
    name: 'Conventional cotton, rayon and viscose',
    status: 'Standard' as const,
    detail: 'Our default fabric base across dresses, blouses, tunics and co-ords.',
  },
];

export const practices = [
  {
    title: 'One site, fewer movements',
    detail:
      'Cutting, sewing, embroidery, finishing and packing happen on one floor. Every process kept in house is a set of truck movements across Jaipur that does not happen.',
  },
  {
    title: 'Cutting waste',
    detail:
      'Digital marker making keeps fabric consumption predictable and reduces the offcut that manual markers generate.',
  },
  {
    title: 'Long supplier relationships',
    detail:
      'We have used the same printing houses for decades. Stable relationships make standards enforceable in a way that spot-buying does not.',
  },
  {
    title: 'Audited labour standards',
    detail:
      'The social half of sustainability is covered by our SMETA audit — labour standards, health and safety, environment and business ethics.',
  },
];

/** Stated plainly, because a sustainability page with no gaps is not credible. */
export const inProgress = [
  'We do not currently publish energy, water or emissions data for the facility.',
  'We hold no environmental management certification such as ISO 14001 at this time.',
  'Physical traceability beyond our direct suppliers is not something we can evidence today.',
];
