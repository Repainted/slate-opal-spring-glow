import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/seo";
import { HomePage } from "./index";

export const Route = createFileRoute("/portale")({
  head: () => ({
    meta: [
      { title: `${SITE.name} · 26 borghi` },
      { name: "description", content: SITE.description },
    ],
  }),
  component: HomePage,
});
