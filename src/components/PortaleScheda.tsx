import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PortaleScheda({
  to,
  href,
  img,
  kicker,
  title,
  text,
  className,
  compact,
}: {
  to?: "/lab/trama" | "/lab/biosfera" | "/lab";
  href?: string;
  img: string;
  kicker: string;
  title: string;
  text: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  const inner = (
    <>
      <img src={img} alt="" className={cn("w-full object-cover", compact ? "h-32" : "h-48 md:h-56")} />
      <div className="p-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-copper-light">{kicker}</p>
        <h3 className="mt-1 font-display text-2xl text-cream group-hover:text-cream-soft">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream-soft">{text}</p>
        <p className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm text-olive-light">
          Apri <ArrowRight className="size-4" />
        </p>
      </div>
    </>
  );
  const cls = cn(
    "group block overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]",
    className,
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/lab"} className={cls}>
      {inner}
    </Link>
  );
}
