import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { BrandMark } from "@/components/BrandMark";
import { WebGLHost, useReducedMotion } from "@/lab/LabStage";
import { startHero } from "@/lab/hero";
import { Eyebrow } from "@/components/SectionHead";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab/")({
  head: () => ({
    meta: [
      { title: titleFor("Lepini Lab") },
      {
        name: "description",
        content: "Lepini Lab: i 26 comuni, i sentieri e le specie dei Monti Lepini in 3D. Costruito da Lepini Digital.",
      },
    ],
  }),
  component: LabHome,
});

const EXPERIMENTS = [
  {
    to: "/lab/atlante" as const,
    href: null as string | null,
    code: "00",
    title: "Atlante",
    text: "I 26 comuni sul rilievo. Tocca un nodo: si apre la scheda del Portale.",
    img: "/images/lab/atlante.jpg",
  },
  {
    to: "/lab/volo" as const,
    href: null,
    code: "01",
    title: "Volo",
    text: "Sopra il massiccio. Avvicinati a un borgo e compare la scheda.",
    img: "/images/lab/volo.jpg",
  },
  {
    to: "/lab/drone" as const,
    href: "/lab/drone.html",
    code: "07",
    title: "Drone",
    text: "Simulatore di volo: DEM reale, satellite, strade, fisica. Scegli zona o resta sui Lepini.",
    img: "/images/lab/drone.jpg",
  },
  {
    to: "/lab/faggeta" as const,
    href: null,
    code: "02",
    title: "Faggeta",
    text: "Cammini tra i faggi. Picchio nero e faggete: le stesse schede natura.",
    img: "/images/lab/faggeta.jpg",
  },
  {
    to: "/lab/biosfera" as const,
    href: null,
    code: "03",
    title: "Biosfera",
    text: "Flora e fauna su due anelli. Tocca aquila, lupo, istrice: scheda e Portale.",
    img: "/images/lab/biosfera.jpg",
  },
  {
    to: "/lab/sentieri" as const,
    href: null,
    code: "04",
    title: "Sentieri",
    text: "I sentieri sul rilievo vero. 701, 702, 736: gli stessi numeri del Portale.",
    img: "/images/lab/sentieri.jpg",
  },
  {
    to: "/lab/parco" as const,
    href: null,
    code: "05",
    title: "Parco",
    text: "ZPS e siti Natura 2000 sul crinale. Non è un parco regionale: è ciò che esiste.",
    img: "/images/lab/parco.jpg",
  },
  {
    to: "/lab/alberi" as const,
    href: null,
    code: "06",
    title: "Alberi",
    text: "Leccio e nocciolo da three-d-stage. Tocca un esemplare: si apre la scheda.",
    img: "/images/lab/alberi.jpg",
  },
  {
    to: "/lab/trama" as const,
    href: null,
    code: "08",
    title: "Trama",
    text: "26 comuni in 3D: trama del logo, srotolamento, orbite. Demografia: l’altezza è la popolazione.",
    img: "/images/lab/trama.jpg",
  },
  {
    to: "/lab/legno" as const,
    href: "/lab/legno.html",
    code: "09",
    title: "Legno",
    text: "Travi, pannelli e coperture. Sezione, essenza e distinta d'acquisto con prezzi.",
    img: "/images/lab/legno.jpg",
  },
];

function Cover({
  img,
  code,
  title,
  text,
}: {
  img: string;
  code: string;
  title: string;
  text: string;
}) {
  return (
    <>
      <img src={img} alt="" className="meteo-bg absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/15" />
      <div className="relative z-10 flex h-full min-h-[15.5rem] flex-col justify-end p-5 md:p-6">
        <p className="font-display text-2xl leading-none text-copper-light md:text-3xl">{code}</p>
        <h2 className="mt-2 font-display text-2xl text-cream">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-cream-soft">{text}</p>
      </div>
    </>
  );
}

function LabHome() {
  const reduced = useReducedMotion();
  const start = useCallback((c: HTMLCanvasElement) => startHero(c, reduced.current), [reduced]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-navy-deep/40" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10">
        <Link to="/lab" className="pointer-events-auto flex items-center text-cream" aria-label="Lepini Lab">
          <BrandMark variant="lab" className="h-16 w-auto md:h-[4.5rem]" />
        </Link>
        <div className="pointer-events-auto flex gap-2">
          <Link
            to="/comuni"
            className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft hover:border-copper-light"
          >
            Portale
          </Link>
          <Link
            to="/digitale"
            className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft hover:border-copper-light"
          >
            Digital
          </Link>
        </div>
      </header>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:px-12 md:pb-14">
        <Eyebrow>Laboratorio scientifico · Lepini Digital</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.92] text-cream">
          Vedere il crinale
          <span className="mt-3 block font-medium italic text-olive-light">come un modello vivo.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-soft">
          Le schede del Portale — comuni, flora, fauna, sentieri — in tre dimensioni. Per mostrare alle imprese cosa si
          può fare con gli stessi strumenti.
        </p>

        <div className="pointer-events-auto mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIMENTS.map((e) => {
            const cls = cn(
              "group relative overflow-hidden rounded-xl shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]",
            );
            const inner = <Cover img={e.img} code={e.code} title={e.title} text={e.text} />;
            return e.href ? (
              <a key={e.code} href={e.href} className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={e.code} to={e.to} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
        <p className="pointer-events-auto mt-6 text-sm text-muted">
          Le schede sono sul Portale:{" "}
          <Link to="/comuni" className="text-olive-light">
            26 comuni
          </Link>
          ,{" "}
          <Link to="/natura" className="text-olive-light">
            natura
          </Link>
          ,{" "}
          <Link to="/sentieri" className="text-olive-light">
            sentieri
          </Link>
          .{" "}
          <Link to="/lab/area" className="text-olive-light">
            Area
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
