import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { DIGITAL_MAIL, PITCH } from "@/data/digitale";

export function DigitalShell({ children }: { children: ReactNode }) {
  return (
    <div className="carta-page relative min-h-screen text-ink">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Salta al contenuto
      </a>
      <DigitalHeader />
      <div id="contenuto">{children}</div>
      <DigitalFooter />
    </div>
  );
}

const NAV = [
  { href: "#servizi", label: "Servizi" },
  { href: "#metodo", label: "Metodo" },
  { href: "#opere", label: "Lavori" },
] as const;

function DigitalHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-12">
      <Link
        to="/digitale"
        className="inline-flex items-center rounded-full bg-navy px-3 py-1.5"
        aria-label="Lepini Digital"
      >
        <BrandMark variant="digital" className="h-9 w-auto md:h-10" />
      </Link>

      <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft lg:flex" aria-label="Studio">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="hover:text-ink">
            {n.label}
          </a>
        ))}
        <Link to="/digitale/studio" className="hover:text-ink">
          Studio
        </Link>
        <Link to="/portale" className="hover:text-ink">
          Portale
        </Link>
        <Link to="/lab" className="hover:text-ink">
          Lab
        </Link>
        <a
          href="#contatti"
          className="rounded-full border border-ink/20 px-4 py-2 text-sm text-ink hover:border-copper hover:text-copper"
        >
          Parliamone
        </a>
      </nav>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="digital-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Menu</span>
      </button>

      {open ? (
        <div id="digital-nav" className="absolute inset-x-0 top-full border-b border-ink/10 bg-paper px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1 text-ink" aria-label="Mobile studio">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <Link to="/digitale/studio" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Studio
            </Link>
            <Link to="/portale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Portale
            </Link>
            <Link to="/lab" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lab
            </Link>
            <a href="#contatti" className="min-h-11 px-2 py-2 text-copper" onClick={() => setOpen(false)}>
              Parliamone
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function DigitalFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="inline-flex items-center rounded-full bg-navy px-4 py-2">
          <BrandMark variant="digital" className="h-12 w-auto md:h-14" />
        </div>
        <div className="text-sm text-ink-soft">
          <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-copper">
            {DIGITAL_MAIL}
          </a>
          <p className="mt-2 max-w-sm">{PITCH.footer}</p>
        </div>
      </div>
    </footer>
  );
}
