import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/BrandMark";
import { PARTNER } from "@/data/eventi";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 bg-navy-deep px-5 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-wrap items-center gap-5 border-b border-cream/10 pb-8">
          <BrandMark variant="mark" className="h-12 w-auto" />
          <div>
            <p className="font-display text-2xl text-cream">Monti Lepini</p>
            <p className="mt-1 text-sm tracking-wide text-copper-light">Enciclopedia digitale del comprensorio</p>
            <p className="mt-2 text-sm text-muted">
              Un progetto di{" "}
              <Link to="/digitale" className="text-olive-light hover:text-cream">
                Lepini Digital
              </Link>
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-olive-light">Il Portale</p>
            <ul className="mt-3 space-y-2 text-sm text-cream-soft">
              <li>
                <Link to="/cantiere" className="hover:text-cream">
                  Cantiere e basi
                </Link>
              </li>
              <li>
                <Link to="/digitale" className="hover:text-cream">
                  Lepini Digital
                </Link>
              </li>
              <li>
                <Link to="/lab" className="hover:text-cream">
                  Lepini Lab
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-olive-light">Non sostituisce</p>
            <ul className="mt-3 space-y-2 text-sm text-cream-soft">
              {PARTNER.map((p) => (
                <li key={p.nome}>
                  <a href={p.url} className="hover:text-cream" rel="noreferrer">
                    {p.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-muted">
            <p>Progetto indipendente, senza pubblicità. Dati in costruzione: le popolazioni sono stime da verificare con ISTAT.</p>
            <p className="mt-3">Questo sito non usa cookie di profilazione.</p>
          </div>
        </div>
        <p className="text-xs text-muted">
          Costruito a Montelanico (RM) da Lepini Digital · 26 comuni · Latina, Roma, Frosinone
        </p>
      </div>
    </footer>
  );
}
