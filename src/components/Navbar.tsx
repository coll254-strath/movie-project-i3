import { Film, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";

interface NavbarProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isSearchLoading?: boolean;
}

export function Navbar({ showSearch, searchValue, onSearchChange, isSearchLoading }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2 shrink-0">
          <Film className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            CineSearch
          </span>
        </div>

        {showSearch && onSearchChange && (
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchValue || ""}
              onChange={onSearchChange}
              isLoading={isSearchLoading}
              compact
            />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="shrink-0"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  );
}
