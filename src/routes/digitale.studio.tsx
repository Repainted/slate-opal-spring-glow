import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/digitale/studio")({
  beforeLoad: () => {
    throw redirect({ to: "/digitale" });
  },
  component: () => null,
});
