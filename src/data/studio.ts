export const STUDIO_REPO = "https://github.com/Repainted/slate-opal-spring-glow";

export type StudioArea = "digital" | "lab";

export type StudioProject = {
  area: StudioArea | "portale";
  titolo: string;
  testo: string;
  href: string;
};

export const STUDIO_PROJECTS: StudioProject[] = [
  { area: "digital", titolo: "Lepini Digital", testo: "La home dello studio.", href: "/digitale" },
  { area: "digital", titolo: "Territorio", testo: "La vista scura.", href: "/digitale/territorio" },
  { area: "lab", titolo: "Lepini Lab", testo: "Il laboratorio.", href: "/lab" },
  { area: "lab", titolo: "Biosfera", testo: "Flora e fauna.", href: "/lab/biosfera" },
  { area: "lab", titolo: "Drone", testo: "Simulatore di volo.", href: "/lab/drone" },
  { area: "lab", titolo: "Legno", testo: "Progetto e distinta.", href: "/lab/legno" },
  { area: "lab", titolo: "Sentieri", testo: "Rilievo e tracce.", href: "/lab/sentieri" },
  { area: "lab", titolo: "Atlante", testo: "I 26 comuni.", href: "/lab/atlante" },
  { area: "portale", titolo: "Portale", testo: "La home dei Lepini.", href: "/" },
  { area: "portale", titolo: "Comuni", testo: "Le schede dei borghi.", href: "/comuni" },
  { area: "portale", titolo: "Natura", testo: "Le specie.", href: "/natura" },
];

export type LepiniLink = { code: string; to: string; hash?: string; label: string };

export const LEPINI_LINKS: LepiniLink[] = [
  { code: "digital", to: "/digitale", label: "Studio" },
  { code: "lab", to: "/lab", label: "Lab" },
  { code: "portale", to: "/", label: "Portale" },
  { code: "contatti", to: "/digitale", hash: "contatti", label: "Contatti" },
  { code: "legno", to: "/lab/legno", label: "Legno" },
  { code: "drone", to: "/lab/drone", label: "Drone" },
];

export const GRAFICA_DEFAULT = {
  paper: "#f3efe6",
  ink: "#161410",
  copper: "#b5713a",
  cream: "#ede0c8",
  navy: "#17161a",
};

export type Grafica = typeof GRAFICA_DEFAULT;
