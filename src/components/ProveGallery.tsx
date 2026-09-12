import { Link } from "@tanstack/react-router";
import { PROVE } from "@/data/digitale";
import { cn } from "@/lib/utils";

export function ProveGallery({ light = false }: { light?: boolean }) {
  return (
    <div className="mt-12 grid gap-3 md:grid-cols-4">
      {PROVE.map((p) => (
        <Link
          key={p.src}
          to={p.to}
          params={"slug" in p && p.slug ? { slug: p.slug } : undefined}
          className={cn(
            "group overflow-hidden rounded-xl",
            light ? "bg-paper-card shadow-[0_0_0_1px_rgba(22,20,16,0.08)]" : "bg-navy-card",
            "wide" in p && p.wide ? "md:col-span-2" : "",
          )}
        >
          <img
            src={p.src}
            alt={`${p.caption}: ${p.nota}`}
            className={cn("w-full object-cover object-top", "wide" in p && p.wide ? "aspect-[16/9]" : "aspect-[16/10]")}
          />
          <p className={cn("px-4 py-3", light ? "text-ink" : "text-cream")}>
            <span className="block font-mono text-xs uppercase tracking-[0.16em] text-copper">{p.caption}</span>
            <span className={cn("mt-1 block text-sm", light ? "text-ink-soft" : "text-muted")}>{p.nota}</span>
          </p>
        </Link>
      ))}
    </div>
  );
}
