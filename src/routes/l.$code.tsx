import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEPINI_LINKS } from "@/data/studio";

export const Route = createFileRoute("/l/$code")({
  beforeLoad: ({ params }) => {
    const hit = LEPINI_LINKS.find((l) => l.code === params.code);
    if (!hit) throw notFound();
    throw redirect({ to: hit.to, hash: hit.hash });
  },
});
