export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect x="3" y="14" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="17" y="14" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
