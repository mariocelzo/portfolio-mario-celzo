import { Menu, X, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className={`mx-auto max-w-5xl px-6 transition-all duration-500 ${scrolled ? 'w-full px-4' : 'w-[95%]'}`}>
        <div className={`flex items-center justify-between rounded-lg px-6 py-3 transition-all duration-500 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border border-border/60 shadow-lg' 
            : 'bg-transparent border border-transparent'
        }`}>
          <button 
            onClick={() => scrollToSection('top')} 
            className="text-base font-bold font-mono tracking-tight hover:text-primary transition-colors flex items-center gap-2"
          >
            <Terminal className="size-4" />
            mario.sh
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="text-[13px] font-mono font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                ./{item.name.toLowerCase()}
              </button>
            ))}
            <div className="w-px h-4 bg-border/60 mx-2"></div>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md hover:bg-secondary/50 h-9 w-9 border border-transparent hover:border-border/60"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 px-4 pt-2 md:hidden"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border/60 rounded-xl p-6 shadow-2xl flex flex-col gap-4">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="text-left font-mono text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-3 border-b border-border/40 last:border-0"
                >
                  <span className="text-primary mr-2">{">"}</span>
                  {item.name.toLowerCase()}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}