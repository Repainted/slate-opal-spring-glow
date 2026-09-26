import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/preventivi/lib/i18n";
import { cn } from "@/preventivi/lib/utils";

function formatNum(n: number, step: number): string {
  if (!Number.isFinite(n)) return "0";
  const decimals = step < 1 ? 2 : 0;
  const v = Number(n.toFixed(decimals));
  return String(v).replace(".", ",");
}

function parseNum(s: string): number | null {
  const t = s.trim().replace(/\s/g, "").replace(",", ".");
  if (t === "" || t === "." || t === "-") return 0;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export function Stepper({
  id,
  label,
  value,
  onChange,
  unit,
  step = 1,
  min = 0,
  max,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
}) {
  const { t } = useT();
  const focused = useRef(false);
  const [raw, setRaw] = useState(() => formatNum(value, step));

  useEffect(() => {
    if (!focused.current) setRaw(formatNum(value, step));
  }, [value, step]);

  function clamp(n: number) {
    let v = Number.isFinite(n) ? n : 0;
    if (v < min) v = min;
    if (max != null && v > max) v = max;
    const decimals = step < 1 ? 2 : 0;
    return Number(v.toFixed(decimals));
  }

  function commit(n: number) {
    onChange(clamp(n));
  }

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-base font-medium text-foreground">
        {label}
        {unit ? <span className="ml-1 font-normal text-muted-foreground">{unit}</span> : null}
      </label>
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground active:scale-[0.97]"
          onClick={() => commit(value - step)}
          aria-label={t("qty.minus")}
        >
          <Minus className="size-7" />
        </button>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={raw}
          onFocus={() => {
            focused.current = true;
          }}
          onBlur={() => {
            focused.current = false;
            const n = parseNum(raw);
            const next = clamp(n ?? 0);
            commit(next);
            setRaw(formatNum(next, step));
          }}
          onChange={(e) => {
            const next = e.target.value;
            if (!/^\d*[.,]?\d*$/.test(next)) return;
            setRaw(next);
            const n = parseNum(next);
            if (n != null && next !== "" && next !== "," && next !== ".") commit(n);
          }}
          className={cn(
            "h-16 min-w-0 flex-1 rounded-xl border border-input bg-card text-center text-3xl font-semibold tabular-nums shadow-[var(--shadow-border)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        />
        <button
          type="button"
          className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground active:scale-[0.97]"
          onClick={() => commit(value + step)}
          aria-label={t("qty.plus")}
        >
          <Plus className="size-7" />
        </button>
      </div>
    </div>
  );
}
