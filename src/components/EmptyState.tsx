import { Film, Search } from "lucide-react";

interface EmptyStateProps {
  type: "initial" | "no-results" | "error";
  message?: string;
}

export function EmptyState({ type, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {type === "initial" ? (
        <>
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Film className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Discover Movies</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Start typing to search for your favorite movies. We'll show you the
            best matches from our database.
          </p>
        </>
      ) : type === "no-results" ? (
        <>
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">No movies found</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            {message || "Try adjusting your search terms or explore different keywords."}
          </p>
        </>
      ) : (
        <>
          <div className="mb-4 rounded-full bg-destructive/10 p-4">
            <Film className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            {message || "We couldn't fetch the movies. Please try again later."}
          </p>
        </>
      )}
    </div>
  );
}
