import { MovieSearchResponse, MovieDetails, Movie } from "@/types/movie";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "3ba02a38";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieSearchResponse> {
  if (!query.trim()) {
    return { Response: "False", Error: "Please enter a search term" };
  }

  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: MovieSearchResponse = await response.json();
    return data;
  } catch (error) {
    return { Response: "False", Error: "Failed to fetch movies" };
  }
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails> {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    return {
      imdbID: "",
      Title: "",
      Year: "",
      Rated: "",
      Released: "",
      Runtime: "",
      Genre: "",
      Director: "",
      Writer: "",
      Actors: "",
      Plot: "",
      Language: "",
      Country: "",
      Awards: "",
      Poster: "",
      Ratings: [],
      Metascore: "",
      imdbRating: "",
      imdbVotes: "",
      Type: "",
      DVD: "",
      BoxOffice: "",
      Production: "",
      Website: "",
      Response: "False",
      Error: "Failed to fetch movie details",
    };
  }
}

const DEFAULT_SEARCHES = ["Inception", "Interstellar", "Avatar", "Gladiator", "Matrix", "Joker", "Titanic", "Shutter Island", "Parasite"];

export async function fetchDiverseMovies(): Promise<Movie[]> {
  const movies: Movie[] = [];
  
  for (const query of DEFAULT_SEARCHES) {
    try {
      const response = await searchMovies(query);
      if (response.Search && response.Search.length > 0) {
        // Get first movie from each search that has a valid poster
        const movieWithPoster = response.Search.find(m => m.Poster && m.Poster !== "N/A");
        if (movieWithPoster) {
          movies.push(movieWithPoster);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${query}:`, error);
    }
    if (movies.length >= 9) break;
  }
  
  return movies.slice(0, 9);
}
