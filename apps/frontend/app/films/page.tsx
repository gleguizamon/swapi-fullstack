import { getFilms } from "@/lib/api";
import FilmsList from "@/components/films-list";

export default async function FilmsPage() {
  const { results: films } = await getFilms();

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Películas</h1>
      <FilmsList films={films} />
    </div>
  );
}
