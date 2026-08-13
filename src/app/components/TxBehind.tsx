// TxBehind — "Behind the keyboard": solo titolo + photo dump a ventaglio.
// Ogni foto porta con sé titolo (colorato) e descrizione della passione,
// sovrimpressi nell'angolo in basso a sinistra — niente più blocco di testo separato.

import type { Content } from "../content";
import { ArchGallery } from "./ui/arch-gallery";

type BeyondData = Content["beyond"];

interface Props {
  beyond: BeyondData;
}

export function TxBehind({ beyond }: Props) {
  return (
    <section className="tx-behind">
      <span className="tx-behind__label reveal">behind_the_keyboard</span>

      <h2 className="tx-behind__title reveal" style={{ transitionDelay: "80ms" }}>
        <span>{beyond.title[0]}</span>{" "}
        <span className="italic">{beyond.title[1]}</span>
      </h2>

      <div className="tx-behind__gallery reveal" style={{ transitionDelay: "160ms" }}>
        <ArchGallery
          items={beyond.photos.map((p) => ({
            image: { src: p.src, alt: p.alt },
            caption: { title: p.title, desc: p.desc, color: p.color },
          }))}
          cardWidth={190}
          cardHeight={250}
          cornerRadius={16}
        />
      </div>
    </section>
  );
}
