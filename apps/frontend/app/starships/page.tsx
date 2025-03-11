import { getStarships } from "@/lib/api";
import StarshipsList from "@/components/starships-list";

export default async function StarshipsPage({ searchParams }) {
  const search = await searchParams;
  const page = search.page ? Number.parseInt(search.page) : 1;
  const { results, count, next, previous } = await getStarships(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Naves</h1>
      <StarshipsList
        starships={results}
        count={count}
        initialPage={page}
        nextPage={next}
        previousPage={previous}
      />
    </div>
  );
}
