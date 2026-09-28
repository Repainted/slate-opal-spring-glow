import { GRAFICA_DEFAULT, type Grafica, type StudioArea } from "@/data/studio";
import { cantiereUnlocked, unlockCantiere } from "@/lib/cantiere-gate";

const KEY = "studio-auth";
const GRAFICA_KEY = "lepini-grafica";
const DB = "lepini-studio";

export function studioUnlocked() {
  try {
    return sessionStorage.getItem(KEY) === "1" || cantiereUnlocked();
  } catch {
    return false;
  }
}

export async function unlockStudio(password: string) {
  const ok = await unlockCantiere(password);
  if (!ok) return false;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* */
  }
  return true;
}

export function readGrafica(): Grafica {
  try {
    const raw = localStorage.getItem(GRAFICA_KEY);
    if (!raw) return { ...GRAFICA_DEFAULT };
    return { ...GRAFICA_DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...GRAFICA_DEFAULT };
  }
}

export function writeGrafica(next: Grafica) {
  localStorage.setItem(GRAFICA_KEY, JSON.stringify(next));
}

export function applyGrafica(area: StudioArea) {
  if (typeof document === "undefined") return;
  const g = readGrafica();
  const root = document.documentElement;
  if (area === "digital") {
    root.style.setProperty("--color-paper", g.paper);
    root.style.setProperty("--color-paper-card", g.paper);
    root.style.setProperty("--color-ink", g.ink);
    root.style.setProperty("--color-copper", g.copper);
    root.style.setProperty("--color-primary", g.copper);
    return;
  }
  root.style.setProperty("--color-navy", g.navy);
  root.style.setProperty("--color-navy-deep", g.navy);
  root.style.setProperty("--color-cream", g.cream);
  root.style.setProperty("--color-copper", g.copper);
  root.style.setProperty("--color-primary", g.copper);
}

export type StudioFile = {
  id: string;
  area: StudioArea;
  name: string;
  mime: string;
  note: string;
  data: string;
  at: number;
};

export type Lavoro = {
  id: string;
  area: StudioArea;
  titolo: string;
  cliente: string;
  tipo: string;
  stato: "bozza" | "in corso" | "consegnato";
  nota: string;
  fileId: string;
  at: number;
};

export type StudioLink = {
  id: string;
  area: StudioArea;
  codice: string;
  url: string;
  nota: string;
  at: number;
};

export type StudioApp = {
  id: string;
  area: StudioArea;
  name: string;
  html: string;
  at: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("files")) db.createObjectStore("files", { keyPath: "id" });
      if (!db.objectStoreNames.contains("lavori")) db.createObjectStore("lavori", { keyPath: "id" });
      if (!db.objectStoreNames.contains("links")) db.createObjectStore("links", { keyPath: "id" });
      if (!db.objectStoreNames.contains("apps")) db.createObjectStore("apps", { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function all<T>(store: string): Promise<T[]> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db.transaction(store).objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result as T[]);
        req.onerror = () => reject(req.error);
      }),
  );
}

function put(store: string, value: unknown) {
  return openDb().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const req = db.transaction(store, "readwrite").objectStore(store).put(value);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      }),
  );
}

function remove(store: string, id: string) {
  return openDb().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const req = db.transaction(store, "readwrite").objectStore(store).delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      }),
  );
}

export const studioDb = {
  files: () => all<StudioFile>("files"),
  lavori: () => all<Lavoro>("lavori"),
  links: () => all<StudioLink>("links"),
  apps: () => all<StudioApp>("apps"),
  saveFile: (row: StudioFile) => put("files", row),
  saveLavoro: (row: Lavoro) => put("lavori", row),
  saveLink: (row: StudioLink) => put("links", row),
  saveApp: (row: StudioApp) => put("apps", row),
  deleteFile: (id: string) => remove("files", id),
  deleteLavoro: (id: string) => remove("lavori", id),
  deleteLink: (id: string) => remove("links", id),
  deleteApp: (id: string) => remove("apps", id),
};

export function newId() {
  return crypto.randomUUID();
}
