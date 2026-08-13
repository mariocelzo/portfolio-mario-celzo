// TxBehind — "Behind the keyboard": photo dump (mazzo di foto a ventaglio) + bio + 4 passion cards
// Layout: gallery a sinistra + copy a destra

import type { Content } from "../content";
import { ArchGallery } from "./ui/arch-gallery";

type BeyondData = Content["beyond"];

interface Props {
  beyond: BeyondData;
}

export function TxBehind({ beyond }: Props) {
  return (
    <section className="tx-behind">
      <div className="tx-behind__inner">

        {/* Media: photo dump a ventaglio (laurea + passioni), si allarga in hover */}
        <div className="tx-behind__media reveal">
          <ArchGallery
            items={beyond.gallery.map((g) => ({ image: { src: g.src, alt: g.alt } }))}
            cardWidth={150}
            cardHeight={200}
            cornerRadius={16}
          />
        </div>

        {/* Copy: etichetta + titolo + bio + griglia passioni */}
        <div className="tx-behind__copy">
          <span className="lbl --note reveal">behind_the_keyboard</span>

          <h2
            className="tx-behind__title reveal"
            style={{ transitionDelay: "80ms" }}
          >
            <span>{beyond.title[0]}</span>{" "}
            <span className="italic">{beyond.title[1]}</span>
          </h2>

          <div
            className="tx-behind__bio reveal"
            style={{ transitionDelay: "160ms" }}
          >
            {beyond.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Griglia 2×2 delle passioni */}
          <div className="tx-behind__grid">
            {beyond.items.map((it, i) => (
              <div
                className="tx-behind__item reveal"
                key={i}
                style={{ transitionDelay: `${200 + i * 60}ms` }}
              >
                {/* Tag: passion/01 ecc. con prefisso // accent */}
                <span className="tag">{it.tag}</span>
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
