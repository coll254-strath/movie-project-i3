import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-semibold">CineSearch</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Discover your next favorite movie
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by OMDB API • © {new Date().getFullYear()} CineSearch
          </p>
        </div>
      </div>
    </footer>
  );
}
