import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "@/preventivi/lib/utils";
import { emptyCompany, type Company } from "./types";

interface CompanyState {
  companies: Company[];
  activeId: string;
  addCompany: () => string;
  updateCompany: (id: string, partial: Partial<Company>) => void;
  removeCompany: (id: string) => void;
  setActive: (id: string) => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      companies: [],
      activeId: "",
      addCompany: () => {
        const id = uid("az");
        set({ companies: [emptyCompany(id), ...get().companies], activeId: id });
        return id;
      },
      updateCompany: (id, partial) =>
        set({
          companies: get().companies.map((c) => (c.id === id ? { ...c, ...partial } : c)),
        }),
      removeCompany: (id) => {
        const next = get().companies.filter((c) => c.id !== id);
        const activeId = get().activeId === id ? (next[0]?.id ?? "") : get().activeId;
        set({ companies: next, activeId });
      },
      setActive: (activeId) => set({ activeId }),
    }),
    {
      name: "cantiere-aziende-v1",
      skipHydration: true,
      partialize: (s) => ({ companies: s.companies, activeId: s.activeId }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CompanyState>;
        const companies = Array.isArray(p.companies) ? p.companies : [];
        const activeId =
          typeof p.activeId === "string" && companies.some((c) => c.id === p.activeId)
            ? p.activeId
            : (companies[0]?.id ?? "");
        return { ...current, companies, activeId };
      },
    },
  ),
);

export function activeCompany(s: Pick<CompanyState, "companies" | "activeId">): Company | null {
  return s.companies.find((c) => c.id === s.activeId) ?? s.companies[0] ?? null;
}
