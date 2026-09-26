export function WorkIcon({
  id,
  className,
}: {
  id: "roof" | "room" | "wall" | "porch" | "labor" | "mezzi" | "ponteggi" | "smaltimento" | "altro" | "plan";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      {id === "roof" ? (
        <>
          <path d="M6 26 L24 10 L42 26" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M10 26v12h28V26" stroke="currentColor" strokeWidth="2.4" />
        </>
      ) : null}
      {id === "room" ? (
        <>
          <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <path d="M8 22h32M20 22v16" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "wall" ? (
        <>
          <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <path d="M10 18h28M10 28h28M24 8v32" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "porch" ? (
        <>
          <path d="M6 22 L24 12 L42 22" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M12 22v16M36 22v16M12 38h24" stroke="currentColor" strokeWidth="2.4" />
          <path d="M24 22v16" stroke="currentColor" strokeWidth="2" />
        </>
      ) : null}
      {id === "labor" ? (
        <>
          <circle cx="18" cy="14" r="5" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="32" cy="16" r="4" stroke="currentColor" strokeWidth="2.2" />
          <path d="M8 38c1-8 5-12 10-12s9 4 10 12" stroke="currentColor" strokeWidth="2.2" />
          <path d="M26 38c1-6 4-9 7-9s6 3 7 9" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "mezzi" ? (
        <>
          <path d="M6 30h24l8-10h4v10h2" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="14" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="34" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "ponteggi" ? (
        <>
          <path d="M10 8v32M38 8v32M10 14h28M10 24h28M10 34h28" stroke="currentColor" strokeWidth="2.4" />
          <path d="M10 14l28 10M38 14L10 24" stroke="currentColor" strokeWidth="2" />
        </>
      ) : null}
      {id === "smaltimento" ? (
        <>
          <path d="M14 14h20l2 24H12l2-24z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M18 14V10h12v4" stroke="currentColor" strokeWidth="2.4" />
          <path d="M20 22v10M28 22v10" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "altro" ? (
        <>
          <rect x="10" y="8" width="28" height="32" rx="3" stroke="currentColor" strokeWidth="2.4" />
          <path d="M16 18h16M16 25h16M16 32h10" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "plan" ? (
        <>
          <path d="M8 32 L24 22 L40 32 L40 14 L24 6 L8 14 Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M24 6v16M8 14l16 8 16-8" stroke="currentColor" strokeWidth="2" />
        </>
      ) : null}
    </svg>
  );
}
