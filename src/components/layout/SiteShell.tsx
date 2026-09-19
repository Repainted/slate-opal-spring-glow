import type { ReactNode } from "react";
import { useMeteo } from "@/lib/meteo";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  const { src, data } = useMeteo();
  const night = data ? !data.day : false;

  return (
    <div className="relative min-h-screen bg-navy text-cream">
      {src ? (
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.15] mix-blend-soft-light"
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
      ) : null}
      <div className="trama-grain pointer-events-none fixed inset-0 z-0" aria-hidden />
      {night ? <div className="pointer-events-none fixed inset-0 z-0 bg-navy-deep/30" aria-hidden /> : null}
      <div className="relative z-[1]">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-navy-deep"
        >
          Salta al contenuto
        </a>
        <SiteHeader overlay={overlayHeader} />
        <div id="contenuto">{children}</div>
        <SiteFooter />
      </div>
    </div>
  );
}
