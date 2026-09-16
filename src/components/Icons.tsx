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

export const WhatsApp = ({ className }: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);
