import { Menu, X } from "lucide-react";
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
        <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled 
            ? 'bg-background/70 backdrop-blur-xl border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
            : 'bg-transparent'
        }`}>
          <button 
            onClick={() => scrollToSection('top')} 
            className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            Mario Celzo
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="w-px h-4 bg-border/50 mx-2"></div>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 h-9 w-9"
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
            <div className="bg-background/90 backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="text-left text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2 border-b border-border/20 last:border-0"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}