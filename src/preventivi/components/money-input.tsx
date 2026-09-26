import { useEffect, useState } from "react";
import { formatQty, parseDecimal } from "@/preventivi/lib/format";
import { cn } from "@/preventivi/lib/utils";

export function MoneyInput({
  value,
  onCommit,
  ariaLabel,
  className,
}: {
  value: number;
  onCommit: (n: number) => void;
  ariaLabel?: string;
  className?: string;
}) {
  const [text, setText] = useState(formatQty(value, 2));

  useEffect(() => {
    setText(formatQty(value, 2));
  }, [value]);

  function commit() {
    onCommit(parseDecimal(text));
  }

  return (
    <div className={cn("flex h-12 items-center rounded-xl bg-secondary px-3", className)}>
      <span className="mr-1 text-base text-muted-foreground">€</span>
      <input
        type="text"
        inputMode="decimal"
        aria-label={ariaLabel}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className="min-w-0 flex-1 bg-transparent text-right text-lg font-semibold tabular-nums outline-none"
      />
    </div>
  );
}
