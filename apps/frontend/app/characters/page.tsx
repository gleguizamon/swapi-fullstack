import { getCharacters } from "@/lib/api";
import CharactersList from "@/components/characters-list";

export default async function CharactersPage({ searchParams }) {
  const search = await searchParams;
  const page = search.page ? Number.parseInt(search.page) : 1;
  const { results: characters, count, next, previous } = await getCharacters(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars: Personajes</h1>
      <CharactersList
        characters={characters}
        count={count}
        initialPage={page}
        nextPage={next}
        previousPage={previous}
      />
    </div>
  );
}
