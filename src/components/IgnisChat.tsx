import { Bot, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { askIgnis } from "@/lib/ignis";
import { cn } from "@/lib/utils";

type Msg = { role: "bot" | "user"; text: string; source?: string; link?: string; linkLabel?: string };

const HELLO =
  "Ciao. Sono IGNIS, l'assistente del Portale. Cerco nei 26 comuni: storia, chiese, natura, sagre, attività. Locale, senza rete.";

export function IgnisChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ role: "bot", text: HELLO }]);
    if (open) field.current?.focus();
  }, [open, msgs.length]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [msgs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function send() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    const a = askIgnis(q);
    setMsgs((m) => [
      ...m,
      { role: "user", text: q },
      { role: "bot", text: a.text, source: a.source, link: a.link, linkLabel: a.linkLabel },
    ]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open ? (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-cream/15 bg-navy-deep shadow-[0_20px_60px_rgba(0,0,0,.45)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-cream/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <Bot className="size-5 text-copper-light" />
              <div>
                <p id={titleId} className="font-display text-lg leading-none text-cream">
                  IGNIS
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-wider text-muted">Assistente del Portale · locale</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-cream-soft hover:bg-cream/10"
              aria-label="Chiudi IGNIS"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>
          <div ref={list} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[92%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-copper/25 text-cream"
                    : "bg-navy-card text-cream-soft shadow-[var(--shadow-border)]",
                )}
              >
                <p>{m.text}</p>
                {m.source ? <p className="mt-2 text-[0.68rem] uppercase tracking-wider text-copper-light">{m.source}</p> : null}
                {m.link ? (
                  <a href={m.link} className="mt-1 inline-block text-olive-light hover:text-cream">
                    {m.linkLabel}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-cream/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chiedi qualcosa sui 26 comuni…"
              className="min-h-11 flex-1 rounded-full border border-cream/15 bg-navy px-4 text-sm text-cream placeholder:text-muted"
              autoComplete="off"
            />
            <button
              type="submit"
              className="inline-flex size-11 items-center justify-center rounded-full bg-copper text-cream"
              aria-label="Invia"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-copper px-4 py-2.5 text-sm text-cream shadow-[0_8px_24px_rgba(181,113,58,.4)]"
      >
        <Bot className="size-5" />
        Chiedi a IGNIS
      </button>
    </div>
  );
}
