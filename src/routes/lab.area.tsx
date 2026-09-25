import { createFileRoute } from "@tanstack/react-router";
import { StudioDesk } from "@/components/studio/StudioDesk";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/area")({
  head: () => ({
    meta: [
      { title: titleFor("Area Lab") },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioDesk area="lab" />,
});
