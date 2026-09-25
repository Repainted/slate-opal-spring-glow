import { createFileRoute } from "@tanstack/react-router";
import { StudioDesk } from "@/components/studio/StudioDesk";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/digitale/area")({
  head: () => ({
    meta: [
      { title: titleFor("Area Digital") },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioDesk area="digital" />,
});
