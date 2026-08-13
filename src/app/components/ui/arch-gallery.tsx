// ArchGallery — mazzo di foto "a ventaglio" (fan-deck), si allarga in hover.
// Adattato da un componente shadcn/Next.js: rimosso "use client" (qui siamo
// su Vite, non Next.js) — per il resto la logica è invariata.

import { useEffect, useState, type CSSProperties } from "react";

type GalleryItem = {
  image: { src: string; alt?: string };
  /** Didascalia sovrimpressa in basso a sinistra sulla card (titolo colorato + descrizione) */
  caption?: { title: string; desc: string; color: string };
};

type ArchGalleryProps = {
  items?: GalleryItem[];
  cardWidth?: number;
  cardHeight?: number;
  cornerRadius?: number;
  className?: string;
};

const ROTATE_STEP = 6;
const Y_STEP = 18;
const OVERLAP = 0.58;
// La card in hover va semplicemente sopra le altre (z-index + leggero
// ingrandimento/sollevamento): niente spread orizzontale, niente attenuazione
// delle altre card — restano a piena luminosità, così la lettura è pulita
// senza "spegnere" il resto del ventaglio
const HOVER_SCALE = 1.12;
const HOVER_LIFT = 22;
// Margine di sicurezza orizzontale (px) da lasciare tra il ventaglio e i
// bordi del viewport: <body> ha overflow-x:hidden (src/styles/tx/base.css),
// quindi qualunque cosa esca da questo margine viene tagliata via in
// silenzio e resta irraggiungibile (niente scroll orizzontale di recupero).
const VIEWPORT_SAFE_MARGIN = 32;
// Sotto questa larghezza di card il ventaglio smette di essere leggibile
// (didascalie/immagine troppo compresse): meglio fermarsi qui piuttosto
// che continuare a rimpicciolire su schermi minuscoli.
const MIN_CARD_WIDTH = 92;

/** Larghezza corrente della finestra, aggiornata al resize (per il ridimensionamento responsive del ventaglio). SSR-safe: 1280 come default prima del mount. */
function useViewportWidth() {
  const [width, setWidth] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export function ArchGallery({
  items = [],
  cardWidth = 180,
  cardHeight = 240,
  cornerRadius = 18,
  className = "",
}: ArchGalleryProps) {
  const deck = items;
  const total = deck.length;
  const mid = (total - 1) / 2;
  const [hovered, setHovered] = useState<number | null>(null);
  const viewportWidth = useViewportWidth();

  // Il ventaglio si allarga in orizzontale in base a cardWidth (ogni card in
  // più aggiunge ~cardWidth*OVERLAP*2 alla larghezza totale dello stage).
  // Su mobile/tablet i valori fissi pensati per desktop (es. 190px) non ci
  // stanno: calcoliamo quindi la cardWidth massima che fa entrare l'intero
  // stage nel viewport corrente (con un margine di sicurezza) e la usiamo
  // se è più piccola di quella passata via prop, mantenendo le proporzioni
  // originali della card (così testo/immagine restano coerenti, solo più
  // piccoli).
  const fanWidthFactor = 1 + Math.abs(mid) * 2 * OVERLAP + 0.2;
  const maxCardWidthForViewport =
    (viewportWidth - VIEWPORT_SAFE_MARGIN) / Math.max(fanWidthFactor, 1);
  const effectiveCardWidth = Math.max(
    Math.min(cardWidth, maxCardWidthForViewport),
    Math.min(cardWidth, MIN_CARD_WIDTH)
  );
  const sizeScale = effectiveCardWidth / cardWidth;
  const effectiveCardHeight = cardHeight * sizeScale;

  // Rank ogni card per distanza dal centro e assegna z-index interi 1..total
  // (le card centrali in cima). Con un numero pari di card `mid` è un valore
  // a metà (es. 1.5 per 4 card), quindi "total - Math.abs(offset)" produceva
  // z-index NON interi (es. 2.5): CSS z-index accetta solo interi, quindi
  // ogni volta che una card tornava alla sua posizione base il browser
  // rifiutava silenziosamente il valore e la card restava "bloccata" allo
  // z-index dell'ultimo hover valido — da qui il bug per cui, con 4 foto,
  // l'hover funzionava una volta sola e poi le card restavano impilate male.
  const zRankByIndex = new Map(
    [...deck.keys()]
      .sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))
      .map((idx, rank) => [idx, total - rank])
  );

  // Y_STEP e HOVER_LIFT scalano insieme alla card così la geometria del
  // ventaglio resta proporzionata anche quando cardWidth/cardHeight vengono
  // ridotti per stare nel viewport.
  const yStep = Y_STEP * sizeScale;
  const hoverLift = HOVER_LIFT * sizeScale;

  const stageWidth =
    effectiveCardWidth + Math.abs(mid) * 2 * effectiveCardWidth * OVERLAP + effectiveCardWidth * 0.2;
  const stageHeight = effectiveCardHeight + Math.abs(mid) * yStep + 48;

  return (
    <div
      className={["flex w-full items-center justify-center py-10", className]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label="Image gallery"
      // Tap fuori dalle card (sfondo dello stage) riporta il ventaglio allo
      // stato base: utile su touch, dove non esiste un "mouse leave" che
      // rimetta a posto la card aperta.
      onClick={() => setHovered(null)}
    >
      <div
        className="relative"
        style={{ width: stageWidth, height: stageHeight }}
      >
        {deck.map((entry, index) => {
          const offset = index - mid;
          const rotate = offset * ROTATE_STEP;
          const translateY = Math.abs(offset) * yStep;
          const translateX = offset * effectiveCardWidth * OVERLAP;
          const baseZ = zRankByIndex.get(index)!;
          const isHovered = hovered === index;

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: effectiveCardWidth,
            height: effectiveCardHeight,
            marginLeft: -effectiveCardWidth / 2,
            marginTop: -effectiveCardHeight / 2,
            borderRadius: cornerRadius,
            overflow: "hidden",
            transformOrigin: "center center",
            transform: isHovered
              ? `translate(${translateX}px, ${translateY - hoverLift}px) rotate(0deg) scale(${HOVER_SCALE})`
              : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
            zIndex: isHovered ? total + 1 : baseZ,
            transition:
              "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms ease, z-index 0ms",
            boxShadow: isHovered
              ? "0 24px 48px rgba(0,0,0,0.32), 0 6px 16px rgba(0,0,0,0.22)"
              : "0 12px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            backgroundColor: "#f3f4f6",
          };

          return (
            <div
              key={`${entry.image.src}-${index}`}
              style={cardStyle}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              // Su touch non esiste "hover": affidarsi solo a onFocus è
              // rischioso perché WebKit/iOS Safari non sposta sempre il
              // focus su un tap di un <div tabIndex=0> (comportamento
              // storicamente incoerente tra browser). onClick invece è
              // garantito — ogni tap genera sempre un evento click, anche
              // quando il focus non scatta — quindi è il modo affidabile
              // per portare la card in primo piano al tocco. Non facciamo
              // toggle (click su card già aperta -> richiudi): su desktop
              // l'hover ha già impostato `hovered` prima del click, quindi
              // un toggle chiuderebbe la card proprio mentre il mouse è
              // ancora sopra. Per richiudere su touch basta toccare fuori
              // dalle card (vedi onClick sul contenitore sopra).
              onClick={(e) => {
                e.stopPropagation();
                setHovered(index);
              }}
              tabIndex={0}
              aria-label={entry.image.alt || `Photo ${index + 1}`}
            >
              <img
                src={entry.image.src}
                alt={entry.image.alt || ""}
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              />
              {/* Didascalia sovrimpressa: titolo colorato + descrizione, su
                  scrim scuro sfumato per restare leggibile su qualunque foto */}
              {entry.caption && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-3 pb-3 pt-8"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 75%)",
                  }}
                >
                  <span
                    className="text-[13px] font-bold leading-tight"
                    style={{ color: entry.caption.color }}
                  >
                    {entry.caption.title}
                  </span>
                  <span className="text-[10.5px] leading-snug text-white/80">
                    {entry.caption.desc}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
