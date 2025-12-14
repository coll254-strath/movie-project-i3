import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
  totalResults: number;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export function MovieGrid({
  movies,
  totalResults,
  onLoadMore,
  isLoadingMore,
}: MovieGridProps) {
  const showLoadMore = totalResults > 12 && movies.length < totalResults;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {showLoadMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="gap-2"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show More
              </>
            )}
          </Button>
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Showing {movies.length} of {totalResults} results
      </p>
    </div>
  );
}
