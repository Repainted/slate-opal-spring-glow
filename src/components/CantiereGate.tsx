import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { cantiereUnlocked, unlockCantiere } from "@/lib/cantiere-gate";

export function CantiereGate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setOk(cantiereUnlocked());
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(false);
    const pass = await unlockCantiere(pwd);
    setBusy(false);
    if (pass) setOk(true);
    else setErr(true);
  }

  if (ok) return <>{children}</>;

  return (
    <SiteShell>
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-copper-light">Accesso riservato</p>
        <h1 className="mt-2 font-display text-4xl text-cream">Cantiere</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream-soft">
          Note di lavoro, non pagina pubblica. Chi ha la chiave entra; gli altri restano sul Portale.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-sm text-muted">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border border-cream/15 bg-navy-deep px-3 text-cream"
            />
          </label>
          {err ? <p className="text-sm text-copper-light">Password non corretta.</p> : null}
          <button
            type="submit"
            disabled={busy || !pwd}
            className="min-h-11 rounded-full bg-copper px-6 text-sm text-cream disabled:opacity-50"
          >
            {busy ? "Verifica…" : "Entra"}
          </button>
        </form>
      </div>
    </SiteShell>
  );
}
