import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { WebGLHost, useReducedMotion } from "@/lab/LabStage";
import { startTramaMap } from "@/lab/tramaMap";

export function ComuneMap({ active }: { active?: string }) {
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const activeRef = useRef(active ?? null);
  activeRef.current = active ?? null;
  const [hover, setHover] = useState<string | null>(null);

  const start = useCallback(
    (c: HTMLCanvasElement) =>
      startTramaMap(c, {
        reduced: reduced.current,
        getActive: () => activeRef.current,
        onPick: (slug) => navigate({ to: "/comuni/$slug", params: { slug } }),
        onHover: setHover,
      }),
    [navigate, reduced],
  );

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-deep shadow-[var(--shadow-border)]">
      <WebGLHost start={start} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-3 bg-gradient-to-t from-navy-deep/90 to-transparent px-4 pb-3 pt-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cream-soft">
          {hover ?? "Trama dei 26 · tocca un comune"}
        </p>
        <Link to="/lab/trama" className="pointer-events-auto text-[0.7rem] uppercase tracking-[0.14em] text-copper-light hover:text-cream">
          Apri in Lab
        </Link>
      </div>
    </div>
  );
}
