import { Movie } from "@/types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const hasValidPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <Card className="group overflow-hidden bg-card border-border transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-primary/50 cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {hasValidPoster ? (
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Film className="h-10 w-10 text-muted-foreground/50" />
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-card-foreground line-clamp-1 text-sm leading-tight transition-colors duration-300 group-hover:text-primary">
            {movie.Title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{movie.Year}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
