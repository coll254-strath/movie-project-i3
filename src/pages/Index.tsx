import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { searchMovies, fetchDiverseMovies } from "@/services/movieApi";
import { useDebounce } from "@/hooks/use-debounce";
import { Movie } from "@/types/movie";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 400);

  // Fetch diverse default movies on initial load
  const { data: defaultMovies, isLoading: isLoadingDefault } = useQuery({
    queryKey: ["defaultMovies"],
    queryFn: fetchDiverseMovies,
    staleTime: 1000 * 60 * 10,
    enabled: !hasSearched,
  });

  // Fetch search results when user searches
  const { data: searchData, isLoading: isSearching } = useQuery({
    queryKey: ["movies", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    staleTime: 1000 * 60 * 5,
    enabled: !!debouncedQuery,
  });

  const searchMoviesResult = searchData?.Search || [];
  const totalResults = parseInt(searchData?.totalResults || "0", 10);

  // Update displayed movies based on state
  useEffect(() => {
    if (debouncedQuery && searchMoviesResult.length > 0) {
      setDisplayedMovies(searchMoviesResult.slice(0, 9));
      setCurrentPage(1);
      setHasSearched(true);
    } else if (!debouncedQuery && defaultMovies) {
      setDisplayedMovies(defaultMovies);
      setHasSearched(false);
    }
  }, [debouncedQuery, searchData, defaultMovies]);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !debouncedQuery) return;

    setIsLoadingMore(true);

    const currentlyShown = displayedMovies.length;
    const availableInCurrentBatch = searchMoviesResult.length;

    if (currentlyShown < availableInCurrentBatch) {
      setDisplayedMovies(searchMoviesResult.slice(0, Math.min(currentlyShown + 9, availableInCurrentBatch)));
      setIsLoadingMore(false);
    } else {
      const nextPage = currentPage + 1;
      try {
        const response = await searchMovies(debouncedQuery, nextPage);
        if (response.Search) {
          setDisplayedMovies((prev) => [...prev, ...response.Search!.slice(0, 9)]);
          setCurrentPage(nextPage);
        }
      } catch (error) {
        console.error("Failed to load more movies:", error);
      }
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, displayedMovies, searchMoviesResult, currentPage, debouncedQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value) {
      setCurrentPage(1);
    }
  };

  const isLoading = isLoadingDefault || isSearching;
  const showNoResults = !isLoading && debouncedQuery && searchData?.Response === "False";
  const showResults = !isLoading && displayedMovies.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar 
        showSearch={hasSearched}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        isSearchLoading={isSearching}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {!hasSearched && (
            <>
              <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Find Your Next Movie
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Search through thousands of movies
                </p>
              </header>

              <div className="mb-8">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  isLoading={isLoading}
                />
              </div>
            </>
          )}

          <section aria-label="Movie search results">
            {isLoading && <LoadingSkeleton />}

            {showNoResults && (
              <EmptyState type="no-results" message={searchData?.Error} />
            )}

            {showResults && (
              <MovieGrid
                movies={displayedMovies}
                totalResults={hasSearched ? totalResults : 9}
                onLoadMore={handleLoadMore}
                isLoadingMore={isLoadingMore}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
