/**
 * Primitives.tsx — componenti condivisi del brand "Apple-meets-Terminal".
 *
 * Qui vivono i mattoncini riutilizzabili (bottoni, pill, finestre terminale,
 * hook per scroll-reveal e active section). Tutto lo styling viene da brand.css
 * (classi mc-*), così i componenti restano semplici e pixel-perfect rispetto
 * al design originale.
 */
import {
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Terminal } from "lucide-react";

/* ========================================================
 * <Pill> — terminal pill es. "$ ./start.sh"
 * Usata come kicker in cima alle sezioni
 * ======================================================== */
type IconComp = ComponentType<{ size?: number; className?: string }>;

export function Pill({
  icon: Icon = Terminal,
  children,
}: {
  icon?: IconComp;
  children: ReactNode;
}) {
  return (
    <div className="mc-pill">
      <Icon size={14} />
      <span>{children}</span>
    </div>
  );
}

/* ========================================================
 * <WindowChrome> — header di una "mac window" con traffic lights
 * ======================================================== */
export function WindowChrome({
  title,
  icon: Icon,
}: {
  title?: ReactNode;
  icon?: IconComp;
}) {
  return (
    <div className="mc-window__chrome">
      <div className="mc-window__dots">
        <div className="mc-window__dot mc-window__dot--r" />
        <div className="mc-window__dot mc-window__dot--y" />
        <div className="mc-window__dot mc-window__dot--g" />
      </div>
      <div className="mc-window__title">
        {Icon ? <Icon size={12} /> : null}
        {title}
      </div>
    </div>
  );
}

/* ========================================================
 * <VersionBadge> — es. "v2024.0" accanto al titolo del progetto
 * ======================================================== */
export function VersionBadge({ children }: { children: ReactNode }) {
  return <span className="mc-badge-version">{children}</span>;
}

/* ========================================================
 * <BrandButton> — bottone del design system
 * Supporta varianti primary / outline / secondary / ghost
 * e taglie md / lg / sm / icon. Se è passato href renderizza <a>.
 * ======================================================== */
export type BrandButtonVariant = "primary" | "outline" | "secondary" | "ghost";
export type BrandButtonSize = "md" | "lg" | "sm" | "icon";

type AnchorLikeProps = {
  variant?: BrandButtonVariant;
  size?: BrandButtonSize;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  disabled?: boolean;
};

export function BrandButton({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  style,
  className,
  download,
  target,
  rel,
  disabled,
  ...rest
}: AnchorLikeProps) {
  // Compose le classi CSS — prefix mc- per non collidere con Tailwind
  const cls = [
    "mc-btn",
    `mc-btn--${variant}`,
    size === "lg" ? "mc-btn--lg" : "",
    size === "sm" ? "mc-btn--sm" : "",
    size === "icon" ? "mc-btn--icon" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // Se c'è href → <a>; external links vengono aperti in new tab con noopener
  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        className={cls}
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        onClick={onClick}
        style={style}
        // @ts-expect-error — React tipizza download come string, noi accettiamo anche boolean
        download={download}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      style={style}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ========================================================
 * useScrollReveal() — aggiunge classe "in" ai .mc-section__head
 * che entrano in viewport. Element già visibili al mount sono
 * rivelati immediatamente per evitare di "scoprire" contenuti
 * che sono già sullo schermo.
 * ======================================================== */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".mc-section__head"),
    );
    // Marca ogni head come "reveal target"
    nodes.forEach((n) => n.classList.add("mc-reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 },
    );

    nodes.forEach((n) => {
      const r = n.getBoundingClientRect();
      // Se già in viewport al mount → reveal immediato
      if (r.top < window.innerHeight && r.bottom > 0) {
        n.classList.add("in");
      } else {
        io.observe(n);
      }
    });

    return () => io.disconnect();
  }, []);
}

/* ========================================================
 * useActiveSection(ids) — traccia quale sezione è "attiva"
 * durante lo scroll. Usato nell'Header per evidenziare il nav.
 * ======================================================== */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [ids]);

  return active;
}

/* ========================================================
 * smoothScrollTo(id) — helper per nav smooth con offset header
 * ======================================================== */
export function smoothScrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    // 72px = altezza nav fixed + margine
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
