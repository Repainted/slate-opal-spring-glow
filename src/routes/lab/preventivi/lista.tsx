import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { MoneyInput } from "@/preventivi/components/money-input";
import { companyLabel, companyLines } from "@/preventivi/lib/company/types";
import { activeCompany, useCompanyStore } from "@/preventivi/lib/company/store";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { computeMetrics, gutterLabelKey, jobOf, kindLabelKey, roofKindLabelKey, roofKindOf, roofPackOf, ROOF_NONE } from "@/preventivi/lib/geometry/calc";
import { jobLabelKey, runEngine } from "@/preventivi/lib/engine/site";
import { useT } from "@/preventivi/lib/i18n";
import { compute, formatWeight } from "@/preventivi/lib/materials/calc";
import { getProduct } from "@/preventivi/lib/materials/catalog";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { productPriceUnit, workPriceUnit } from "@/preventivi/lib/prices";
import { quoteTotals } from "@/preventivi/lib/quote/totals";
import { computeExtra, computeWork } from "@/preventivi/lib/works/calc";
import { getWork, WORK_CAT_ORDER } from "@/preventivi/lib/works/catalog";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/lista")({ component: ListPage });

function ListPage() {
  useHydrateApp();
  const { t } = useT();
  const items = useMaterialStore((s) => s.items);
  const works = useMaterialStore((s) => s.works);
  const extras = useMaterialStore((s) => s.extras);
  const measures = useMaterialStore((s) => s.measures);
  const vatRate = useMaterialStore((s) => s.vatRate);
  const setVatRate = useMaterialStore((s) => s.setVatRate);
  const quoteMeta = useMaterialStore((s) => s.quoteMeta);
  const setQuoteMeta = useMaterialStore((s) => s.setQuoteMeta);
  const removeItem = useMaterialStore((s) => s.removeItem);
  const removeWork = useMaterialStore((s) => s.removeWork);
  const removeExtra = useMaterialStore((s) => s.removeExtra);
  const removeMeasure = useMaterialStore((s) => s.removeMeasure);
  const setProductPrice = useMaterialStore((s) => s.setProductPrice);
  const setWorkPrice = useMaterialStore((s) => s.setWorkPrice);
  const patchExtra = useMaterialStore((s) => s.patchExtra);
  const workPrices = useMaterialStore((s) => s.workPrices);
  const companies = useCompanyStore((s) => s.companies);
  const activeId = useCompanyStore((s) => s.activeId);
  const setActiveCompany = useCompanyStore((s) => s.setActive);
  const firm = activeCompany({ companies, activeId });
  const clear = useMaterialStore((s) => s.clear);
  const [copied, setCopied] = useState(false);

  const totals = useMemo(() => quoteTotals(items, works, extras, vatRate), [items, works, extras, vatRate]);
  const empty = items.length === 0 && works.length === 0 && extras.length === 0 && measures.length === 0;
  const hasMoney = totals.taxable > 0;

  const worksByCat = useMemo(() => {
    return WORK_CAT_ORDER.map((cat) => ({
      cat,
      lines: works.filter((l) => getWork(l.workId)?.category === cat),
    })).filter((g) => g.lines.length > 0);
  }, [works]);

  function listText() {
    const lines = [t("list.shareTitle"), ""];
    if (firm) {
      lines.push(...companyLines(firm), "");
    }
    if (quoteMeta.site) lines.push(`${t("quote.site")}: ${quoteMeta.site}`);
    if (quoteMeta.client) lines.push(`${t("quote.client")}: ${quoteMeta.client}`);
    if (quoteMeta.date) lines.push(`${t("quote.date")}: ${quoteMeta.date}`);
    if (quoteMeta.notes) lines.push(`${t("quote.notes")}: ${quoteMeta.notes}`);
    if (quoteMeta.site || quoteMeta.client || quoteMeta.date || quoteMeta.notes) lines.push("");
    if (measures.length) {
      lines.push(t("quote.measuresTitle"));
      for (const m of measures) {
        const r = computeMetrics(m);
        const name = `${t(kindLabelKey(m.kind))} · ${t(jobLabelKey(jobOf(m)))}`;
        const eng = runEngine(m, 0.25, workPrices);
        if (m.kind === "roof") lines.push(`${name} ${formatQty(m.length)}×${formatQty(m.width)} m → ${formatQty(r.roof)} m²`);
        else if (m.kind === "wall") lines.push(`${name} ${formatQty(m.length)}×${formatQty(m.height)} m → ${formatQty(r.wallNet)} m²`);
        else if (m.kind === "porch")
          lines.push(
            `${name} ${formatQty(m.length)}×${formatQty(m.width)}×${formatQty(m.height)} m · ${m.pitch}° ${t(roofKindLabelKey(roofKindOf(m)))} → ${formatQty(r.roof)} m², ${formatQty(r.posts, 0)} ${t("geom.posts").toLowerCase()}`,
          );
        else
          lines.push(
            `${name} ${formatQty(m.length)}×${formatQty(m.width)}×${formatQty(m.height)} m${m.pitch > 0.5 ? ` · ${m.pitch}° ${t(roofKindLabelKey(roofKindOf(m)))}` : ""} → pav. ${formatQty(r.floor)} m², pareti ${formatQty(r.wallNet)} m²`,
          );
        if (jobOf(m) !== "demo" && m.kind !== "wall") {
          const pack = roofPackOf(m);
          lines.push(
            `  ${t("geom.pack")}: ${[
              t(`product.${pack.covering}.name`),
              t(`product.${pack.timber}.name`),
              pack.membrane !== ROOF_NONE ? t(`product.${pack.membrane}.name`) : null,
              pack.gutter !== ROOF_NONE ? t(gutterLabelKey(pack.gutter)) : null,
            ]
              .filter(Boolean)
              .join(" · ")}`,
          );
        }
        lines.push(
          `  ${t("engine.crew")}: ${formatQty(eng.people, 0)} × ${formatQty(eng.days, 0)} gg = ${formatQty(eng.hours)} h → ${formatEuro(eng.laborCost)}`,
        );
        if (eng.debris.tonnes > 0.05) {
          lines.push(
            `  ${t("engine.debris")}: ${formatQty(eng.debris.tonnes)} t · ${formatQty(eng.debris.looseM3)} m³ · ${formatQty(eng.debris.bins10, 0)}×10 m³ + ${formatQty(eng.debris.bins5, 0)}×5 m³`,
          );
        }
      }
      lines.push("");
    }
    if (items.length) {
      lines.push(t("quote.materialsTitle"));
      for (const item of items) {
        const product = getProduct(item.productId);
        if (!product) continue;
        const r = compute(product, { ...item.input, unitPrice: item.input.unitPrice ?? product.unitPrice });
        const name = t(`product.${product.id}.name`);
        if (product.kind === "linear") {
          lines.push(`${name} — ${formatQty(r.meters ?? 0)} m → ${formatEuro(r.total)}`);
        } else {
          const unit = r.unit === "sacco" ? t("calc.bags") : t("calc.pieces");
          lines.push(`${name} — ${formatQty(r.pieces, 0)} ${unit} → ${formatEuro(r.total)}`);
        }
      }
      lines.push("");
    }
    if (works.length) {
      lines.push(t("quote.worksTitle"));
      for (const line of works) {
        const w = getWork(line.workId);
        if (!w) continue;
        const r = computeWork(w, line.input);
        const name = t(`workItem.${w.id}.name`);
        if (w.category === "labor") {
          lines.push(
            `${name} — ${formatQty(line.input.people, 0)} × ${formatQty(line.input.days, 0)} gg = ${formatQty(r.hours)} h → ${formatEuro(r.total)}`,
          );
        } else {
          lines.push(`${name} — ${formatQty(r.qty)} ${w.unit} → ${formatEuro(r.total)}`);
        }
      }
      lines.push("");
    }
    if (extras.length) {
      lines.push(t("quote.extrasTitle"));
      for (const e of extras) {
        lines.push(`${e.name} — ${formatQty(e.qty)} ${e.unit} → ${formatEuro(computeExtra(e))}`);
      }
      lines.push("");
    }
    if (totals.hours > 0) lines.push(`${t("quote.hoursTotal")}: ${formatQty(totals.hours)} h`);
    if (hasMoney) {
      lines.push(`${t("quote.taxable")}: ${formatEuro(totals.taxable)}`);
      lines.push(`${t("quote.vat")} ${vatRate}%: ${formatEuro(totals.vat)}`);
      lines.push(`${t("quote.total")}: ${formatEuro(totals.total)}`);
    }
    return lines.join("\n").trim();
  }

  function exportPdf() {
    const prev = document.title;
    const name = quoteMeta.site || quoteMeta.client || (firm ? companyLabel(firm) : "") || t("list.title");
    document.title = `${t("list.shareTitle")} — ${name}`;
    window.print();
    document.title = prev;
  }

  async function copy() {
    const text = listText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t("list.copy"), text);
    }
  }

  return (
    <AppShell>
      <div className="print-only mb-6 border-b border-border pb-4">
        {firm ? (
          <div className="flex items-start gap-4">
            {firm.logo ? <img src={firm.logo} alt="" className="h-16 w-auto max-w-40 object-contain" /> : null}
            <div>
              {companyLines(firm).map((line) => (
                <p key={line} className="text-sm leading-snug">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Cantiere</p>
        )}
        <h1 className="mt-3 text-3xl font-semibold">{t("list.title")}</h1>
        <p className="mt-2 text-base tabular-nums">
          {[quoteMeta.site, quoteMeta.client, quoteMeta.date].filter(Boolean).join(" · ")}
        </p>
        {quoteMeta.notes ? <p className="mt-1 text-sm text-muted-foreground">{quoteMeta.notes}</p> : null}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight print:hidden">{t("list.title")}</h1>
      <p className="mt-1 text-base text-muted-foreground no-print">{t("list.lead")}</p>

      <section className="no-print mt-5 grid gap-2 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
        <label className="grid gap-1">
          <span className="text-sm text-muted-foreground">{t("company.pick")}</span>
          <select
            value={activeId}
            onChange={(e) => setActiveCompany(e.target.value)}
            className="h-14 rounded-xl border border-input bg-background px-3 text-base"
          >
            <option value="">{t("company.none")}</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {companyLabel(c) || t("company.unnamed")}
              </option>
            ))}
          </select>
        </label>
        {firm ? (
          <div className="flex items-center gap-3 rounded-xl bg-background px-3 py-2">
            {firm.logo ? <img src={firm.logo} alt="" className="h-10 w-auto max-w-24 object-contain" /> : null}
            <p className="min-w-0 flex-1 text-sm leading-snug text-muted-foreground">
              {companyLines(firm).slice(0, 2).join(" · ") || t("company.unnamed")}
            </p>
          </div>
        ) : null}
        <Link
          to="/lab/preventivi/aziende"
          className="flex h-12 items-center justify-center rounded-xl bg-secondary text-base font-semibold"
        >
          {t("company.manage")}
        </Link>
      </section>

      {empty ? (
        <div className="mt-8 rounded-2xl bg-card px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="text-xl font-semibold">{t("list.empty")}</p>
          <p className="mt-2 text-muted-foreground">{t("list.emptyLead")}</p>
          <Link
            to="/lab/preventivi"
            className="mt-6 inline-flex h-14 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground"
          >
            {t("nav.home")}
          </Link>
        </div>
      ) : (
        <>
          <section className="mt-5 grid gap-2 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] print:shadow-none print:border print:border-border">
            <Field
              label={t("quote.site")}
              value={quoteMeta.site}
              placeholder={t("quote.sitePh")}
              onChange={(v) => setQuoteMeta({ site: v })}
            />
            <Field
              label={t("quote.client")}
              value={quoteMeta.client}
              placeholder={t("quote.clientPh")}
              onChange={(v) => setQuoteMeta({ client: v })}
            />
            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">{t("quote.date")}</span>
              <input
                type="date"
                value={quoteMeta.date}
                onChange={(e) => setQuoteMeta({ date: e.target.value })}
                className="h-12 rounded-xl border border-input bg-background px-3 text-base tabular-nums"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">{t("quote.notes")}</span>
              <textarea
                value={quoteMeta.notes}
                onChange={(e) => setQuoteMeta({ notes: e.target.value })}
                rows={2}
                className="rounded-xl border border-input bg-background px-3 py-2 text-base"
              />
            </label>
          </section>

          <div className="mt-4 grid grid-cols-2 gap-2 no-print">
            <button
              type="button"
              onClick={() => void copy()}
              className="h-14 rounded-xl bg-primary text-base font-semibold text-primary-foreground"
            >
              {copied ? t("list.copied") : t("list.copy")}
            </button>
            <button
              type="button"
              onClick={exportPdf}
              className="h-14 rounded-xl bg-brick text-base font-semibold text-brick-foreground"
            >
              {t("list.pdf")}
            </button>
            <button type="button" onClick={() => window.print()} className="h-14 rounded-xl bg-secondary text-base font-semibold">
              {t("list.print")}
            </button>
            <button type="button" onClick={() => clear()} className="h-14 rounded-xl bg-secondary text-base font-semibold">
              {t("list.clear")}
            </button>
            <Link
              to="/lab/preventivi/prezzi"
              className="col-span-2 flex h-14 items-center justify-center rounded-xl bg-secondary text-base font-semibold"
            >
              {t("prices.title")}
            </Link>
          </div>

          {hasMoney ? (
            <p className="mt-4 rounded-xl bg-card px-4 py-3 text-sm tabular-nums text-muted-foreground shadow-[var(--shadow-border)] print:hidden">
              {totals.hours > 0 ? `${t("quote.hoursTotal")} ${formatQty(totals.hours)} h · ` : null}
              {t("quote.total")} {formatEuro(totals.total)}
            </p>
          ) : null}

          {measures.length > 0 ? (
            <Section title={t("quote.measuresTitle")}>
              {measures.map((m) => {
                const r = computeMetrics(m);
                const name = `${t(kindLabelKey(m.kind))} · ${t(jobLabelKey(jobOf(m)))}`;
                const eng = runEngine(m, 0.25, workPrices);
                const pack = roofPackOf(m);
                return (
                  <li key={m.id} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] print:shadow-none print:border print:border-border">
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="mt-1 text-base tabular-nums text-muted-foreground">
                      {m.kind === "roof"
                        ? `${formatQty(m.length)} × ${formatQty(m.width)} m · ${m.pitch}° · ${t(roofKindLabelKey(roofKindOf(m)))}`
                        : m.kind === "wall"
                          ? `${formatQty(m.length)} × ${formatQty(m.height)} m`
                          : m.kind === "porch"
                            ? `${formatQty(m.length)} × ${formatQty(m.width)} × ${formatQty(m.height)} m · ${m.pitch}° · ${t(roofKindLabelKey(roofKindOf(m)))}`
                            : `${formatQty(m.length)} × ${formatQty(m.width)} × ${formatQty(m.height)} m${m.pitch > 0.5 ? ` · ${m.pitch}° · ${t(roofKindLabelKey(roofKindOf(m)))}` : ""}`}
                    </p>
                    {jobOf(m) !== "demo" && m.kind !== "wall" ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {[
                          t(`product.${pack.covering}.name`),
                          t(`product.${pack.timber}.name`),
                          pack.membrane !== ROOF_NONE ? t(`product.${pack.membrane}.name`) : null,
                          pack.gutter !== ROOF_NONE ? t(gutterLabelKey(pack.gutter)) : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                    <p className="mt-2 text-2xl font-semibold tabular-nums">
                      {m.kind === "roof"
                        ? `${formatQty(r.roof)} m²`
                        : m.kind === "wall"
                          ? `${formatQty(r.wallNet)} m²`
                          : m.kind === "porch"
                            ? `${formatQty(r.roof)} m²`
                            : `${formatQty(r.floor)} m²`}
                    </p>
                    {m.kind === "room" ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("geom.wallsNet")} {formatQty(r.wallNet)} m² · {t("geom.volume")} {formatQty(r.volume)} m³
                      </p>
                    ) : null}
                    {m.kind === "porch" ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("geom.floor")} {formatQty(r.floor)} m² · {t("geom.posts")} {formatQty(r.posts, 0)}
                      </p>
                    ) : null}
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("engine.crew")} {formatQty(eng.people, 0)} × {formatQty(eng.days, 0)} gg · {formatQty(eng.hours)} h · {formatEuro(eng.laborCost)}
                    </p>
                    {eng.debris.tonnes > 0.05 ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("engine.debris")} {formatQty(eng.debris.tonnes)} t · {formatQty(eng.debris.looseM3)} m³
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeMeasure(m.id)}
                      className="mt-3 h-12 w-full rounded-xl bg-secondary text-base font-semibold text-destructive no-print"
                    >
                      {t("list.delete")}
                    </button>
                  </li>
                );
              })}
            </Section>
          ) : null}

          {items.length > 0 ? (
            <Section title={t("quote.materialsTitle")}>
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                const r = compute(product, { ...item.input, unitPrice: item.input.unitPrice ?? product.unitPrice });
                return (
                  <li key={item.id} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] print:shadow-none print:border print:border-border">
                    <Link to="/lab/preventivi/prodotto/$id" params={{ id: product.id }} className="block">
                      <p className="text-lg font-semibold leading-tight">{t(`product.${product.id}.name`)}</p>
                      {item.source === "3d" ? (
                        <p className="mt-0.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">{t("list.from3d")}</p>
                      ) : null}
                      <p className="mt-0.5 text-base tabular-nums text-muted-foreground">{product.sizeLabel}</p>
                      {product.kind === "linear" ? (
                        <p className="mt-3 text-2xl font-semibold tabular-nums">{formatQty(r.meters ?? 0)} m</p>
                      ) : (
                        <p className="mt-3 text-3xl font-semibold tabular-nums">
                          {formatQty(r.pieces, 0)}
                          <span className="ml-2 text-base font-medium text-muted-foreground">
                            {r.unit === "sacco" ? t("calc.bags") : t("calc.pieces")}
                          </span>
                        </p>
                      )}
                      {r.packs != null ? (
                        <p className="mt-1 text-base text-muted-foreground">
                          {formatQty(r.packs, 0)}{" "}
                          {(product.packKind === "rotolo" ? t("calc.rolls") : t("calc.packs")).toLowerCase()}
                          {r.weightKg
                            ? ` · ${
                                formatWeight(r.weightKg).unit === "t"
                                  ? `${formatQty(formatWeight(r.weightKg).value)} t`
                                  : `${formatQty(formatWeight(r.weightKg).value, 0)} kg`
                              }`
                            : ""}
                        </p>
                      ) : null}
                      <p className="mt-2 text-xl font-semibold tabular-nums">{formatEuro(r.total)}</p>
                    </Link>
                    <div className="no-print mt-3 flex items-center gap-2">
                      <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                        {t("list.editPrice")} € / {productPriceUnit(product)}
                      </p>
                      <div className="w-[7.5rem]">
                        <MoneyInput
                          value={item.input.unitPrice ?? product.unitPrice}
                          onCommit={(n) => setProductPrice(product.id, n)}
                          ariaLabel={t("list.editPrice")}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-3 h-12 w-full rounded-xl bg-secondary text-base font-semibold text-destructive no-print"
                    >
                      {t("list.delete")}
                    </button>
                  </li>
                );
              })}
            </Section>
          ) : null}

          {worksByCat.map((group) => (
            <Section key={group.cat} title={t(`workCat.${group.cat}.name`)}>
              {group.lines.map((line) => {
                const w = getWork(line.workId);
                if (!w) return null;
                const r = computeWork(w, line.input);
                return (
                  <li key={line.id} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] print:shadow-none print:border print:border-border">
                    <Link to="/lab/preventivi/voce/$id" params={{ id: w.id }} className="block">
                      <p className="text-lg font-semibold leading-tight">{t(`workItem.${w.id}.name`)}</p>
                      {w.category === "labor" ? (
                        <p className="mt-2 text-base tabular-nums text-muted-foreground">
                          {formatQty(line.input.people, 0)} {t("quote.people").toLowerCase()} ·{" "}
                          {formatQty(line.input.days, 0)} {t("quote.days").toLowerCase()} · {formatQty(r.hours)} h
                        </p>
                      ) : (
                        <p className="mt-2 text-base tabular-nums text-muted-foreground">
                          {formatQty(r.qty)} {w.unit}
                        </p>
                      )}
                      <p className="mt-2 text-3xl font-semibold tabular-nums">{formatEuro(r.total)}</p>
                    </Link>
                    <div className="no-print mt-3 flex items-center gap-2">
                      <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                        {t("list.editPrice")} € / {workPriceUnit(w)}
                      </p>
                      <div className="w-[7.5rem]">
                        <MoneyInput
                          value={line.input.unitPrice}
                          onCommit={(n) => setWorkPrice(w.id, n)}
                          ariaLabel={t("list.editPrice")}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWork(line.id)}
                      className="mt-3 h-12 w-full rounded-xl bg-secondary text-base font-semibold text-destructive no-print"
                    >
                      {t("list.delete")}
                    </button>
                  </li>
                );
              })}
            </Section>
          ))}

          {extras.length > 0 ? (
            <Section title={t("quote.extrasTitle")}>
              {extras.map((e) => (
                <li key={e.id} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] print:shadow-none print:border print:border-border">
                  <p className="text-lg font-semibold leading-tight">{e.name}</p>
                  <p className="mt-2 text-base tabular-nums text-muted-foreground">
                    {formatQty(e.qty)} {e.unit} · {formatEuro(e.unitPrice)}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tabular-nums">{formatEuro(computeExtra(e))}</p>
                  <div className="no-print mt-3 flex items-center gap-2">
                    <p className="min-w-0 flex-1 text-sm text-muted-foreground">{t("list.editPrice")}</p>
                    <div className="w-[7.5rem]">
                      <MoneyInput
                        value={e.unitPrice}
                        onCommit={(n) => patchExtra(e.id, { unitPrice: n })}
                        ariaLabel={t("list.editPrice")}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExtra(e.id)}
                    className="mt-3 h-12 w-full rounded-xl bg-secondary text-base font-semibold text-destructive no-print"
                  >
                    {t("list.delete")}
                  </button>
                </li>
              ))}
            </Section>
          ) : null}

          <div className="no-print mt-6">
            <Link
              to="/lab/preventivi/extra"
              className="flex h-14 items-center justify-center rounded-xl bg-secondary text-base font-semibold"
            >
              {t("quote.extraAdd")}
            </Link>
          </div>

          {hasMoney ? (
            <section className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground print:bg-transparent print:text-foreground print:border print:border-border">
              <div className="mb-4 flex gap-2 no-print">
                {[0, 10, 22].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setVatRate(n)}
                    className={cn(
                      "h-12 flex-1 rounded-xl text-base font-semibold",
                      vatRate === n ? "bg-brick text-brick-foreground" : "bg-primary-foreground/15",
                    )}
                  >
                    {t("quote.vat")} {n}%
                  </button>
                ))}
              </div>
              <dl className="grid gap-3">
                {totals.materials > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("quote.materialsCost")}</dt>
                    <dd className="tabular-nums">{formatEuro(totals.materials)}</dd>
                  </div>
                ) : null}
                {totals.byCat.labor > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("workCat.labor.name")}</dt>
                    <dd className="tabular-nums">{formatEuro(totals.byCat.labor)}</dd>
                  </div>
                ) : null}
                {totals.hours > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("quote.hoursTotal")}</dt>
                    <dd className="tabular-nums">{formatQty(totals.hours)} h</dd>
                  </div>
                ) : null}
                {totals.byCat.mezzi > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("workCat.mezzi.name")}</dt>
                    <dd className="tabular-nums">{formatEuro(totals.byCat.mezzi)}</dd>
                  </div>
                ) : null}
                {totals.byCat.ponteggi > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("workCat.ponteggi.name")}</dt>
                    <dd className="tabular-nums">{formatEuro(totals.byCat.ponteggi)}</dd>
                  </div>
                ) : null}
                {totals.byCat.smaltimento > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("workCat.smaltimento.name")}</dt>
                    <dd className="tabular-nums">{formatEuro(totals.byCat.smaltimento)}</dd>
                  </div>
                ) : null}
                {totals.byCat.altro + totals.extras > 0 ? (
                  <div className="flex justify-between text-base opacity-80">
                    <dt>{t("workCat.altro.name")}</dt>
                    <dd className="tabular-nums">{formatEuro(totals.byCat.altro + totals.extras)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between text-base opacity-80">
                  <dt>{t("quote.taxable")}</dt>
                  <dd className="tabular-nums">{formatEuro(totals.taxable)}</dd>
                </div>
                <div className="flex justify-between text-base opacity-80">
                  <dt>
                    {t("quote.vat")} {vatRate}%
                  </dt>
                  <dd className="tabular-nums">{formatEuro(totals.vat)}</dd>
                </div>
                <div className="flex items-end justify-between">
                  <dt className="text-base">{t("quote.total")}</dt>
                  <dd className="text-3xl font-semibold tabular-nums">{formatEuro(totals.total)}</dd>
                </div>
              </dl>
            </section>
          ) : null}
        </>
      )}
    </AppShell>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl border border-input bg-background px-3 text-base"
      />
    </label>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">{title}</h2>
      <ul className="grid gap-3">{children}</ul>
    </section>
  );
}
