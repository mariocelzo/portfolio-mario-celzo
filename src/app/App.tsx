import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
// FeatureSlides: cinematic Apple-style feature cards inserted between Hero and About
import { FeatureSlides } from "./components/FeatureSlides";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
// Vercel Analytics: traccia visitatori, paesi, dispositivi — attivo automaticamente su Vercel
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          {/* FeatureSlides: Marquee tagline + 4 cinematic feature cards */}
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