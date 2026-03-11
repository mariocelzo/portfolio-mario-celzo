import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sun className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full hover:bg-primary/10 transition-all duration-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-5 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="size-5 rotate-0 scale-100 transition-all" />
      )}
    </Button>
  );
}
