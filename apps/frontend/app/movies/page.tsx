import { getMovies } from "@/lib/api";
import MoviesList from "@/components/movies-list";

export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Películas</h1>
      <MoviesList movies={movies} />
    </div>
  );
}
