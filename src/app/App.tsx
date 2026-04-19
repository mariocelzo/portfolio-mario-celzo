import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeatureSlides } from "./components/FeatureSlides";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
// Hook scroll-reveal: attiva .mc-reveal.in sugli header di sezione via IntersectionObserver
import { useScrollReveal } from "./components/brand/Primitives";
// Vercel Analytics: traccia visitatori, paesi, dispositivi — attivo automaticamente su Vercel
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  // Attiva il reveal on-scroll dei `.mc-section__head` (fadeUp CSS keyframe)
  useScrollReveal();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          {/* FeatureSlides: marquee + 4 pannelli cinematografici (CI/CD, K8s, Dashboard, Frontend) */}
          <FeatureSlides />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        {/* Componente Analytics: invisibile, si attiva solo su Vercel */}
        <Analytics />
      </div>
    </ThemeProvider>
  );
}
