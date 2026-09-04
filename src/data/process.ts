/** The order journey. Drives /process/ and the HowTo JSON-LD on it. */
export const processSteps = [
  {
    name: 'Enquiry and costing',
    text: 'Send a tech pack, sketch or reference garment with target quantities and a delivery window. Saroz Threadz responds with a costing, fabric options and an honest assessment of whether the construction suits our floor.',
    detail:
      'We would rather decline a style at this stage than learn it on your order. If a construction needs machinery we do not have, we say so in the first reply.',
  },
  {
    name: 'Sampling',
    text: 'The pattern is drafted in CAD and a proto or fit sample is produced. Embroidery digitising and print strike-offs are developed at the same time, so decoration approvals do not stack up at the end of development.',
    detail:
      'Running decoration development in parallel with the garment is what stops a "sample approved" style sitting for three weeks waiting on a strike-off.',
  },
  {
    name: 'Fit and approval',
    text: 'Your fit comments are applied to the digital pattern and the sample is reissued. Because grading and markers are digital, revisions are fast and the bulk marker is generated from the pattern you approved.',
    detail:
      'Most bulk fit failures are pattern failures — an undocumented manual re-draft between the approved sample and the cutting table. Working digitally end to end removes that gap.',
  },
  {
    name: 'Pre-production sample',
    text: 'A sealed pre-production sample is made in bulk fabric, bulk trims and bulk decoration, and approved before any line is loaded.',
    detail:
      'The PP sample is the contract. Everything from here is measured against it, including the final inspection.',
  },
  {
    name: 'Bulk production',
    text: 'Fabric is inspected, cut and loaded to the sewing lines, with embroidery panels running in parallel and inline quality checks during sewing.',
    detail:
      'Inline inspection is the difference between catching a construction issue on the line and finding it in a carton at the port.',
  },
  {
    name: 'Finishing and final inspection',
    text: 'Garments are pressed, trimmed and measured against the approved specification, then passed through a final AQL inspection before packing. Buyer-appointed third-party inspectors are accommodated on site.',
    detail:
      'If your QA team or a nominated agency such as SGS, Bureau Veritas or Intertek wants to inspect, we make room for them rather than negotiating about it.',
  },
  {
    name: 'Packing and export',
    text: 'Garments are cartoned to your pack plan, export documentation is prepared, and logistics are coordinated from Jaipur with your nominated freight forwarder.',
    detail:
      'Saroz Threadz is a Government of India recognised export house, and documentation is handled in house rather than by an agent.',
  },
];
