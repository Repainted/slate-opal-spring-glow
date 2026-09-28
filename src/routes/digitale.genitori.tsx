import { Link, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/digitale/genitori")({
  head: () => ({
    meta: [
      { title: titleFor("Per i genitori digitali") },
      {
        name: "description",
        content:
          "Come creare un videogioco per tuo figlio con l'AI, senza saper programmare. Il metodo usato per Il mondo dei mattoncini.",
      },
    ],
  }),
  component: GenitoriPage,
});

function GenitoriPage() {
  return (
    <div className="studio-page relative min-h-screen">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Salta al contenuto
      </a>
      <header className="fixed inset-x-0 top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/digitale" className="flex items-center" aria-label="Lepini Digital">
            <BrandMark variant="digitalMark" className="h-11 w-auto" />
          </Link>
          <nav className="flex items-center gap-5 text-sm text-ink-soft" aria-label="Guida">
            <Link to="/lab/mattoncini" className="hover:text-ink">
              Il gioco
            </Link>
            <Link to="/lab" className="hover:text-ink">
              Lab
            </Link>
          </nav>
        </div>
      </header>

      <main id="contenuto" className="mx-auto max-w-3xl px-5 pb-20 pt-28">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">Per i genitori digitali</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-medium leading-[0.95]">
          Crea un videogioco per tuo figlio con l’AI
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Un tutorial per mamme e papà che non hanno mai programmato.
        </p>
        <p className="mt-6 leading-relaxed">
          Questo gioco è nato così: un papà ha fotografato le costruzioni di mattoncini della figlia e ha chiesto se si poteva
          trasformarle in un mondo 3D da esplorare. Un’ora dopo la bambina giocava. Qui trovi il metodo, passo per passo, e i
          messaggi da copiare.
        </p>
        <p className="mt-4">
          <Link to="/lab/mattoncini" className="text-copper hover:text-ink">
            Apri Il mondo dei mattoncini
          </Link>
        </p>

        <section className="mt-12">
          <h2 className="font-display text-3xl">Cosa serve</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              Un account gratuito o a pagamento su{" "}
              <a href="https://claude.ai" className="text-copper hover:text-ink">
                claude.ai
              </a>
              .
            </li>
            <li>Un telefono o un computer.</li>
            <li>Le idee di tuo figlio, che sono la parte più importante.</li>
          </ul>
          <p className="mt-4 leading-relaxed">
            Non serve saper programmare: il codice lo scrive l’AI, e tu fai il regista.
          </p>
        </section>

        <Step n="1" title="Parti da qualcosa di vero">
          <p>
            Fotografa un disegno, una costruzione, un peluche, oppure fatti raccontare un posto inventato. Carica le foto e
            scrivi, per esempio:
          </p>
          <Quote>
            Ciao! Queste sono le costruzioni di mia figlia. Si può creare un mondo 3D percorribile tipo videogioco ispirato a
            queste? Stile mattoncini, colori allegri, per una bambina di 7 anni.
          </Quote>
          <p>
            Un consiglio: chiedi uno stile ispirato a, e personaggi originali. Personaggi e set famosi sono protetti dal
            diritto d’autore, e un personaggio inventato insieme a tuo figlio vale molto di più.
          </p>
        </Step>

        <Step n="2" title="Il primo prototipo">
          <p>
            Quando l’AI ti chiede dettagli, rispondi con poche cose chiare: su che dispositivo si gioca (telefono, computer o
            entrambi), chi è il protagonista (una coniglietta, un drago, un robot…) e cosa si deve fare (raccogliere oggetti,
            trovare amici, arrivare in cima).
          </p>
          <p>
            L’AI crea il gioco e ti dà un link da aprire subito. Fallo provare al bambino prima di chiedere miglioramenti: le
            sue reazioni sono la tua lista delle cose da fare.
          </p>
        </Step>

        <Step n="3" title="Migliora a piccoli passi">
          <p>Chiedi una cosa, o poche cose, per volta. Ecco le richieste che hanno funzionato per questo gioco:</p>
          <Quote>
            Migliora le texture, aggiungi nemici buffi che si sconfiggono saltandoci sopra, allarga il mondo e fai quattro
            livelli, uno anche sott’acqua.
          </Quote>
          <Quote>
            Il livello finale deve essere la festa di compleanno di mia figlia, con una culla per la sorellina in arrivo.
          </Quote>
          <Quote>Aggiungi una freccia che indica dove sono gli oggetti, perché mia figlia si perde.</Quote>
          <p>
            Se qualcosa non va, descrivi cosa vedi: «la telecamera dentro la casa finisce nel muro», «non si riesce a salire
            sul fungo». Non serve sapere perché succede.
          </p>
        </Step>

        <Step n="4" title="Coinvolgi tuo figlio come game designer">
          <p>Questa è la parte che insegna davvero. Fai decidere a lui o a lei:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>il nome e il colore del personaggio;</li>
            <li>quali oggetti raccogliere e dove nasconderli;</li>
            <li>come sono fatti i «cattivi» (meglio se buffi);</li>
            <li>cosa succede alla fine.</li>
          </ul>
          <p>
            Poi scrivete insieme la richiesta. Vedere le proprie idee apparire nel gioco dopo pochi minuti è il modo più
            diretto per capire che la tecnologia si può costruire, non solo usare.
          </p>
        </Step>

        <Step n="5" title="Salva e condividi">
          <p>Il gioco è un singolo file HTML. Puoi:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>tenerlo sul link che ti dà l’AI e mandarlo ai nonni;</li>
            <li>scaricarlo e aprirlo nel browser, anche senza internet (serve solo per caricare la libreria 3D la prima volta);</li>
            <li>pubblicarlo gratis, per esempio su GitHub Pages.</li>
          </ul>
        </Step>

        <section className="mt-12 border border-ink/10 bg-paper-card p-5 md:p-8">
          <h2 className="font-display text-3xl">Buone pratiche</h2>
          <ul className="mt-4 space-y-4 leading-relaxed">
            <li>
              <strong className="font-medium">Privacy.</strong> Non mettere nome completo, data di nascita o foto del bambino
              in un gioco pubblico. Usa la personalizzazione via link e condividi quel link solo in privato.
            </li>
            <li>
              <strong className="font-medium">Tempo davanti allo schermo.</strong> Un gioco fatto insieme è un’ottima occasione
              per giocare insieme.
            </li>
            <li>
              <strong className="font-medium">Errori.</strong> L’AI a volte sbaglia. Provate il gioco, segnalate cosa non va e
              chiedete di correggere: fa parte del divertimento.
            </li>
            <li>
              <strong className="font-medium">Originalità.</strong> Chiedi personaggi e mondi inventati, non copie di
              videogiochi o giocattoli famosi.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl">Idee per il prossimo gioco</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Un quiz a mattoncini sulle tabelline o sulle lettere.</li>
            <li>La casa dei nonni ricostruita in 3D, da esplorare.</li>
            <li>Una caccia al tesoro con indizi scritti dal bambino.</li>
            <li>Un mondo sott’acqua dove si impara il nome dei pesci.</li>
          </ul>
          <p className="mt-6 leading-relaxed">Buon divertimento, e fateci sapere cosa avete creato.</p>
          <p className="mt-8">
            <Link to="/digitale" className="text-sm text-copper hover:text-ink">
              Torna allo studio
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <p className="font-mono text-xs uppercase tracking-kicker text-copper">Passo {n}</p>
      <h2 className="mt-2 font-display text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed">{children}</div>
    </section>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return <blockquote className="border-l-2 border-copper pl-4 text-ink-soft">{children}</blockquote>;
}
