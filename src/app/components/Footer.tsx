import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/60 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary border border-transparent hover:border-border/60 transition-colors" asChild>
              <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary border border-transparent hover:border-border/60 transition-colors" asChild>
              <a href="https://linkedin.com/in/mario-celzo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary border border-transparent hover:border-border/60 transition-colors" asChild>
              <a href="mailto:mariocelzo000@gmail.com" aria-label="Email">
                <Mail className="size-5" />
              </a>
            </Button>
          </div>
          
          <div className="text-center font-mono">
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/80 mb-2">
              <Terminal className="size-4 text-primary" />
              <span>System.exit(0)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mario Celzo. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-2 uppercase tracking-widest">
              Compiled with React • Tailwind v4 • Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}