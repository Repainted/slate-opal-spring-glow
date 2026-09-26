import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeMetrics, EMPTY_METRICS, toLastMetrics, type LastMetrics, type Measure } from "@/preventivi/lib/geometry/calc";
import { catalogProductPrice, catalogWorkPrice, clampPrice, productPrice, workPrice } from "@/preventivi/lib/prices";
import { quoteFromMeasures } from "@/preventivi/lib/quote/from-geometry";
import { thicknessFromItems } from "@/preventivi/lib/geometry/plan";
import { uid } from "@/preventivi/lib/utils";
import { emptyQuoteMeta, type ExtraLine, type QuoteMeta, type WorkInput, type WorkLine } from "@/preventivi/lib/works/types";
import type { CalcInput, ListItem } from "./types";

interface MaterialState {
  items: ListItem[];
  works: WorkLine[];
  extras: ExtraLine[];
  measures: Measure[];
  draft: Measure | null;
  lastMetrics: LastMetrics;
  vatRate: number;
  quoteMeta: QuoteMeta;
  productPrices: Record<string, number>;
  workPrices: Record<string, number>;
  addItem: (productId: string, input: CalcInput) => void;
  removeItem: (id: string) => void;
  patchItem: (id: string, partial: Partial<CalcInput>) => void;
  addWork: (workId: string, input: WorkInput) => void;
  removeWork: (id: string) => void;
  patchWork: (id: string, partial: Partial<WorkInput>) => void;
  addExtra: (line: Omit<ExtraLine, "id" | "addedAt">) => void;
  removeExtra: (id: string) => void;
  patchExtra: (id: string, partial: Partial<Pick<ExtraLine, "qty" | "unitPrice" | "name">>) => void;
  addMeasure: (measure: Measure) => void;
  removeMeasure: (id: string) => void;
  setLastMetrics: (metrics: LastMetrics) => void;
  rememberMeasure: (measure: Measure) => void;
  applyGeometryQuote: (measure: Measure) => void;
  setVatRate: (n: number) => void;
  setQuoteMeta: (partial: Partial<QuoteMeta>) => void;
  setProductPrice: (productId: string, price: number) => void;
  setWorkPrice: (workId: string, price: number) => void;
  resetListino: () => void;
  clear: () => void;
}

export const useMaterialStore = create<MaterialState>()(
  persist(
    (set, get) => ({
      items: [],
      works: [],
      extras: [],
      measures: [],
      draft: null,
      lastMetrics: EMPTY_METRICS,
      vatRate: 10,
      quoteMeta: emptyQuoteMeta(),
      productPrices: {},
      workPrices: {},
      addItem: (productId, input) =>
        set({
          items: [
            {
              id: uid("li"),
              productId,
              input: { ...input, unitPrice: productPrice(productId, get().productPrices) },
              addedAt: new Date().toISOString(),
            },
            ...get().items,
          ],
        }),
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      patchItem: (id, partial) =>
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, input: { ...i.input, ...partial } } : i)),
        }),
      addWork: (workId, input) =>
        set({
          works: [
            {
              id: uid("wk"),
              workId,
              input: { ...input, unitPrice: workPrice(workId, get().workPrices) },
              addedAt: new Date().toISOString(),
            },
            ...get().works,
          ],
        }),
      removeWork: (id) => set({ works: get().works.filter((w) => w.id !== id) }),
      patchWork: (id, partial) =>
        set({
          works: get().works.map((w) => (w.id === id ? { ...w, input: { ...w.input, ...partial } } : w)),
        }),
      addExtra: (line) =>
        set({
          extras: [
            {
              ...line,
              id: uid("ex"),
              addedAt: new Date().toISOString(),
            },
            ...get().extras,
          ],
        }),
      removeExtra: (id) => set({ extras: get().extras.filter((e) => e.id !== id) }),
      patchExtra: (id, partial) =>
        set({
          extras: get().extras.map((e) => (e.id === id ? { ...e, ...partial } : e)),
        }),
      addMeasure: (measure) => set({ measures: [measure, ...get().measures] }),
      removeMeasure: (id) => set({ measures: get().measures.filter((m) => m.id !== id) }),
      setLastMetrics: (lastMetrics) => set({ lastMetrics }),
      rememberMeasure: (measure) => {
        const metrics = computeMetrics(measure);
        set({ lastMetrics: toLastMetrics(measure.kind, metrics, get().lastMetrics), draft: measure });
      },
      applyGeometryQuote: (measure) => {
        const now = new Date().toISOString();
        const exists = get().measures.some((m) => m.id === measure.id);
        const measures = exists
          ? get().measures.map((m) => (m.id === measure.id ? measure : m))
          : [measure, ...get().measures];
        const bom = quoteFromMeasures(measures, thicknessFromItems(get().items));
        const metrics = computeMetrics(measure);
        const prices = get().productPrices;
        const wages = get().workPrices;
        const items: ListItem[] = [
          ...bom.materials.map((line) => ({
            id: uid("li"),
            productId: line.productId,
            input: { ...line.input, unitPrice: productPrice(line.productId, prices) },
            addedAt: now,
            source: "3d" as const,
          })),
          ...get().items.filter((i) => i.source !== "3d"),
        ];
        const works: WorkLine[] = [
          ...bom.works.map((line) => ({
            id: uid("wk"),
            workId: line.workId,
            input: { ...line.input, unitPrice: workPrice(line.workId, wages) },
            addedAt: now,
            source: "3d" as const,
          })),
          ...get().works.filter((w) => w.source !== "3d"),
        ];
        set({
          items,
          works,
          measures,
          lastMetrics: toLastMetrics(measure.kind, metrics, get().lastMetrics),
          draft: measure,
        });
      },
      setVatRate: (vatRate) => set({ vatRate }),
      setQuoteMeta: (partial) => set({ quoteMeta: { ...get().quoteMeta, ...partial } }),
      setProductPrice: (productId, price) => {
        const n = clampPrice(price);
        const catalog = catalogProductPrice(productId);
        const productPrices = { ...get().productPrices };
        if (Math.abs(n - catalog) < 0.005) delete productPrices[productId];
        else productPrices[productId] = n;
        set({
          productPrices,
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, input: { ...i.input, unitPrice: n } } : i,
          ),
        });
      },
      setWorkPrice: (workId, price) => {
        const n = clampPrice(price);
        const catalog = catalogWorkPrice(workId);
        const workPrices = { ...get().workPrices };
        if (Math.abs(n - catalog) < 0.005) delete workPrices[workId];
        else workPrices[workId] = n;
        set({
          workPrices,
          works: get().works.map((w) => (w.workId === workId ? { ...w, input: { ...w.input, unitPrice: n } } : w)),
        });
      },
      resetListino: () =>
        set({
          productPrices: {},
          workPrices: {},
          items: get().items.map((i) => ({
            ...i,
            input: { ...i.input, unitPrice: catalogProductPrice(i.productId) },
          })),
          works: get().works.map((w) => ({
            ...w,
            input: { ...w.input, unitPrice: catalogWorkPrice(w.workId) },
          })),
        }),
      clear: () =>
        set({
          items: [],
          works: [],
          extras: [],
          measures: [],
          lastMetrics: EMPTY_METRICS,
          draft: null,
        }),
    }),
    {
      name: "cantiere-lista-v1",
      skipHydration: true,
      partialize: (s) => ({
        items: s.items,
        works: s.works,
        extras: s.extras,
        measures: s.measures,
        draft: s.draft,
        lastMetrics: s.lastMetrics,
        vatRate: s.vatRate,
        quoteMeta: s.quoteMeta,
        productPrices: s.productPrices,
        workPrices: s.workPrices,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<MaterialState>;
        return {
          ...current,
          ...p,
          items: p.items ?? [],
          works: p.works ?? [],
          extras: p.extras ?? [],
          measures: p.measures ?? [],
          draft: p.draft ?? null,
          lastMetrics: p.lastMetrics ?? EMPTY_METRICS,
          vatRate: typeof p.vatRate === "number" ? p.vatRate : 10,
          quoteMeta: { ...emptyQuoteMeta(), ...(p.quoteMeta ?? {}) },
          productPrices: p.productPrices ?? {},
          workPrices: p.workPrices ?? {},
        };
      },
    },
  ),
);

export function quoteCount(s: { items: ListItem[]; works: WorkLine[]; extras: ExtraLine[] }): number {
  return s.items.length + s.works.length + s.extras.length;
}
