// Contenuto bilingue (IT/EN) per il portfolio v6 Tech di Mario Celzo.
// Ogni lingua ha la stessa struttura — il componente sceglie in base a `lang`.

import React from "react";

// ──────────────────────────────────────────────────────────────
// Tipi condivisi
// ──────────────────────────────────────────────────────────────
export interface NavItem { id: string; label: string; }
export interface MetaItem { k: string; v: string; }
export interface BulletItem { ix: string; text: React.ReactNode; }
export interface DataItem   { k: string; v: string; }
export interface WorkItem {
  name: string; year: string; level: string;
  desc: string; tags: string[];
  href: string; demo?: string | null; figma?: string;
  cover: string; span: string;
}
export interface ExpItem {
  year: string; range: string; badge: string | null;
  title: string; org: string; body: string;
  bullets: string[];
}
export interface StackColumn {
  kicker: string; lead: string; chips: string[];
}
export interface EduItem  { year: string; title: string; org: string; }
export interface CertItem { name: string; yr: string; }
export interface LangItem { name: string; level: string; }
export interface BeyondItem { tag: string; title: string; desc: string; }
export interface ContactField { k: string; v: string; href: string; }

export interface Content {
  nav: NavItem[];
  status: { yes: string; no: string };
  cta: string;
  hero: {
    promptUser: string; promptCmd: string;
    tagline: [string, string];
    role: React.ReactNode;
    pitch: React.ReactNode;
    ctas: { email: string; github: string; linkedin: string; cv: string };
    meta: MetaItem[];
  };
  now: {
    no: string; title: [string, string]; cue: string;
    lead: string; body: React.ReactNode[];
    bullets: BulletItem[];
    panelFile: string; panelMeta: string;
    panelTitle: string; stack: string[];
    panelDataTitle: string; data: DataItem[];
  };
  work: {
    no: string; title: [string, string]; cue: string;
    items: WorkItem[];
    repoLbl: string; demoLbl: string;
  };
  exp: {
    no: string; title: [string, string]; cue: string;
    items: ExpItem[];
  };
  stack: {
    no: string; title: [string, string]; cue: string;
    columns: StackColumn[];
  };
  edu: {
    no: string; title: [string, string]; cue: string;
    items: EduItem[];
    certsTitle: string; certs: CertItem[];
    langsTitle: string; langs: LangItem[];
  };
  beyond: {
    title: [string, string];
    bio: string[];
    photoCaption: string; photoStatus: string;
    items: BeyondItem[];
  };
  contact: {
    no: string; overline: string;
    title: [string, string];
    lede: string; email: string;
    grid: ContactField[];
  };
  footer: { l: string; c: string; r: string; };
}

// ──────────────────────────────────────────────────────────────
// Italiano
// ──────────────────────────────────────────────────────────────
const it: Content = {
  nav: [
    { id: "now",     label: "now" },
    { id: "work",    label: "work" },
    { id: "exp",     label: "exp" },
    { id: "stack",   label: "stack" },
    { id: "edu",     label: "edu" },
    { id: "contact", label: "contact" },
  ],
  status: { yes: "available", no: "not looking" },
  cta: "scrivimi",
  hero: {
    promptUser: "mario@portfolio",
    promptCmd:  "./whoami --short",
    tagline:    ["Mario", "Celzo"],
    role: (
      <>
        <span className="key">role</span>{" "}={" "}
        <span className="val">Junior DevOps Engineer</span> @{" "}
        <span className="val">Lutech SpA</span> ·{" "}
        <span className="key">team</span>{" "}={" "}
        <span className="val">CrossDev</span> ·{" "}
        <span className="key">project</span>{" "}={" "}
        <span className="accent">ERIT-DXL</span> (Edenred Italia)
      </>
    ),
    pitch: (
      <>
        Costruisco <strong>pipeline CI/CD</strong> su Azure DevOps,{" "}
        <strong>microservizi su Kubernetes</strong> e le piccole cose che
        impediscono alla produzione di rompersi il venerdì sera.
      </>
    ),
    ctas: { email: "scrivimi", github: "github", linkedin: "linkedin", cv: "cv.pdf" },
    meta: [
      { k: "role",      v: "DevOps · Junior" },
      { k: "company",   v: "Lutech · CrossDev" },
      { k: "location",  v: "Sarno (SA), IT" },
      { k: "languages", v: "IT · EN (B2)" },
    ],
  },
  now: {
    no: "01", title: ["Ora,", "in produzione."], cue: "uptime: gen 2026 → present",
    lead: "$ kubectl describe me",
    body: [
      <>
        Da <strong>gennaio 2026</strong>, Junior DevOps Engineer in{" "}
        <strong>Lutech SpA</strong> — team <strong>CrossDev</strong>. Sul progetto{" "}
        <strong>ERIT-DXL</strong> per Edenred Italia: pipeline YAML su Azure DevOps
        che orchestrano build, test, deploy di <strong>5 microservizi</strong> su AKS.
      </>,
      <>
        Mi occupo della parte <strong>DevSecOps</strong> con scan automatici via
        Qualys WAS e Dependency Track. Sviluppo backend Java + qualche componente
        Angular sui microservizi, e ho seguito la migrazione Azure Cache for Redis →
        Azure Managed Redis. Pattern: Kafka / Event Hub, CQRS, retry con dead-letter
        queue, notifiche SendGrid.
      </>,
    ],
    bullets: [
      { ix: "[01]", text: <><strong>5 microservizi</strong> su AKS — build, test, deploy via YAML.</> },
      { ix: "[02]", text: <><strong>DevSecOps</strong>: Qualys WAS + Dependency Track integrati nelle pipeline.</> },
      { ix: "[03]", text: <><strong>Migrazione</strong> Azure Cache for Redis → Azure Managed Redis, zero downtime.</> },
      { ix: "[04]", text: <><strong>Eventi & retry</strong>: Kafka / Event Hub, CQRS, dead-letter, SendGrid.</> },
    ],
    panelFile: "stack.yaml", panelMeta: "TEAM=CROSSDEV · CLIENT=EDENRED",
    panelTitle: "current_stack",
    stack: ["Azure DevOps","AKS","Docker","YAML","Java","Angular","Kafka","Event Hub","Qualys WAS","Dependency Track","SendGrid","Azure Managed Redis"],
    panelDataTitle: "metadata",
    data: [
      { k: "team",    v: "CrossDev" },
      { k: "client",  v: "Edenred Italia" },
      { k: "project", v: "ERIT-DXL" },
      { k: "cloud",   v: "Microsoft Azure" },
      { k: "method",  v: "Agile · Scrum" },
    ],
  },
  work: {
    no: "02", title: ["Lavori", "selezionati."], cue: "5 progetti · 2024 → 2025",
    items: [
      { name: "PetClinic Dependability", year: "2025", level: "MAGISTRALE",
        desc: "Analisi dependability di Spring PetClinic. Fault injection con Chaos Monkey, FMEA, MTTF/MTTR. Pipeline completa: GitHub Actions, Docker, SonarCloud.",
        tags: ["Chaos Eng.", "DevOps", "Docker", "GH Actions"],
        href: "https://github.com/mariocelzo/petclinic-dependability-analysis",
        cover: "/assets/cover-petclinic.svg", span: "" },
      { name: "BiblioFlow", year: "2025", level: "MAGISTRALE",
        desc: "Sistema collaborativo per la biblioteca universitaria (HCI). Prenotazione posti con sensori, prestiti RFID self-service, chatbot. Accessibilità e sostenibilità al centro.",
        tags: ["HCI", "Figma", "IoT", "A11y"],
        href: "https://github.com/mariocelzo/biblioflow-app",
        cover: "/assets/cover-biblioflow.svg", span: "" },
      { name: "NearBite", year: "2025", level: "PERSONALE · MAGISTRALE",
        desc: "Progetto personale durante la magistrale. App mobile cross-platform per ricerca ristoranti: React Native + Expo, Supabase, Google Places, geo real-time, AI.",
        tags: ["React Native", "Expo", "Supabase", "AI"],
        href: "https://github.com/mariocelzo/resturant-finder",
        demo: null,
        cover: "/assets/cover-nearbite.svg", span: "span-2" },
      { name: "BODY-LIFE", year: "2025", level: "TRIENNALE · IUM",
        desc: "App fitness per l'esame di Interazione Uomo-Macchina (triennale). Dashboard, monitoraggio peso e attività, workout personalizzati. UX/UI in Figma, React + Next.js.",
        tags: ["React", "Next.js", "Figma", "HCI"],
        href: "https://github.com/mariocelzo/body-life",
        demo: "https://body-life-teal.vercel.app/",
        figma: "https://www.figma.com/design/FgrYVoi37erhxvlGQEtiBm/Gym-App--Community-",
        cover: "/assets/cover-bodylife.svg", span: "span-2" },
      { name: "TARGET", year: "2024", level: "TRIENNALE · ING. SW",
        desc: "E-commerce P2P stile Vinted per l'esame di Ingegneria del Software (triennale). Annunci, ricerca avanzata, chat real-time, recensioni. Team di 3, Agile/Scrum. Documentazione su richiesta.",
        tags: ["E-commerce", "Agile", "Chat", "Full-stack"],
        href: "https://github.com/mariocelzo/Target",
        demo: "https://v0-target-svp6klexsij.vercel.app/",
        cover: "/assets/cover-target.svg", span: "span-2" },
    ],
    repoLbl: "repo →", demoLbl: "live →",
  },
  exp: {
    no: "03", title: ["Esperienza &", "percorso."], cue: "deploy log · 2018 → 2026",
    items: [
      { year: "2026", range: "Gen — Present", badge: "ACTIVE",
        title: "Junior DevOps Engineer", org: "Lutech SpA · CrossDev Team",
        body: "Sul progetto ERIT-DXL per Edenred Italia. Pipeline, microservizi, DevSecOps, backend Java e qualche frontend Angular.",
        bullets: [
          "Pipeline CI/CD in YAML su Azure DevOps — build, test, deploy",
          "5 microservizi su Azure Kubernetes Service (AKS)",
          "DevSecOps: Qualys WAS + Dependency Track",
          "Migrazione Azure Cache for Redis → Azure Managed Redis",
          "Backend Java e frontend Angular sui microservizi",
          "Kafka / Event Hub, CQRS, dead-letter retries, SendGrid",
        ],
      },
      { year: "2025", range: "Dicembre", badge: null,
        title: "Laurea Triennale in Informatica", org: "Università degli Studi di Salerno",
        body: "Tesi: Progettazione e sviluppo di un tool per l'estrazione automatizzata e l'analisi di scenari in simulazioni CARLA e BeamNG per sistemi ADAS/ADS.",
        bullets: [
          "Tesi: scenario extraction tool per simulazioni CARLA / BeamNG (ADAS/ADS)",
          "Algoritmi e strutture dati, basi di dati, sistemi operativi",
          "Progetti full-stack & mobile (TARGET, BODY-LIFE, BiblioFlow)",
        ],
      },
      { year: "2019", range: "Estati '18 — '19", badge: null,
        title: "Assistente gestione salone", org: "Susy & Tito · attività di famiglia",
        body: "Il primo posto in cui ho imparato il multitasking sotto pressione, la pazienza con le persone, l'importanza dell'ordine.",
        bullets: [
          "Servizio clienti e gestione prenotazioni",
          "Controllo inventario e igiene degli spazi",
          "Multitasking nelle ore di punta",
          "Gestione incassi, apertura e chiusura",
        ],
      },
    ],
  },
  stack: {
    no: "04", title: ["Stack &", "competenze."], cue: "$ ls -la /skills",
    columns: [
      { kicker: "devops_cloud", lead: "Far girare le cose, ripeterle, automatizzarle.",
        chips: ["Azure DevOps","CI/CD (YAML)","Kubernetes / AKS","Docker","Qualys WAS","Dependency Track","Git","GitHub Actions","SonarCloud","SendGrid","Azure Managed Redis"] },
      { kicker: "frontend_ui", lead: "Interfacce che chiedono poco e restituiscono molto.",
        chips: ["TypeScript","Angular","React","React Native","Next.js","JavaScript","HTML5","CSS3","Tailwind","Material UI","Bootstrap","Figma","jQuery","Flutter"] },
      { kicker: "backend_data", lead: "Sotto al cofano, dove succedono le cose serie.",
        chips: ["Java","Python","Spring Boot","SQL","Microservizi","REST APIs","Kafka / Event Hub","CQRS","Dead-letter queues","Supabase","Firebase","Cosmos DB"] },
      { kicker: "method_ux", lead: "Pensare l'interazione prima di scriverla.",
        chips: ["Agile / Scrum","User Research","Personas","Wireframing","Prototyping","Usability Testing","Code review","Pair programming","Accessibility"] },
    ],
  },
  edu: {
    no: "05", title: ["Formazione &", "certs."], cue: "univ. di salerno · liceo tito lucrezio caro",
    items: [
      { year: "2025 → now",       title: "Laurea Magistrale · Software Engineering & IT Management", org: "Università degli Studi di Salerno" },
      { year: "2022 → Dic 2025",  title: "Laurea Triennale in Informatica",                           org: "Università degli Studi di Salerno" },
      { year: "2017 → 2022",      title: "Diploma di Liceo Scientifico",                              org: "Liceo Tito Lucrezio Caro · Sarno (SA)" },
    ],
    certsTitle: "certifications",
    certs: [
      { name: "AI Fundamentals",     yr: "2024" },
      { name: "Git & GitHub Basics", yr: "2023" },
      { name: "React Development",   yr: "2023" },
    ],
    langsTitle: "languages",
    langs: [
      { name: "Italiano", level: "MADRELINGUA" },
      { name: "Inglese",  level: "B2" },
    ],
  },
  beyond: {
    title: ["Quattro cose", "oltre il deploy."],
    bio: [
      "Sono di Sarno, in provincia di Salerno. Laureato in Informatica a dicembre 2025 con una tesi su un tool per l'estrazione e l'analisi automatizzata di scenari in simulazioni CARLA e BeamNG per sistemi ADAS/ADS.",
      "Quando non sto scrivendo YAML o debuggando una pipeline, le quattro cose qui sotto sono quelle che mi tengono la testa sgombra.",
    ],
    photoCaption: "BSc · Univ. di Salerno · dic. 2025",
    photoStatus: "[GRADUATED]",
    items: [
      { tag: "passion/01", title: "Forza Ferrari", desc: "F1 ogni domenica, gare riviste il lunedì." },
      { tag: "passion/02", title: "In strada",     desc: "Viaggi corti, città nuove, qualche fuga in montagna." },
      { tag: "passion/03", title: "Coding",        desc: "Side project la sera — soprattutto frontend e DevOps." },
      { tag: "passion/04", title: "Gaming",        desc: "Quando il deploy non vuole partire, una partita aiuta." },
    ],
  },
  contact: {
    no: "06", overline: "open_to_opportunities",
    title: ["Un caffè,", "e parliamone."],
    lede: "Open per opportunità DevOps / Cloud / Full-stack. Risposta entro un giorno o due — di solito molto prima.",
    email: "mariocelzo003@gmail.com",
    grid: [
      { k: "email",    v: "mariocelzo003@gmail.com", href: "mailto:mariocelzo003@gmail.com?subject=Opportunit%C3%A0%20DevOps%20%E2%80%94%20Mario%20Celzo" },
      { k: "linkedin", v: "mario-celzo",             href: "https://linkedin.com/in/mario-celzo" },
      { k: "github",   v: "@mariocelzo",             href: "https://github.com/mariocelzo" },
      { k: "location", v: "Sarno (SA), IT",          href: "#" },
    ],
  },
  footer: { l: "© 2026 · mario.celzo", c: "issue.06 · /tech", r: "built in italy" },
};

// ──────────────────────────────────────────────────────────────
// English
// ──────────────────────────────────────────────────────────────
const en: Content = {
  nav: [
    { id: "now",     label: "now" },
    { id: "work",    label: "work" },
    { id: "exp",     label: "exp" },
    { id: "stack",   label: "stack" },
    { id: "edu",     label: "edu" },
    { id: "contact", label: "contact" },
  ],
  status: { yes: "available", no: "not looking" },
  cta: "get in touch",
  hero: {
    promptUser: "mario@portfolio",
    promptCmd:  "./whoami --short",
    tagline:    ["Mario", "Celzo"],
    role: (
      <>
        <span className="key">role</span>{" "}={" "}
        <span className="val">Junior DevOps Engineer</span> @{" "}
        <span className="val">Lutech SpA</span> ·{" "}
        <span className="key">team</span>{" "}={" "}
        <span className="val">CrossDev</span> ·{" "}
        <span className="key">project</span>{" "}={" "}
        <span className="accent">ERIT-DXL</span> (Edenred Italia)
      </>
    ),
    pitch: (
      <>
        I build <strong>CI/CD pipelines</strong> on Azure DevOps,{" "}
        <strong>microservices on Kubernetes</strong>, and the small things that
        keep production from breaking on a Friday night.
      </>
    ),
    ctas: { email: "get in touch", github: "github", linkedin: "linkedin", cv: "cv.pdf" },
    meta: [
      { k: "role",      v: "DevOps · Junior" },
      { k: "company",   v: "Lutech · CrossDev" },
      { k: "location",  v: "Sarno (SA), IT" },
      { k: "languages", v: "IT · EN (B2)" },
    ],
  },
  now: {
    no: "01", title: ["Now,", "in production."], cue: "uptime: jan 2026 → present",
    lead: "$ kubectl describe me",
    body: [
      <>
        Since <strong>January 2026</strong>, Junior DevOps Engineer at{" "}
        <strong>Lutech SpA</strong> — <strong>CrossDev</strong> team. On the{" "}
        <strong>ERIT-DXL</strong> project for Edenred Italia: YAML pipelines on
        Azure DevOps orchestrating build, test and deploy of{" "}
        <strong>5 microservices</strong> on AKS.
      </>,
      <>
        I handle <strong>DevSecOps</strong> with automated scans via Qualys WAS
        and Dependency Track. I develop Java backend + some Angular components on
        the microservices, and followed the migration Azure Cache for Redis →
        Azure Managed Redis. Patterns: Kafka / Event Hub, CQRS, dead-letter
        retries, SendGrid notifications.
      </>,
    ],
    bullets: [
      { ix: "[01]", text: <><strong>5 microservices</strong> on AKS — build, test, deploy via YAML.</> },
      { ix: "[02]", text: <><strong>DevSecOps</strong>: Qualys WAS + Dependency Track integrated in pipelines.</> },
      { ix: "[03]", text: <><strong>Migration</strong> Azure Cache for Redis → Azure Managed Redis, zero downtime.</> },
      { ix: "[04]", text: <><strong>Events & retries</strong>: Kafka / Event Hub, CQRS, dead-letter, SendGrid.</> },
    ],
    panelFile: "stack.yaml", panelMeta: "TEAM=CROSSDEV · CLIENT=EDENRED",
    panelTitle: "current_stack",
    stack: ["Azure DevOps","AKS","Docker","YAML","Java","Angular","Kafka","Event Hub","Qualys WAS","Dependency Track","SendGrid","Azure Managed Redis"],
    panelDataTitle: "metadata",
    data: [
      { k: "team",    v: "CrossDev" },
      { k: "client",  v: "Edenred Italia" },
      { k: "project", v: "ERIT-DXL" },
      { k: "cloud",   v: "Microsoft Azure" },
      { k: "method",  v: "Agile · Scrum" },
    ],
  },
  work: {
    no: "02", title: ["Selected", "work."], cue: "5 projects · 2024 → 2025",
    items: [
      { name: "PetClinic Dependability", year: "2025", level: "M.SC.",
        desc: "Dependability analysis of Spring PetClinic. Chaos Monkey fault injection, FMEA, MTTF/MTTR. Full pipeline: GitHub Actions, Docker, SonarCloud.",
        tags: ["Chaos Eng.", "DevOps", "Docker", "GH Actions"],
        href: "https://github.com/mariocelzo/petclinic-dependability-analysis",
        cover: "/assets/cover-petclinic.svg", span: "" },
      { name: "BiblioFlow", year: "2025", level: "M.SC.",
        desc: "Collaborative system for the university library (HCI). Sensor-based study post booking, RFID self-service, chatbot. Accessibility-first design.",
        tags: ["HCI", "Figma", "IoT", "A11y"],
        href: "https://github.com/mariocelzo/biblioflow-app",
        cover: "/assets/cover-biblioflow.svg", span: "" },
      { name: "NearBite", year: "2025", level: "PERSONAL · M.SC.",
        desc: "Personal project during my M.Sc. Cross-platform restaurant discovery app: React Native + Expo, Supabase, Google Places, real-time geo, AI.",
        tags: ["React Native", "Expo", "Supabase", "AI"],
        href: "https://github.com/mariocelzo/resturant-finder",
        demo: null,
        cover: "/assets/cover-nearbite.svg", span: "span-2" },
      { name: "BODY-LIFE", year: "2025", level: "B.SC. · HCI EXAM",
        desc: "Fitness app for the Human-Computer Interaction exam (Bachelor's). Dashboard, weight/activity tracking, workouts. UX/UI in Figma, React + Next.js.",
        tags: ["React", "Next.js", "Figma", "HCI"],
        href: "https://github.com/mariocelzo/body-life",
        demo: "https://body-life-teal.vercel.app/",
        figma: "https://www.figma.com/design/FgrYVoi37erhxvlGQEtiBm/Gym-App--Community-",
        cover: "/assets/cover-bodylife.svg", span: "span-2" },
      { name: "TARGET", year: "2024", level: "B.SC. · SW ENG.",
        desc: "P2P e-commerce platform, Vinted-style, for the Software Engineering exam (Bachelor's). Listings, advanced search, real-time chat, reviews. Team of 3, Agile/Scrum. Docs on request.",
        tags: ["E-commerce", "Agile", "Chat", "Full-stack"],
        href: "https://github.com/mariocelzo/Target",
        demo: "https://v0-target-svp6klexsij.vercel.app/",
        cover: "/assets/cover-target.svg", span: "span-2" },
    ],
    repoLbl: "repo →", demoLbl: "live →",
  },
  exp: {
    no: "03", title: ["Experience &", "path."], cue: "deploy log · 2018 → 2026",
    items: [
      { year: "2026", range: "Jan — Present", badge: "ACTIVE",
        title: "Junior DevOps Engineer", org: "Lutech SpA · CrossDev Team",
        body: "On the ERIT-DXL project for Edenred Italia. Pipelines, microservices, DevSecOps, Java backend and the occasional Angular component.",
        bullets: [
          "YAML CI/CD pipelines on Azure DevOps — build, test, deploy",
          "5 microservices on Azure Kubernetes Service (AKS)",
          "DevSecOps: Qualys WAS + Dependency Track",
          "Migration Azure Cache for Redis → Azure Managed Redis",
          "Java backend & Angular frontend on microservices",
          "Kafka / Event Hub, CQRS, dead-letter retries, SendGrid",
        ],
      },
      { year: "2025", range: "December", badge: null,
        title: "BSc in Computer Science", org: "Università degli Studi di Salerno",
        body: "Thesis on the design and development of a tool for automated scenario extraction and analysis in CARLA and BeamNG simulations for ADAS/ADS systems.",
        bullets: [
          "Thesis: scenario extraction tool for CARLA / BeamNG simulations (ADAS/ADS)",
          "Algorithms and data structures, databases, operating systems",
          "Full-stack & mobile projects (TARGET, BODY-LIFE, BiblioFlow)",
        ],
      },
      { year: "2019", range: "Summers '18 — '19", badge: null,
        title: "Salon assistant", org: "Susy & Tito · family business",
        body: "The first place I learned the value of multitasking under pressure, patience with people, and keeping things in order.",
        bullets: [
          "Customer service and bookings",
          "Inventory control and hygiene",
          "Multitasking during peak hours",
          "Cash handling, shift open / close",
        ],
      },
    ],
  },
  stack: {
    no: "04", title: ["Stack &", "skills."], cue: "$ ls -la /skills",
    columns: [
      { kicker: "devops_cloud", lead: "Making things run, repeat, automate.",
        chips: ["Azure DevOps","CI/CD (YAML)","Kubernetes / AKS","Docker","Qualys WAS","Dependency Track","Git","GitHub Actions","SonarCloud","SendGrid","Azure Managed Redis"] },
      { kicker: "frontend_ui", lead: "Interfaces that ask little and give a lot.",
        chips: ["TypeScript","Angular","React","React Native","Next.js","JavaScript","HTML5","CSS3","Tailwind","Material UI","Bootstrap","Figma","jQuery","Flutter"] },
      { kicker: "backend_data", lead: "Under the hood, where serious things happen.",
        chips: ["Java","Python","Spring Boot","SQL","Microservices","REST APIs","Kafka / Event Hub","CQRS","Dead-letter queues","Supabase","Firebase","Cosmos DB"] },
      { kicker: "method_ux", lead: "Thinking the interaction before writing it.",
        chips: ["Agile / Scrum","User Research","Personas","Wireframing","Prototyping","Usability Testing","Code review","Pair programming","Accessibility"] },
    ],
  },
  edu: {
    no: "05", title: ["Education &", "certs."], cue: "univ. of salerno · liceo tito lucrezio caro",
    items: [
      { year: "2025 → now",      title: "M.Sc. · Software Engineering & IT Management", org: "Università degli Studi di Salerno" },
      { year: "2022 → Dec 2025", title: "B.Sc. in Computer Science",                    org: "Università degli Studi di Salerno" },
      { year: "2017 → 2022",     title: "Scientific High School Diploma",               org: "Liceo Tito Lucrezio Caro · Sarno (SA)" },
    ],
    certsTitle: "certifications",
    certs: [
      { name: "AI Fundamentals",     yr: "2024" },
      { name: "Git & GitHub Basics", yr: "2023" },
      { name: "React Development",   yr: "2023" },
    ],
    langsTitle: "languages",
    langs: [
      { name: "Italian", level: "NATIVE" },
      { name: "English", level: "B2" },
    ],
  },
  beyond: {
    title: ["Four things", "beyond the deploy."],
    bio: [
      "I'm from Sarno, in the province of Salerno. Graduated with a BSc in Computer Science in December 2025, with a thesis on a tool for automated scenario extraction and analysis in CARLA and BeamNG simulations for ADAS/ADS systems.",
      "When I'm not writing YAML or debugging a pipeline, the four things below keep my head clear.",
    ],
    photoCaption: "BSc · Univ. of Salerno · Dec. 2025",
    photoStatus: "[GRADUATED]",
    items: [
      { tag: "passion/01", title: "Forza Ferrari", desc: "F1 every Sunday, re-watched on Monday." },
      { tag: "passion/02", title: "On the road",   desc: "Short trips, new cities, the odd mountain escape." },
      { tag: "passion/03", title: "Coding",        desc: "Evening side projects — mostly frontend and DevOps." },
      { tag: "passion/04", title: "Gaming",        desc: "When the deploy refuses to start, a game helps." },
    ],
  },
  contact: {
    no: "06", overline: "open_to_opportunities",
    title: ["Coffee", "and a chat?"],
    lede: "Open to DevOps / Cloud / Full-stack opportunities. Usually reply within a day or two — often much sooner.",
    email: "mariocelzo003@gmail.com",
    grid: [
      { k: "email",    v: "mariocelzo003@gmail.com", href: "mailto:mariocelzo003@gmail.com?subject=DevOps%20Opportunity%20%E2%80%94%20Mario%20Celzo" },
      { k: "linkedin", v: "mario-celzo",             href: "https://linkedin.com/in/mario-celzo" },
      { k: "github",   v: "@mariocelzo",             href: "https://github.com/mariocelzo" },
      { k: "location", v: "Sarno (SA), IT",          href: "#" },
    ],
  },
  footer: { l: "© 2026 · mario.celzo", c: "issue.06 · /tech", r: "built in italy" },
};

// ──────────────────────────────────────────────────────────────
// Export: oggetto indicizzato per codice lingua
// ──────────────────────────────────────────────────────────────
export const C: Record<"it" | "en", Content> = { it, en };
