/** Quality system. Drives /quality/ and the QA capability page. */
export const qualityGates = [
  {
    stage: 'Fabric inward',
    what: 'Incoming fabric is inspected before it reaches the cutting table.',
    detail:
      'Shade, width, weight and visible defects are checked against the approved standard. Catching a fabric problem here costs a delay; catching it after cutting costs the order.',
  },
  {
    stage: 'Cutting',
    what: 'Marker, ply height and cut accuracy are checked against the approved pattern.',
    detail:
      'Because markers are generated digitally from the approved sample pattern, the cut panels match what the buyer signed off rather than a manual re-draft.',
  },
  {
    stage: 'Inline, during sewing',
    what: 'Operators and line QC check construction as the garment is built.',
    detail:
      'This is the gate that actually prevents defects. Final inspection can only detect them, by which point the fix is expensive and the ship date is at risk.',
  },
  {
    stage: 'Embroidery and decoration',
    what: 'Density, placement and pucker are checked against the approved strike-off.',
    detail:
      'Because embroidery runs on our own machines, a drift from the approved sample is caught and corrected on the same floor, in the same shift.',
  },
  {
    stage: 'Measurement',
    what: 'Garments are measured against the approved spec across the size set.',
    detail: 'Tolerances are agreed with the buyer up front and applied consistently across sizes.',
  },
  {
    stage: 'Final AQL inspection',
    what: 'Statistical final inspection to the buyer’s AQL standard before packing.',
    detail:
      'Buyer-appointed third parties — SGS, Bureau Veritas, Intertek, or the brand’s own QA — are accommodated on site rather than negotiated over.',
  },
];

export const sampleTypes = [
  { name: 'Proto sample', purpose: 'Proves the silhouette and construction. Fabric may be a substitute.' },
  { name: 'Fit sample', purpose: 'Fit assessed on the buyer’s form or model; comments applied to the pattern.' },
  { name: 'Size set', purpose: 'Confirms the grade holds across the full size range.' },
  { name: 'Strike-off', purpose: 'Print or embroidery proofed on the actual bulk fabric.' },
  { name: 'Pre-production (PP)', purpose: 'Sealed in bulk fabric, bulk trims and bulk decoration. The contract for bulk.' },
  { name: 'Shipment sample', purpose: 'Drawn from the packed order as the record of what shipped.' },
];
