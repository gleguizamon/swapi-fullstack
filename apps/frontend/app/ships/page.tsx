import { getShips } from "@/lib/api";
import ShipsList from "@/components/ships-list";

export default async function ShipsPage({ searchParams }) {
  const search = await searchParams;
  const page = search.page ? Number.parseInt(search.page) : 1;
  const { results: ships, count, next, previous } = await getShips(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Naves</h1>
      <ShipsList
        ships={ships}
        count={count}
        initialPage={page}
        nextPage={next}
        previousPage={previous}
      />
    </div>
  );
}
