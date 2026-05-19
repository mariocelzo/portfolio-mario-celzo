// TxBehind — "Behind the keyboard": foto laurea + bio + 4 passion cards
// Layout: immagine a sinistra + copy a destra

import type { Content } from "../content";

type BeyondData = Content["beyond"];

interface Props {
  beyond: BeyondData;
}

export function TxBehind({ beyond }: Props) {
  return (
    <section className="tx-behind">
      <div className="tx-behind__inner">

        {/* Media: foto di laurea con badge overlay agli angoli */}
        <div className="tx-behind__media reveal">
          <img
            src="/assets/mario-graduation.jpeg"
            alt="Mario Celzo — Laurea Triennale"
            loading="lazy"
          />
          {/* Badge angolo in alto a sinistra */}
          <span className="corner tl">PORTRAIT · N.01</span>
          {/* Badge angolo in alto a destra — stato in accent */}
          <span className="corner tr">{beyond.photoStatus}</span>
          {/* Caption in basso su gradiente scuro */}
          <div className="tx-behind__photoCap">
            <span>{beyond.photoCaption}</span>
            <span>FILE_01.JPG</span>
          </div>
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
