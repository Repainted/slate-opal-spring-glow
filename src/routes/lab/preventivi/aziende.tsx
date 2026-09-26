import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { readLogoFile } from "@/preventivi/lib/company/logo";
import { activeCompany, useCompanyStore } from "@/preventivi/lib/company/store";
import { companyLabel, type Company } from "@/preventivi/lib/company/types";
import { useT } from "@/preventivi/lib/i18n";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/aziende")({ component: CompaniesPage });

function CompaniesPage() {
  useHydrateApp();
  const { t } = useT();
  const companies = useCompanyStore((s) => s.companies);
  const activeId = useCompanyStore((s) => s.activeId);
  const addCompany = useCompanyStore((s) => s.addCompany);
  const updateCompany = useCompanyStore((s) => s.updateCompany);
  const removeCompany = useCompanyStore((s) => s.removeCompany);
  const setActive = useCompanyStore((s) => s.setActive);
  const current = activeCompany({ companies, activeId });
  const fileRef = useRef<HTMLInputElement>(null);
  const [logoBusy, setLogoBusy] = useState(false);

  async function onLogo(file: File | undefined) {
    if (!current || !file) return;
    setLogoBusy(true);
    try {
      const logo = await readLogoFile(file);
      updateCompany(current.id, { logo });
    } catch {
      /* ignore bad files */
    } finally {
      setLogoBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <AppShell title={t("company.title")} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <p className="text-base text-muted-foreground">{t("company.lead")}</p>

      <button
        type="button"
        onClick={() => addCompany()}
        className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground"
      >
        {t("company.add")}
      </button>

      {companies.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-card px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="text-xl font-semibold">{t("company.empty")}</p>
          <p className="mt-2 text-muted-foreground">{t("company.emptyLead")}</p>
        </div>
      ) : (
        <>
          <ul className="mt-4 grid gap-2">
            {companies.map((c) => {
              const on = c.id === (current?.id ?? "");
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActive(c.id)}
                    className={cn(
                      "flex min-h-16 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left",
                      on ? "bg-primary text-primary-foreground" : "bg-card shadow-[var(--shadow-border)]",
                    )}
                  >
                    {c.logo ? (
                      <img src={c.logo} alt="" className="size-10 shrink-0 rounded-md object-contain bg-background" />
                    ) : (
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-md text-sm font-semibold",
                          on ? "bg-primary-foreground/15" : "bg-secondary",
                        )}
                      >
                        {(companyLabel(c) || t("company.unnamed")).slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-base font-semibold">
                        {companyLabel(c) || t("company.unnamed")}
                      </span>
                      {c.vat ? (
                        <span className={cn("mt-0.5 block text-sm", on ? "opacity-70" : "text-muted-foreground")}>
                          P.IVA {c.vat}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {current ? <CompanyForm company={current} onChange={(p) => updateCompany(current.id, p)} /> : null}

          {current ? (
            <section className="mt-6 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
              <h2 className="text-base font-semibold">{t("company.logo")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("company.logoHint")}</p>
              {current.logo ? (
                <img src={current.logo} alt="" className="mt-3 max-h-24 w-auto max-w-full object-contain" />
              ) : null}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => void onLogo(e.target.files?.[0])}
              />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={logoBusy}
                  onClick={() => fileRef.current?.click()}
                  className="h-12 rounded-xl bg-secondary text-base font-semibold"
                >
                  {t("company.logo")}
                </button>
                {current.logo ? (
                  <button
                    type="button"
                    onClick={() => updateCompany(current.id, { logo: "" })}
                    className="h-12 rounded-xl bg-secondary text-base font-semibold text-destructive"
                  >
                    {t("company.logoRemove")}
                  </button>
                ) : null}
              </div>
            </section>
          ) : null}

          {current ? (
            <button
              type="button"
              onClick={() => removeCompany(current.id)}
              className="mt-6 h-14 w-full rounded-xl bg-secondary text-base font-semibold text-destructive"
            >
              {t("company.delete")}
            </button>
          ) : null}
        </>
      )}
    </AppShell>
  );
}

function CompanyForm({ company, onChange }: { company: Company; onChange: (p: Partial<Company>) => void }) {
  const { t } = useT();
  const field = (key: keyof Company, label: string, auto?: string) => (
    <label className="grid gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type="text"
        value={company[key]}
        autoComplete={auto}
        onChange={(e) => onChange({ [key]: e.target.value } as Partial<Company>)}
        className="h-12 rounded-xl border border-input bg-background px-3 text-base"
      />
    </label>
  );

  return (
    <section className="mt-6 grid gap-2 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
      {field("name", t("company.name"), "organization")}
      {field("vat", t("company.vat"))}
      {field("cf", t("company.cf"))}
      {field("address", t("company.address"), "street-address")}
      <div className="grid grid-cols-3 gap-2">
        {field("zip", t("company.zip"), "postal-code")}
        <div className="col-span-2">{field("city", t("company.city"), "address-level2")}</div>
      </div>
      {field("province", t("company.province"), "address-level1")}
      {field("phone", t("company.phone"), "tel")}
      {field("email", t("company.email"), "email")}
      {field("pec", t("company.pec"))}
    </section>
  );
}
