import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/services/movieApi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star, Clock, Calendar, Film } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  const hasValidPoster = movie?.Poster && movie.Poster !== "N/A";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>

          {isLoading && (
            <div className="grid gap-8 md:grid-cols-[280px_1fr]">
              <Skeleton className="aspect-[3/4] w-full" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Failed to load movie details.</p>
            </div>
          )}

          {movie && movie.Response !== "False" && (
            <div className="grid gap-8 md:grid-cols-[280px_1fr]">
              {/* Poster */}
              <div className="relative aspect-[3/4] overflow-hidden border border-border bg-muted">
                {hasValidPoster ? (
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Film className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                    {movie.Title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {movie.Year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {movie.Runtime}
                    </span>
                    {movie.Rated && movie.Rated !== "N/A" && (
                      <Badge variant="outline">{movie.Rated}</Badge>
                    )}
                  </div>
                </div>

                {/* Genres */}
                {movie.Genre && movie.Genre !== "N/A" && (
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(", ").map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Ratings */}
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-xl font-semibold">{movie.imdbRating}</span>
                    <span className="text-muted-foreground">/10</span>
                    {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                      <span className="text-sm text-muted-foreground">
                        ({movie.imdbVotes} votes)
                      </span>
                    )}
                  </div>
                )}

                {/* Plot */}
                {movie.Plot && movie.Plot !== "N/A" && (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Plot</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {movie.Plot}
                    </p>
                  </div>
                )}

                {/* Cast & Crew */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {movie.Director && movie.Director !== "N/A" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Director</h3>
                      <p className="text-muted-foreground">{movie.Director}</p>
                    </div>
                  )}
                  {movie.Writer && movie.Writer !== "N/A" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Writer</h3>
                      <p className="text-muted-foreground">{movie.Writer}</p>
                    </div>
                  )}
                  {movie.Actors && movie.Actors !== "N/A" && (
                    <div className="sm:col-span-2">
                      <h3 className="text-sm font-semibold text-foreground">Cast</h3>
                      <p className="text-muted-foreground">{movie.Actors}</p>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 border-t border-border pt-6">
                  {movie.Released && movie.Released !== "N/A" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Released</h3>
                      <p className="text-muted-foreground">{movie.Released}</p>
                    </div>
                  )}
                  {movie.Language && movie.Language !== "N/A" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Language</h3>
                      <p className="text-muted-foreground">{movie.Language}</p>
                    </div>
                  )}
                  {movie.Country && movie.Country !== "N/A" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Country</h3>
                      <p className="text-muted-foreground">{movie.Country}</p>
                    </div>
                  )}
                  {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Box Office</h3>
                      <p className="text-muted-foreground">{movie.BoxOffice}</p>
                    </div>
                  )}
                  {movie.Awards && movie.Awards !== "N/A" && (
                    <div className="sm:col-span-2">
                      <h3 className="text-sm font-semibold text-foreground">Awards</h3>
                      <p className="text-muted-foreground">{movie.Awards}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {movie && movie.Response === "False" && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{movie.Error || "Movie not found."}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;
