import type { BuildingSpec, WallFace } from "@/preventivi/lib/geometry/plan";
import { hipRidgePlan, postPositions, wallFrame, wallLocalToWorld } from "@/preventivi/lib/geometry/plan";
import { formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { cn } from "@/preventivi/lib/utils";

export function Plan2D({
  spec,
  className,
  highlightFace = null,
  onSelectFace,
  compact,
}: {
  spec: BuildingSpec;
  className?: string;
  highlightFace?: WallFace | null;
  onSelectFace?: (face: WallFace) => void;
  compact?: boolean;
}) {
  const { t } = useT();
  const L = spec.length;
  const D = spec.kind === "wall" ? Math.max(1.1, spec.thickness * 4) : spec.depth;
  const pad = compact ? 2.0 : 3.2;
  const vb = `${-L / 2 - pad} ${-D / 2 - pad} ${L + pad * 2} ${D + pad * 2}`;
  const tw = Math.max(0.16, spec.thickness);
  const faces: WallFace[] = spec.kind === "wall" ? [0] : [0, 1, 2, 3];

  return (
    <div
      data-plan
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-border)]",
        compact ? "h-56" : "h-[min(48vh,24rem)] min-h-64",
        className,
      )}
    >
      <svg
        viewBox={vb}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full text-foreground"
        aria-label={t("plan.viewPlan")}
      >
        <rect
          x={-L / 2 - pad}
          y={-D / 2 - pad}
          width={L + pad * 2}
          height={D + pad * 2}
          className="fill-background"
        />

        {spec.kind === "porch" ? (
          <>
            <rect
              x={-L / 2}
              y={-D / 2}
              width={L}
              height={D}
              className="fill-muted stroke-foreground"
              strokeWidth={0.05}
              strokeDasharray="0.18 0.12"
            />
            {postPositions(spec).map((p, i) => (
              <rect
                key={`p${i}`}
                x={p.x - 0.1}
                y={p.z - 0.1}
                width={0.2}
                height={0.2}
                className="fill-foreground"
              />
            ))}
          </>
        ) : (
          <>
            {spec.kind !== "wall" ? (
              <rect
                x={-L / 2 + tw}
                y={-D / 2 + tw}
                width={Math.max(0.15, L - tw * 2)}
                height={Math.max(0.15, D - tw * 2)}
                className="fill-muted"
              />
            ) : null}

            {faces.map((face) => {
              const f = spec.kind === "wall" ? { ox: -L / 2, oz: D / 2, rotY: 0, len: L } : wallFrame(face, L, D);
              const a = wallLocalToWorld(face, L, spec.kind === "wall" ? D : spec.depth, 0, 0);
              const b = wallLocalToWorld(face, L, spec.kind === "wall" ? D : spec.depth, f.len, 0);
              const hi = highlightFace === face;
              return (
                <g key={`w${face}`}>
                  {onSelectFace ? (
                    <line
                      x1={a.x}
                      y1={a.z}
                      x2={b.x}
                      y2={b.z}
                      className="stroke-transparent"
                      strokeWidth={tw * 3.2}
                      role="button"
                      onClick={() => onSelectFace(face)}
                    />
                  ) : null}
                  <line
                    x1={a.x}
                    y1={a.z}
                    x2={b.x}
                    y2={b.z}
                    className={hi ? "stroke-brick" : "stroke-foreground"}
                    strokeWidth={tw}
                    strokeLinecap="square"
                  />
                </g>
              );
            })}

            {spec.openings.map((o, i) => (
              <OpeningMark key={`o${i}`} spec={spec} opening={o} tw={tw} />
            ))}
          </>
        )}

        <RoofPlanMarks spec={spec} L={L} D={D} />

        <DimLine x1={-L / 2} y1={D / 2 + 0.85} x2={L / 2} y2={D / 2 + 0.85} label={`${formatQty(L)} m`} />
        {spec.kind !== "wall" ? (
          <DimLine
            x1={L / 2 + 0.85}
            y1={-D / 2}
            x2={L / 2 + 0.85}
            y2={D / 2}
            label={`${formatQty(D)} m`}
            vertical
          />
        ) : null}

        <polygon
          points={`${-L / 2 - 1.05},${-D / 2 - 1.25} ${-L / 2 - 1.3},${-D / 2 - 0.5} ${-L / 2 - 0.8},${-D / 2 - 0.5}`}
          className="fill-brick"
        />
        <text x={-L / 2 - 1.05} y={-D / 2 - 1.45} textAnchor="middle" className="fill-muted-foreground" fontSize={0.3}>
          N
        </text>

        {(
          [
            { x: 0, y: D / 2 + 1.55, label: t("plan.south"), show: true },
            { x: L / 2 + 1.85, y: 0.12, label: t("plan.east"), show: spec.kind !== "wall" },
            { x: 0, y: -D / 2 - 0.55, label: t("plan.north"), show: spec.kind !== "wall" },
            { x: -L / 2 - 1.85, y: 0.12, label: t("plan.west"), show: spec.kind !== "wall" },
          ] as const
        )
          .filter((r) => r.show)
          .map((r) => (
            <text
              key={r.label}
              x={r.x}
              y={r.y}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={0.28}
            >
              {r.label}
            </text>
          ))}
      </svg>
    </div>
  );
}

function RoofPlanMarks({ spec, L, D }: { spec: BuildingSpec; L: number; D: number }) {
  if (spec.kind === "wall" || spec.pitch < 0.5) return null;
  const stroke = { className: "stroke-brick", strokeWidth: 0.045, fill: "none" as const };
  if (spec.roofKind === "shed") {
    return (
      <g>
        <line x1={-L / 2} y1={-D / 2} x2={L / 2} y2={-D / 2} {...stroke} strokeDasharray="0.14 0.08" />
        <GutterPlanMarks spec={spec} L={L} D={D} />
      </g>
    );
  }
  if (spec.roofKind === "hip") {
    const r = hipRidgePlan(L, D);
    const hips = r.alongX
      ? [
          [-L / 2, D / 2, r.ax, r.az],
          [L / 2, D / 2, r.bx, r.bz],
          [L / 2, -D / 2, r.bx, r.bz],
          [-L / 2, -D / 2, r.ax, r.az],
        ]
      : [
          [-L / 2, D / 2, r.ax, r.az],
          [L / 2, D / 2, r.ax, r.az],
          [L / 2, -D / 2, r.bx, r.bz],
          [-L / 2, -D / 2, r.bx, r.bz],
        ];
    return (
      <g>
        {r.ax !== r.bx || r.az !== r.bz ? (
          <line x1={r.ax} y1={r.az} x2={r.bx} y2={r.bz} {...stroke} />
        ) : null}
        {hips.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />
        ))}
        <GutterPlanMarks spec={spec} L={L} D={D} />
      </g>
    );
  }
  return (
    <g>
      <line x1={-L / 2} y1={0} x2={L / 2} y2={0} {...stroke} strokeDasharray="0.14 0.08" />
      <GutterPlanMarks spec={spec} L={L} D={D} />
    </g>
  );
}

function GutterPlanMarks({ spec, L, D }: { spec: BuildingSpec; L: number; D: number }) {
  if (spec.kind === "wall") return null;
  const o = 0.22;
  const stroke = { className: "stroke-muted-foreground", strokeWidth: 0.05, fill: "none" as const, strokeDasharray: "0.1 0.07" };
  if (spec.roofKind === "shed") {
    return <line x1={-L / 2} y1={D / 2 + o} x2={L / 2} y2={D / 2 + o} {...stroke} />;
  }
  if (spec.roofKind === "hip") {
    return (
      <rect x={-L / 2 - o} y={-D / 2 - o} width={L + o * 2} height={D + o * 2} {...stroke} />
    );
  }
  return (
    <g>
      <line x1={-L / 2} y1={D / 2 + o} x2={L / 2} y2={D / 2 + o} {...stroke} />
      <line x1={-L / 2} y1={-D / 2 - o} x2={L / 2} y2={-D / 2 - o} {...stroke} />
    </g>
  );
}

function DimLine({
  x1,
  y1,
  x2,
  y2,
  label,
  vertical,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  vertical?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-foreground" strokeWidth={0.035} />
      <line
        x1={x1 - (vertical ? 0.1 : 0)}
        y1={y1 - (vertical ? 0 : 0.1)}
        x2={x1 + (vertical ? 0.1 : 0)}
        y2={y1 + (vertical ? 0 : 0.1)}
        className="stroke-foreground"
        strokeWidth={0.035}
      />
      <line
        x1={x2 - (vertical ? 0.1 : 0)}
        y1={y2 - (vertical ? 0 : 0.1)}
        x2={x2 + (vertical ? 0.1 : 0)}
        y2={y2 + (vertical ? 0 : 0.1)}
        className="stroke-foreground"
        strokeWidth={0.035}
      />
      <text
        x={vertical ? mx + 0.42 : mx}
        y={vertical ? my + 0.1 : my + 0.48}
        textAnchor="middle"
        className="fill-foreground"
        fontSize={0.38}
        fontWeight={600}
        transform={vertical ? `rotate(90 ${mx + 0.42} ${my})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

function OpeningMark({
  spec,
  opening,
  tw,
}: {
  spec: BuildingSpec;
  opening: BuildingSpec["openings"][number];
  tw: number;
}) {
  const D = spec.kind === "wall" ? Math.max(1.1, spec.thickness * 4) : spec.depth;
  const L = spec.length;
  const face = opening.wall;
  const a = wallLocalToWorld(face, L, D, opening.offset, 0);
  const b = wallLocalToWorld(face, L, D, opening.offset + opening.width, 0);
  const out = wallLocalToWorld(face, L, D, opening.offset, opening.width * 0.85);
  const hingeOut = wallLocalToWorld(face, L, D, opening.offset, 0.02);

  const eraseW = Math.hypot(b.x - a.x, b.z - a.z);
  return (
    <g>
      <line
        x1={a.x}
        y1={a.z}
        x2={b.x}
        y2={b.z}
        className="stroke-background"
        strokeWidth={tw * 1.35}
        strokeLinecap="butt"
      />
      {opening.kind === "door" ? (
        <>
          <path
            d={`M ${a.x} ${a.z} A ${opening.width} ${opening.width} 0 0 1 ${out.x} ${out.z}`}
            className="fill-none stroke-brick"
            strokeWidth={0.055}
          />
          <line
            x1={a.x}
            y1={a.z}
            x2={out.x}
            y2={out.z}
            className="stroke-brick"
            strokeWidth={0.05}
          />
        </>
      ) : (
        <>
          <line
            x1={a.x}
            y1={a.z}
            x2={b.x}
            y2={b.z}
            className="stroke-brick"
            strokeWidth={0.07}
          />
          <line
            x1={hingeOut.x}
            y1={hingeOut.z}
            x2={wallLocalToWorld(face, L, D, opening.offset + opening.width, 0.02).x}
            y2={wallLocalToWorld(face, L, D, opening.offset + opening.width, 0.02).z}
            className="stroke-foreground"
            strokeWidth={0.03}
          />
        </>
      )}
      <title>
        {opening.kind} {eraseW.toFixed(2)} m
      </title>
    </g>
  );
}
