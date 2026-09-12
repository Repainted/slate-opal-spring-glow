import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.22em] text-copper-light", className)}>{children}</p>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  className,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl leading-[1.08] text-cream md:text-4xl">{title}</h2>
      {lead ? <p className="mt-5 text-base leading-relaxed text-cream-soft md:text-lg">{lead}</p> : null}
    </header>
  );
}
