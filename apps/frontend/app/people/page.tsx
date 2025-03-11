import { getPeople } from "@/lib/api";
import PeopleList from "@/components/people-list";

export default async function PeoplePage({ searchParams }) {
  const search = await searchParams;
  const page = search.page ? Number.parseInt(search.page) : 1;
  const { results, count, next, previous } = await getPeople(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Personajes</h1>
      <PeopleList
        people={results}
        count={count}
        initialPage={page}
        nextPage={next}
        previousPage={previous}
      />
    </div>
  );
}
