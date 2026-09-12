import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/comuni", label: "Comuni" },
  { to: "/parco", label: "Parco" },
  { to: "/natura", label: "Natura" },
  { to: "/sentieri", label: "Sentieri" },
  { to: "/lab", label: "Lab" },
  { to: "/calendario", label: "Calendario" },
  { to: "/digitale", label: "Digital" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-12",
        overlay ? "absolute inset-x-0 top-0" : "relative bg-navy-deep/80 border-b border-cream/10",
      )}
    >
      <Link to="/" className="flex items-center gap-3 text-cream" aria-label="Home Portale Monti Lepini">
        <BrandMark variant="mark" className="h-8 w-auto md:h-9" />
        <span className="flex flex-col leading-tight font-display">
          <span className="text-xl tracking-wide">Monti Lepini</span>
          <span className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-copper-light">
            Portale del comprensorio
          </span>
        </span>
      </Link>

      <nav className="hidden items-center gap-7 text-sm tracking-wide text-cream/80 lg:flex" aria-label="Principale">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-cream/90 hover:text-cream"
            activeProps={{ className: "text-cream border-b border-copper pb-0.5" }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/cantiere"
          className="rounded-full border border-olive-light/50 px-4 py-2 text-sm text-olive-light hover:bg-olive/15"
        >
          Cantiere
        </Link>
      </nav>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Menu</span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-cream/10 bg-navy-deep/98 px-5 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="min-h-11 px-2 py-2 text-lg text-cream"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/cantiere" className="min-h-11 px-2 py-2 text-olive-light" onClick={() => setOpen(false)}>
              Cantiere
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
