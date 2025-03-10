import { getPlanets } from "@/lib/api";
import PlanetsList from "@/components/planets-list";

export default async function PlanetsPage({ searchParams }) {
  const search = await searchParams;
  const page = search.page ? Number.parseInt(search.page) : 1;
  const { results: planets, count, next, previous } = await getPlanets(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Planetas</h1>
      <PlanetsList
        planets={planets}
        count={count}
        initialPage={page}
        nextPage={next}
        previousPage={previous}
      />
    </div>
  );
}
