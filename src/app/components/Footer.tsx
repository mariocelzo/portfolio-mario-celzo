import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="https://github.com/mariocelzo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="https://linkedin.com/in/mario-celzo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="https://instagram.com/mariocelzo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
              <a href="mailto:mariocelzo000@gmail.com" aria-label="Email">
                <Mail className="size-5" />
              </a>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mario Celzo. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}