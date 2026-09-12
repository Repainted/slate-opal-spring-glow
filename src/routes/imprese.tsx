import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/imprese")({
  beforeLoad: () => {
    throw redirect({ to: "/digitale" });
  },
  component: () => null,
});
