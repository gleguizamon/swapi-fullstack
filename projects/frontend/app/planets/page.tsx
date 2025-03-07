import { getPlanets } from "@/lib/api";
import PlanetsList from "@/components/planets-list";

export default async function PlanetsPage({ searchParams }) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const { results: planets, count } = await getPlanets(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars Planets</h1>
      <PlanetsList planets={planets} count={count} initialPage={page} />
    </div>
  );
}
