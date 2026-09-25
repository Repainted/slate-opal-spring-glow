import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SITE } from "@/lib/seo";
import { applyGrafica } from "@/lib/studio-store";
import appCss from "../styles.css?url";

const FONT =
  "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.name },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#23211E" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/images/brand/favicon-32.png" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONT },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/images/brand/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="it" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-navy text-cream">
        <PreviewHostBridge />
        <GraficaBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function GraficaBridge() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (path.startsWith("/digitale")) applyGrafica("digital");
    else if (path.startsWith("/lab")) applyGrafica("lab");
  }, [path]);
  return null;
}
