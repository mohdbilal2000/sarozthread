type P = { className?: string };

export const ArrowRight = ({ className }: P) => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden className={className}>
    <path d="M10.5 1L15 5.5L10.5 10M15 5.5H0" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const ArrowDown = ({ className }: P) => (
  <svg width="11" height="16" viewBox="0 0 11 16" fill="none" aria-hidden className={className}>
    <path d="M1 10.5L5.5 15L10 10.5M5.5 15V0" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const Chevron = ({ className }: P) => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className={className}>
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const Plus = ({ className }: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
    <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden className={className}>
    <path d="M1 5.5L5 9.5L13 1" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
