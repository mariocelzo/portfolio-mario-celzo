// TxMarquee — Striscia scorrevole infinita stile ticker terminale
// Posizionata tra Hero e Now. Si ferma al passaggio del mouse.

// Voci del ticker — keyword tecniche, language-neutral
const ITEMS = [
  "CI/CD Pipelines",
  "Kubernetes / AKS",
  "DevSecOps",
  "Azure DevOps",
  "Microservices",
  "Docker",
  "Kafka / Event Hub",
  "Java + Angular",
  "React / TypeScript",
  "Zero Downtime",
];

export function TxMarquee() {
  // Il track contiene le voci duplicate 2 volte: l'animazione trasla di -50%
  // e riparte, creando un loop visivamente continuo
  return (
    <div className="tx-marquee" aria-hidden="true">
      <div className="tx-marquee__track">
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: "flex" }}>
            {ITEMS.map((item, i) => (
              <span className="tx-marquee__item" key={i}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
