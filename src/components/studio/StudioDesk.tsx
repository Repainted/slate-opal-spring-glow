import { Link } from "@tanstack/react-router";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { GRAFICA_DEFAULT, LEPINI_LINKS, STUDIO_PROJECTS, STUDIO_REPO, type StudioArea } from "@/data/studio";
import {
  applyGrafica,
  newId,
  readGrafica,
  studioDb,
  studioUnlocked,
  unlockStudio,
  writeGrafica,
  type Grafica,
  type Lavoro,
  type StudioApp,
  type StudioFile,
  type StudioLink,
} from "@/lib/studio-store";

const TABS = ["Upload", "App", "Lavori", "Lepini Link", "Anteprime", "Grafica"] as const;
type Tab = (typeof TABS)[number];

const field = "mt-1 min-h-11 w-full border border-ink/15 bg-paper px-3 text-ink";

export function StudioDesk({ area }: { area: StudioArea }) {
  const [ok, setOk] = useState(false);
  const [tab, setTab] = useState<Tab>("Upload");

  useEffect(() => {
    setOk(studioUnlocked());
  }, []);

  if (!ok) return <Gate area={area} onOk={() => setOk(true)} />;

  const back = area === "digital" ? "/digitale" : "/lab";
  const title = area === "digital" ? "Area Digital" : "Area Lab";

  return (
    <div className={area === "digital" ? "min-h-screen bg-paper text-ink" : "min-h-screen bg-navy-deep text-cream"}>
      <header className="border-b border-ink/10 px-5 py-4 md:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-kicker text-copper">Riservata</p>
            <h1 className="font-display text-3xl">{title}</h1>
          </div>
          <Link to={back} className="text-sm text-copper">
            Esci alla pagina
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-6 md:px-12">
        <div className="flex flex-wrap gap-2" role="tablist">
          {TABS.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tab === name}
              onClick={() => setTab(name)}
              className={`min-h-11 px-3 text-sm ${tab === name ? "bg-copper text-paper" : "border border-copper/40"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="mt-8">
          {tab === "Upload" ? <UploadPane area={area} /> : null}
          {tab === "App" ? <AppPane area={area} /> : null}
          {tab === "Lavori" ? <LavoriPane area={area} /> : null}
          {tab === "Lepini Link" ? <LinkPane area={area} /> : null}
          {tab === "Anteprime" ? <PreviewPane area={area} /> : null}
          {tab === "Grafica" ? <GraficaPane area={area} /> : null}
        </div>
      </div>
    </div>
  );
}

function Gate({ area, onOk }: { area: StudioArea; onOk: () => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const pass = await unlockStudio(pwd);
    setBusy(false);
    if (pass) onOk();
    else setErr(true);
  }

  return (
    <div className={area === "digital" ? "flex min-h-screen items-center bg-paper px-5 text-ink" : "flex min-h-screen items-center bg-navy-deep px-5 text-cream"}>
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-md">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">Riservata</p>
        <h1 className="mt-2 font-display text-4xl">{area === "digital" ? "Area Digital" : "Area Lab"}</h1>
        <p className="mt-3 text-sm">Stessa chiave del Cantiere.</p>
        <label className="mt-6 block text-sm">
          Password
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} autoComplete="current-password" className={field} />
        </label>
        {err ? <p className="mt-2 text-sm text-copper">Password non corretta.</p> : null}
        <button type="submit" disabled={busy || !pwd} className="mt-4 min-h-11 bg-ink px-5 text-sm text-paper disabled:opacity-50">
          {busy ? "Verifica…" : "Entra"}
        </button>
      </form>
    </div>
  );
}

function UploadPane({ area }: { area: StudioArea }) {
  const [rows, setRows] = useState<StudioFile[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const all = await studioDb.files();
    setRows(all.filter((r) => r.area === area).sort((a, b) => b.at - a.at));
  }

  useEffect(() => {
    void load();
  }, [area]);

  async function onPick(files: FileList | null) {
    if (!files) return;
    setMsg("");
    for (const file of files) {
      if (file.size > 900_000) {
        setMsg(`${file.name} è troppo pesante. Resta sotto 900 KB.`);
        continue;
      }
      const data = await file.arrayBuffer().then((buf) => {
        const bytes = new Uint8Array(buf);
        let bin = "";
        bytes.forEach((b) => {
          bin += String.fromCharCode(b);
        });
        return `data:${file.type || "application/octet-stream"};base64,${btoa(bin)}`;
      });
      await studioDb.saveFile({
        id: newId(),
        area,
        name: file.name,
        mime: file.type,
        note: "",
        data,
        at: Date.now(),
      });
    }
    await load();
  }

  return (
    <section>
      <h2 className="font-display text-3xl">Upload</h2>
      <p className="mt-2 max-w-xl text-sm">Immagini e PDF per vetrina, portfolio e lab. Restano su questo browser, non sul server.</p>
      <input
        type="file"
        accept="image/*,application/pdf"
        multiple
        className="mt-4 block text-sm"
        onChange={(e) => void onPick(e.target.files)}
      />
      {msg ? <p className="mt-2 text-sm text-copper">{msg}</p> : null}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <li key={row.id} className="border border-ink/10 bg-paper-card p-3">
            {row.mime.startsWith("image/") ? <img src={row.data} alt="" className="aspect-[6/5] w-full object-cover" /> : <p className="text-sm">PDF</p>}
            <p className="mt-2 truncate text-sm">{row.name}</p>
            <div className="mt-2 flex gap-3 text-sm">
              <a href={row.data} download={row.name} className="text-copper">
                Scarica
              </a>
              <button type="button" className="text-ink-soft" onClick={() => void studioDb.deleteFile(row.id).then(load)}>
                Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>
      {rows.length === 0 ? <p className="mt-6 text-sm">Nessun file.</p> : null}
    </section>
  );
}

function AppPane({ area }: { area: StudioArea }) {
  const [rows, setRows] = useState<StudioApp[]>([]);
  const [msg, setMsg] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const open = rows.find((r) => r.id === openId) ?? null;
  const previewUrl = useHtmlUrl(open?.html ?? null);

  async function load() {
    const all = await studioDb.apps();
    setRows(all.filter((r) => r.area === area).sort((a, b) => b.at - a.at));
  }

  useEffect(() => {
    void load();
  }, [area]);

  async function onPick(files: FileList | null) {
    if (!files) return;
    setMsg("");
    for (const file of files) {
      if (!file.name.toLowerCase().endsWith(".html") && file.type !== "text/html") {
        setMsg(`${file.name} non è un HTML. L'app è un solo file .html.`);
        continue;
      }
      if (file.size > 3_000_000) {
        setMsg(`${file.name} supera i 3 MB.`);
        continue;
      }
      const html = await file.text();
      const row: StudioApp = { id: newId(), area, name: file.name.replace(/\.html?$/i, ""), html, at: Date.now() };
      await studioDb.saveApp(row);
      setOpenId(row.id);
    }
    await load();
  }

  return (
    <section>
      <h2 className="font-display text-3xl">App</h2>
      <p className="mt-2 max-w-xl text-sm">
        Carica un file HTML: il modello, una pagina, uno strumento. Resta su questo browser. L'anteprima è qui sotto; a schermo intero si apre in un'altra scheda.
      </p>
      <input type="file" accept=".html,text/html" multiple className="mt-4 block text-sm" onChange={(e) => void onPick(e.target.files)} />
      {msg ? <p className="mt-2 text-sm text-copper">{msg}</p> : null}
      <ul className="mt-6 grid gap-2">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 border border-ink/10 px-3 py-2">
            <button type="button" className="min-h-11 text-left text-sm" onClick={() => setOpenId(row.id)}>
              {row.name}
            </button>
            <span className="flex gap-3 text-sm">
              <button type="button" className="text-copper" onClick={() => openHtml(row.html)}>
                Schermo intero
              </button>
              <button
                type="button"
                className="text-ink-soft"
                onClick={() =>
                  void studioDb.deleteApp(row.id).then(() => {
                    if (openId === row.id) setOpenId(null);
                    return load();
                  })
                }
              >
                Elimina
              </button>
            </span>
          </li>
        ))}
      </ul>
      {rows.length === 0 ? <p className="mt-6 text-sm">Nessuna app.</p> : null}
      {open && previewUrl ? (
        <iframe title={open.name} src={previewUrl} sandbox="allow-scripts allow-forms allow-popups allow-modals" className="mt-4 h-[520px] w-full border border-ink/15 bg-white" />
      ) : null}
    </section>
  );
}

function useHtmlUrl(html: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  const key = useMemo(() => html, [html]);
  useEffect(() => {
    if (!key) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(new Blob([key], { type: "text/html" }));
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [key]);
  return url;
}

function openHtml(html: string) {
  const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  window.open(url, "_blank");
}

function LavoriPane({ area }: { area: StudioArea }) {
  const [rows, setRows] = useState<Lavoro[]>([]);
  const [files, setFiles] = useState<StudioFile[]>([]);
  const [titolo, setTitolo] = useState("");
  const [cliente, setCliente] = useState("");
  const [tipo, setTipo] = useState("Sito");
  const [stato, setStato] = useState<Lavoro["stato"]>("bozza");
  const [nota, setNota] = useState("");
  const [fileId, setFileId] = useState("");

  async function load() {
    const [lavori, uploads] = await Promise.all([studioDb.lavori(), studioDb.files()]);
    setRows(lavori.filter((r) => r.area === area).sort((a, b) => b.at - a.at));
    setFiles(uploads.filter((r) => r.area === area));
  }

  useEffect(() => {
    void load();
  }, [area]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!titolo.trim()) return;
    await studioDb.saveLavoro({
      id: newId(),
      area,
      titolo: titolo.trim(),
      cliente: cliente.trim(),
      tipo,
      stato,
      nota: nota.trim(),
      fileId,
      at: Date.now(),
    });
    setTitolo("");
    setCliente("");
    setNota("");
    await load();
  }

  return (
    <section>
      <h2 className="font-display text-3xl">Portfolio e lavori</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          Titolo
          <input value={titolo} onChange={(e) => setTitolo(e.target.value)} className={field} />
        </label>
        <label className="text-sm">
          Cliente
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} className={field} />
        </label>
        <label className="text-sm">
          Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={field}>
            {["Sito", "Furgone", "Gestionale", "Campagna", "Stampa", "Video", "Lab"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Stato
          <select value={stato} onChange={(e) => setStato(e.target.value as Lavoro["stato"])} className={field}>
            <option value="bozza">Bozza</option>
            <option value="in corso">In corso</option>
            <option value="consegnato">Consegnato</option>
          </select>
        </label>
        <label className="text-sm md:col-span-2">
          Immagine caricata
          <select value={fileId} onChange={(e) => setFileId(e.target.value)} className={field}>
            <option value="">Nessuna</option>
            {files.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm md:col-span-2">
          Nota
          <textarea value={nota} onChange={(e) => setNota(e.target.value)} className={`${field} min-h-24`} />
        </label>
        <button type="submit" className="min-h-11 bg-ink px-5 text-sm text-paper md:col-span-2 md:w-fit">
          Aggiungi lavoro
        </button>
      </form>
      <ul className="mt-8 divide-y divide-ink/10">
        {rows.map((row) => {
          const img = files.find((f) => f.id === row.fileId);
          return (
            <li key={row.id} className="flex flex-wrap items-start justify-between gap-4 py-4">
              <div className="flex gap-4">
                {img?.mime.startsWith("image/") ? <img src={img.data} alt="" className="h-16 w-20 object-cover" /> : null}
                <div>
                  <p className="font-display text-xl">{row.titolo}</p>
                  <p className="text-sm text-copper">
                    {row.cliente || "Senza cliente"} · {row.tipo} · {row.stato}
                  </p>
                  {row.nota ? <p className="mt-1 max-w-xl text-sm">{row.nota}</p> : null}
                </div>
              </div>
              <button type="button" className="text-sm text-ink-soft" onClick={() => void studioDb.deleteLavoro(row.id).then(load)}>
                Elimina
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function LinkPane({ area }: { area: StudioArea }) {
  const [rows, setRows] = useState<StudioLink[]>([]);
  const [codice, setCodice] = useState("");
  const [url, setUrl] = useState("https://lepinidigital.com/digitale");
  const [nota, setNota] = useState("");
  const [copied, setCopied] = useState("");

  async function load() {
    const all = await studioDb.links();
    setRows(all.filter((r) => r.area === area).sort((a, b) => b.at - a.at));
  }

  useEffect(() => {
    void load();
  }, [area]);

  async function copy(text: string, id: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = codice.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!clean || !url.trim()) return;
    await studioDb.saveLink({ id: newId(), area, codice: clean, url: url.trim(), nota: nota.trim(), at: Date.now() });
    setCodice("");
    setNota("");
    await load();
  }

  return (
    <section>
      <h2 className="font-display text-3xl">Lepini Link</h2>
      <p className="mt-2 max-w-xl text-sm">I codici fissi funzionano per tutti. Quelli che aggiungi qui restano su questo browser: copi l’indirizzo intero.</p>
      <ul className="mt-6 divide-y divide-ink/10">
        {LEPINI_LINKS.map((link) => {
          const href = `https://lepinidigital.com/l/${link.code}`;
          return (
            <li key={link.code} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p>{link.label}</p>
                <p className="font-mono text-xs text-copper">{href}</p>
              </div>
              <button type="button" className="min-h-11 border border-ink/15 px-3 text-sm" onClick={() => void copy(href, link.code)}>
                {copied === link.code ? "Copiato" : "Copia"}
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={onSubmit} className="mt-8 grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          Codice
          <input value={codice} onChange={(e) => setCodice(e.target.value)} className={field} placeholder="volantino" />
        </label>
        <label className="text-sm">
          Destinazione
          <input value={url} onChange={(e) => setUrl(e.target.value)} className={field} />
        </label>
        <label className="text-sm md:col-span-2">
          Nota
          <input value={nota} onChange={(e) => setNota(e.target.value)} className={field} />
        </label>
        <button type="submit" className="min-h-11 bg-ink px-5 text-sm text-paper md:w-fit">
          Salva link
        </button>
      </form>
      <ul className="mt-6 divide-y divide-ink/10">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p className="font-mono text-xs text-copper">{row.codice}</p>
              <p className="text-sm">{row.url}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <button type="button" className="text-copper" onClick={() => void copy(row.url, row.id)}>
                {copied === row.id ? "Copiato" : "Copia"}
              </button>
              <button type="button" onClick={() => void studioDb.deleteLink(row.id).then(load)}>
                Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PreviewPane({ area }: { area: StudioArea }) {
  const list = STUDIO_PROJECTS.filter((p) => p.area === area || p.area === "portale" || area === "digital");
  const [apps, setApps] = useState<StudioApp[]>([]);
  const [href, setHref] = useState(list[0]?.href ?? "/digitale");
  const [appId, setAppId] = useState<string | null>(null);
  const current = list.find((p) => p.href === href) ?? list[0];
  const app = apps.find((a) => a.id === appId) ?? null;
  const appUrl = useHtmlUrl(app?.html ?? null);

  useEffect(() => {
    void studioDb.apps().then((rows) => setApps(rows.filter((r) => r.area === area).sort((a, b) => b.at - a.at)));
  }, [area]);

  return (
    <section>
      <h2 className="font-display text-3xl">Anteprime</h2>
      <p className="mt-2 max-w-xl text-sm">
        I progetti del sito e le app caricate qui. Il repository è privato: lo vedi solo se hai accesso.
      </p>
      <a href={STUDIO_REPO} className="mt-3 inline-block font-mono text-sm text-copper" target="_blank" rel="noreferrer">
        {STUDIO_REPO}
      </a>
      <div className="mt-6 flex flex-wrap gap-2">
        {list.map((p) => (
          <button
            key={p.href}
            type="button"
            onClick={() => {
              setAppId(null);
              setHref(p.href);
            }}
            className={`min-h-11 px-3 text-sm ${!appId && href === p.href ? "bg-ink text-paper" : "border border-ink/15"}`}
          >
            {p.titolo}
          </button>
        ))}
        {apps.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAppId(a.id)}
            className={`min-h-11 px-3 text-sm ${appId === a.id ? "bg-ink text-paper" : "border border-ink/15"}`}
          >
            {a.name}
          </button>
        ))}
      </div>
      {app ? (
        <>
          <p className="mt-4 text-sm">App caricata su questo browser.</p>
          <button type="button" className="mt-2 text-sm text-copper" onClick={() => openHtml(app.html)}>
            Schermo intero
          </button>
          {appUrl ? (
            <iframe title={app.name} src={appUrl} sandbox="allow-scripts allow-forms allow-popups allow-modals" className="mt-4 h-[480px] w-full border border-ink/15 bg-white" />
          ) : null}
        </>
      ) : (
        <>
          {current ? <p className="mt-4 text-sm">{current.testo}</p> : null}
          <iframe title={current?.titolo ?? "Anteprima"} src={href} className="mt-4 h-[480px] w-full border border-ink/15 bg-paper" />
        </>
      )}
    </section>
  );
}

function GraficaPane({ area }: { area: StudioArea }) {
  const [g, setG] = useState<Grafica>(GRAFICA_DEFAULT);

  useEffect(() => {
    setG(readGrafica());
  }, []);

  function set<K extends keyof Grafica>(key: K, value: Grafica[K]) {
    const next = { ...g, [key]: value };
    setG(next);
    writeGrafica(next);
    applyGrafica(area);
  }

  const fields: Array<[keyof Grafica, string]> =
    area === "digital"
      ? [
          ["paper", "Carta"],
          ["ink", "Inchiostro"],
          ["copper", "Rame"],
        ]
      : [
          ["navy", "Sfondo"],
          ["cream", "Testo"],
          ["copper", "Rame"],
        ];

  return (
    <section>
      <h2 className="font-display text-3xl">Grafica</h2>
      <p className="mt-2 max-w-xl text-sm">Colori di questa area. Restano su questo browser e si applicano alle pagine quando le apri.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {fields.map(([key, label]) => (
          <label key={key} className="text-sm">
            {label}
            <input type="color" value={g[key]} onChange={(e) => set(key, e.target.value)} className="mt-2 block h-11 w-full" />
          </label>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 min-h-11 border border-ink/15 px-4 text-sm"
        onClick={() => {
          writeGrafica(GRAFICA_DEFAULT);
          setG(GRAFICA_DEFAULT);
          applyGrafica(area);
        }}
      >
        Ripristina
      </button>
    </section>
  );
}
