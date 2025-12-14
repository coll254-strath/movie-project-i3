import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  compact?: boolean;
}

export function SearchBar({ value, onChange, isLoading, compact }: SearchBarProps) {
  return (
    <div className={`relative w-full ${compact ? "" : "max-w-xl mx-auto"}`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}`} />
        <Input
          type="text"
          placeholder="Search for movies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${compact ? "h-9 pl-9 pr-9 text-sm" : "h-12 pl-10 pr-10 text-base"} bg-card border-border focus-visible:ring-primary`}
          aria-label="Search movies"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-1 top-1/2 -translate-y-1/2 ${compact ? "h-7 w-7" : "h-8 w-8"}`}
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            <X className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          </Button>
        )}
      </div>
      {isLoading && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-pulse bg-primary rounded-full" />
        </div>
      )}
    </div>
  );
}
