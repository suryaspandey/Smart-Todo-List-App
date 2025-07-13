import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useMobile from "@/hooks/useMobile";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const isMobile = useMobile();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div
      className={`absolute mx-auto right-6 ${
        isMobile ? "top-8" : "top-12"
      } mr-2 sm:mr-4`}
    >
      <Button
        aria-label="Toggle light/dark theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 bg-gray-600 dark:bg-gray-200 rounded cursor-pointer"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
};
export default ThemeToggle;
