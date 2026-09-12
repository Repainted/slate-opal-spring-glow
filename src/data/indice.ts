import { COMUNI } from "./comuni";
import { SCHEDE } from "./schede";
import { SPECIE } from "./specie";

export type VoceTipo =
  | "comune"
  | "personaggio"
  | "chiesa"
  | "monumento"
  | "flora"
  | "fauna"
  | "festa"
  | "attivita";

export type VoceIndice = {
  id: string;
  nome: string;
  tipo: VoceTipo;
  slug: string;
  comune: string;
  tab: string;
};

function lettera(nome: string) {
  const c = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
}

export const VOCI: VoceIndice[] = (() => {
  const out: VoceIndice[] = [];
  for (const c of COMUNI) {
    out.push({
      id: `comune-${c.slug}`,
      nome: c.nome,
      tipo: "comune",
      slug: c.slug,
      comune: c.nome,
      tab: "",
    });
    const s = SCHEDE[c.slug];
    if (!s) continue;
    for (const p of s.storia.personaggi) {
      out.push({
        id: `p-${c.slug}-${p.nome}`,
        nome: p.nome,
        tipo: "personaggio",
        slug: c.slug,
        comune: c.nome,
        tab: "storia",
      });
    }
    for (const ch of s.arte.chiese) {
      out.push({
        id: `ch-${c.slug}-${ch.nome}`,
        nome: ch.nome,
        tipo: "chiesa",
        slug: c.slug,
        comune: c.nome,
        tab: "arte",
      });
    }
    for (const m of s.arte.monumenti) {
      out.push({
        id: `mo-${c.slug}-${m.nome}`,
        nome: m.nome,
        tipo: "monumento",
        slug: c.slug,
        comune: c.nome,
        tab: "arte",
      });
    }
    for (const f of s.tradizioni.feste) {
      out.push({
        id: `fe-${c.slug}-${f.nome}`,
        nome: f.nome,
        tipo: "festa",
        slug: c.slug,
        comune: c.nome,
        tab: "tradizioni",
      });
    }
    for (const a of s.attivita) {
      out.push({
        id: `at-${c.slug}-${a.nome}`,
        nome: a.nome,
        tipo: "attivita",
        slug: c.slug,
        comune: c.nome,
        tab: "attivita",
      });
    }
  }
  for (const sp of SPECIE) {
    const slug = sp.comuni?.[0] ?? "sermoneta";
    const comune = COMUNI.find((c) => c.slug === slug)?.nome ?? slug;
    out.push({
      id: `sp-${sp.scientifico}-${sp.comune}`,
      nome: sp.comune,
      tipo: sp.gruppo === "flora" ? "flora" : "fauna",
      slug,
      comune,
      tab: "natura",
    });
  }
  out.sort((a, b) => a.nome.localeCompare(b.nome, "it"));
  return out;
})();

export function letteraDi(v: VoceIndice) {
  return lettera(v.nome);
}

export const LETTERE = [...new Set(VOCI.map(letteraDi))].sort();
