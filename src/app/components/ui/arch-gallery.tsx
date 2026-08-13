// ArchGallery — mazzo di foto "a ventaglio" (fan-deck), si allarga in hover.
// Adattato da un componente shadcn/Next.js: rimosso "use client" (qui siamo
// su Vite, non Next.js) — per il resto la logica è invariata.

import { useState, type CSSProperties } from "react";

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

  const stageWidth = cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * Y_STEP + 48;

  return (
    <div
      className={["flex w-full items-center justify-center py-10", className]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label="Image gallery"
    >
      <div
        className="relative"
        style={{ width: stageWidth, height: stageHeight }}
      >
        {deck.map((entry, index) => {
          const offset = index - mid;
          const rotate = offset * ROTATE_STEP;
          const translateY = Math.abs(offset) * Y_STEP;
          const translateX = offset * cardWidth * OVERLAP;
          const baseZ = zRankByIndex.get(index)!;
          const isHovered = hovered === index;

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            marginTop: -cardHeight / 2,
            borderRadius: cornerRadius,
            overflow: "hidden",
            transformOrigin: "center center",
            transform: isHovered
              ? `translate(${translateX}px, ${translateY - HOVER_LIFT}px) rotate(0deg) scale(${HOVER_SCALE})`
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
