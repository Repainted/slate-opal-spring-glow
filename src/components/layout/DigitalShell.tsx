import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { DIGITAL_MAIL } from "@/data/digitale";

export function DigitalShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-navy text-cream">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-navy-deep"
      >
        Salta al contenuto
      </a>
      <DigitalHeader />
      <div id="contenuto">{children}</div>
      <DigitalFooter />
    </div>
  );
}

function DigitalHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-12">
      <Link to="/digitale" className="flex items-center gap-3 text-cream" aria-label="Lepini Digital">
        <BrandMark variant="digital" className="h-10 w-auto md:h-12" />
      </Link>

      <nav className="hidden items-center gap-7 text-sm tracking-wide text-cream/80 lg:flex" aria-label="Studio">
        <a href="#prodotto" className="text-cream/90 hover:text-cream">
          Fotografia
        </a>
        <a href="#servizi" className="text-cream/90 hover:text-cream">
          Servizi
        </a>
        <a href="#metodo" className="text-cream/90 hover:text-cream">
          Metodo
        </a>
        <Link to="/" className="text-cream/90 hover:text-cream">
          Portale
        </Link>
        <Link to="/lab" className="text-cream/90 hover:text-cream">
          Lab
        </Link>
        <a
          href="#contatti"
          className="rounded-full border border-olive-light/50 px-4 py-2 text-sm text-olive-light hover:bg-olive/15"
        >
          Parliamone
        </a>
      </nav>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
        aria-expanded={open}
        aria-controls="digital-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Menu</span>
      </button>

      {open ? (
        <div
          id="digital-nav"
          className="absolute inset-x-0 top-full border-b border-cream/10 bg-navy-deep/98 px-5 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile studio">
            <a href="#prodotto" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Fotografia
            </a>
            <a href="#servizi" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Servizi
            </a>
            <a href="#metodo" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Metodo
            </a>
            <Link to="/" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Portale
            </Link>
            <Link to="/lab" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lab
            </Link>
            <a href="#contatti" className="min-h-11 px-2 py-2 text-olive-light" onClick={() => setOpen(false)}>
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
    <footer className="border-t border-cream/10 bg-navy-deep px-5 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <BrandMark variant="digital" className="h-14 w-auto md:h-16" />
        </div>
        <div className="text-sm text-muted">
          <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-olive-light">
            {DIGITAL_MAIL}
          </a>
          <p className="mt-2 max-w-sm">
            Studio a Montelanico. Ha costruito il Portale e il Lab. Lavora per le imprese del crinale.
          </p>
        </div>
      </div>
    </footer>
  );
}

