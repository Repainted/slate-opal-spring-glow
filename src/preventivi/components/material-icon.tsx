import type { CategoryId } from "@/preventivi/lib/materials/types";

export function MaterialIcon({ id, className }: { id: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      {id === "tegole" ? (
        <>
          <path d="M6 28l9-8 9 8 9-8 9 8" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M10 32h28v8H10z" stroke="currentColor" strokeWidth="2.4" />
          <path d="M6 28h36" stroke="currentColor" strokeWidth="2.4" />
        </>
      ) : null}
      {id === "coppi" ? (
        <>
          <path d="M8 30c4-10 8-10 12 0s8 10 12 0 8-10 12 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M8 36c4-8 8-8 12 0s8 8 12 0 8-8 12 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : null}
      {id === "guaine" ? (
        <>
          <path d="M8 14h32v20H8z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M8 20h32M8 26h32" stroke="currentColor" strokeWidth="2.2" />
          <path d="M14 14c2 4 2 8 0 12M24 14c2 4 2 8 0 12M34 14c2 4 2 8 0 12" stroke="currentColor" strokeWidth="1.8" />
        </>
      ) : null}
      {id === "gronde" ? (
        <>
          <path d="M8 16h32l-3 8H11z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M14 24v12M34 24v12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : null}
      {id === "poroton" ? (
        <>
          <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <path d="M18 10v28M30 10v28M6 24h36" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "cemento" ? (
        <>
          <path d="M14 14h20l4 8v16H10V22l4-8z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M14 22h20" stroke="currentColor" strokeWidth="2.4" />
          <path d="M20 30h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : null}
      {id === "foratini" ? (
        <>
          <rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="16" cy="24" r="3.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="3.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="24" r="3.2" stroke="currentColor" strokeWidth="2" />
        </>
      ) : null}
      {id === "mattoni" ? (
        <>
          <rect x="6" y="10" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="2.2" />
          <rect x="26" y="10" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="2.2" />
          <rect x="14" y="24" width="20" height="10" rx="1" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "legno" ? (
        <>
          <rect x="8" y="18" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <path d="M14 18v12M24 18v12M34 18v12" stroke="currentColor" strokeWidth="2" />
        </>
      ) : null}
      {id === "isolanti" ? (
        <>
          <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <path d="M8 19h32M8 28h32" stroke="currentColor" strokeWidth="2.2" />
          <path d="M16 10v28M24 10v28M32 10v28" stroke="currentColor" strokeWidth="1.8" />
        </>
      ) : null}
      {id === "intonaci" ? (
        <>
          <path d="M10 36h28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M14 36c2-10 6-18 20-22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="30" y="8" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {id === "sigillanti" ? (
        <>
          <path d="M20 8h8l2 6v22a4 4 0 0 1-12 0V14l2-6z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M18 14h12M22 36v4M26 36v4" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
    </svg>
  );
}
