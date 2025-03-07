import { getShips } from "@/lib/api";
import ShipsList from "@/components/ships-list";

export default async function ShipsPage({ searchParams }) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const { results: ships, count, next, previous } = await getShips(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars Ships</h1>
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
