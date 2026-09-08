// Contenuto bilingue (IT/EN) per il portfolio v6 Tech di Mario Celzo.
// Ogni lingua ha la stessa struttura — il componente sceglie in base a `lang`.

import React from "react";

// ──────────────────────────────────────────────────────────────
// Tipi condivisi
// ──────────────────────────────────────────────────────────────
export interface NavItem { id: string; label: string; }
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
  /** Percorso del logo aziendale reale (assente per il salone di famiglia,
      che non ha un logo ufficiale — il componente mostra un'icona generica) */
  logo?: string;
  /** true se il logo è chiaro/bianco (es. UNISA) e richiede un badge scuro invece che bianco per restare visibile */
  logoDark?: boolean;
}
export interface StackColumn {
  kicker: string; lead: string; chips: string[];
}
/** logo opzionale: percorso del logo dell'istituto, mostrato accanto al titolo.
    logoDark: true se il logo è chiaro/bianco (es. UNISA) e richiede un badge scuro */
export interface EduItem  { year: string; title: string; org: string; logo?: string; logoDark?: boolean; }
/** href opzionale: se presente, il nome della certificazione diventa un link cliccabile al corso/tutorial */
export interface CertItem { name: string; yr: string; href?: string; }
export interface LangItem { name: string; level: string; }
/** Una foto del "photo dump": titolo+descrizione sono sovrimpressi nell'angolo
    in basso a sinistra della card stessa (niente più testo separato a fianco).
    color: colore del titolo, per dare un'identità diversa a ogni passione */
export interface BeyondPhoto { src: string; alt: string; title: string; desc: string; color: string; }
/** Esperienze minori, mostrate in una sezione compatta a parte (senza logo/badge) */
export interface OtherExpItem { range: string; title: string; org: string; body: string; }
export interface ContactField { k: string; v: string; href: string; }

export interface Content {
  nav: NavItem[];
  status: { yes: string; no: string };
  cta: string;
  hero: {
    tagline: [string, string];
    pitch: React.ReactNode;
    ctas: { email: string; cv: string };
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
    /** Le 4 passioni, una per foto: titolo+descrizione sono sovrimpressi
        nella card stessa, non c'è più un blocco di testo separato */
    photos: BeyondPhoto[];
  };
  otherExp: {
    label: string;
    items: OtherExpItem[];
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
    { id: "exp",     label: "exp" },
    { id: "work",    label: "work" },
    { id: "stack",   label: "stack" },
    { id: "edu",     label: "edu" },
    { id: "contact", label: "contact" },
  ],
  status: { yes: "available", no: "not looking" },
  cta: "scrivimi",
  hero: {
    tagline:    ["Mario", "Celzo"],
    pitch: (
      <>
        Costruisco <strong>pipeline CI/CD</strong>,{" "}
        <strong>microservizi su Kubernetes</strong> e le piccole cose che
        impediscono alla produzione di rompersi il venerdì sera.
      </>
    ),
    ctas: { email: "scrivimi", cv: "cv.pdf" },
  },
  now: {
    no: "01", title: ["Ora,", "in produzione."], cue: "uptime: lug 2026 → present",
    lead: "$ kubectl describe me",
    body: [
      <>
        Dal <strong>18 luglio 2026</strong> sono in <strong>Liquid Reply</strong> come{" "}
        <strong>DevOps Engineer</strong>, consulente esterno via{" "}
        <strong>Nepta</strong>, su progetti di automazione e delivery per primari
        gruppi bancari italiani. Sto progettando una{" "}
        <strong>piattaforma Jenkins CI/CD</strong> pensata per scalare su{" "}
        <strong>~20.000 progetti</strong>, con pipeline parametrizzate per stack
        tecnologico e una shared library <strong>Groovy</strong> centralizzata, e
        seguo la <strong>migrazione di un automation platform Rundeck</strong> da
        Enterprise a Community, dall'analisi di fattibilità all'architettura
        target multi-instance in ottica <strong>GitOps</strong>.
      </>,
      <>
        Prima, sei mesi in <strong>Lutech</strong> sul progetto ERIT-DXL per
        Edenred Italia: pipeline Azure DevOps, <strong>5 microservizi su AKS</strong>,
        DevSecOps, deploy <strong>Helm</strong> e approccio <strong>GitOps</strong>,
        componenti Angular con Storybook e un upgrade Angular 14 → 21.
        Il resto è nel deploy log qui sotto.
      </>,
    ],
    bullets: [
      { ix: "[01]", text: <><strong>Piattaforma Jenkins CI/CD</strong> — scalabile su ~20.000 progetti, pipeline parametrizzate per stack tecnologico.</> },
      { ix: "[02]", text: <><strong>Migrazione Rundeck</strong>: Enterprise → Community, dall'analisi di fattibilità all'architettura GitOps multi-instance.</> },
      { ix: "[03]", text: <><strong>Consulenza</strong>: contesti nuovi, team nuovi, stessa affidabilità.</> },
      { ix: "[04]", text: <><strong>Toolchain & sicurezza</strong>: SonarQube, Nexus, ArgoCD, audit su webhook e secret management.</> },
    ],
    panelFile: "engagement.yaml", panelMeta: "EMPLOYER=NEPTA · CLIENT=LIQUID REPLY",
    panelTitle: "toolbox",
    stack: ["Jenkins","Groovy","Rundeck","Terraform","Ansible","CI/CD","Kubernetes","Docker","Helm","GitOps / ArgoCD","RHEL / Linux","Nexus","SonarQube","PostgreSQL","Bash / Python","Azure DevOps","YAML","Docs-as-Code","Angular","Storybook"],
    panelDataTitle: "metadata",
    data: [
      { k: "role",     v: "DevOps Engineer" },
      { k: "company",  v: "Liquid Reply" },
      { k: "employer", v: "Nepta" },
      { k: "mode",     v: "External consultant" },
      { k: "project",  v: "Jenkins CI/CD · Rundeck migration" },
    ],
  },
  work: {
    no: "03", title: ["Lavori", "selezionati."], cue: "5 progetti · 2024 → 2025",
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
        demo: "https://biblioflow-app.vercel.app/",
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
    no: "02", title: ["Esperienza &", "percorso."], cue: "deploy log · 2018 → 2026",
    items: [
      { year: "2026", range: "18 Lug — Present", badge: "ACTIVE",
        title: "DevOps Engineer · External Consultant", org: "Liquid Reply · via Nepta",
        logo: "/assets/logos/companies/reply.svg",
        body: "Consulente DevOps su progetti di automazione e delivery per primari gruppi bancari italiani.",
        bullets: [
          "Piattaforma Jenkins CI/CD enterprise — pensata per scalare su ~20.000 progetti, con pipeline parametrizzate per stack tecnologico (Java, .NET, Python) al posto di una pipeline per applicazione",
          "Shared library Groovy centralizzata per standardizzare i comportamenti comuni",
          "Setup di controller e agent su RHEL 9 con storage NFS condiviso",
          "Deployment via Tomcat Manager API, Nexus come artifact store per i rollback",
          "Integrazione toolchain: SonarQube, Scan Central, Nexus, Quay, ArgoCD",
          "Runbook operativo in ottica docs-as-code",
          "Migrazione automation platform Rundeck: Enterprise → Community — analisi di fattibilità su 2.738 job in 75 progetti (90,2% migrabile), mappatura delle dipendenze bloccanti",
          "Progettazione dell'architettura target multi-instance in ottica GitOps",
          "Ambiente di test end-to-end su Docker Compose per validare clustering e failover",
          "Automazione del flusso di promozione via API REST",
          "Audit di sicurezza su webhook e secret management",
        ],
      },
      { year: "2026", range: "Gen — 18 Lug", badge: "SHIPPED",
        title: "Junior DevOps Engineer", org: "Lutech SpA · CrossDev Team",
        logo: "/assets/logos/companies/lutech.jpg",
        body: "Sul progetto ERIT-DXL per Edenred Italia. Pipeline, microservizi, DevSecOps, backend Java e frontend Angular. Sei mesi densi, chiusi con un deploy pulito.",
        bullets: [
          "Pipeline CI/CD in YAML su Azure DevOps — build, test, deploy",
          "5 microservizi su Azure Kubernetes Service (AKS)",
          "Gestione cluster AKS: deploy Helm-based e approccio GitOps",
          "DevSecOps: Qualys WAS + Dependency Track",
          "Migrazione Azure Cache for Redis → Azure Managed Redis",
          "Backend Java e frontend Angular sui microservizi",
          "Sviluppo componenti Angular con Storybook",
          "Upgrade Angular 14 → 21 sulle applicazioni frontend",
          "Documentazione docs-as-code: Markdown in Git, review via PR, publish in pipeline",
          "Kafka / Event Hub, CQRS, dead-letter retries, SendGrid",
        ],
      },
      { year: "2025", range: "Dicembre", badge: null,
        title: "Laurea Triennale in Informatica", org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png", logoDark: true,
        body: "Tesi: Progettazione e sviluppo di un tool per l'estrazione automatizzata e l'analisi di scenari in simulazioni CARLA e BeamNG per sistemi ADAS/ADS.",
        bullets: [
          "Tesi: scenario extraction tool per simulazioni CARLA / BeamNG (ADAS/ADS)",
          "Algoritmi e strutture dati, basi di dati, sistemi operativi",
          "Progetti full-stack & mobile (TARGET, BODY-LIFE, BiblioFlow)",
        ],
      },
    ],
  },
  stack: {
    no: "04", title: ["Stack &", "competenze."], cue: "$ ls -la /skills",
    columns: [
      { kicker: "devops_cloud", lead: "Far girare le cose, ripeterle, automatizzarle.",
        chips: ["Jenkins","Groovy","Rundeck","Terraform","Ansible","Azure DevOps","CI/CD (YAML)","Kubernetes / AKS","Helm","GitOps / ArgoCD","kubectl","Docker","RHEL / Linux","Nexus","SonarQube","PostgreSQL","Bash","Docs-as-Code","Qualys WAS","Dependency Track","Git","GitHub Actions","SonarCloud","SendGrid","Azure Managed Redis"] },
      { kicker: "frontend_ui", lead: "Interfacce che chiedono poco e restituiscono molto.",
        chips: ["TypeScript","Angular","Storybook","React","React Native","Next.js","JavaScript","HTML5","CSS3","Tailwind","Material UI","Bootstrap","Figma","jQuery","Flutter"] },
      { kicker: "backend_data", lead: "Sotto al cofano, dove succedono le cose serie.",
        chips: ["Java","Python","Spring Boot","SQL","Microservizi","REST APIs","Kafka / Event Hub","CQRS","Dead-letter queues","Supabase","Firebase","Cosmos DB"] },
      { kicker: "method_ux", lead: "Pensare l'interazione prima di scriverla.",
        chips: ["Agile / Scrum","User Research","Personas","Wireframing","Prototyping","Usability Testing","Code review","Pair programming","Accessibility"] },
    ],
  },
  edu: {
    no: "05", title: ["Formazione &", "certs."], cue: "univ. di salerno · liceo tito lucrezio caro",
    items: [
      { year: "2025 → now",       title: "Laurea Magistrale · Software Engineering & IT Management", org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png", logoDark: true },
      { year: "2022 → Dic 2025",  title: "Laurea Triennale in Informatica",                           org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png", logoDark: true },
      { year: "2017 → 2022",      title: "Diploma di Liceo Scientifico",                              org: "Liceo Tito Lucrezio Caro · Sarno (SA)" },
    ],
    certsTitle: "certifications",
    certs: [
      { name: "Kubernetes Essentials", yr: "IN CORSO" },
      { name: "AI Fundamentals",     yr: "2024" },
      { name: "Git & GitHub Basics", yr: "2023" },
      { name: "React Development",   yr: "2023" },
      { name: "HashiCorp Developer — Terraform Tutorials", yr: "2026",
        href: "https://developer.hashicorp.com/terraform/tutorials" },
      { name: "Terraform Associate 004 — Study Path", yr: "2026",
        href: "https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004" },
      { name: "Red Hat — Ansible Essentials (AU094)", yr: "2026",
        href: "https://www.redhat.com/en/services/training/au094-ansible-essentials-simplicity-automation-technical-overview" },
      { name: "Red Hat — Interactive Labs: Ansible", yr: "2026",
        href: "https://www.redhat.com/en/interactive-labs/ansible" },
      { name: "Kubernetes Basics (kubernetes.io)", yr: "2026",
        href: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
      { name: "Akuity Academy — Intro to GitOps & Argo CD", yr: "2026",
        href: "https://academy.akuity.io/courses/gitops-argocd-intro" },
      { name: "TechWorld with Nana — ArgoCD for Beginners", yr: "2026",
        href: "https://www.classcentral.com/course/youtube-argocd-tutorial-for-beginners-gitops-cd-for-kubernetes-108860" },
      { name: "Red Hat Scholars — Argo CD Tutorial", yr: "2026",
        href: "https://redhat-scholars.github.io/argocd-tutorial/" },
      { name: "Red Hat Developer — Getting Started with OpenShift", yr: "2026",
        href: "https://developers.redhat.com/products/openshift/getting-started" },
    ],
    langsTitle: "languages",
    langs: [
      { name: "Italiano", level: "MADRELINGUA" },
      { name: "Inglese",  level: "B2" },
    ],
  },
  beyond: {
    title: ["Quattro cose", "oltre il deploy."],
    photos: [
      { src: "/assets/gallery/ferrari-fiorano.jpg", alt: "Ferrari SF-26 — shakedown a Fiorano",
        title: "Forza Ferrari", desc: "F1 ogni domenica, gare riviste il lunedì.", color: "#E10600" },
      { src: "/assets/gallery/food.jpg", alt: "A tavola",
        title: "Food", desc: "Weekend a caccia del piatto giusto, tra ricette nuove e classici che non tradiscono mai.", color: "#FFB020" },
      { src: "/assets/gallery/travel.jpg", alt: "In viaggio",
        title: "In strada", desc: "Viaggi corti, città nuove, qualche fuga in montagna.", color: "#38BDF8" },
      { src: "/assets/gallery/gaming-setup.jpg", alt: "Postazione gaming",
        title: "Gaming", desc: "Quando il deploy non vuole partire, una partita aiuta.", color: "#A78BFA" },
    ],
  },
  otherExp: {
    label: "altre esperienze",
    items: [
      { range: "Estati '18 — '19", title: "Assistente gestione salone", org: "Susy & Tito · attività di famiglia",
        body: "Il primo posto in cui ho imparato il multitasking sotto pressione, la pazienza con le persone, l'importanza dell'ordine." },
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
    { id: "exp",     label: "exp" },
    { id: "work",    label: "work" },
    { id: "stack",   label: "stack" },
    { id: "edu",     label: "edu" },
    { id: "contact", label: "contact" },
  ],
  status: { yes: "available", no: "not looking" },
  cta: "get in touch",
  hero: {
    tagline:    ["Mario", "Celzo"],
    pitch: (
      <>
        I build <strong>CI/CD pipelines</strong>,{" "}
        <strong>microservices on Kubernetes</strong>, and the small things that
        keep production from breaking on a Friday night.
      </>
    ),
    ctas: { email: "get in touch", cv: "cv.pdf" },
  },
  now: {
    no: "01", title: ["Now,", "in production."], cue: "uptime: jul 2026 → present",
    lead: "$ kubectl describe me",
    body: [
      <>
        Since <strong>July 18, 2026</strong> I'm at <strong>Liquid Reply</strong> as a{" "}
        <strong>DevOps Engineer</strong>, external consultant via{" "}
        <strong>Nepta</strong>, on automation and delivery projects for major
        Italian banking groups. I'm building an{" "}
        <strong>enterprise Jenkins CI/CD platform</strong> designed to scale to{" "}
        <strong>~20,000 projects</strong>, with pipelines parameterized by tech
        stack and a centralized <strong>Groovy</strong> shared library, and
        leading an <strong>automation platform migration from Rundeck Enterprise
        to Community</strong>, from feasibility analysis to a target
        multi-instance <strong>GitOps</strong> architecture.
      </>,
      <>
        Before that, six months at <strong>Lutech</strong> on the ERIT-DXL
        project for Edenred Italia: Azure DevOps pipelines,{" "}
        <strong>5 microservices on AKS</strong>, DevSecOps, <strong>Helm</strong>-based
        deploys with a <strong>GitOps</strong> approach, Angular components with
        Storybook and an Angular 14 → 21 upgrade. The rest is in the deploy log below.
      </>,
    ],
    bullets: [
      { ix: "[01]", text: <><strong>Enterprise Jenkins CI/CD platform</strong> — scalable to ~20,000 projects, pipelines parameterized by tech stack.</> },
      { ix: "[02]", text: <><strong>Rundeck migration</strong>: Enterprise → Community, from feasibility analysis to a multi-instance GitOps architecture.</> },
      { ix: "[03]", text: <><strong>Consulting</strong>: new contexts, new teams, same reliability.</> },
      { ix: "[04]", text: <><strong>Toolchain & security</strong>: SonarQube, Nexus, ArgoCD, webhook and secret-management audits.</> },
    ],
    panelFile: "engagement.yaml", panelMeta: "EMPLOYER=NEPTA · CLIENT=LIQUID REPLY",
    panelTitle: "toolbox",
    stack: ["Jenkins","Groovy","Rundeck","Terraform","Ansible","CI/CD","Kubernetes","Docker","Helm","GitOps / ArgoCD","RHEL / Linux","Nexus","SonarQube","PostgreSQL","Bash / Python","Azure DevOps","YAML","Docs-as-Code","Angular","Storybook"],
    panelDataTitle: "metadata",
    data: [
      { k: "role",     v: "DevOps Engineer" },
      { k: "company",  v: "Liquid Reply" },
      { k: "employer", v: "Nepta" },
      { k: "mode",     v: "External consultant" },
      { k: "project",  v: "Jenkins CI/CD · Rundeck migration" },
    ],
  },
  work: {
    no: "03", title: ["Selected", "work."], cue: "5 projects · 2024 → 2025",
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
        demo: "https://biblioflow-app.vercel.app/",
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
    no: "02", title: ["Experience &", "path."], cue: "deploy log · 2018 → 2026",
    items: [
      { year: "2026", range: "Jul 18 — Present", badge: "ACTIVE",
        title: "DevOps Engineer · External Consultant", org: "Liquid Reply · via Nepta",
        logo: "/assets/logos/companies/reply.svg",
        body: "DevOps consultant on automation and delivery projects for major Italian banking groups.",
        bullets: [
          "Enterprise Jenkins CI/CD platform — built to scale to ~20,000 projects, with pipelines parameterized by tech stack (Java, .NET, Python) instead of one pipeline per application",
          "Centralized Groovy shared library to standardize common behaviors",
          "Controller/agent setup on RHEL 9 with shared NFS storage",
          "Deployment via Tomcat Manager API, Nexus as the artifact store for rollbacks",
          "Toolchain integration: SonarQube, Scan Central, Nexus, Quay, ArgoCD",
          "Operational runbook, docs-as-code",
          "Rundeck automation platform migration: Enterprise → Community — feasibility analysis across 2,738 jobs in 75 projects (90.2% migratable), mapping of blocking dependencies",
          "Design of the target multi-instance GitOps architecture",
          "End-to-end test environment on Docker Compose to validate clustering and failover",
          "Automated promotion workflow via REST API",
          "Security audit of webhooks and secret management",
        ],
      },
      { year: "2026", range: "Jan — Jul 18", badge: "SHIPPED",
        title: "Junior DevOps Engineer", org: "Lutech SpA · CrossDev Team",
        logo: "/assets/logos/companies/lutech.jpg",
        body: "On the ERIT-DXL project for Edenred Italia. Pipelines, microservices, DevSecOps, Java backend and Angular frontend. Six dense months, closed with a clean deploy.",
        bullets: [
          "YAML CI/CD pipelines on Azure DevOps — build, test, deploy",
          "5 microservices on Azure Kubernetes Service (AKS)",
          "AKS cluster management: Helm-based deploys and GitOps approach",
          "DevSecOps: Qualys WAS + Dependency Track",
          "Migration Azure Cache for Redis → Azure Managed Redis",
          "Java backend & Angular frontend on microservices",
          "Angular component development with Storybook",
          "Angular 14 → 21 upgrade across frontend applications",
          "Docs-as-code documentation: Markdown in Git, PR reviews, pipeline publishing",
          "Kafka / Event Hub, CQRS, dead-letter retries, SendGrid",
        ],
      },
      { year: "2025", range: "December", badge: null,
        title: "BSc in Computer Science", org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png", logoDark: true,
        body: "Thesis on the design and development of a tool for automated scenario extraction and analysis in CARLA and BeamNG simulations for ADAS/ADS systems.",
        bullets: [
          "Thesis: scenario extraction tool for CARLA / BeamNG simulations (ADAS/ADS)",
          "Algorithms and data structures, databases, operating systems",
          "Full-stack & mobile projects (TARGET, BODY-LIFE, BiblioFlow)",
        ],
      },
    ],
  },
  stack: {
    no: "04", title: ["Stack &", "skills."], cue: "$ ls -la /skills",
    columns: [
      { kicker: "devops_cloud", lead: "Making things run, repeat, automate.",
        chips: ["Jenkins","Groovy","Rundeck","Terraform","Ansible","Azure DevOps","CI/CD (YAML)","Kubernetes / AKS","Helm","GitOps / ArgoCD","kubectl","Docker","RHEL / Linux","Nexus","SonarQube","PostgreSQL","Bash","Docs-as-Code","Qualys WAS","Dependency Track","Git","GitHub Actions","SonarCloud","SendGrid","Azure Managed Redis"] },
      { kicker: "frontend_ui", lead: "Interfaces that ask little and give a lot.",
        chips: ["TypeScript","Angular","Storybook","React","React Native","Next.js","JavaScript","HTML5","CSS3","Tailwind","Material UI","Bootstrap","Figma","jQuery","Flutter"] },
      { kicker: "backend_data", lead: "Under the hood, where serious things happen.",
        chips: ["Java","Python","Spring Boot","SQL","Microservices","REST APIs","Kafka / Event Hub","CQRS","Dead-letter queues","Supabase","Firebase","Cosmos DB"] },
      { kicker: "method_ux", lead: "Thinking the interaction before writing it.",
        chips: ["Agile / Scrum","User Research","Personas","Wireframing","Prototyping","Usability Testing","Code review","Pair programming","Accessibility"] },
    ],
  },
  edu: {
    no: "05", title: ["Education &", "certs."], cue: "univ. of salerno · liceo tito lucrezio caro",
    items: [
      { year: "2025 → now",      title: "M.Sc. · Software Engineering & IT Management", org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png", logoDark: true },
      { year: "2022 → Dec 2025", title: "B.Sc. in Computer Science",                    org: "Università degli Studi di Salerno",
        logo: "/assets/logos/companies/unisa.png", logoDark: true },
      { year: "2017 → 2022",     title: "Scientific High School Diploma",               org: "Liceo Tito Lucrezio Caro · Sarno (SA)" },
    ],
    certsTitle: "certifications",
    certs: [
      { name: "Kubernetes Essentials", yr: "IN PROGRESS" },
      { name: "AI Fundamentals",     yr: "2024" },
      { name: "Git & GitHub Basics", yr: "2023" },
      { name: "React Development",   yr: "2023" },
      { name: "HashiCorp Developer — Terraform Tutorials", yr: "2026",
        href: "https://developer.hashicorp.com/terraform/tutorials" },
      { name: "Terraform Associate 004 — Study Path", yr: "2026",
        href: "https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004" },
      { name: "Red Hat — Ansible Essentials (AU094)", yr: "2026",
        href: "https://www.redhat.com/en/services/training/au094-ansible-essentials-simplicity-automation-technical-overview" },
      { name: "Red Hat — Interactive Labs: Ansible", yr: "2026",
        href: "https://www.redhat.com/en/interactive-labs/ansible" },
      { name: "Kubernetes Basics (kubernetes.io)", yr: "2026",
        href: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
      { name: "Akuity Academy — Intro to GitOps & Argo CD", yr: "2026",
        href: "https://academy.akuity.io/courses/gitops-argocd-intro" },
      { name: "TechWorld with Nana — ArgoCD for Beginners", yr: "2026",
        href: "https://www.classcentral.com/course/youtube-argocd-tutorial-for-beginners-gitops-cd-for-kubernetes-108860" },
      { name: "Red Hat Scholars — Argo CD Tutorial", yr: "2026",
        href: "https://redhat-scholars.github.io/argocd-tutorial/" },
      { name: "Red Hat Developer — Getting Started with OpenShift", yr: "2026",
        href: "https://developers.redhat.com/products/openshift/getting-started" },
    ],
    langsTitle: "languages",
    langs: [
      { name: "Italian", level: "NATIVE" },
      { name: "English", level: "B2" },
    ],
  },
  beyond: {
    title: ["Four things", "beyond the deploy."],
    photos: [
      { src: "/assets/gallery/ferrari-fiorano.jpg", alt: "Ferrari SF-26 — shakedown at Fiorano",
        title: "Forza Ferrari", desc: "F1 every Sunday, re-watched on Monday.", color: "#E10600" },
      { src: "/assets/gallery/food.jpg", alt: "At the table",
        title: "Food", desc: "Weekends hunting for the right dish, new recipes and classics that never fail.", color: "#FFB020" },
      { src: "/assets/gallery/travel.jpg", alt: "On the road",
        title: "On the road", desc: "Short trips, new cities, the odd mountain escape.", color: "#38BDF8" },
      { src: "/assets/gallery/gaming-setup.jpg", alt: "Gaming setup",
        title: "Gaming", desc: "When the deploy refuses to start, a game helps.", color: "#A78BFA" },
    ],
  },
  otherExp: {
    label: "other experience",
    items: [
      { range: "Summers '18 — '19", title: "Salon assistant", org: "Susy & Tito · family business",
        body: "The first place I learned the value of multitasking under pressure, patience with people, and keeping things in order." },
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
