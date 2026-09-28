import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { DIGITAL_MAIL, PITCH } from "@/data/digitale";
import { LangToggle, useT } from "@/lib/i18n";

export function DigitalShell({ children }: { children: ReactNode }) {
  const tr = useT();
  return (
    <div className="digital-skin relative min-h-screen bg-navy-deep text-cream">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-navy-deep"
      >
        {tr("Salta al contenuto")}
      </a>
      <DigitalHeader />
      <div id="contenuto">{children}</div>
      <DigitalFooter />
    </div>
  );
}

function DigitalHeader() {
  const [open, setOpen] = useState(false);
  const tr = useT();
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-4 md:px-12">
      <Link to="/digitale" className="flex items-center text-cream" aria-label="Lepini Digital">
        <BrandMark variant="digitalMark" className="h-12 w-auto md:h-14" />
      </Link>

      <nav className="hidden items-center gap-7 text-sm tracking-wide text-cream/80 lg:flex" aria-label="Studio">
        <a href="#prodotto" className="text-cream/90 hover:text-copper-light">
          {tr("Fotografia")}
        </a>
        <a href="#servizi" className="text-cream/90 hover:text-copper-light">
          {tr("Servizi")}
        </a>
        <a href="#metodo" className="text-cream/90 hover:text-copper-light">
          {tr("Metodo")}
        </a>
        <Link to="/digitale" className="text-cream/90 hover:text-copper-light">
          {tr("Studio")}
        </Link>
        <Link to="/portale" className="text-cream/90 hover:text-copper-light">
          {tr("Portale")}
        </Link>
        <Link to="/lab" className="text-cream/90 hover:text-copper-light">
          Lab
        </Link>
        <a
          href="#contatti"
          className="rounded-full border border-copper/55 px-4 py-2 text-sm text-copper-light hover:bg-copper/15"
        >
          {tr("Parliamone")}
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <LangToggle />
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-copper/35 text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="digital-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{tr("Menu")}</span>
        </button>
      </div>

      {open ? (
        <div
          id="digital-nav"
          className="absolute inset-x-0 top-full border-b border-copper/20 bg-navy-deep/98 px-5 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile studio">
            <a href="#prodotto" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Fotografia")}
            </a>
            <a href="#servizi" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Servizi")}
            </a>
            <a href="#metodo" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Metodo")}
            </a>
            <Link to="/digitale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Studio")}
            </Link>
            <Link to="/portale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Portale")}
            </Link>
            <Link to="/lab" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lab
            </Link>
            <a href="#contatti" className="min-h-11 px-2 py-2 text-copper-light" onClick={() => setOpen(false)}>
              {tr("Parliamone")}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function DigitalFooter() {
  const tr = useT();
  return (
    <footer className="border-t border-copper/25 bg-navy-deep px-5 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <BrandMark variant="digital" className="h-16 w-auto md:h-20" />
        <div className="text-sm text-muted">
          <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-copper-light">
            {DIGITAL_MAIL}
          </a>
          <p className="mt-2 max-w-sm">{tr(PITCH.footer)}</p>
        </div>
      </div>
    </footer>
  );
}
