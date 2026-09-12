import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  return (
    <div className="min-h-screen bg-navy text-cream">
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
  );
}
